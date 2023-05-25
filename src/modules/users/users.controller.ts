import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ParseIntPipe } from 'src/pipe/parse-int.pipe';
import { Configuration, OpenAIApi } from 'openai';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    async findAll() {
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY
        });

        const openai = new OpenAIApi(configuration);
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: 'Say this is a test',
            temperature: 0,
            max_tokens: 7
        });

        console.log('response', response.data.choices[0].text);
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', new ParseIntPipe()) id: string) {
        return this.usersService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(+id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }
}
