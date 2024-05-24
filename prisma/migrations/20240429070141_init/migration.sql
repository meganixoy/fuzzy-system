-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stamp" (
    "id" SERIAL NOT NULL,
    "essentials" TEXT[],
    "food" TEXT[],
    "services" TEXT[],
    "userId" TEXT NOT NULL,

    CONSTRAINT "Stamp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tenant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "code" INTEGER NOT NULL,

    CONSTRAINT "Tenant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Claim" (
    "id" SERIAL NOT NULL,
    "essentials" BOOLEAN NOT NULL DEFAULT false,
    "essentialsUpdatedAt" TIMESTAMP(3),
    "food" BOOLEAN NOT NULL DEFAULT false,
    "foodUpdatedAt" TIMESTAMP(3),
    "services" BOOLEAN NOT NULL DEFAULT false,
    "servicesUpdatedAt" TIMESTAMP(3),
    "grand" BOOLEAN NOT NULL DEFAULT false,
    "grandUpdatedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,

    CONSTRAINT "Claim_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_id_isVerified_idx" ON "User"("id", "isVerified");

-- CreateIndex
CREATE UNIQUE INDEX "Stamp_userId_key" ON "Stamp"("userId");

-- CreateIndex
CREATE INDEX "Stamp_userId_idx" ON "Stamp"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Tenant_url_key" ON "Tenant"("url");

-- CreateIndex
CREATE INDEX "Tenant_name_url_category_code_idx" ON "Tenant"("name", "url", "category", "code");

-- CreateIndex
CREATE UNIQUE INDEX "Claim_userId_key" ON "Claim"("userId");

-- CreateIndex
CREATE INDEX "Claim_userId_essentials_food_services_idx" ON "Claim"("userId", "essentials", "food", "services");

-- AddForeignKey
ALTER TABLE "Stamp" ADD CONSTRAINT "Stamp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Claim" ADD CONSTRAINT "Claim_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
