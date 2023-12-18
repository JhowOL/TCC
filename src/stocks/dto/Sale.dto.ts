import { IsNotEmpty, Min } from "class-validator";

export class Sale {
    @IsNotEmpty()
    stockId: string;
    @IsNotEmpty()
    productName: string;
    @IsNotEmpty()
    @Min(1)
    amount: number;
}