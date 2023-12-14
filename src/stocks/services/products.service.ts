import { Injectable } from "@nestjs/common";
import { StocksRepository } from "../stocks.repository";
import { Products } from "../dto/product.dto";
import { CreateProducts } from "../dto/createProduct.dto";
import { Stock } from "../schema/stock.schema";
import { SearchPriority } from "../dto/searchPriority.dto";
import { SearchProduct } from "../dto/SearchProduct.dto";

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

    async getProduct(name: string, stockId: string): Promise<SearchProduct>{
        let stock = await this.stocksRepository.getProductByStockId(name, stockId);

        let result = new SearchProduct();

        result.stockRequested = stock.name;
        result.stockFound = stock.name;
        result.product = stock.products;

        if (stock.products.length < 1) {
            for (let i = 0; i < stock.searchPriority.length; i++) {
                const nextStock = stock.searchPriority.find(p => p.priority == i);
                const search = await this.stocksRepository.getProductByStockName(name, nextStock.name);
                
                if (search.products.length > 0){
                    result.stockFound = nextStock.name;
                    result.product = search.products;
                    result.searchPriority = nextStock.priority;
                    result.daysToTransfer = nextStock.daysToTransfer;

                    break;
                }
            }
        }

        return result;
    }
}