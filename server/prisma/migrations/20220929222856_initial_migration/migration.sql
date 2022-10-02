-- CreateTable
CREATE TABLE `accounts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER',
    `emailVerify` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` VARCHAR(191) NOT NULL,
    `updateAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `accounts_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `forms` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `formName` VARCHAR(191) NOT NULL,
    `hostname` VARCHAR(191) NOT NULL,
    `formEmail` VARCHAR(191) NOT NULL,
    `formEmailVerify` BOOLEAN NOT NULL DEFAULT false,
    `dnsActivated` BOOLEAN NOT NULL DEFAULT false,
    `txtRecord` VARCHAR(191) NOT NULL,
    `formActivated` BOOLEAN NOT NULL DEFAULT false,
    `formSent` INTEGER NOT NULL DEFAULT 0,
    `createdAt` VARCHAR(191) NOT NULL,
    `accountId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `options` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `subject` VARCHAR(191) NULL,
    `required` JSON NULL,
    `check` JSON NULL,
    `goBack` VARCHAR(191) NULL,
    `success` VARCHAR(191) NULL,
    `optionsActivated` BOOLEAN NULL,
    `createdAt` VARCHAR(191) NOT NULL,
    `formId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `confirm_links` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `key` VARCHAR(500) NULL,
    `kind` ENUM('verifyAccountEmail', 'verifyFormEmail', 'updateAccountEmail', 'updateFormEmail') NOT NULL,
    `payload` VARCHAR(191) NOT NULL,
    `createdAt` VARCHAR(191) NOT NULL,
    `accountId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `verification_codes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NOT NULL,
    `kind` ENUM('verifyAccountEmail', 'verifyFormEmail', 'updateAccountEmail', 'updateFormEmail') NOT NULL,
    `payload` VARCHAR(191) NOT NULL,
    `createdAt` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `verification_codes_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `forms` ADD CONSTRAINT `forms_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `accounts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `options` ADD CONSTRAINT `options_formId_fkey` FOREIGN KEY (`formId`) REFERENCES `forms`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `confirm_links` ADD CONSTRAINT `confirm_links_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `accounts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
