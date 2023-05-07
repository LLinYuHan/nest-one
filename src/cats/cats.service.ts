import { Injectable } from '@nestjs/common';

export interface Cat {
    name: string;
    age: number;
    breed: string;
}

@Injectable()
export class CatsService {
    private readonly cats: string[] = [];

    create(cat: string) {
        this.cats.push(cat);
    }

    findAll(): string[] {
        return this.cats;
    }
}
