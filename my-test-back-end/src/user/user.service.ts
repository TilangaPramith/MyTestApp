import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt'
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginResponse } from './types/user.types';
import { WinstonLoggerService } from '../logger/logger.service'; // Import the logger service

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private readonly logger: WinstonLoggerService, // Inject the logger service
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    this.logger.log('Attempting to create a new user');
    const { email, password, name } = createUserDto;

    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      this.logger.warn(`User with email ${email} already exists`);
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new this.userModel({ email, password: hashedPassword, name });
    const createdUser = await user.save();
    
    this.logger.log(`User created successfully with ID ${createdUser._id}`);
    return createdUser;
  }

  async login(loginUserDto: LoginUserDto): Promise<string | LoginResponse> {
    this.logger.log(`User login attempt for email: ${loginUserDto.email}`);

    const { email, password } = loginUserDto;
    const user = await this.userModel.findOne({ email }).exec();

    if (!user || !(await bcrypt.compare(password, user.password))) {
      this.logger.error('Invalid credentials provided for login', '');

      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { username: user.email, sub: user._id, name: user?.name };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    await this.userModel.findByIdAndUpdate(user._id, { refreshToken });

    this.logger.log(`User logged in successfully with ID ${user._id}`);

    // Generate JWT or return some kind of session token here
    return {
      userId: user?._id,
      accessToken,
      refreshToken,
      message: 'login successful'
    };  // Placeholder, replace with actual JWT token
  }

  async refreshTokens(userId: string, refreshToken: string) {
    this.logger.log(`Attempting to refresh tokens for user ID ${userId}`);

    const user = await this.userModel.findById(userId);

    if (user && user.refreshToken === refreshToken) {
      const payload = { username: user.email, sub: user._id };
      const newAccessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
      const newRefreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

      await this.userModel.findByIdAndUpdate(userId, { refreshToken: newRefreshToken });

      this.logger.log(`Tokens refreshed successfully for user ID ${userId}`);

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    }

    this.logger.error(`Invalid refresh token for user ID ${userId}`, '');
    throw new Error('Invalid refresh token');
  }
}
