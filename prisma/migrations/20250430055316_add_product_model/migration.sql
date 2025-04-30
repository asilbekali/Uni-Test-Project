-- CreateTable
CREATE TABLE "product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "desc" TEXT NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);
