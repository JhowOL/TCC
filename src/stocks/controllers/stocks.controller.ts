import { Controller, Get, Post, Body } from "@nestjs/common";
import { StocksService } from "../services/stocks.service";
import { Stock } from "../schema/stock.schema";

@Controller('stocks')
export class StocksController {
    constructor(private readonly stocksServices: StocksService) {}

    @Get()
    async getStocks(): Promise<Stock[]> {
        return this.stocksServices.getAllStocks();
    }

    @Post()
    async createStock(@Body() payload: Stock): Promise<Stock>{
        return this.stocksServices.createStock(payload);
    }
}