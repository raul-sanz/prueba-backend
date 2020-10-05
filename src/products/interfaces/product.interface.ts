import { Document } from 'mongoose';

export interface Product extends Document {
  readonly _id: string;
  readonly NameProduct: string;
  readonly Category: string;
  readonly Description: String;
  readonly ProductQuantity: number;
  readonly Status: boolean;
  readonly TimeStamp: Date;
}
