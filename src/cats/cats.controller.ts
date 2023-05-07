import { Controller, Post, Get, Body } from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
    constructor(private catsService: CatsService) {}

    @Post()
    async create() {
        this.catsService.create('');
    }
}
