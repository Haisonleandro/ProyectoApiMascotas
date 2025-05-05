-- CreateTable
CREATE TABLE `Users` (
    `users_id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullname` VARCHAR(32) NOT NULL,
    `email` VARCHAR(32) NOT NULL,
    `password` VARCHAR(64) NOT NULL,

    PRIMARY KEY (`users_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pets` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `races_id` INTEGER NOT NULL,
    `category_id` INTEGER NOT NULL,
    `photo` VARCHAR(64) NOT NULL,
    `genders_id_fk` INTEGER NOT NULL,
    `users_id_fk` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `category_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(32) NOT NULL,

    PRIMARY KEY (`category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Races` (
    `races_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(32) NOT NULL,

    PRIMARY KEY (`races_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Genders` (
    `genders_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(32) NOT NULL,

    PRIMARY KEY (`genders_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pets` ADD CONSTRAINT `Pets_races_id_fkey` FOREIGN KEY (`races_id`) REFERENCES `Races`(`races_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pets` ADD CONSTRAINT `Pets_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`category_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pets` ADD CONSTRAINT `Pets_users_id_fk_fkey` FOREIGN KEY (`users_id_fk`) REFERENCES `Users`(`users_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pets` ADD CONSTRAINT `Pets_genders_id_fk_fkey` FOREIGN KEY (`genders_id_fk`) REFERENCES `Genders`(`genders_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
