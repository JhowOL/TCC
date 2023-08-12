import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Stock, StockDocumet } from "./schema/stock.schema";
import { Model } from "mongoose";

@Injectable()
export class StocksRepository{
    constructor(@InjectModel(Stock.name) private userModel: Model<StockDocumet>) {}
    
    async findAll(){
        return this.userModel.find(); 
    }
}