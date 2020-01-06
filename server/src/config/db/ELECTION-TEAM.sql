CREATE DATABASE  IF NOT EXISTS `ELECTION-TEAM` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `ELECTION-TEAM`;
-- MySQL dump 10.13  Distrib 8.0.17, for macos10.14 (x86_64)
--
-- Host: localhost    Database: ELECTION-TEAM
-- ------------------------------------------------------
-- Server version	5.7.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `TEAM`
--

DROP TABLE IF EXISTS `TEAM`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TEAM` (
  `ID` varchar(36) NOT NULL,
  `PARTY_NAME` varchar(200) DEFAULT NULL,
  `ABBREVIATION` varchar(45) DEFAULT NULL,
  `PARTY_TYPE` varchar(100) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TEAM`
--

LOCK TABLES `TEAM` WRITE;
/*!40000 ALTER TABLE `TEAM` DISABLE KEYS */;
INSERT INTO `TEAM` VALUES ('1','New Democratic Front','NDF','RPP'),('10','Nava Sinhala Urumaya','NSU','RPP'),('11','National Development Front','NDF','RPP'),('12','National Movement for People\'s Power','NMPP','RPP'),('13','Sri Lanka Labour Party','SLLP','RPP'),('14','Jana Setha Peramuna','JSP','RPP'),('15','New Democratic Front','NDF','RPP'),('16','Frontline Socialist Party','FSP','RPP'),('17','National People\'s Party','NPP','RPP'),('18','Democratic National Movement','DNM','RPP'),('19','Ruhunu Janatha Peramuna','RJA','RPP'),('2','United People\'s Freedom Alliance','UPFA','RPP'),('20','Okkoma Wasiyo Okkoma Rajawaru Sanvidanaya','OWORS','RPP'),('21','Nationalities Unity Alliance','NUA','RPP'),('22','United National Party','UNP','RPP'),('23','Our Power of People Party','OPPP','RPP'),('24','Jathika Sangwardhena Peramuna','JSWP','RPP'),('25','Independent Candidate-01','IND01','IG'),('26','Independent Candidate-02','IND02','IG'),('27','Independent Candidate-03','IND03','IG'),('28','Independent Candidate-04','IND04','IG'),('29','Independent Candidate-05','IND05','IG'),('3','Socialist Party of Sri Lanka','SPSL','RPP'),('30','Independent Candidate-06','IND06','IG'),('31','Independent Candidate-07','IND07','IG'),('32','Independent Candidate-08','IND08','IG'),('33','Independent Candidate-09','IND09','IG'),('34','Independent Candidate-10','IND10','IG'),('35','Independent Candidate-11','IND11','IG'),('36','Independent Candidate-12','IND12','IG'),('37','Independent Candidate-13','IND13','IG'),('38','Independent Candidate-14','IND14','IG'),('39','Independent Candidate-15','IND15','IG'),('4','Ape Jana Bala Party','UNP','RPP'),('40','Our National Front','ONF','RPP'),('5','Sri Lanka Podujana Peramuna','SLPP','RPP'),('6','Democratic United National Front','DUNF','RPP'),('7','United Socialist Party','USP','RPP'),('8','Nava Sama Samaja Party','NSSP','RPP'),('9','Socialist Equality Party','SEP','RPP');
/*!40000 ALTER TABLE `TEAM` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-03 15:47:18
