import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Stock, StockDocumet } from "./schema/stock.schema";
import { Model } from "mongoose";
import { CreateProducts } from "./dto/createProduct.dto";
import { Products } from "./dto/product.dto";

@Injectable()
export class StocksRepository {
    constructor(@InjectModel(Stock.name) private stockModel: Model<StockDocumet>) { }

    async findAllStocks() {
        return this.stockModel.find({},{name:1});
    }

    async findAllPoductsFromStock(stockId: string) {
        return (await this.stockModel.findById(stockId)).products;
    }

    async createStock(payload: Stock){
        const newStock = {
            
        }
        return this.stockModel.create(payload);
    }

    async addProductToStock(product: Products, stockId: string){
        const { products } = (await this.stockModel.findById(stockId));
        
        products.push(product);
        await this.stockModel.updateOne({ _id: stockId }, {products});
    }
}