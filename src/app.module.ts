import { Module } from '@nestjs/common';
import { AppController } from './healthy/healthy.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { StocksModule } from './stocks/stocks.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://jhonatanlemos99:dyVHbnVqjjzrQnK6@cluster0.hqupiq6.mongodb.net/stock?retryWrites=true&w=majority'),  StocksModule],
  controllers: [AppController ],
  providers: [],
})
export class AppModule {}
