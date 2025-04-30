import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { PrismaService } from './../prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';

describe('ProductService', () => {
  let service: ProductService;
  let prisma;

  const mockPrisma = {
    product: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findFirst: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a product', async () => {
    const dto = { name: 'test pro', price: 2500, desc: 'test' };
    const createdProduct = { id: 1, ...dto };

    prisma.product.findFirst.mockResolvedValue(null);
    prisma.product.create.mockResolvedValue(createdProduct);

    const result = await service.create(dto);

    expect(result).toEqual(createdProduct);
    expect(prisma.product.create).toHaveBeenCalledWith({ data: dto });
  });

  it('should find all products', async () => {
    const products = [
      { id: 1, name: 'data1', price: 2500, desc: 'desc1' },
      { id: 2, name: 'data2', price: 3500, desc: 'desc2' },
    ];

    prisma.product.findMany.mockResolvedValue(products);

    const result = await service.findAll();

    expect(result).toEqual(products);
    expect(prisma.product.findMany).toHaveBeenCalled();
  });

  it('should find a product by id', async () => {
    const product = { id: '1', name: 'test', price: 2500, desc: 'test desc' };

    prisma.product.findFirst.mockResolvedValue(product);

    const result = await service.findOne('1');

    expect(result).toEqual(product);
    expect(prisma.product.findFirst).toHaveBeenCalledWith({
      where: { id: '1' },
    });
  });

  it('should return null if product not found', async () => {
    const id = 'non-existing-id';

    prisma.product.findFirst.mockResolvedValue(null);

    const result = await service.findOne(id);

    expect(result).toBeNull();
    expect(prisma.product.findFirst).toHaveBeenCalledWith({ where: { id } });
  });

  it('should update a product', async () => {
    const id = '1';
    const updateData = {
      name: 'updated name',
      price: 3000,
      desc: 'updated desc',
    };
    const updatedProduct = { id, ...updateData };

    prisma.product.update.mockResolvedValue(updatedProduct);

    const result = await service.update(id, updateData);

    expect(result).toEqual(updatedProduct);
    expect(prisma.product.update).toHaveBeenCalledWith({
      where: { id },
      data: updateData,
    });
  });

  it('should delete a product', async () => {
    const id = '1';
    const deletedProduct = {
      id,
      name: 'deleted product',
      price: 1000,
      desc: 'deleted desc',
    };

    prisma.product.delete.mockResolvedValue(deletedProduct);

    const result = await service.remove(id);

    expect(result).toEqual(deletedProduct);
    expect(prisma.product.delete).toHaveBeenCalledWith({ where: { id } });
  });
});
