import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://pramithvidusara:O0uBEL7wDn7TNYYB@mern-estate.l8k3q3p.mongodb.net/?retryWrites=true&w=majority&appName=mern-estate'), // Replace with your MongoDB connection string
    UserModule,
    LoggerModule,
  ],
})
export class AppModule {}



// pramithvidusara
// O0uBEL7wDn7TNYYB
// mongodb+srv://pramithvidusara:<password>@mern-estate.l8k3q3p.mongodb.net/?retryWrites=true&w=majority&appName=mern-estate

