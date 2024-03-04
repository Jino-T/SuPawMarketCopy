CREATE TABLE IF NOT EXISTS `supawdb`.`user` (
  `userID` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  `isAdmin` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`userID`),
  UNIQUE INDEX `userID_UNIQUE` (`userID` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE);

CREATE TABLE IF NOT EXISTS `supawdb`.`address` (
  `addressID` INT NOT NULL AUTO_INCREMENT,
  `line1` VARCHAR(45) NOT NULL,
  `line2` VARCHAR(45) NULL,
  `city` VARCHAR(45) NOT NULL,
  `state` VARCHAR(45) NOT NULL,
  `zip` INT NOT NULL,
  PRIMARY KEY (`addressID`),
  UNIQUE INDEX `addressID_UNIQUE` (`addressID` ASC) VISIBLE);

CREATE TABLE IF NOT EXISTS `supawdb`.`category` (
  `categoryID` INT NOT NULL AUTO_INCREMENT,
  `categoryName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`categoryID`),
  UNIQUE INDEX `categoryID_UNIQUE` (`categoryID` ASC) VISIBLE);

  CREATE TABLE IF NOT EXISTS `supawdb`.`product` (
  `productID` INT NOT NULL AUTO_INCREMENT,
  `productName` varchar(45) NOT NULL,
  `price` DECIMAL(2) NOT NULL,
  `inventory` INT NULL,
  `description` VARCHAR(1500) NULL,
  `imagePath` VARCHAR(45) NULL,
  PRIMARY KEY (`productID`),
  UNIQUE INDEX `productID_UNIQUE` (`productID` ASC) VISIBLE);

CREATE TABLE IF NOT EXISTS `supawdb`.`inCategory` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `catID` INT NOT NULL,
  `prodID` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `catID_idx` (`catID` ASC) VISIBLE,
  INDEX `prodID_idx` (`prodID` ASC) VISIBLE,
  CONSTRAINT `catID`
    FOREIGN KEY (`catID`)
    REFERENCES `supawdb`.`category` (`categoryID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `prodID`
    FOREIGN KEY (`prodID`)
    REFERENCES `supawdb`.`product` (`productID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

CREATE TABLE IF NOT EXISTS `supawdb`.`purchase` (
  `purchaseID` INT NOT NULL AUTO_INCREMENT,
  `user` INT NOT NULL,
  `product` INT NOT NULL,
  `quantity` INT NOT NULL,
  `purchsaseTime` DATETIME NOT NULL,
  PRIMARY KEY (`purchaseID`),
  UNIQUE INDEX `purchaseID_UNIQUE` (`purchaseID` ASC) VISIBLE,
  INDEX `userID_idx` (`user` ASC) VISIBLE,
  INDEX `productID_idx` (`product` ASC) VISIBLE,
  CONSTRAINT `userID`
    FOREIGN KEY (`user`)
    REFERENCES `supawdb`.`user` (`userID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `productID`
    FOREIGN KEY (`product`)
    REFERENCES `supawdb`.`product` (`productID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

CREATE TABLE IF NOT EXISTS `supawdb`.`userAddress` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user` INT NOT NULL,
  `address` INT NOT NULL,
  `addressType` VARCHAR(8) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `userID_idx` (`user` ASC) VISIBLE,
  INDEX `addressID_idx` (`address` ASC) VISIBLE,
  CONSTRAINT `idUser`
    FOREIGN KEY (`user`)
    REFERENCES `supawdb`.`user` (`userID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `addressID`
    FOREIGN KEY (`address`)
    REFERENCES `supawdb`.`address` (`addressID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE IF NOT EXISTS `supawdb`.`review` (
  `reviewID` INT NOT NULL AUTO_INCREMENT,
  `userID` INT NOT NULL,
  `productID` INT NOT NULL,
  `starRating` FLOAT NOT NULL,
  `body` VARCHAR(1500) NOT NULL,
  PRIMARY KEY (`reviewID`),
  UNIQUE INDEX `reviewID_UNIQUE` (`reviewID` ASC) VISIBLE,
  INDEX `userID_idx` (`user` ASC) VISIBLE,
  INDEX `productID_idx` (`product` ASC) VISIBLE,
  CONSTRAINT `userID`
    FOREIGN KEY (`userID`)
    REFERENCES `supawdb`.`userID` (`userID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `productID`
    FOREIGN KEY (`product`)
    REFERENCES `supawdb`.`product` (`productID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);