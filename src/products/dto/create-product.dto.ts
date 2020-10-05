import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDTO {
  @ApiProperty({maxLength:150})
  @IsString()
  @IsNotEmpty()
  NameProduct: string;

  @ApiProperty({
    enum:['Bebidas', 'Limpieza', 'Botanas', 'Cremeria']
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(['Bebidas', 'Limpieza', 'Botanas', 'Cremeria'])
  Category: string;

  @ApiProperty({
    maxLength:450
  })
  @IsString()
  @IsNotEmpty()
  Description: String;

  @ApiProperty({
    minimum:0,
    maximum:100
  })
  @IsNumber()
  @IsNotEmpty()
  ProductQuantity: number;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  Status: boolean;
}
