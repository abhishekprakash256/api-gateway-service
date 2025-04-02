import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CmsApiService } from '../cms-api/cms-login-api.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly cmsApiService: CmsApiService,
    private readonly jwtService: JwtService,
  ) {}

  // Login logic
  async login(username: string, password: string) {
    // Check if user exists
    const user = await this.cmsApiService.checkUser(username);
    if (!user) throw new UnauthorizedException('User not found');

    // get the user password from the system
    const response = await this.cmsApiService.getUserPassword(username);

    console.log(response.hashed_password)
    console.log(password)

    // Verify password
    const isPasswordValid = await this.cmsApiService.verifyPassword(password, response.hashed_password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

    // Generate JWT token
    return this.generateJwt(user);
  }

  // Signup logic
  async signup(username: string, password: string) {
    // Check if user already exists
    const userExists = await this.cmsApiService.checkUser(username);
    if (userExists) throw new ConflictException('User already exists');

    // Create the user in the Flask backend
    const user = await this.cmsApiService.createUser(username, password);
    return this.generateJwt(user);
  }

  // Update password logic
  async updatePassword(username: string, oldPassword: string, newPassword: string) {
    // Check if old password is valid
    const isPasswordValid = await this.cmsApiService.verifyPassword(username, oldPassword);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid current password');

    // Update password in Flask
    await this.cmsApiService.updateUserPassword(username, newPassword);
    return { message: 'Password updated successfully' };
  }

  // Delete user logic
  async deleteUser(username: string, password: string) {
    // Verify the password first
    const isPasswordValid = await this.cmsApiService.verifyPassword(username, password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid password');

    // Delete the user from Flask
    await this.cmsApiService.deleteUser(username);
    return { message: 'User deleted successfully' };
  }

  // JWT token generation
  private generateJwt(user: any) {
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
