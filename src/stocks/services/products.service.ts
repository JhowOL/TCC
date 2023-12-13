import { Injectable } from "@nestjs/common";
import { StocksRepository } from "../stocks.repository";
import { Products } from "../dto/product.dto";
import { CreateProducts } from "../dto/createProduct.dto";
import { Stock } from "../schema/stock.schema";

@Injectable()
export class ProductsService {
    constructor(private readonly stocksRepository: StocksRepository) {}

    async getStockProducts(stockId: string): Promise<Products[]>{
        return this.stocksRepository.findAllPoductsFromStock(stockId);
    }

    async addProductToStock(payload: CreateProducts): Promise<Products[]>{
        const { products, stockId } = payload;
        let newProduct = new Array<Products>();
        
        products.forEach(p => {
            newProduct.push({
                name: p.name,
                amount: p.amount,
                category: p.category,
                lastPurchase:{
                    amount: p.lastPurchase.amount,
                    unitaryPrice: p.lastPurchase.unitaryPrice,
                    date: p.lastPurchase.date,
                }
            })
        });
        
        await this.stocksRepository.addProductToStock(newProduct, stockId);
        return newProduct;
    }

    async getProduct(name: string, stockId: string): Promise<Stock>{
        return await this.stocksRepository.getProduct(name, stockId);
    }
}