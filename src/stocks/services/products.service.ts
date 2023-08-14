import { Injectable } from "@nestjs/common";
import { StocksRepository } from "../stocks.repository";
import { Product } from "../schema/stock.schema";

@Injectable()
export class ProductsService {
    constructor(private readonly stocksRepository: StocksRepository) {}

    async getStockProducts(stockId: string): Promise<Product>{
        return this.stocksRepository.findAllPoductsFromStock(stockId);
    }
}