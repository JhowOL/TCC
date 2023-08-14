import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Stock, StockDocumet } from "./schema/stock.schema";
import { Model } from "mongoose";

@Injectable()
export class StocksRepository {
    constructor(@InjectModel(Stock.name) private stockModel: Model<StockDocumet>) { }

    async findAllStocks() {
        return this.stockModel.find({},{name:1});
    }

    async findAllPoductsFromStock(stockId: string) {
        return (await this.stockModel.findOne({ _id: stockId })).products;
    }

    async createStock(payload){
        return this.stockModel.create(payload);
    }
}