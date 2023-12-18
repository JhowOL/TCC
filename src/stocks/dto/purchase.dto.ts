import { IsNotEmpty, ValidateNested } from "class-validator"
import { Type } from "class-transformer"
import { LastPurchase } from "./product.dto"

export class Purchase{
    @IsNotEmpty()
    stockId: string;
    @IsNotEmpty()
    productName: string;
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => LastPurchase)
    purchase: LastPurchase;
}