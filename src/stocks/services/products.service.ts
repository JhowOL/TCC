import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { StocksRepository } from "../stocks.repository";
import { Products } from "../dto/product.dto";
import { CreateProducts } from "../dto/createProduct.dto";
import { Stock } from "../schema/stock.schema";
import { SearchPriority } from "../dto/searchPriority.dto";
import { SearchProduct } from "../dto/SearchProduct.dto";
import { promises } from "dns";
import { Purchase } from "../dto/purchase.dto";

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
        
        if (stock.products.length < 1 || !this.AmountIsValid(stock.products)) {
            for (let i = 0; i < stock.searchPriority.length; i++) {
                const nextStock = stock.searchPriority.find(p => p.priority == i);
                const search = await this.stocksRepository.getProductByStockName(name, nextStock.name);
                
                if (search.products.length > 0 && this.AmountIsValid(search.products)){
                    result.stockFound = nextStock.name;
                    result.product = search.products;
                    result.searchPriority = nextStock.priority;
                    result.daysToTransfer = nextStock.daysToTransfer;

                    break;
                }
            }
        }

        if (stock.products.length < 1)
            throw new HttpException("Produto não encontrado", HttpStatus.NOT_FOUND);
        
        return result;
    }

    async ProcessPurchase(payload: Purchase): Promise<Products>{
        let products = await this.stocksRepository.findAllPoductsFromStock(payload.stockId);
        let productExists = false;
        let productUpdated = new Products();

        products.forEach(p => {
            if (p.name == payload.productName){
                if(p.amount < payload.amount)
                    throw new HttpException("Quantidade invalida para compra", HttpStatus.BAD_REQUEST);
                else
                    p.amount -= payload.amount;

                productExists = true;
                productUpdated = p;
            }
        });
        
        if (!productExists)
            throw new HttpException("Produto não encontrado", HttpStatus.NOT_FOUND);
        
        await this.stocksRepository.processPurchase(products, payload.stockId);
        return productUpdated;
    }

    private AmountIsValid(products: Products[]){
        let isValid = false;

        if(products.length < 1)
            return isValid;
        
        products.forEach(p => {
            if (p.amount > 0)
                isValid = true;
        });

        return isValid;
    }
}