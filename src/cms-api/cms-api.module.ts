import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'; // ✅ Import HttpModule
import { CmsApiService } from './cms-login-api.service';

@Module({
  imports: [HttpModule], // ✅ Import HttpModule for HTTP requests
  providers: [CmsApiService],
  exports: [CmsApiService], // ✅ Export service for other modules
})
export class CmsApiModule {}
