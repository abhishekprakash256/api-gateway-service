import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { CmsApiModule } from 'src/cms-api/cms-api.module';
//import { CmsApiModule } from 'src/cms-api/cms-api.module';

@Module({
  imports: [
    CmsApiModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key', // Use environment variables for security
      signOptions: { expiresIn: '1h' }, // Token expiry time
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
