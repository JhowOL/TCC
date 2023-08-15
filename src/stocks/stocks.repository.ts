import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Stock, StockDocumet } from "./schema/stock.schema";
import { Model } from "mongoose";
import { CreateProducts } from "./dto/createProduct.dto";

@Injectable()
export class StocksRepository {
    constructor(@InjectModel(Stock.name) private stockModel: Model<StockDocumet>) { }

    async findAllStocks() {
        return this.stockModel.find({},{name:1});
    }

    async findAllPoductsFromStock(stockId: string) {
        return (await this.stockModel.findOne({ _id: stockId })).products;
    }

    async createStock(payload: Stock){
        return this.stockModel.create(payload);
    }

    async addProductToStock(payload: CreateProducts){
        const { products } = (await this.stockModel.findById(payload.stockId));
        products.push(payload.products);
        await this.stockModel.updateOne({ _id: payload.stockId }, {products});
    }
}