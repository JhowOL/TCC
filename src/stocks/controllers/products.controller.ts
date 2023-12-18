import { Controller, Get, Post, Param, Body, Query } from "@nestjs/common";
import { ProductsService } from "../services/products.service";
import { Products } from "../dto/product.dto";
import { CreateProducts } from "../dto/createProduct.dto";
import { Stock } from "../schema/stock.schema";
import { SearchProduct } from "../dto/SearchProduct.dto";

@Controller('products')
export class ProductsController {
    constructor(private readonly productsServices: ProductsService) { }

    @Get('/:stockId')
    async getStockProducts(@Param('stockId') stockId): Promise<Products[]> {
        return this.productsServices.getStockProducts(stockId);
    }

    @Post()
    async addProductToStock(@Body() payload: CreateProducts): Promise<Products[]> {
        return this.productsServices.addProductToStock(payload);
    }

    @Get('/product/:stockId')
    async GetProduct(@Query('name') name: string, @Param('stockId') stockId): Promise<SearchProduct> {
        return await this.productsServices.getProduct(name, stockId);
    }
}