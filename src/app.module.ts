import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';
import { UsersModule } from './users/users.module';

@Module({
    imports: [MongooseModule.forRoot('mongodb://localhost/nest'), UsersModule],
    controllers: [AppController, CatsController],
    providers: [AppService, CatsService]
})
export class AppModule {}
