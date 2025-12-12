-- CreateEnum
CREATE TYPE "Role" AS ENUM ('MAMAN', 'ACCOMPAGNANT', 'ADMIN');

-- CreateEnum
CREATE TYPE "ChecklistType" AS ENUM ('TROUSSEAU', 'DOCUMENTS', 'PROJET_NAISSANCE');

-- CreateEnum
CREATE TYPE "FoodStatus" AS ENUM ('RECOMMANDE', 'A_EVITER', 'MODERE');

-- CreateEnum
CREATE TYPE "BabyPhotoCategory" AS ENUM ('ECHOGRAPHIE', 'VENTRE', 'MOMENT', 'AUTRE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT,
    "role" "Role" NOT NULL DEFAULT 'MAMAN',
    "firstName" TEXT,
    "lastName" TEXT,
    "birthDate" TIMESTAMP(3),
    "language" TEXT DEFAULT 'fr',
    "theme" TEXT DEFAULT 'light',
    "highContrast" BOOLEAN DEFAULT false,
    "textToSpeech" BOOLEAN DEFAULT false,
    "pregnancyStart" TIMESTAMP(3),
    "pregnancyDue" TIMESTAMP(3),
    "pregnancyRisk" TEXT DEFAULT 'normal',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Checklist" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "ChecklistType" NOT NULL,
    "progression" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Checklist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChecklistSection" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "checklistId" TEXT NOT NULL,

    CONSTRAINT "ChecklistSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChecklistItem" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "checked" BOOLEAN NOT NULL DEFAULT false,
    "custom" BOOLEAN NOT NULL DEFAULT false,
    "sectionId" TEXT NOT NULL,

    CONSTRAINT "ChecklistItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "kind" TEXT NOT NULL,
    "location" TEXT,
    "doctor" TEXT,
    "notes" TEXT,
    "reminderSent" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeightEntry" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "WeightEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SymptomEntry" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "intensity" INTEGER NOT NULL,

    CONSTRAINT "SymptomEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExamEntry" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "kind" TEXT NOT NULL,
    "result" TEXT,
    "fileUrl" TEXT,

    CONSTRAINT "ExamEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContractionEntry" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "durationSec" INTEGER NOT NULL,

    CONSTRAINT "ContractionEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BabyEvolution" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "week" INTEGER NOT NULL,
    "weightEstimate" INTEGER,
    "heightEstimate" DOUBLE PRECISION,
    "note" TEXT,

    CONSTRAINT "BabyEvolution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Food" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "status" "FoodStatus" NOT NULL,
    "description" TEXT,
    "risks" TEXT,
    "benefits" TEXT,

    CONSTRAINT "Food_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Maternity" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "phone" TEXT,
    "visitingHours" TEXT,
    "requiredDocuments" TEXT,
    "tips" TEXT,

    CONSTRAINT "Maternity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Faq" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "tags" TEXT,
    "language" TEXT NOT NULL DEFAULT 'fr',

    CONSTRAINT "Faq_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resource" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "category" TEXT,
    "language" TEXT NOT NULL DEFAULT 'fr',

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Album" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Photo" (
    "id" TEXT NOT NULL,
    "albumId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "caption" TEXT,
    "takenAt" TIMESTAMP(3),
    "category" "BabyPhotoCategory" NOT NULL DEFAULT 'AUTRE',
    "location" TEXT,
    "favorite" BOOLEAN NOT NULL DEFAULT false,
    "inMemoryBook" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemoryBook" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT,
    "pdfUrl" TEXT,
    "generatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "shareable" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "MemoryBook_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Checklist_userId_type_key" ON "Checklist"("userId", "type");

-- AddForeignKey
ALTER TABLE "Checklist" ADD CONSTRAINT "Checklist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChecklistSection" ADD CONSTRAINT "ChecklistSection_checklistId_fkey" FOREIGN KEY ("checklistId") REFERENCES "Checklist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChecklistItem" ADD CONSTRAINT "ChecklistItem_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "ChecklistSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeightEntry" ADD CONSTRAINT "WeightEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SymptomEntry" ADD CONSTRAINT "SymptomEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamEntry" ADD CONSTRAINT "ExamEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContractionEntry" ADD CONSTRAINT "ContractionEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BabyEvolution" ADD CONSTRAINT "BabyEvolution_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Maternity" ADD CONSTRAINT "Maternity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemoryBook" ADD CONSTRAINT "MemoryBook_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
