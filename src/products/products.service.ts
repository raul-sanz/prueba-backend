import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './interfaces/product.interface';
import { CreateProductDTO } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private productModel: Model<Product>) {}

  async findAll(): Promise<Product[]> {
    const products = await this.productModel.find();
    return products;
  }

  async pagination(skip: string): Promise<Product[]> {
    const products = await this.productModel
      .find()
      .skip(Number(skip) == 1 ? 0 : (Number(skip) - 1) * 5)
      .limit(5);
    return products;
  }

  async findOne(productId: string): Promise<Product> {
    const product = await this.productModel.findById(productId);
    return product;
  }

  async create(createProductDto: CreateProductDTO): Promise<Product> {
    const product = new this.productModel(createProductDto);
    await product.save();
    return product;
  }

  async update(
    productId: string,
    createProductDto: CreateProductDTO,
  ): Promise<Product> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      productId,
      createProductDto,
      { new: true },
    );
    return updatedProduct;
  }

  async delete(productId: string): Promise<Product> {
    const deletedProduct = await this.productModel.findByIdAndDelete(productId);
    return deletedProduct;
  }
}
