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

  CREATE TABLE `product` (
  `productID` int NOT NULL AUTO_INCREMENT,
  `productName` varchar(45) NOT NULL,
  `price` decimal(5,2) NOT NULL,
  `inventory` int DEFAULT NULL,
  `description` varchar(1500) DEFAULT NULL,
  `imagePath` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`productID`),
  UNIQUE KEY `productID_UNIQUE` (`productID`));

CREATE TABLE IF NOT EXISTS `supawdb`.`inCategory` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `catID` INT NOT NULL,
  `productID` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `catID_idx` (`catID` ASC) VISIBLE,
  INDEX `productID_idx` (`productID` ASC) VISIBLE,
  CONSTRAINT `catID`
    FOREIGN KEY (`catID`)
    REFERENCES `supawdb`.`category` (`categoryID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `productID`
    FOREIGN KEY (`productID`)
    REFERENCES `supawdb`.`product` (`productID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

CREATE TABLE IF NOT EXISTS `supawdb`.`purchase` (
  `purchaseID` INT NOT NULL AUTO_INCREMENT,
  `user` INT NOT NULL,
  `product` INT NOT NULL,
  `quantity` INT NOT NULL,
  `purchaseTime` DATETIME NOT NULL,
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
  `reviewID` int NOT NULL AUTO_INCREMENT,
  `userID` int NOT NULL,
  `productID` int NOT NULL,
  `reviewText` varchar(200) DEFAULT NULL,
  `rating` int NOT NULL,
  `reviewcol` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`reviewID`),
  UNIQUE KEY `reviewID_UNIQUE` (`reviewID`),
  KEY `user_idx` (`userID`),
  KEY `product_idx` (`productID`),
  CONSTRAINT `product` FOREIGN KEY (`productID`) REFERENCES `product` (`productID`),
  CONSTRAINT `user` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`)
  );

  CREATE TABLE IF NOT EXISTS `supawdb`.`edits` (
  `editID` int NOT NULL AUTO_INCREMENT,
  `userID` int NOT NULL,
  `prodID` int NOT NULL,
  `editType` varchar(45) NOT NULL,
  `editTime` datetime NOT NULL,
  PRIMARY KEY (`editID`),
  UNIQUE KEY `editID_UNIQUE` (`editID`),
  KEY `userID_idx` (`userID`),
  KEY `prodID_idx` (`prodID`),
  CONSTRAINT `adminID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `changedProductID` FOREIGN KEY (`prodID`) REFERENCES `product` (`productID`) ON DELETE CASCADE ON UPDATE CASCADE
);

