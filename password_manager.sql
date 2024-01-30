CREATE DATABASE password_manager;

USE password_manager;

CREATE TABLE `users` (
    `idUser` INT(11) NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_general_ci',
    `password` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_general_ci',
    `email` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
    PRIMARY KEY (`idUser`) USING BTREE,
    UNIQUE INDEX `username` (`username`) USING BTREE,
    UNIQUE INDEX `email` (`email`) USING BTREE
)
    COLLATE='utf8mb4_general_ci'
    ENGINE=InnoDB
    AUTO_INCREMENT=1
;

CREATE TABLE `passwords` (
    `idPassword` INT(11) NOT NULL AUTO_INCREMENT,
    `site` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_general_ci',
    `password` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_general_ci',
    `initialisationVector` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_general_ci',
    `idUser` INT(11) NOT NULL,
    `idCategory` INT(11) NULL DEFAULT NULL,
    PRIMARY KEY (`idPassword`) USING BTREE,
    INDEX `FK_users_passwords` (`idUser`) USING BTREE,
    INDEX `FK_categories_passwords` (`idCategory`) USING BTREE,
    CONSTRAINT `FK_categories_passwords` FOREIGN KEY (`idCategory`) REFERENCES `categories` (`idCategory`) ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT `FK_users_passwords` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
    COLLATE='utf8mb4_general_ci'
    ENGINE=InnoDB
    AUTO_INCREMENT=1
;

CREATE TABLE `categories` (
    `idCategory` INT(11) NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_general_ci',
    PRIMARY KEY (`idCategory`) USING BTREE,
    UNIQUE INDEX `name` (`name`) USING BTREE
)
    COMMENT='categories'
    COLLATE='utf8mb4_general_ci'
    ENGINE=InnoDB
    AUTO_INCREMENT=1
;

INSERT INTO categories (idCategory, name) VALUES
    (1, 'Social Networks'),
    (2, 'Work'),
    (3, 'Administation'),
    (4, 'Bank'),
    (5, 'Games'),
    (6, 'Messaging'),
    (7, 'Others')
;

CREATE TRIGGER `delete_user_trigger`
    BEFORE DELETE ON `users` FOR EACH ROW
BEGIN
    DELETE FROM `passwords` WHERE `idUser` = OLD.`idUser`;
    DELETE FROM `categories` WHERE `idUser` = OLD.`idUser`;
END
