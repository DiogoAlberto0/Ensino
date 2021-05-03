-- MySQL Script generated by MySQL Workbench
-- qui 04 mar 2021 12:58:32
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema escolasnoopy
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema escolasnoopy
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `escolasnoopy` ;
USE `escolasnoopy` ;

-- -----------------------------------------------------
-- Table `escolasnoopy`.`Diretor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `escolasnoopy`.`Diretor` (
  `idDiretor` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nomeDiretor` VARCHAR(100) NOT NULL,
  `CPF` VARCHAR(11) NOT NULL,
  `EMAIL` VARCHAR(50) NOT NULL,
  `TELEFONE` VARCHAR(14) NOT NULL,
  PRIMARY KEY (`idDiretor`),
  UNIQUE INDEX `idDiretor_UNIQUE` (`idDiretor` ASC) VISIBLE,
  UNIQUE INDEX `CPF_UNIQUE` (`CPF` ASC) VISIBLE,
  UNIQUE INDEX `EMAIL_UNIQUE` (`EMAIL` ASC) VISIBLE,
  UNIQUE INDEX `TELEFONE_UNIQUE` (`TELEFONE` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `escolasnoopy`.`Coordenador`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `escolasnoopy`.`Coordenador` (
  `idCoordenador` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `NOME` VARCHAR(100) NOT NULL,
  `TELEFONE` VARCHAR(14) NOT NULL,
  `EMAIL` VARCHAR(50) NOT NULL,
  `CPF` VARCHAR(11) NOT NULL,
  `Diretor_idDiretor` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`idCoordenador`, `Diretor_idDiretor`),
  UNIQUE INDEX `idCoordenador_UNIQUE` (`idCoordenador` ASC) VISIBLE,
  UNIQUE INDEX `CPF_UNIQUE` (`CPF` ASC) VISIBLE,
  UNIQUE INDEX `EMAIL_UNIQUE` (`EMAIL` ASC) VISIBLE,
  UNIQUE INDEX `TELEFONE_UNIQUE` (`TELEFONE` ASC) VISIBLE,
  INDEX `fk_Coordenador_Diretor1_idx` (`Diretor_idDiretor` ASC) VISIBLE,
  CONSTRAINT `fk_Coordenador_Diretor1`
    FOREIGN KEY (`Diretor_idDiretor`)
    REFERENCES `escolasnoopy`.`Diretor` (`idDiretor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `escolasnoopy`.`Secretario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `escolasnoopy`.`Secretario` (
  `idSecretario` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `NOME` VARCHAR(100) NOT NULL,
  `CPF` VARCHAR(11) NOT NULL,
  `EMAIL` VARCHAR(50) NOT NULL,
  `TELEFONE` VARCHAR(14) NOT NULL,
  `Diretor_idDiretor` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`idSecretario`, `Diretor_idDiretor`),
  UNIQUE INDEX `idCoordenador_UNIQUE` (`idSecretario` ASC) VISIBLE,
  UNIQUE INDEX `CPF_UNIQUE` (`CPF` ASC) VISIBLE,
  UNIQUE INDEX `EMAIL_UNIQUE` (`EMAIL` ASC) VISIBLE,
  INDEX `fk_Secretario_Diretor1_idx` (`Diretor_idDiretor` ASC) VISIBLE,
  UNIQUE INDEX `TELEFONE_UNIQUE` (`TELEFONE` ASC) VISIBLE,
  CONSTRAINT `fk_Secretario_Diretor1`
    FOREIGN KEY (`Diretor_idDiretor`)
    REFERENCES `escolasnoopy`.`Diretor` (`idDiretor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `escolasnoopy`.`Professor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `escolasnoopy`.`Professor` (
  `idProfessor` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `NOME` VARCHAR(100) NOT NULL,
  `CPF` VARCHAR(11) NOT NULL,
  `EMAIL` VARCHAR(50) NOT NULL,
  `TELEFONE` VARCHAR(14) NOT NULL,
  `Diretor_idDiretor` INT UNSIGNED NOT NULL,
  `Coordenador_idCoordenador` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`idProfessor`, `Diretor_idDiretor`, `Coordenador_idCoordenador`),
  UNIQUE INDEX `idCoordenador_UNIQUE` (`idProfessor` ASC) VISIBLE,
  UNIQUE INDEX `CPF_UNIQUE` (`CPF` ASC) VISIBLE,
  UNIQUE INDEX `EMAIL_UNIQUE` (`EMAIL` ASC) VISIBLE,
  INDEX `fk_Professor_Diretor1_idx` (`Diretor_idDiretor` ASC) VISIBLE,
  INDEX `fk_Professor_Coordenador1_idx` (`Coordenador_idCoordenador` ASC) VISIBLE,
  UNIQUE INDEX `TELEFONE_UNIQUE` (`TELEFONE` ASC) VISIBLE,
  CONSTRAINT `fk_Professor_Diretor1`
    FOREIGN KEY (`Diretor_idDiretor`)
    REFERENCES `escolasnoopy`.`Diretor` (`idDiretor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Professor_Coordenador1`
    FOREIGN KEY (`Coordenador_idCoordenador`)
    REFERENCES `escolasnoopy`.`Coordenador` (`idCoordenador`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `escolasnoopy`.`Pais`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `escolasnoopy`.`Pais` (
  `idPais` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `NOME` VARCHAR(100) NOT NULL,
  `CPF` VARCHAR(11) NOT NULL,
  `EMAIL` VARCHAR(50) NOT NULL,
  `Endereco` VARCHAR(50) NOT NULL,
  `Coordenador_idCoordenador` INT UNSIGNED NOT NULL,
  `TELEFONE1` VARCHAR(14) NOT NULL,
  `TELEFONE2` VARCHAR(45) NULL,
  PRIMARY KEY (`idPais`, `Coordenador_idCoordenador`),
  UNIQUE INDEX `idPais_UNIQUE` (`idPais` ASC) VISIBLE,
  UNIQUE INDEX `CPF_UNIQUE` (`CPF` ASC) VISIBLE,
  UNIQUE INDEX `EMAIL_UNIQUE` (`EMAIL` ASC) VISIBLE,
  INDEX `fk_Pais_Coordenador1_idx` (`Coordenador_idCoordenador` ASC) VISIBLE,
  UNIQUE INDEX `TELEFONE1_UNIQUE` (`TELEFONE1` ASC) VISIBLE,
  CONSTRAINT `fk_Pais_Coordenador1`
    FOREIGN KEY (`Coordenador_idCoordenador`)
    REFERENCES `escolasnoopy`.`Coordenador` (`idCoordenador`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `escolasnoopy`.`Turma`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `escolasnoopy`.`Turma` (
  `idTurma` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `NOME` VARCHAR(45) NOT NULL,
  `ANO` VARCHAR(4) NOT NULL,
  `SALA` VARCHAR(4) NOT NULL,
  PRIMARY KEY (`idTurma`),
  UNIQUE INDEX `idTurma_UNIQUE` (`idTurma` ASC) VISIBLE,
  UNIQUE INDEX `SALA_UNIQUE` (`SALA` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `escolasnoopy`.`Alunos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `escolasnoopy`.`Alunos` (
  `idAlunos` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `NOME` VARCHAR(100) NOT NULL,
  `CPF` VARCHAR(11) NULL,
  `tipoSanguineo` VARCHAR(2) NOT NULL,
  `planoSaude` VARCHAR(30) NULL,
  `hospital` VARCHAR(45) NULL,
  `Pais_idPais` INT UNSIGNED NOT NULL,
  `Pais_Coordenador_idCoordenador` INT UNSIGNED NOT NULL,
  `Turma_idTurma` INT UNSIGNED NOT NULL,
  `Secretario_idSecretario` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`idAlunos`, `Pais_idPais`, `Pais_Coordenador_idCoordenador`, `Turma_idTurma`, `Secretario_idSecretario`),
  UNIQUE INDEX `idAlunos_UNIQUE` (`idAlunos` ASC) VISIBLE,
  UNIQUE INDEX `CPF_UNIQUE` (`CPF` ASC) VISIBLE,
  INDEX `fk_Alunos_Pais1_idx` (`Pais_idPais` ASC, `Pais_Coordenador_idCoordenador` ASC) VISIBLE,
  INDEX `fk_Alunos_Turma1_idx` (`Turma_idTurma` ASC) VISIBLE,
  INDEX `fk_Alunos_Secretario1_idx` (`Secretario_idSecretario` ASC) VISIBLE,
  CONSTRAINT `fk_Alunos_Pais1`
    FOREIGN KEY (`Pais_idPais` , `Pais_Coordenador_idCoordenador`)
    REFERENCES `escolasnoopy`.`Pais` (`idPais` , `Coordenador_idCoordenador`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Alunos_Turma1`
    FOREIGN KEY (`Turma_idTurma`)
    REFERENCES `escolasnoopy`.`Turma` (`idTurma`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Alunos_Secretario1`
    FOREIGN KEY (`Secretario_idSecretario`)
    REFERENCES `escolasnoopy`.`Secretario` (`idSecretario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `escolasnoopy`.`Aula`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `escolasnoopy`.`Aula` (
  `idAula` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `NOME` VARCHAR(50) NOT NULL,
  `MATERIA` VARCHAR(30) NOT NULL,
  `LINK` VARCHAR(200) NOT NULL,
  `Professor_idProfessor` INT UNSIGNED NOT NULL,
  `Turma_idTurma` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`idAula`, `Professor_idProfessor`, `Turma_idTurma`),
  UNIQUE INDEX `idAula_UNIQUE` (`idAula` ASC) VISIBLE,
  UNIQUE INDEX `LINK_UNIQUE` (`LINK` ASC) VISIBLE,
  INDEX `fk_Aula_Professor1_idx` (`Professor_idProfessor` ASC) VISIBLE,
  INDEX `fk_Aula_Turma1_idx` (`Turma_idTurma` ASC) VISIBLE,
  CONSTRAINT `fk_Aula_Professor1`
    FOREIGN KEY (`Professor_idProfessor`)
    REFERENCES `escolasnoopy`.`Professor` (`idProfessor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Aula_Turma1`
    FOREIGN KEY (`Turma_idTurma`)
    REFERENCES `escolasnoopy`.`Turma` (`idTurma`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `escolasnoopy`.`Mensalidade`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `escolasnoopy`.`Mensalidade` (
  `idMensalidade` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `Valor` VARCHAR(7) NOT NULL,
  `Data` DATE NOT NULL,
  `Secretario_idSecretario` INT UNSIGNED NOT NULL,
  `Pais_idPais` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`idMensalidade`, `Secretario_idSecretario`, `Pais_idPais`),
  UNIQUE INDEX `idMensalidade_UNIQUE` (`idMensalidade` ASC) VISIBLE,
  INDEX `fk_Mensalidade_Secretario1_idx` (`Secretario_idSecretario` ASC) VISIBLE,
  INDEX `fk_Mensalidade_Pais1_idx` (`Pais_idPais` ASC) VISIBLE,
  CONSTRAINT `fk_Mensalidade_Secretario1`
    FOREIGN KEY (`Secretario_idSecretario`)
    REFERENCES `escolasnoopy`.`Secretario` (`idSecretario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Mensalidade_Pais1`
    FOREIGN KEY (`Pais_idPais`)
    REFERENCES `escolasnoopy`.`Pais` (`idPais`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
