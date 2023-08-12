import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";
import { Stock, StockSchema } from "./schema/stock.schema";
import { StocksController } from "./stocks.controller";
import { StocksService } from "./stocks.service";
import { StocksRepository } from "./stocks.repository";

@Module({
    imports: [MongooseModule.forFeature([{ name: Stock.name, schema:  StockSchema}])],
    controllers: [StocksController],
    providers: [StocksService, StocksRepository]
})

export class StocksModule {}