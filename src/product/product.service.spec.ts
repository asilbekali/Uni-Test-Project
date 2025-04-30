import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { PrismaService } from './../prisma/prisma.service';

describe('ProductService', () => {
  let service: ProductService;
  let prisma;

  let mockPrisma = {
    create: jest.fn,
    find: jest.fn,
    findUniqe: jest.fn,
    update: jest.fn,
    delete: jest.fn,
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
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
