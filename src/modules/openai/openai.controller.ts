import { Controller, Get, Post, Param, Sse, HttpCode, Header, Query } from '@nestjs/common';
import { OpenaiService } from './openai.service';

@Controller('openai')
export class OpenaiController {
    constructor(private openaiService: OpenaiService) {}

    @Sse('sse')
    @Get(':prompt')
    @Header('Access-Control-Allow-Origin', '*')
    getComletion(@Query('prompt') prompt: string) {
        console.log(prompt);
        return this.openaiService.getCompletion(prompt);
    }
}
