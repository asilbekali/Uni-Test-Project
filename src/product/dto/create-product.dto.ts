import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'Product name',
    example: 'Samsung A53 5G',
  })
  name: string;

  @ApiProperty({
    description: 'Product price',
    example: 7800000,
  })
  price: number;

  @ApiProperty({
    description: 'Product description',
    example:
      'This phone many people like because this phone good worked in pubg game',
  })
  desc: string;
}
