-- AlterTable
ALTER TABLE "public"."line_items" ALTER COLUMN "eventId" DROP NOT NULL,
ALTER COLUMN "source" SET DEFAULT 'SHEETS';

-- CreateTable
CREATE TABLE "public"."committee_sheets" (
    "id" SERIAL NOT NULL,
    "committeeId" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "spreadsheetId" TEXT NOT NULL,
    "dataSheetName" TEXT NOT NULL DEFAULT 'Data',
    "inputSheetName" TEXT NOT NULL DEFAULT 'Input',
    "lastSyncAt" TIMESTAMP(3),

    CONSTRAINT "committee_sheets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "committee_sheets_committeeId_idx" ON "public"."committee_sheets"("committeeId");

-- CreateIndex
CREATE UNIQUE INDEX "committee_sheets_committeeId_year_key" ON "public"."committee_sheets"("committeeId", "year");

-- AddForeignKey
ALTER TABLE "public"."committee_sheets" ADD CONSTRAINT "committee_sheets_committeeId_fkey" FOREIGN KEY ("committeeId") REFERENCES "public"."Committee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
