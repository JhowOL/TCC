import { IsNotEmpty, ValidateNested } from "class-validator"
import { Products } from "./product.dto"
import { Type } from "class-transformer";

export class CreateProducts {
    @IsNotEmpty()
    stockId: string;
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => Products)
    products: Products[];
}