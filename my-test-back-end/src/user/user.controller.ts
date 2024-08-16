import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {    
    return this.userService.login(loginUserDto);
  }

  @Post('refresh')
  async refresh(@Body() body: { refreshToken: string }, @Req() req: Request| any, @Res() res: Response | any) {
    const userId = req.user['userId']; // Assuming user ID is set in the request
    try {
      const tokens = await this.userService.refreshTokens(userId, body.refreshToken);
      return res.json(tokens);
    } catch (error) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }
  }
}
