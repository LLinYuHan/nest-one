import {
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod
} from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { CacheModule } from '@nestjs/common';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { CatsModule } from './modules/cats/cats.module';
import { OpenaiModule } from './modules/openai/openai.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost/nest'),
        UsersModule,
        CatsModule,
        CacheModule.register(),
        OpenaiModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes({ path: 'cats', method: RequestMethod.GET });
    }
}
