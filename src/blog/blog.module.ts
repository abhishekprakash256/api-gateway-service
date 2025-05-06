import { Module } from '@nestjs/common';
import { SectionController } from './section/section.controller';

@Module({
  controllers: [SectionController],
})
export class BlogModule {}
