import {
  MiddlewareConsumer,
  Module,
  NestModule,
  OnModuleInit,
} from '@nestjs/common';
import { MikroORM } from '@mikro-orm/mysql';
import { MikroOrmMiddleware, MikroOrmModule } from '@mikro-orm/nestjs';
import { BullModule } from '@nestjs/bullmq';

import { redisConfig } from './redis.config';

import { AppController } from './app.controller';
import { ArticleModule } from './article/article.module';
import { ProfileModule } from './profile/profile.module';
import { TagModule } from './tag/tag.module';
import { UserModule } from './user/user.module';
import { ExchangeModule } from './exchange/exchange.module';
import { ApiModule } from './api/api.module';
import { CoinModule } from './coin/coin.module';
import { QuoteModule } from './quote/quote.module';
import { QuoteJobProducer } from './quote/quote.job.producer';

@Module({
  controllers: [AppController],
  imports: [
    MikroOrmModule.forRoot(),
    BullModule.forRoot(redisConfig),
    ArticleModule,
    UserModule,
    ProfileModule,
    TagModule,
    ExchangeModule,
    ApiModule,
    CoinModule,
    QuoteModule,
  ],
  providers: [],
})
export class AppModule implements NestModule, OnModuleInit {
  constructor(
    private readonly orm: MikroORM,
    private readonly quoteJobProducer: QuoteJobProducer,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.orm.getMigrator().up();
    await this.quoteJobProducer.setupCronjob();
  }

  // for some reason the auth middlewares in profile and article modules are fired before the request context one,
  // so they would fail to access contextual EM. by registering the middleware directly in AppModule, we can get
  // around this issue
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MikroOrmMiddleware).forRoutes('*');
  }
}
