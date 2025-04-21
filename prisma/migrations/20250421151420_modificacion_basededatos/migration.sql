/*
  Warnings:

  - Added the required column `nombre_mascota` to the `Pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pets` ADD COLUMN `Status` ENUM('stray', 'adopted') NOT NULL DEFAULT 'stray',
    ADD COLUMN `nombre_mascota` VARCHAR(32) NOT NULL;
