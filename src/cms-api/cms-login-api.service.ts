import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'; // Correct import
import { AxiosResponse } from 'axios';

@Injectable()
export class CmsApiService {

    private flaskApiUrl = 'http://localhost:5000/pgsql'; // Flask API URL

    constructor(private readonly httpService: HttpService) {}
    
  // Helper function to make API requests to Flask
  private async makeApiRequest(endpoint: string, data: object): Promise<any> {
    try {
      const response = await this.httpService.post(`${this.flaskApiUrl}/${endpoint}`, data).toPromise();
      if (!response) {
        console.error(`No response received from ${this.flaskApiUrl}/${endpoint}`);
        throw new UnauthorizedException('No response from Flask API');
      }
      return response.data; // Ensure this is correct
    } catch (error) {
      console.error('Error in makeApiRequest:', error.response?.data || error.message);
      throw new UnauthorizedException('Error communicating with Flask API');
    }
  }
  

  // Check if user exists
  async checkUser(username: string): Promise<any> {
    return this.makeApiRequest('check_user', { username : username });
  }

  // Verify user password
  async verifyPassword(passedPassword: string, hashedPassword: string): Promise<any> {
    return this.makeApiRequest('verify_password', { passed_password: passedPassword, hashed_password: hashedPassword });
  }

  // Get user password
  async getUserPassword(username: string): Promise<any> {
    return this.makeApiRequest('get_user_password', { username : username});
  }

  // Update user password
  async updateUserPassword(username: string, newPassword: string): Promise<any> {
    console.log("in updateUserPassword");
    console.log(newPassword);
    return this.makeApiRequest('update_user_password', { username , newPassword  });
  }

  // Get user token (hash)
  async getUserHash(username: string): Promise<any> {
    return this.makeApiRequest('get_user_hash', { username : username });
  }

  // Delete user
  async deleteUser(username: string): Promise<any> {
    console.log("in delete user cms");
    return this.makeApiRequest('delete_user', { username : username });
  }

  // Create a new user
  async createUser(username: string, password: string): Promise<any> {
    return this.makeApiRequest('create_user', { username : username, password : password });
  }

}
