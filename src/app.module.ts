import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsModule } from './cats/cats.module';
import { SectionController } from './section/section.controller';
import { SearchController } from './search/search.controller';


@Module({   
  imports: [CatsModule],
  controllers: [AppController, CatsController, SectionController, SearchController],
  providers: [AppService],
})
export class AppModule {}
