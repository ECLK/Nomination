-- V2.3_NOMINATION_DB

-- MySQL dump 10.13  Distrib 8.0.12, for osx10.13 (x86_64)
--
-- Host: localhost    Database: NOMINATION_DB2
-- ------------------------------------------------------
-- Server version	8.0.12

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- create Database
CREATE DATABASE  IF NOT EXISTS NOMINATION_DB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- activate database for queries
USE NOMINATION_DB;

--
-- Table structure for table `candidate`
--

DROP TABLE IF EXISTS `candidate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `candidate` (
  `id` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nic` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` text COLLATE utf8mb4_unicode_ci,
  `occupation` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nomination_id` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Candidate_Nominations1_idx` (`nomination_id`),
  CONSTRAINT `fk_Candidate_Nominations1` FOREIGN KEY (`nomination_id`) REFERENCES `nomination` (`nomination_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidate`
--

LOCK TABLES `candidate` WRITE;
/*!40000 ALTER TABLE `candidate` DISABLE KEYS */;
INSERT INTO `candidate` VALUES ('1','henderit in voluptate velit esse c','8289191928V','ommodo consequat. Duis aute irure d','psum dolo','1'),('10',' ea commodo consequat. Duis aut','8389191928V','ommodo consequat. Duis aute irure d','ui officia','3'),('11','t nulla pariatur. Excepteur sint occaec','9289191928V','ommodo consequat. Duis aute irure d','sequat. D','3'),('12','ctetur adipiscing elit, sed do','8289191128V','ommodo consequat. Duis aute irure d','prehe','3'),('13','idunt ut labore et dolore magna a','8289191929V','ommodo consequat. Duis aute irure d','nt ut l','1'),('14','laborum.Lorem ipsum dolor sit ame','8289191238V','ommodo consequat. Duis aute irure d','ficia dese','3'),('17','mollit anim id est laborum.Lore','8289191920V','ommodo consequat. Duis aute irure d','Except','2'),('18','or in reprehenderit in voluptate vel','8289191234V','ommodo consequat. Duis aute irure d','aboris ','1'),('19','labore et dolore magna aliqua. Ut','8289191123V','ommodo consequat. Duis aute irure d',' irure d','2'),('2',' Duis aute irure dolor in reprehenderit','8289191922V','ommodo consequat. Duis aute irure d','tur. Ex','1'),('20','trud exercitation ullamco laboris ni','8289112928V','ommodo consequat. Duis aute irure d','cupidata','3'),('3','si ut aliquip ex ea commodo consequat. D','8281291928V','ommodo consequat. Duis aute irure d','t aliquip','1'),('4','tetur adipiscing elit, sed do eiusmo','8289191934V','ommodo consequat. Duis aute irure d',' ulla','3'),('5','iquip ex ea commodo consequat. Duis','8289191945V','ommodo consequat. Duis aute irure d','e cil','2'),('6','lore magna aliqua. Ut enim ad mini','8289191956V','ommodo consequat. Duis aute irure d','irure d','1'),('7','quis nostrud exercitation ulla','8289191967V','ommodo consequat. Duis aute irure d','n proident','1'),('8','ommodo consequat. Duis aute irure d','9289191920V','ommodo consequat. Duis aute irure d','enim ad mi','2'),('9','oident, sunt in culpa qui officia deser','8289191990V','ommodo consequat. Duis aute irure d','icia ','3');
/*!40000 ALTER TABLE `candidate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `election`
--

DROP TABLE IF EXISTS `election`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `election` (
  `id` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nomination_start_date` datetime DEFAULT NULL,
  `nomination_end_date` datetime DEFAULT NULL,
  `election_start_date` datetime DEFAULT NULL,
  `election_end_date` datetime DEFAULT NULL,
  `objection_start_date` datetime DEFAULT NULL,
  `objection_end_date` datetime DEFAULT NULL,
  `election_module_flag` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `election`
--

LOCK TABLES `election` WRITE;
/*!40000 ALTER TABLE `election` DISABLE KEYS */;
INSERT INTO `election` VALUES ('1','1944-07-13 11:15:12','1997-08-19 05:59:35','2028-06-08 11:00:14','1986-12-02 08:04:37','2028-02-05 15:35:44','1990-05-27 10:59:19','parliamentary'),('2','1968-10-10 09:56:19','1981-01-22 00:52:37','1977-08-23 06:48:30','1958-02-19 07:35:52','1994-06-04 16:11:03','2006-11-19 17:26:34','presidential'),('3','1951-01-04 06:24:08','1979-06-09 13:29:19','1997-06-21 04:15:59','2014-11-27 00:39:15','1996-02-07 10:16:42','2007-05-08 13:53:34','parliamentary');
/*!40000 ALTER TABLE `election` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `election_module_by_division`
--

DROP TABLE IF EXISTS `election_module_by_division`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `election_module_by_division` (
  `election_module_flag` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `division_name` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nominated_candidate_count` int(3) DEFAULT NULL,
  `division_id` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`division_id`),
  KEY `fk_election_model_idx` (`election_module_flag`),
  CONSTRAINT `fk_election_model` FOREIGN KEY (`election_module_flag`) REFERENCES `election` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `election_module_by_division`
--

LOCK TABLES `election_module_by_division` WRITE;
/*!40000 ALTER TABLE `election_module_by_division` DISABLE KEYS */;
INSERT INTO `election_module_by_division` VALUES ('1','Colombo',22,'1'),('1','Gampaha',23,'2'),('1','Kurunegala',24,'3');
/*!40000 ALTER TABLE `election_module_by_division` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nomination`
--

DROP TABLE IF EXISTS `nomination`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `nomination` (
  `nomination_id` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `election_id` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `team_id` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `division_id` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`nomination_id`),
  KEY `fk_election_id_idx` (`election_id`),
  KEY `fk_team_id_idx` (`team_id`),
  KEY `fk_division_id_idx` (`division_id`),
  CONSTRAINT `fk_division_id` FOREIGN KEY (`division_id`) REFERENCES `election_module_by_division` (`division_id`),
  CONSTRAINT `fk_election_id` FOREIGN KEY (`election_id`) REFERENCES `election` (`id`),
  CONSTRAINT `fk_team_id` FOREIGN KEY (`team_id`) REFERENCES `team` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nomination`
--

LOCK TABLES `nomination` WRITE;
/*!40000 ALTER TABLE `nomination` DISABLE KEYS */;
INSERT INTO `nomination` VALUES ('1','ngPendi','2','10','2'),('2','endingP','2','4','1'),('3','gPendin','3','6','2');
/*!40000 ALTER TABLE `nomination` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nomination_review`
--

DROP TABLE IF EXISTS `nomination_review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `nomination_review` (
  `id` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `authorized_by` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nomination_id` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_EC_approval_Nominations1_idx` (`nomination_id`),
  CONSTRAINT `fk_EC_approval_Nominations1` FOREIGN KEY (`nomination_id`) REFERENCES `nomination` (`nomination_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nomination_review`
--

LOCK TABLES `nomination_review` WRITE;
/*!40000 ALTER TABLE `nomination_review` DISABLE KEYS */;
INSERT INTO `nomination_review` VALUES ('1','. Dui','2034-03-13 19:19:19','ecat cupidatat','2'),('10','datat','2024-06-13 14:33:54','esse cillu','2'),('11','anim ','2014-11-11 06:20:09','anim id est lab','2'),('12','occae','2030-12-19 04:19:31',' nisi ut ali','3'),('13',' repr','2007-01-11 16:30:40',' ipsum dolor s','1'),('14','o eiu','1968-08-20 05:28:07','aborum.Lorem','2'),('15',' null','2031-01-14 14:51:49','epteur sint oc','1'),('16',' ea c','2033-10-05 16:18:06',' consequat.','2'),('17','a des','1963-07-26 02:08:42',' adipiscing e','2'),('18',' eius','2023-05-19 09:53:24','oluptate velit','2'),('19','venia','1997-06-10 01:14:45','aute irure ','2'),('2','sed d','1940-10-25 17:36:57','met, consectet','1'),('20',' aliq','1974-09-06 01:58:39','serunt moll','2'),('3','nulla','1966-10-30 18:19:51','llum dolore eu ','2'),('4','nim v','1946-06-05 11:00:50','n voluptate ve','3'),('5','ad mi','1976-02-22 07:36:52','ute irure dolo','1'),('6','nt in','1968-01-30 06:00:25','cillum dolore e','2'),('7','t ali','2035-09-05 10:57:37','ut labore e','1'),('8','tion ','2015-06-07 17:56:47',' eiusmod tem','2'),('9','uis n','1961-01-08 03:35:01','g elit, sed','2');
/*!40000 ALTER TABLE `nomination_review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `objection`
--

DROP TABLE IF EXISTS `objection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `objection` (
  `id` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `created_by` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nomination_id` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `objection_review` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Objections_Nominations1_idx` (`nomination_id`),
  CONSTRAINT `fk_Objections_Nominations1` FOREIGN KEY (`nomination_id`) REFERENCES `nomination` (`nomination_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `objection`
--

LOCK TABLES `objection` WRITE;
/*!40000 ALTER TABLE `objection` DISABLE KEYS */;
INSERT INTO `objection` VALUES ('1',' consectetur adipiscing e','2035-09-03 19:27:38','inim veniam,','3','ute irure dolor in reprehe'),('2',' eiusmod tempor incididunt ut labore et dolore magna aliq','1978-01-02 17:41:24','trud exercita','3',' exercitation ullamco laboris nisi ut aliq'),('3','aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliqui','2020-04-02 10:58:55','dunt ut labor','2','lamco laboris nisi ut aliquip ex '),('4','serunt mollit anim id est laborum.Lorem ipsum dolor','2025-08-07 11:32:06','pariatur. Exce','3','ore magna aliqua. Ut enim ad minim veni'),('5','a. Ut enim ad ','2001-09-23 02:17:55','t ut labore et','1','minim ve');
/*!40000 ALTER TABLE `objection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `payment` (
  `id` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `depositor` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deposit_amount` decimal(10,2) DEFAULT NULL,
  `deposite_date` datetime DEFAULT NULL,
  `uploaded_file_name` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nomination_id` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Payments_Nominations1_idx` (`nomination_id`),
  CONSTRAINT `fk_Payments_Nominations1` FOREIGN KEY (`nomination_id`) REFERENCES `nomination` (`nomination_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES ('1','t, sed do eiusm',10000.00,'2032-05-03 02:00:54','d do eiusmod','1','on pr'),('2','t non proid',60000.00,'2024-10-25 02:23:16','olor sit amet,','2','ercitation ullamco laboris '),('3',' id est labo',20000.00,'2031-05-24 15:45:26','od tempor i','3','ctetur adipiscin');
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `support_doc`
--

DROP TABLE IF EXISTS `support_doc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `support_doc` (
  `id` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `path` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `candidate_id` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_support_doc_Candidate1_idx` (`candidate_id`),
  CONSTRAINT `fk_support_doc_Candidate1` FOREIGN KEY (`candidate_id`) REFERENCES `candidate` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `support_doc`
--

LOCK TABLES `support_doc` WRITE;
/*!40000 ALTER TABLE `support_doc` DISABLE KEYS */;
INSERT INTO `support_doc` VALUES ('1','rehenderit in voluptate velit esse cillum dolore eu fugi','5'),('10','am, quis no','1'),('11',' minim ','12'),('12',' non proident, sunt in culpa qui o','20'),('13','psum ','17'),('14',' in culpa qui officia deserunt mollit anim id est l','9'),('15','met, consectetur adipisc','7'),('16',' sed do eiusmod tempor incididunt','4'),('17','rud exercitation ullamco laboris nisi ut aliq','20'),('18','pidatat non proident, sunt in culpa qui offic','5'),('19','i officia dese','18'),('2','esse cillum dolore eu','20'),('20','uat. Duis au','2'),('3','aborum.Lorem ipsu','14'),('4','tetur adipiscing ','8'),('5','mollit anim id est laborum.Lorem ipsum dolor sit amet,','14'),('6','xcepteur sint oc','12'),('7','ri','13'),('8','datat non proident, sunt in culpa qui offi','13'),('9','exercitation ullamco laboris ','6');
/*!40000 ALTER TABLE `support_doc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team`
--

DROP TABLE IF EXISTS `team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `team` (
  `id` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name_of_secratery` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address_of_secratery` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team`
--

LOCK TABLES `team` WRITE;
/*!40000 ALTER TABLE `team` DISABLE KEYS */;
INSERT INTO `team` VALUES ('1','rud exerc','ccaec','e irure','sed do eiusmod tempor incididunt ut labor'),('10','sed do ei','dent, sunt','a aliqua. Ut eni','ncididunt ut labore et dolore m'),('2','. Duis a','at non p','ollit ani','nt occaecat cupidatat non proident, sunt in c'),('3','uat. Duis','exercitat','atat non pro','olor in reprehenderit in voluptate vel'),('4','ipsum do','mco l','serunt ','n culpa qui officia deserunt mollit a'),('5','idunt','do cons','sint occaecat ','ostrud exercitation ullamco labor'),('6','iqua. ','laboris ni','tur. Except','dunt ut labore et dolore magna al'),('7','strud exe','i ut a','d tempor incidid','exercitation ullamco laboris nisi u'),('8','oident','s aute','e et dolore magna','in reprehenderit in voluptate velit es'),('9',' ut labo','im id est ','ur. Exce','sectetur adipiscing elit, sed d');
/*!40000 ALTER TABLE `team` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-11-18  1:19:01


--
-- Table structure for table `USER`
--

DROP TABLE IF EXISTS `USER`;

CREATE TABLE `USER` (
  `ID` bigint(16) NOT NULL,
  `NAME` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
