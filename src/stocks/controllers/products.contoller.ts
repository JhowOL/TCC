import { Controller, Get, Param } from "@nestjs/common";
import { ProductsService } from "../services/products.service";
import { Product } from "../schema/stock.schema";

@Controller('products')
export class ProductsController {
    constructor(private readonly productsServices: ProductsService) {}

    @Get('/:stockId')
    async getStockProducts(@Param('stockId') stockId): Promise<Product>{
        return this.productsServices.getStockProducts(stockId)
    }
}