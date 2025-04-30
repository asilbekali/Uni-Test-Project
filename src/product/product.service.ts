import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from './../prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateProductDto) {
    try {
      const bazaPro = await this.prisma.product.findFirst({
        where: { name: data.name },
      });

      if (bazaPro) {
        throw new BadRequestException('Product already exists');
      } else {
        return await this.prisma.product.create({ data });
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findAll() {
    return await this.prisma.product.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.product.findFirst({ where: { id } });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return await this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.product.delete({ where: { id } });
  }
}
