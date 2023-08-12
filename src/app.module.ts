import { Module } from '@nestjs/common';
import { AppController } from './healthy/healthy.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { StocksModule } from './stocks/stocks.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://root:example@localhost:27017/stock'),  StocksModule],
  controllers: [AppController ],
  providers: [],
})
export class AppModule {}
