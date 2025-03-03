
import { Controller, Get, Post } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Post()
  create(): string {
    return 'This action adds a new cat';
  }

  @Get('/*')  // adds the route cat/n=anything
  findAll(): string {
    return 'This action returns all cats';
  }
}
