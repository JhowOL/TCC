import { Controller, Get, Param } from "@nestjs/common";
import { ProductsService } from "../services/products.service";
import { Products } from "../dto/product.dto";

@Controller('products')
export class ProductsController {
    constructor(private readonly productsServices: ProductsService) {}

    @Get('/:stockId')
    async getStockProducts(@Param('stockId') stockId): Promise<Products>{
        return this.productsServices.getStockProducts(stockId)
    }
}