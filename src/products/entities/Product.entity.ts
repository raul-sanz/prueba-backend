import { ApiProperty } from '@nestjs/swagger';

export class Product {
  @ApiProperty({ example: "Macbook", description: 'Name of product' })
  NameProduct: string;

  @ApiProperty({ example: "Limpieza", description: 'One of these categories: Bebidas, Limpieza, Botanas o Cremeria' })
  Category: string;

  @ApiProperty({ example: "Macbook air model 2020, color gray", description: 'Description for product' })
  Description: String;

 @ApiProperty({ example: 10, description: 'Quantity of products in store' })
  ProductQuantity: number;

  @ApiProperty({ example: true, description: 'Status for product active' })
  Status: boolean;
}