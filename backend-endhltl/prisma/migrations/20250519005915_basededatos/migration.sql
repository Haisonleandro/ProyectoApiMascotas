-- CreateTable
CREATE TABLE `Users` (
    `identificacion` BIGINT NOT NULL,
    `fullname` VARCHAR(32) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `rol` ENUM('admin', 'usuario') NOT NULL DEFAULT 'admin',

    UNIQUE INDEX `Users_identificacion_key`(`identificacion`),
    UNIQUE INDEX `Users_email_key`(`email`),
    PRIMARY KEY (`identificacion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Races` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(32) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(32) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Genders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(32) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pets` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `race_id` INTEGER NOT NULL,
    `category_id` INTEGER NOT NULL,
    `gender_id` INTEGER NOT NULL,
    `User_id` BIGINT NOT NULL,
    `estado` ENUM('Disponible', 'Adoptado') NOT NULL DEFAULT 'Disponible',
    `latitude` DOUBLE NULL,
    `longitude` DOUBLE NULL,
    `name` VARCHAR(30) NOT NULL,
    `photo` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pets` ADD CONSTRAINT `Pets_User_id_fkey` FOREIGN KEY (`User_id`) REFERENCES `Users`(`identificacion`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pets` ADD CONSTRAINT `Pets_race_id_fkey` FOREIGN KEY (`race_id`) REFERENCES `Races`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pets` ADD CONSTRAINT `Pets_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pets` ADD CONSTRAINT `Pets_gender_id_fkey` FOREIGN KEY (`gender_id`) REFERENCES `Genders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
