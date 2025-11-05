/*
  Warnings:

  - A unique constraint covering the columns `[sheetRowKey]` on the table `line_items` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "line_items_sheetRowKey_key" ON "public"."line_items"("sheetRowKey");
