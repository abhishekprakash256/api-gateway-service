import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SectionController } from './blog/section/section.controller';
import { SearchController } from './search/search.controller';
import { BlogModule } from './blog/blog.module';


@Module({   
  controllers: [AppController, SectionController, SearchController],
  providers: [AppService],
  imports: [BlogModule],
})
export class AppModule {}
