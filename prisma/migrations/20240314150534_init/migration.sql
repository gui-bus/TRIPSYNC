-- CreateTable
CREATE TABLE "Vacation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "countries" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isPublic" BOOLEAN NOT NULL,
    "participants" TEXT[],
    "userId" TEXT NOT NULL,

    CONSTRAINT "Vacation_pkey" PRIMARY KEY ("id")
);
