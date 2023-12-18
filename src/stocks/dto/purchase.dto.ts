import { IsNotEmpty, Min } from "class-validator";

export class Purchase {
    @IsNotEmpty()
    stockId: string;
    @IsNotEmpty()
    productName: string;
    @IsNotEmpty()
    @Min(1)
    amount: number;
}