import { Injectable } from "@nestjs/common";
import { StocksRepository } from "./stocks.repository";
import { Stock } from "./schema/stock.schema";

@Injectable()
export class StocksService {
    constructor(private readonly stocksRepository: StocksRepository) {}

    async getAllStocks(): Promise<Stock[]>{
        return this.stocksRepository.findAll();
    }
}