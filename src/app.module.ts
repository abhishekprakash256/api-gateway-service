import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SectionController } from './section/section.controller';
import { SearchController } from './search/search.controller';
import { AuthModule } from './auth/auth.module';
import { CmsApiModule } from './cms-api/cms-api.module'; // ✅ Import CmsApiModule

@Module({   
  imports: [CmsApiModule, AuthModule], // ✅ Import CmsApiModule
  controllers: [AppController, SectionController, SearchController],
  providers: [AppService],
})
export class AppModule {}
