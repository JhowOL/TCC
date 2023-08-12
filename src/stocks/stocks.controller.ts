import { Controller, Get, Param } from "@nestjs/common";
import { StocksService } from "./stocks.service";
import { Stock } from "./schema/stock.schema";

@Controller('stocks')
export class StocksController {
    constructor(private readonly stocksServices: StocksService) {}

    @Get()
    async getUsers(): Promise<Stock[]> {
        return this.stocksServices.getAllStocks();
    }

    @Get('products/:stockId')
    async getStockProducts(@Param('stockId') stockId): Promise<object>{
        return this.stocksServices.getStockProducts(stockId)
    }
}