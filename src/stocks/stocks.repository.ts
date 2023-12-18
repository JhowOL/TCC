import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Stock, StockDocumet } from "./schema/stock.schema";
import { Model } from "mongoose";
import { Products } from "./dto/product.dto";

@Injectable()
export class StocksRepository {
    constructor(@InjectModel(Stock.name) private stockModel: Model<StockDocumet>) { }

    async findAllStocks() {
        return await this.stockModel.find({}, { name: 1, searchPriority: 1 });
    }

    async findAllPoductsFromStock(stockId: string) {
        return (await this.stockModel.findById(stockId)).products;
    }

    async createStock(newStock: Stock) {
        return this.stockModel.create(newStock);
    }

    async addProductToStock(_products: Products[], stockId: string) {
        const { products } = (await this.stockModel.findById(stockId));

        _products.forEach(p => {
            products.push(p);
        });

        await this.stockModel.updateOne({ _id: stockId }, { products });
    }

    async getProductByStockId(name: string, stockId: string) {
        let stock = await this.stockModel.findById(stockId, { _id: 0 })

        stock.products = stock.products.filter(p => p.name == name);

        return stock;
    }

    async getProductByStockName(productName: string, stockName: string) {
        let stock = await this.stockModel.findOne({ name: stockName }, { _id: 0 });

        stock.products = stock.products.filter(p => p.name == productName);

        return stock;
    }

    async updateProduct(products: Products[], stockId: string) {
        await this.stockModel.updateOne({_id: stockId}, {$set: { products: products }})
    }
}