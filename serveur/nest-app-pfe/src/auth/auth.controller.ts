import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
  
    @Post('login')
    async login(@Body() loginData: AuthDto) {
      try {
        console.log('Received login request:', loginData);
  
        // Call AuthService instance method
        const { message, access_token } = await this.authService.login(loginData);
  
        return { message, access_token };
      } catch (error) {
        throw error; // rethrow other errors
      }
    }
  
    @Post('validateToken')
    async validateToken(@Body('token') token: string): Promise<any> {
      try {
        const payload = await this.authService.validateToken(token);
        return payload;
      } catch (error) {
        throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
      }
    }
  
    @Post('requestPasswordReset')
    async requestPasswordReset(@Body('email') email: string): Promise<any> {
      try {
        await this.authService.requestPasswordReset(email);
        return { message: 'Password reset email sent' };
      } catch (error) {
        throw error; // Rethrow other errors
      }
    }
  
    @Post('verifyPasswordReset')
    async verifyPasswordReset(
      @Body() data: { token: string; newPassword: string },
    ): Promise<any> {
      try {
        await this.authService.verifyPasswordReset(data.token, data.newPassword);
        return { message: 'Password reset successful' };
      } catch (error) {
        throw error; // Rethrow other errors
      }
    }
  }
