import { Schema, Types } from 'mongoose';

export const ProductSchema = new Schema({
  NameProduct: {
    type: String,
    required: true,
    maxlength: 150,
  },
  Category: {
    type: String,
    required: true,
    enum: ['Bebidas', 'Limpieza', 'Botanas', 'Cremeria'],
  },
  Description: {
    type: String,
    required: true,
    maxlength: 150,
  },
  ProductQuantity: {
    type: Number,
    min: 0,
    max: 100,
    required: true,
  },
  Status: {
    type: Boolean,
    required: true,
  },
  TimeStamp: {
    type: Date,
    default: Date.now,
  },
});

