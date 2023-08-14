import { Injectable } from "@nestjs/common";
import { StocksRepository } from "../stocks.repository";
import { Stock } from "../schema/stock.schema";

@Injectable()
export class StocksService {
    constructor(private readonly stocksRepository: StocksRepository) {}

    async getAllStocks(): Promise<Stock[]>{
        return this.stocksRepository.findAllStocks();
    }

    async createStock(payload: Stock): Promise<Stock>{
        if(payload.products == null)
            payload.products = new Array();

        return this.stocksRepository.createStock(payload);
    }
}