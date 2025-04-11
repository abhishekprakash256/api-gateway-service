import { Controller, Post, Body, UseGuards , Patch, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // User Login
  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    if (!body.username || !body.password) {
      return { status: 'error', message: 'Username and password are required' };
    }
    return this.authService.login(body.username, body.password);
  }

  // User Signup
  @Post('signup')
  async signup(@Body() body: { username: string; password: string }) {
    if (!body.username || !body.password) {
      return { status: 'error', message: 'Username and password are required' };
    }
    return this.authService.signup(body.username, body.password);
  }

  // Protected route example (Only accessible with JWT)
  @Post('protected')
  @UseGuards(JwtAuthGuard)
  async protectedRoute() {
    return { message: 'You have access!' };
  }

  // Update Password
  @Patch('update-password')
  //@UseGuards(JwtAuthGuard)  // this line is blocing the request
  async updatePassword(
    @Body() body: { username: string; oldPassword: string; newPassword: string; token: string }
  ) {
    
    if (!body.username || !body.oldPassword || !body.newPassword || !body.token) {
      console.log(body.username)
      console.log(body.oldPassword)
      console.log(body.newPassword)
      console.log(body.token)
      return { status: 'error', message: 'All fields are required' };
    }
    return this.authService.updatePassword(body.username, body.oldPassword, body.newPassword, body.token);
  }

  // Recover Account
  @Post('recover')
  async recoverUser(
    @Body() body: { username: string; token: string; newPassword: string; confirmPassword: string }
  ) {
    if (!body.username || !body.token || !body.newPassword || !body.confirmPassword) {
      return { status: 'error', message: 'All fields are required' };
    }
    return this.authService.recoverUser(body.username, body.token, body.newPassword, body.confirmPassword);
  }

  // Delete User Account
  @Post('delete')
  //@UseGuards(JwtAuthGuard)
  async deleteUser(@Body() body: { username: string; password: string; token: string }) {
    if (!body.username || !body.password || !body.token) {
      return { status: 'error', message: 'Username, password, and token are required' };
    }
    return this.authService.deleteUser(body.username, body.password, body.token);
  }
}
