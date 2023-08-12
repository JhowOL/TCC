import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StockDocumet = Stock & Document;


export class Product{
    @Prop()
    name: string;
    @Prop()
    amount: number;
    @Prop()
    category: string;
}

@Schema()
export class Stock {
    @Prop()
    name: string;

    @Prop({ type: Object })
    products: Product
}

export const StockSchema = SchemaFactory.createForClass(Stock);