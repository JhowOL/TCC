import { Products } from "./product.dto";

export class SearchProduct{
    stockRequested: string;
    stockFound: string;
    product: Products[]
    searchPriority: number;
    daysToTransfer: number;
}