import { IsNotEmpty, Min } from "class-validator";

export class SearchPriority{
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @Min(0)
    priority: number;

    @IsNotEmpty()
    @Min(0)
    daysToTransfer: number;
}