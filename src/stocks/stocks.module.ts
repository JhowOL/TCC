import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";
import { Stock, StockSchema } from "./schema/stock.schema";
import { StocksController } from "./controllers/stocks.controller";
import { StocksService } from "./services/stocks.service";
import { StocksRepository } from "./stocks.repository";
import { ProductsController } from "./controllers/products.contoller";
import { ProductsService } from "./services/products.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: Stock.name, schema:  StockSchema}])],
    controllers: [StocksController, ProductsController],
    providers: [StocksService, ProductsService, StocksRepository]
})

export class StocksModule {}