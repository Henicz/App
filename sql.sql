CREATE TABLE `codestructure`.`subscriptions` (
  `id` INT NOT NULL,
  `subscriptionName` VARCHAR(45) NOT NULL,
  `subscriptionId` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;
