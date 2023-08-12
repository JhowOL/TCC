import { Injectable } from "@nestjs/common";
import { StocksRepository } from "./stocks.repository";
import { Stock, Product } from "./schema/stock.schema";

@Injectable()
export class StocksService {
    constructor(private readonly stocksRepository: StocksRepository) {}

    async getAllStocks(): Promise<Stock[]>{
        return this.stocksRepository.findAll();
    }

    async getStockProducts(stockId: string): Promise<Product>{
        return this.stocksRepository.findAllStockProducts(stockId);
    }
}