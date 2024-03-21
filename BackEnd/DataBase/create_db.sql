-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema graduation_project_db
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `graduation_project_db` ;

-- -----------------------------------------------------
-- Schema graduation_project_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `graduation_project_db` DEFAULT CHARACTER SET utf8 ;
USE `graduation_project_db` ;

-- -----------------------------------------------------
-- Table `graduation_project_db`.`cities`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `graduation_project_db`.`cities` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 28
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `graduation_project_db`.`features`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `graduation_project_db`.`features` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 137
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `graduation_project_db`.`regions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `graduation_project_db`.`regions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `city_id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_city_id_1_idx` (`city_id` ASC) VISIBLE,
  CONSTRAINT `fk_city_id_1`
    FOREIGN KEY (`city_id`)
    REFERENCES `graduation_project_db`.`cities` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2377
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `graduation_project_db`.`user_types`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `graduation_project_db`.`user_types` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `graduation_project_db`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `graduation_project_db`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NULL DEFAULT NULL,
  `last_name` VARCHAR(45) NULL DEFAULT NULL,
  `email` VARCHAR(100) NULL DEFAULT NULL,
  `birth_date` DATE NULL DEFAULT NULL,
  `password` VARCHAR(550) NULL DEFAULT NULL,
  `phone` VARCHAR(45) NULL DEFAULT NULL,
  `address` VARCHAR(100) NULL DEFAULT NULL,
  `profile_image_url` VARCHAR(100) NULL DEFAULT NULL,
  `id_card_image_url` VARCHAR(100) NULL DEFAULT NULL,
  `created_at` DATE NULL DEFAULT NULL,
  `user_type_id` INT NULL DEFAULT NULL,
  `region_id` INT NULL DEFAULT NULL,
  `is_deleted` TINYINT NULL DEFAULT '0',
  `gender` ENUM('female', 'male') NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_user_type1_idx` (`user_type_id` ASC) VISIBLE,
  INDEX `fk_region_id2_idx` (`region_id` ASC) VISIBLE,
  CONSTRAINT `fk_region_id2`
    FOREIGN KEY (`region_id`)
    REFERENCES `graduation_project_db`.`regions` (`id`),
  CONSTRAINT `fk_user_type1`
    FOREIGN KEY (`user_type_id`)
    REFERENCES `graduation_project_db`.`user_types` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 12
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `graduation_project_db`.`message`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `graduation_project_db`.`message` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `sender_id` INT NULL DEFAULT NULL,
  `receiver_id` INT NULL DEFAULT NULL,
  `message_body` VARCHAR(500) NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_sender_id_idx` (`sender_id` ASC) VISIBLE,
  INDEX `fk_receiver_id_idx` (`receiver_id` ASC) VISIBLE,
  CONSTRAINT `fk_receiver_id`
    FOREIGN KEY (`receiver_id`)
    REFERENCES `graduation_project_db`.`users` (`id`),
  CONSTRAINT `fk_sender_id`
    FOREIGN KEY (`sender_id`)
    REFERENCES `graduation_project_db`.`users` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 15
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `graduation_project_db`.`property_categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `graduation_project_db`.`property_categories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 22
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `graduation_project_db`.`property_statuses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `graduation_project_db`.`property_statuses` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `graduation_project_db`.`properties`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `graduation_project_db`.`properties` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NULL DEFAULT NULL,
  `price` DOUBLE NULL DEFAULT NULL,
  `description` VARCHAR(250) NULL DEFAULT NULL,
  `youtube_url` VARCHAR(250) NULL DEFAULT NULL,
  `region_id` INT NULL DEFAULT NULL,
  `created_at` DATE NULL DEFAULT NULL,
  `created_by` INT NULL DEFAULT NULL,
  `is_deleted` TINYINT NULL DEFAULT '0',
  `rooms_number` INT NULL DEFAULT NULL,
  `floors_number` INT NULL DEFAULT NULL,
  `bathrooms_number` INT NULL DEFAULT NULL,
  `latitude` DOUBLE NULL DEFAULT NULL,
  `longitude` DOUBLE NULL DEFAULT NULL,
  `property_category_id` INT NULL DEFAULT NULL,
  `property_status_id` INT NULL DEFAULT NULL,
  `image_url` VARCHAR(450) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_created_by` (`created_by` ASC) VISIBLE,
  INDEX `fk_property_category_id` (`property_category_id` ASC) VISIBLE,
  INDEX `fk_property_status_id` (`property_status_id` ASC) VISIBLE,
  INDEX `fk_region_id_idx` (`region_id` ASC) VISIBLE,
  CONSTRAINT `fk_created_by`
    FOREIGN KEY (`created_by`)
    REFERENCES `graduation_project_db`.`users` (`id`),
  CONSTRAINT `fk_property_category_id`
    FOREIGN KEY (`property_category_id`)
    REFERENCES `graduation_project_db`.`property_categories` (`id`),
  CONSTRAINT `fk_property_status_id`
    FOREIGN KEY (`property_status_id`)
    REFERENCES `graduation_project_db`.`property_statuses` (`id`),
  CONSTRAINT `fk_region_id`
    FOREIGN KEY (`region_id`)
    REFERENCES `graduation_project_db`.`regions` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `graduation_project_db`.`property_features`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `graduation_project_db`.`property_features` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `feature_id` INT NULL DEFAULT NULL,
  `property_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_property_id_idx` (`property_id` ASC) VISIBLE,
  INDEX `fk_feature_id_idx` (`feature_id` ASC) VISIBLE,
  CONSTRAINT `fk_feature_id`
    FOREIGN KEY (`feature_id`)
    REFERENCES `graduation_project_db`.`features` (`id`),
  CONSTRAINT `fk_property_id`
    FOREIGN KEY (`property_id`)
    REFERENCES `graduation_project_db`.`properties` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 21
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `graduation_project_db`.`reports`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `graduation_project_db`.`reports` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NULL DEFAULT NULL,
  `description` VARCHAR(450) NULL DEFAULT NULL,
  `created_by` INT NULL DEFAULT NULL,
  `created_at` DATE NULL DEFAULT NULL,
  `is_deleted` TINYINT NULL DEFAULT '0',
  `reported_user_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_created_by_idx1` (`created_by` ASC) VISIBLE,
  INDEX `fk_reported_user_id_idx1` (`reported_user_id` ASC) VISIBLE,
  CONSTRAINT `fk_created_by1`
    FOREIGN KEY (`created_by`)
    REFERENCES `graduation_project_db`.`users` (`id`),
  CONSTRAINT `fk_reported_user_id1`
    FOREIGN KEY (`reported_user_id`)
    REFERENCES `graduation_project_db`.`users` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `graduation_project_db`.`user_favorites`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `graduation_project_db`.`user_favorites` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NULL DEFAULT NULL,
  `property_id` INT NULL DEFAULT NULL,
  `is_deleted` TINYINT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  INDEX `bk_user_id_idx` (`user_id` ASC) VISIBLE,
  INDEX `bk_property_id_idx` (`property_id` ASC) VISIBLE,
  CONSTRAINT `bk_property_id`
    FOREIGN KEY (`property_id`)
    REFERENCES `graduation_project_db`.`properties` (`id`),
  CONSTRAINT `bk_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `graduation_project_db`.`users` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
