import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseArrayPipe,
  Post,
  Put,
  Query,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateProductDTO } from './dto/create-product.dto';
import { ProductService } from './products.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Product } from './entities/Product.entity';
@ApiTags('Products')
@Controller('product')

export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('/create')
  @ApiBody({ type: CreateProductDTO })
  @ApiResponse({
    status: 200,
    description: 'Product created',
    type: Product,
  })
  @UsePipes(new ValidationPipe())
  async create(@Res() res, @Body() createProductDto: CreateProductDTO) {
    try {
      const product = await this.productService.create(createProductDto);
      return res.status(HttpStatus.OK).json({
        product,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: error,
      });
    }
  }

  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'All product list',
    type: [Product],
  })
  async findAll(@Res() res) {
    const products = await this.productService.findAll();
    return res.status(HttpStatus.OK).json(products);
  }

  @Get('/pagination')
  @ApiQuery({ name: 'page', description: 'Number for page' })
  @ApiResponse({
    status: 200,
    description: 'Product pagination limit 5',
    type: [Product],
  })
  async pagination(@Res() res, @Query('page') page) {
    console.log(page);
    const products = await this.productService.pagination(page);
    return res.status(HttpStatus.OK).json(products);
  }

  @Get('/find/:productId')
  @ApiParam({ name: 'productId', description: 'Product id to search for it' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Product,
  })
  async findOne(@Res() res, @Param('productId') productId) {
    const product = await this.productService.findOne(productId);
    if (!product) throw new NotFoundException('Producto no encontrado');
    return res.status(HttpStatus.OK).json({
      product,
    });
  }
  @Delete('/delete/:productId')
  @ApiParam({ name: 'productId', description: 'Product id to search for it' })
  @ApiResponse({
    status: 200,
    description: 'The found record and deleted',
    type: Product,
  })
  async delete(@Res() res, @Param('productId') productId) {
    const product = await this.productService.delete(productId);
    if (!product) throw new NotFoundException('Producto no encontrado');
    return res.status(HttpStatus.OK).json({
      product,
    });
  }

  @Put('/update/:productId')
  @ApiParam({ name: 'productId', description: 'Product id to search for it' })
  @ApiBody({ type: CreateProductDTO })
  @ApiResponse({
    status: 200,
    description: 'The found record and updated',
    type: Product,
  })
  @UsePipes(new ValidationPipe())
  async update(
    @Res() res,
    @Body() createProductDto: CreateProductDTO,
    @Param('productId') productId,
  ) {
    try {
      const product = await this.productService.update(
        productId,
        createProductDto,
      );
      return res.status(HttpStatus.OK).json({
        product,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: error,
      });
    }
  }
}
