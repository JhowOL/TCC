import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StockDocumet = Stock & Document;

@Schema()
export class Stock {
    @Prop()
    name: string;
}

export const StockSchema = SchemaFactory.createForClass(Stock);