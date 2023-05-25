import {
    Controller,
    Post,
    Get,
    Body,
    UseGuards,
    SetMetadata,
    UseInterceptors
} from '@nestjs/common';
import { CatsService, Cat } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { ValidationPipe } from 'src/pipe/validation.pipe';
import { RolesGuard } from 'src/guard/roles.guard';
import { LoggingInterceptor } from 'src/interceptor/logging.interceptor';
import { TimeoutInterceptor } from 'src/interceptor/timeoout.interceptor';

@Controller('cats')
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor, TimeoutInterceptor)
export class CatsController {
    constructor(private catsService: CatsService) {}

    @Post()
    @SetMetadata('roles', ['admin'])
    async create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
        this.catsService.create(createCatDto);
    }

    @Get()
    async findAll(): Promise<Cat[]> {
        return this.catsService.findAll();
    }
}
