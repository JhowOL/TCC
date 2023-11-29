import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Products } from '../dto/product.dto';
import { SearchPriority } from '../dto/searchPriority.dto';

export type StockDocumet = Stock & Document;

@Schema({versionKey: false})
export class Stock {
    @Prop()
    name: string;

    @Prop({ type: [Object] })
    products: Products[]

    @Prop({ type:[Object] })
    searchPriority: SearchPriority[]
}

export const StockSchema = SchemaFactory.createForClass(Stock);