import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Products } from '../dto/product.dto';

export type StockDocumet = Stock & Document;

@Schema()
export class Stock {
    @Prop()
    name: string;

    @Prop({ type: Object })
    products: Products
}

export const StockSchema = SchemaFactory.createForClass(Stock);