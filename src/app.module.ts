import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SectionController } from './section/section.controller';
import { SearchController } from './search/search.controller';


@Module({   
  controllers: [AppController, SectionController, SearchController],
  providers: [AppService],
})
export class AppModule {}
