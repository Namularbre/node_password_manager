CREATE DATABASE password_manager;

CREATE TABLE `users` (
    `idUser` INT(11) NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_general_ci',
    `password` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_general_ci',
    `email` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
    PRIMARY KEY (`idUser`) USING BTREE,
    UNIQUE INDEX `username` (`username`) USING BTREE
)
    COLLATE='utf8mb4_general_ci'
    ENGINE=InnoDB
    AUTO_INCREMENT=6
;

CREATE TABLE `passwords` (
    `idPassword` INT(11) NOT NULL AUTO_INCREMENT,
    `site` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_general_ci',
    `password` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_general_ci',
    `initialisationVector` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_general_ci',
    `idUser` INT(11) NOT NULL,
    PRIMARY KEY (`idPassword`) USING BTREE,
    INDEX `FK_users_passwords` (`idUser`) USING BTREE,
    CONSTRAINT `FK_users_passwords` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
    COLLATE='utf8mb4_general_ci'
    ENGINE=InnoDB
    AUTO_INCREMENT=7
;
