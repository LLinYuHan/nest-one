import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
import { Observable } from 'rxjs';

@Injectable()
export class OpenaiService {
    private openai: OpenAIApi;

    constructor() {
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY
        });

        this.openai = new OpenAIApi(configuration);
    }

    async getCompletion(prompt: string) {
        return new Observable(subscriber => {
            this.openai.createCompletion({
                model: 'text-davinci-003',
                prompt,
                temperature: 0,
                stream: true,
                max_tokens: 1000
            }, { responseType: 'stream' }).then(res => {
                // @ts-ignore
                res.data.on('data', data => {
                    const lines = data.toString().split('\n').filter((line) => line.trim() !== '');
                    for (const line of lines) {
                        const message = line.replace(/^data: /, '');
                        console.log('message', message);
                        if (message === '[DONE]') {
                            subscriber.next({ data: 'done' });
                            subscriber.complete();
                            return;
                        }
                        try {
                            const parsed = JSON.parse(message);
                            const data = parsed.choices[0].text;
                            subscriber.next({ data });
                        }
                        catch (error) {
                            console.error('Could not JSON parse stream message', message, error);
                        }
                    }
                });
            });
        });
    }
}
