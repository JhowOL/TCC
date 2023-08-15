import { IsNotEmpty, Min, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class LastPurchase {
    @IsNotEmpty()
    @Min(1)
    amount: number;
    @IsNotEmpty()
    @Min(0.01)
    unitaryPrice: number;
    @IsNotEmpty()
    date: Date;
}

export class Products {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    amount: number;
    @IsNotEmpty()
    category: string;
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => LastPurchase)
    lastPurchase: LastPurchase;
}