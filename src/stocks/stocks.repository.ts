import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Stock, StockDocumet } from "./schema/stock.schema";
import { Model } from "mongoose";

@Injectable()
export class StocksRepository {
    constructor(@InjectModel(Stock.name) private stockModel: Model<StockDocumet>) { }

    async findAll() {
        return this.stockModel.find();
    }

    async findAllStockProducts(stockId: string) {
        return (await this.stockModel.findOne({ _id: stockId })).products;
    }
}