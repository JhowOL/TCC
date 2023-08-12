import { Controller, Get } from "@nestjs/common";
import { StocksService } from "./stocks.service";
import { Stock } from "./schema/stock.schema";

@Controller('stock')
export class StocksController {
    constructor(private readonly usersServices: StocksService) {}

    @Get()
    async getUsers(): Promise<Stock[]> {
        return this.usersServices.getAllStocks();
    }
}