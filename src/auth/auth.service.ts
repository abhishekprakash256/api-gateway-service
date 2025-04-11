import { Injectable, UnauthorizedException, ConflictException, ForbiddenException } from '@nestjs/common';
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
    const user = await this.validateAndGetUser(username);
    await this.validateUserCredentials(username, password);

    return this.generateJwt(user);
  }

  // Signup logic
  async signup(username: string, password: string) {

    const result = await this.cmsApiService.checkUser(username);

    if (result.userExists) throw new ConflictException('User already exists');
    

    const user = await this.cmsApiService.createUser(username, password);
    return this.generateJwt(user);
  }

  // Update password logic
  async updatePassword(username: string, oldPassword: string, newPassword: string, token: string) {
    
    console.log("in")
    console.log(username)
    console.log(token)

    await this.validateJwtToken(token, username);

    console.log("in1")

    const user = await this.validateAndGetUser(username);
    await this.validateUserCredentials(username, oldPassword);

    console.log("in2")

    await this.cmsApiService.updateUserPassword(username, newPassword);

    console.log("in3")
    return { message: 'Password updated successfully' };
  }

  // Recover user account wrong implementation
  async recoverUser(username: string, token: string, newPassword: string, confirmPassword: string) {
    const user = await this.validateAndGetUser(username);
    
    await this.validateTokenMatch(username, token);
    
    if (newPassword !== confirmPassword) throw new ConflictException('Passwords do not match');

    await this.cmsApiService.deleteUser(username);
    return { message: 'User recovered successfully' };
  }

  // Delete user
  async deleteUser(username: string, password: string, token: string) {
    console.log("in delete user");
    await this.validateJwtToken(token, username);

    // get the user hash
    const fetchToken = await this.cmsApiService.getUserHash(username);
    console.log(fetchToken.user_token);

    const user = await this.validateAndGetUser(username);
    await this.validateUserCredentials(username, password);

    console.log("in delete user1");

    await this.cmsApiService.deleteUser(username);
    return { message: 'User deleted successfully' };
  }

  // **Reusable Helper Functions**

  // Validate and get user
  private async validateAndGetUser(username: string) {
    const user = await this.cmsApiService.checkUser(username);
    console.log("In the vaklidate and get user");
    console.log(user.Username) ; 
    if (!user) throw new UnauthorizedException('User not found');
    return user;
  }

  // Validate user credentials (password verification)
  private async validateUserCredentials(username: string, password: string) {
    const response = await this.cmsApiService.getUserPassword(username);
    const isPasswordValid = await this.cmsApiService.verifyPassword(password, response.hashed_password);

    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');
  }

  // Validate if the provided token matches the stored token
  private async validateTokenMatch(username: string, providedToken: string) {
    const fetchToken = await this.cmsApiService.getUserHash(username);
    if (providedToken !== fetchToken.user_token) {
      throw new ForbiddenException('Invalid token');
    }
  }

  // Validate JWT before performing actions
  private async validateJwtToken(token: string, username: string) {
    try {
      console.log('Validating token:', token);
      const decoded = this.jwtService.verify(token);
      console.log('Decoded token:', decoded);
  
      if (!decoded.username) {
        throw new UnauthorizedException('Token does not contain username');
      }
  
      if (decoded.username !== username) {
        console.error('Token does not match user:', decoded.username, username);
        throw new ForbiddenException('Token does not match user');
      }
    } catch (error) {
      console.error('JWT verification error:', error.message);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  private generateJwt(user: any) {
    console.log('User object during token generation:', user , user.username);
    const payload = { sub: user.id, username: user.username };
    return { access_token: this.jwtService.sign(payload, { expiresIn: '1h' }) };
  }
}
