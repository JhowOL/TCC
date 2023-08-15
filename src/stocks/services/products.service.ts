import { Injectable } from "@nestjs/common";
import { StocksRepository } from "../stocks.repository";
import { Products } from "../dto/product.dto";
import { CreateProducts } from "../dto/createProduct.dto";

@Injectable()
export class ProductsService {
    constructor(private readonly stocksRepository: StocksRepository) {}

    async getStockProducts(stockId: string): Promise<Products[]>{
        return this.stocksRepository.findAllPoductsFromStock(stockId);
    }

    async addProductToStock(payload: CreateProducts): Promise<Products>{
        const { products, stockId } = payload;
        const newProduct = {
            name: products.name,
            amount: products.amount,
            category: products.category,
            lastPurchase:{
                amount: products.lastPurchase.amount,
                unitaryPrice: products.lastPurchase.unitaryPrice,
                date: products.lastPurchase.date,
            }
        }
        
        await this.stocksRepository.addProductToStock(newProduct, stockId);
        return newProduct;
    }
}