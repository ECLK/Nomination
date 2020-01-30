CREATE DATABASE  IF NOT EXISTS `EC_NOMINATION` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `EC_NOMINATION`;
-- MySQL dump 10.13  Distrib 8.0.17, for macos10.14 (x86_64)
--
-- Host: localhost    Database: EC_NOMINATION
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
-- Table structure for table `CANDIDATE`
--

DROP TABLE IF EXISTS `CANDIDATE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CANDIDATE` (
  `ID` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `FULL_NAME` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PREFERRED_NAME` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `NIC` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DATE_OF_BIRTH` bigint(20) DEFAULT NULL,
  `GENDER` varchar(6) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ADDRESS` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `OCCUPATION` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ELECTORAL_DIVISION_NAME` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ELECTORAL_DIVISION_CODE` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `COUNSIL_NAME` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `NOMINATION_ID` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `NOMINATION_ID` (`NOMINATION_ID`),
  CONSTRAINT `CANDIDATE_ibfk_1` FOREIGN KEY (`NOMINATION_ID`) REFERENCES `nomination` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CANDIDATE`
--

LOCK TABLES `CANDIDATE` WRITE;
/*!40000 ALTER TABLE `CANDIDATE` DISABLE KEYS */;
INSERT INTO `CANDIDATE` VALUES ('23a8b1a5-cab6-4c34-ae74-304156b90066','yujith','isura','923457890V',692409600000,'MALE','colombo3','se','kalutara','K01','council','fdada61e-844d-4492-8456-29c9cabd5059'),('2574a604-47e8-4396-bb59-c30c159047dd','Yujith','isura','19923456789V',692323200000,'MALE','No15,\nFinance wattha,ingiriya','se','kalutara','K01','council','87b3821f-1e7b-4925-83da-2808dd022a76'),('59fe1995-10a9-4cb1-a408-0ccbc9f12c5c','yujith','isura','19912870790',1577404800000,'MALE','colombo ','se','kalutara','K01','council','1caeee86-e183-4aed-aab4-a579f9aa2c86'),('9b796584-a0be-420a-9bb5-4a5ce3f5a9ef','yujith','isura','19923456789',689817600000,'MALE','No15,\nFinance wattha','se','kalutara','K01','council','45439c8d-a360-4d29-9cfe-226434727523');
/*!40000 ALTER TABLE `CANDIDATE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CANDIDATE_CONFIG`
--

DROP TABLE IF EXISTS `CANDIDATE_CONFIG`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CANDIDATE_CONFIG` (
  `ID` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `KEY_NAME` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DESCRIPTION` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CANDIDATE_CONFIG`
--

LOCK TABLES `CANDIDATE_CONFIG` WRITE;
/*!40000 ALTER TABLE `CANDIDATE_CONFIG` DISABLE KEYS */;
INSERT INTO `CANDIDATE_CONFIG` VALUES ('1','FULL_NAME','Name Of Candidate (Full Name)'),('2','PREFERRED_NAME','Preferred Name'),('3','NIC','National Identity Card (NIC)'),('4','DATE_OF_BIRTH','Date of Birth'),('5','GENDER','Gender'),('6','ADDRESS','Address'),('7','OCCUPATION','Occupation');
/*!40000 ALTER TABLE `CANDIDATE_CONFIG` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CANDIDATE_CONFIG_DATA`
--

DROP TABLE IF EXISTS `CANDIDATE_CONFIG_DATA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CANDIDATE_CONFIG_DATA` (
  `ID` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `MODULE_ID` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CANDIDATE_CONFIG_ID` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `MODULE_ID` (`MODULE_ID`),
  KEY `CANDIDATE_CONFIG_ID` (`CANDIDATE_CONFIG_ID`),
  CONSTRAINT `CANDIDATE_CONFIG_DATA_ibfk_1` FOREIGN KEY (`MODULE_ID`) REFERENCES `election_module` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `CANDIDATE_CONFIG_DATA_ibfk_2` FOREIGN KEY (`CANDIDATE_CONFIG_ID`) REFERENCES `candidate_config` (`ID`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CANDIDATE_CONFIG_DATA`
--

LOCK TABLES `CANDIDATE_CONFIG_DATA` WRITE;
/*!40000 ALTER TABLE `CANDIDATE_CONFIG_DATA` DISABLE KEYS */;
INSERT INTO `CANDIDATE_CONFIG_DATA` VALUES ('083ca8ca-fbc0-452b-86df-d0eaba2a6288','0531e799-deb4-47fd-be06-bc3527d67da9','1'),('1962d450-5b02-44ab-9c26-991cec9493c2','0a349bd9-27e4-46b1-b31e-5a862bf7aefd','7'),('23f32221-b7eb-4462-8e38-9d4926d5182c','632a9e4b-501b-4410-96a4-b2ca7c20286f','2'),('25813e02-558c-4bee-9f31-6be6c5bb5605','904ae2d4-3239-43ef-976c-97c046aecaaa','2'),('2a5e6b30-d3c6-427d-ae18-187077a39b7b','0531e799-deb4-47fd-be06-bc3527d67da9','3'),('45fe145d-a570-465a-9411-1f108386c390','0531e799-deb4-47fd-be06-bc3527d67da9','2'),('578df291-2d6a-429b-8c2f-bb6346771e34','0a349bd9-27e4-46b1-b31e-5a862bf7aefd','1'),('6703c5c9-6e8c-443e-a57c-c4ea03e478be','a5ddccd2-7b5d-4feb-9d15-109fabdbab0a','6'),('6f3070db-8de6-49b0-a412-27e8e41f3eca','632a9e4b-501b-4410-96a4-b2ca7c20286f','4'),('6fb7a795-c3b3-4b50-9b53-e85f37186619','0a349bd9-27e4-46b1-b31e-5a862bf7aefd','2'),('718d7b1c-b41b-4701-b07e-d2c29811dd13','a5ddccd2-7b5d-4feb-9d15-109fabdbab0a','1'),('77d4df1b-c9cb-4955-ae35-99ddcaf3b888','0531e799-deb4-47fd-be06-bc3527d67da9','6'),('84f49e55-b8bf-4bdd-ad8c-a15e1732016c','0a349bd9-27e4-46b1-b31e-5a862bf7aefd','5'),('8d0452f7-bfb6-436b-8b3d-e1d514b88c3a','c4468657-6084-4013-ab4a-3ed218bd652a','1'),('9c0c96b2-c91a-426f-86b1-8a362e2a2b55','a5ddccd2-7b5d-4feb-9d15-109fabdbab0a','2'),('9ec6eddd-d5da-4483-90f2-0cca0978c66c','632a9e4b-501b-4410-96a4-b2ca7c20286f','5'),('a9312c0b-0417-4290-afe4-237c2dfc1ec7','0a349bd9-27e4-46b1-b31e-5a862bf7aefd','3'),('b3b79f42-2baf-4e23-a4f6-3943a5be41b8','904ae2d4-3239-43ef-976c-97c046aecaaa','3'),('b9b43265-2229-4047-81d3-6ca275c2d7b7','632a9e4b-501b-4410-96a4-b2ca7c20286f','1'),('bb33421a-c68c-4b97-84f3-19389d2f4b42','632a9e4b-501b-4410-96a4-b2ca7c20286f','6'),('c4e8690c-2a2a-416d-baad-6e855acceded','632a9e4b-501b-4410-96a4-b2ca7c20286f','7'),('e0c96df3-d387-4bfc-aed9-d2942b53d505','0a349bd9-27e4-46b1-b31e-5a862bf7aefd','4'),('eb6ae724-211c-4585-8adc-e0e2cb829526','904ae2d4-3239-43ef-976c-97c046aecaaa','1'),('ebc09ff1-add6-4240-98cf-1a83ea6bc8b5','a5ddccd2-7b5d-4feb-9d15-109fabdbab0a','5'),('ef1de176-4323-4810-bf33-2475a206402c','0531e799-deb4-47fd-be06-bc3527d67da9','4'),('f435f5ea-183a-441f-80b3-8f0982051a3d','632a9e4b-501b-4410-96a4-b2ca7c20286f','3'),('f4561cde-f260-420c-988c-fb97d8658e2a','0a349bd9-27e4-46b1-b31e-5a862bf7aefd','6'),('fd4a26b0-927a-4a91-990a-26d916633fb9','0531e799-deb4-47fd-be06-bc3527d67da9','5');
/*!40000 ALTER TABLE `CANDIDATE_CONFIG_DATA` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CANDIDATE_DATA`
--

DROP TABLE IF EXISTS `CANDIDATE_DATA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CANDIDATE_DATA` (
  `ID` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CANDIDATE_CONFIG_ID` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `VALUE` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `NOMINATION_ID` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  KEY `CANDIDATE_DATA_FK` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CANDIDATE_DATA`
--

LOCK TABLES `CANDIDATE_DATA` WRITE;
/*!40000 ALTER TABLE `CANDIDATE_DATA` DISABLE KEYS */;
/*!40000 ALTER TABLE `CANDIDATE_DATA` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CANDIDATE_SUPPORT_DOC`
--

DROP TABLE IF EXISTS `CANDIDATE_SUPPORT_DOC`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CANDIDATE_SUPPORT_DOC` (
  `ID` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ORIGINAL_NAME` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FILE_PATH` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `SUPPORT_DOC_CONFIG_ID` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CANDIDATE_ID` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `NOMINATION_ID` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `STATUS` enum('NEW','DELETE') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `SUPPORT_DOC_CONFIG_ID` (`SUPPORT_DOC_CONFIG_ID`),
  KEY `CANDIDATE_ID` (`CANDIDATE_ID`),
  KEY `NOMINATION_ID` (`NOMINATION_ID`),
  CONSTRAINT `CANDIDATE_SUPPORT_DOC_ibfk_1` FOREIGN KEY (`SUPPORT_DOC_CONFIG_ID`) REFERENCES `support_doc_config` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `CANDIDATE_SUPPORT_DOC_ibfk_2` FOREIGN KEY (`CANDIDATE_ID`) REFERENCES `candidate` (`ID`) ON UPDATE CASCADE,
  CONSTRAINT `CANDIDATE_SUPPORT_DOC_ibfk_3` FOREIGN KEY (`NOMINATION_ID`) REFERENCES `nomination` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CANDIDATE_SUPPORT_DOC`
--

LOCK TABLES `CANDIDATE_SUPPORT_DOC` WRITE;
/*!40000 ALTER TABLE `CANDIDATE_SUPPORT_DOC` DISABLE KEYS */;
INSERT INTO `CANDIDATE_SUPPORT_DOC` VALUES ('a9acb33f-7191-4bc2-a44e-3c3044797d35','high-level-architecture-nomination.png','104352242ca356a62fe9d73083267f7e','ff4c6768-bdbe-4a16-b680-5fecb6b1f747','23a8b1a5-cab6-4c34-ae74-304156b90066','fdada61e-844d-4492-8456-29c9cabd5059','NEW');
/*!40000 ALTER TABLE `CANDIDATE_SUPPORT_DOC` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DIVISION_CONFIG`
--

DROP TABLE IF EXISTS `DIVISION_CONFIG`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DIVISION_CONFIG` (
  `ID` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `NAME` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CODE` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `NO_OF_CANDIDATES` int(5) NOT NULL,
  `MODULE_ID` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `MODULE_ID` (`MODULE_ID`),
  CONSTRAINT `DIVISION_CONFIG_ibfk_1` FOREIGN KEY (`MODULE_ID`) REFERENCES `election_module` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DIVISION_CONFIG`
--

LOCK TABLES `DIVISION_CONFIG` WRITE;
/*!40000 ALTER TABLE `DIVISION_CONFIG` DISABLE KEYS */;
INSERT INTO `DIVISION_CONFIG` VALUES ('5ba6aa8f-8a74-4812-8a4c-2c9ae3f750c1','Country','01',1,'904ae2d4-3239-43ef-976c-97c046aecaaa'),('6f390a4e-7695-4775-bc63-bca21b36eca7','Sri lanka','01',1,'0a349bd9-27e4-46b1-b31e-5a862bf7aefd'),('8915ff54-bc93-47fd-a011-7d250e371c66','Country','1',1,'a5ddccd2-7b5d-4feb-9d15-109fabdbab0a'),('bee486ca-d3b8-456e-8313-a8d8937d1616','sri lanka','01',1,'0531e799-deb4-47fd-be06-bc3527d67da9'),('e5ddf7b8-ff32-4564-9161-601a18176ca4','Sri Lanka','01',1,'632a9e4b-501b-4410-96a4-b2ca7c20286f'),('fbb31cc2-6941-481b-9061-ec62db2657eb','Country','1',1,'c4468657-6084-4013-ab4a-3ed218bd652a');
/*!40000 ALTER TABLE `DIVISION_CONFIG` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DIVISION_CONFIG_DATA`
--

DROP TABLE IF EXISTS `DIVISION_CONFIG_DATA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DIVISION_CONFIG_DATA` (
  `ELECTION_ID` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `DIVISION_CONFIG_ID` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `SELECT_FLAG` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`ELECTION_ID`,`DIVISION_CONFIG_ID`),
  KEY `DIVISION_CONFIG_ID` (`DIVISION_CONFIG_ID`),
  CONSTRAINT `DIVISION_CONFIG_DATA_ibfk_1` FOREIGN KEY (`ELECTION_ID`) REFERENCES `election` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `DIVISION_CONFIG_DATA_ibfk_2` FOREIGN KEY (`DIVISION_CONFIG_ID`) REFERENCES `division_config` (`ID`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DIVISION_CONFIG_DATA`
--

LOCK TABLES `DIVISION_CONFIG_DATA` WRITE;
/*!40000 ALTER TABLE `DIVISION_CONFIG_DATA` DISABLE KEYS */;
/*!40000 ALTER TABLE `DIVISION_CONFIG_DATA` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ELECTION`
--

DROP TABLE IF EXISTS `ELECTION`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ELECTION` (
  `ID` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `NAME` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CREATED_BY` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CREATED_AT` bigint(20) DEFAULT NULL,
  `UPDATED_AT` bigint(20) DEFAULT NULL,
  `MODULE_ID` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `MODULE_ID` (`MODULE_ID`),
  CONSTRAINT `ELECTION_ibfk_1` FOREIGN KEY (`MODULE_ID`) REFERENCES `election_module` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ELECTION`
--

LOCK TABLES `ELECTION` WRITE;
/*!40000 ALTER TABLE `ELECTION` DISABLE KEYS */;
INSERT INTO `ELECTION` VALUES ('11384edf-00d8-40e3-8d31-ed40f6f290fb','Presidential 2021','admin',1575962638000,1575962638000,'0531e799-deb4-47fd-be06-bc3527d67da9'),('3a40e484-b236-4531-8efa-00e36de8c82e','test election1','admin',1576661894000,1576823962000,'904ae2d4-3239-43ef-976c-97c046aecaaa'),('4add46f4-17bd-4285-aea6-2d402c5d3853','Presidential 2023','admin',1576146167000,1576146167000,'632a9e4b-501b-4410-96a4-b2ca7c20286f'),('64d0b8d7-c779-4037-94b7-26f3a4d0d6f2','asd','admin',1580364095000,1580364525000,'632a9e4b-501b-4410-96a4-b2ca7c20286f'),('76172c1e-3db8-4b84-8fe3-ad31918e870b','PRE NEW','admin',1577945646000,1577945646000,'632a9e4b-501b-4410-96a4-b2ca7c20286f'),('7d9c17ce-522e-4ae2-bd69-24a692781790','Presidential 2020','admin',1575959411000,1575959411000,'0a349bd9-27e4-46b1-b31e-5a862bf7aefd'),('833135b8-e990-4aea-badf-1522b747473a','Presidential 2019','admin',1575888870000,1575888885000,'632a9e4b-501b-4410-96a4-b2ca7c20286f'),('c482b797-2298-4dc2-89a0-5629f34fe1be','pre testing1','admin',1577424942000,1577425044000,'632a9e4b-501b-4410-96a4-b2ca7c20286f');
/*!40000 ALTER TABLE `ELECTION` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ELECTION_APPROVAL`
--

DROP TABLE IF EXISTS `ELECTION_APPROVAL`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ELECTION_APPROVAL` (
  `ID` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `STATUS` enum('PENDING','APPROVE','REJECT') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `APPROVED_BY` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `APPROVED_AT` bigint(20) DEFAULT NULL,
  `UPDATED_AT` bigint(20) DEFAULT NULL,
  `ELECTION_ID` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `REVIEW_NOTE` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`ID`),
  KEY `ELECTION_ID` (`ELECTION_ID`),
  CONSTRAINT `ELECTION_APPROVAL_ibfk_1` FOREIGN KEY (`ELECTION_ID`) REFERENCES `election` (`ID`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ELECTION_APPROVAL`
--

LOCK TABLES `ELECTION_APPROVAL` WRITE;
/*!40000 ALTER TABLE `ELECTION_APPROVAL` DISABLE KEYS */;
INSERT INTO `ELECTION_APPROVAL` VALUES ('0bef5591-d70f-4e43-a04a-2c2614af85db','APPROVE','admin',1575888885000,1576649090000,'833135b8-e990-4aea-badf-1522b747473a',''),('11361b89-8872-4f19-a746-c5a741c5c877','APPROVE','admin',1577425044000,1577425214000,'c482b797-2298-4dc2-89a0-5629f34fe1be','s'),('20a079b6-b1bd-4b24-be8f-f5e7a1ca4e81','APPROVE','admin',1575962638000,1577336765000,'11384edf-00d8-40e3-8d31-ed40f6f290fb','d'),('4808777b-6a9b-480b-89eb-bb6a77ec6fde','APPROVE','admin',1575959411000,1575959540000,'7d9c17ce-522e-4ae2-bd69-24a692781790','done'),('aef4a53a-7621-491e-8b0b-dacea79971fb','PENDING','admin',1580364525000,1580364525000,'64d0b8d7-c779-4037-94b7-26f3a4d0d6f2',NULL),('b122b094-c4d8-45c4-a558-36b158866147','APPROVE','admin',1576146167000,1576146197000,'4add46f4-17bd-4285-aea6-2d402c5d3853','approved'),('bef2518f-766c-4dd5-b50c-55f24251d48c','PENDING','admin',1576823962000,1576823962000,'3a40e484-b236-4531-8efa-00e36de8c82e',NULL),('e5bd2924-122e-4179-baaf-043e32e52bf7','APPROVE','admin',1577945646000,1577945742000,'76172c1e-3db8-4b84-8fe3-ad31918e870b','done');
/*!40000 ALTER TABLE `ELECTION_APPROVAL` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ELECTION_CONFIG`
--

DROP TABLE IF EXISTS `ELECTION_CONFIG`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ELECTION_CONFIG` (
  `ID` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `KEY_NAME` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DESCRIPTION` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ELECTION_CONFIG`
--

LOCK TABLES `ELECTION_CONFIG` WRITE;
/*!40000 ALTER TABLE `ELECTION_CONFIG` DISABLE KEYS */;
INSERT INTO `ELECTION_CONFIG` VALUES ('1','candidate payment','payment pert candidate'),('2','weightageVoteBased','weightage vote'),('3','weightagePrefarenceBased','weightage prefarence');
/*!40000 ALTER TABLE `ELECTION_CONFIG` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ELECTION_CONFIG_DATA`
--

DROP TABLE IF EXISTS `ELECTION_CONFIG_DATA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ELECTION_CONFIG_DATA` (
  `ID` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `VALUE` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ELECTION_CONFIG_ID` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ELECTION_ID` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ELECTION_CONFIG_ID` (`ELECTION_CONFIG_ID`),
  KEY `ELECTION_ID` (`ELECTION_ID`),
  CONSTRAINT `ELECTION_CONFIG_DATA_ibfk_1` FOREIGN KEY (`ELECTION_CONFIG_ID`) REFERENCES `election_config` (`ID`) ON UPDATE CASCADE,
  CONSTRAINT `ELECTION_CONFIG_DATA_ibfk_2` FOREIGN KEY (`ELECTION_ID`) REFERENCES `election` (`ID`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ELECTION_CONFIG_DATA`
--

LOCK TABLES `ELECTION_CONFIG_DATA` WRITE;
/*!40000 ALTER TABLE `ELECTION_CONFIG_DATA` DISABLE KEYS */;
/*!40000 ALTER TABLE `ELECTION_CONFIG_DATA` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ELECTION_MODULE`
--

DROP TABLE IF EXISTS `ELECTION_MODULE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ELECTION_MODULE` (
  `ID` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `NAME` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `DIVISION_COMMON_NAME` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CREATED_BY` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CREATED_AT` bigint(20) DEFAULT NULL,
  `UPDATED_AT` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ELECTION_MODULE`
--

LOCK TABLES `ELECTION_MODULE` WRITE;
/*!40000 ALTER TABLE `ELECTION_MODULE` DISABLE KEYS */;
INSERT INTO `ELECTION_MODULE` VALUES ('0531e799-deb4-47fd-be06-bc3527d67da9','Presidential3','Country','admin',1575962336,1575962336),('0a349bd9-27e4-46b1-b31e-5a862bf7aefd','Presidential2','Country','admin',1575959230,1575959230),('632a9e4b-501b-4410-96a4-b2ca7c20286f','Presidential','Country','admin',1575888063,1575888081000),('904ae2d4-3239-43ef-976c-97c046aecaaa','test1','Country','admin',1576647399,1576647399),('a5ddccd2-7b5d-4feb-9d15-109fabdbab0a','testing1','Country','admin',1576825835,1577422751000),('c4468657-6084-4013-ab4a-3ed218bd652a','test2','Country','admin',1576647515,1576647515);
/*!40000 ALTER TABLE `ELECTION_MODULE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ELECTION_MODULE_APPROVAL`
--

DROP TABLE IF EXISTS `ELECTION_MODULE_APPROVAL`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ELECTION_MODULE_APPROVAL` (
  `ID` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `STATUS` enum('PENDING','APPROVE','REJECT') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `APPROVED_BY` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `APPROVED_AT` bigint(20) DEFAULT NULL,
  `UPDATED_AT` bigint(20) DEFAULT NULL,
  `REVIEW_NOTE` text COLLATE utf8mb4_unicode_ci,
  `MODULE_ID` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `MODULE_ID` (`MODULE_ID`),
  CONSTRAINT `ELECTION_MODULE_APPROVAL_ibfk_1` FOREIGN KEY (`MODULE_ID`) REFERENCES `election_module` (`ID`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ELECTION_MODULE_APPROVAL`
--

LOCK TABLES `ELECTION_MODULE_APPROVAL` WRITE;
/*!40000 ALTER TABLE `ELECTION_MODULE_APPROVAL` DISABLE KEYS */;
INSERT INTO `ELECTION_MODULE_APPROVAL` VALUES ('1ee3391b-41d9-43ab-8568-636ae7755b0c','APPROVE','admin',1575888063,1577082842000,'','632a9e4b-501b-4410-96a4-b2ca7c20286f'),('57e29768-3659-4ca7-b4e2-642893f2c1b3','APPROVE','admin',1576647399,1576647424000,'','904ae2d4-3239-43ef-976c-97c046aecaaa'),('5c2eebf6-9ab0-4199-af48-be03c5949af5','APPROVE','admin',1576647515,1576647527000,'ss','c4468657-6084-4013-ab4a-3ed218bd652a'),('84b8bab0-f0e6-4579-a18f-16822d443a75','APPROVE','admin',1575959230,1576825657000,'','0a349bd9-27e4-46b1-b31e-5a862bf7aefd'),('a46d9695-918e-4805-ae71-3907395cc477','APPROVE','admin',1575962336,1577080577000,'','0531e799-deb4-47fd-be06-bc3527d67da9'),('e7fd295e-c538-45c3-834e-04581996affb','PENDING','admin',1576825835,1577422751000,'','a5ddccd2-7b5d-4feb-9d15-109fabdbab0a');
/*!40000 ALTER TABLE `ELECTION_MODULE_APPROVAL` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ELECTION_MODULE_CONFIG`
--

DROP TABLE IF EXISTS `ELECTION_MODULE_CONFIG`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ELECTION_MODULE_CONFIG` (
  `ID` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `KEY_NAME` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DESCRIPTION` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ELECTION_MODULE_CONFIG`
--

LOCK TABLES `ELECTION_MODULE_CONFIG` WRITE;
/*!40000 ALTER TABLE `ELECTION_MODULE_CONFIG` DISABLE KEYS */;
INSERT INTO `ELECTION_MODULE_CONFIG` VALUES ('123213','candidate payment rpp','candidate payment amount for rpp'),('1232132','candidate payment ig','candidate payment amount for ig'),('1243123','nomination submission by',NULL),('142343242343','create allayance',NULL),('15990459-2ea4-413f-b1f7-29a138fd7a97','cal type',NULL),('234433','weightagePrefarenceBased',NULL),('2345234234','authorityRemarks',NULL),('2353453','authority',NULL),('253454355','objection allowed',NULL),('324324','weightageVoteBased',NULL),('fe2c2d7e-66de-406a-b887-1143023f8e54','pay allowed ig','security deposit ig'),('fe2c2d7e-66de-406a-b887-1143023f8e72','pay allowed rpp','security deposit rpp'),('ff4c6768-bdbe-4a16-b680-5fecb6b1f747','test',NULL);
/*!40000 ALTER TABLE `ELECTION_MODULE_CONFIG` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ELECTION_MODULE_CONFIG_DATA`
--

DROP TABLE IF EXISTS `ELECTION_MODULE_CONFIG_DATA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ELECTION_MODULE_CONFIG_DATA` (
  `ID` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `VALUE` text COLLATE utf8mb4_unicode_ci,
  `ELECTION_MODULE_CONFIG_ID` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `MODULE_ID` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `MODULE_ID` (`MODULE_ID`),
  KEY `ELECTION_MODULE_CONFIG_ID` (`ELECTION_MODULE_CONFIG_ID`),
  CONSTRAINT `ELECTION_MODULE_CONFIG_DATA_ibfk_1` FOREIGN KEY (`MODULE_ID`) REFERENCES `election_module` (`ID`) ON UPDATE CASCADE,
  CONSTRAINT `ELECTION_MODULE_CONFIG_DATA_ibfk_2` FOREIGN KEY (`ELECTION_MODULE_CONFIG_ID`) REFERENCES `election_module_config` (`ID`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ELECTION_MODULE_CONFIG_DATA`
--

LOCK TABLES `ELECTION_MODULE_CONFIG_DATA` WRITE;
/*!40000 ALTER TABLE `ELECTION_MODULE_CONFIG_DATA` DISABLE KEYS */;
INSERT INTO `ELECTION_MODULE_CONFIG_DATA` VALUES ('038d7171-0d0f-4c9c-9520-55192f7cdb41','vote_and_prefrence','15990459-2ea4-413f-b1f7-29a138fd7a97','632a9e4b-501b-4410-96a4-b2ca7c20286f'),('051fadac-b41e-46e3-9585-047d57a59fb8','No','fe2c2d7e-66de-406a-b887-1143023f8e72','904ae2d4-3239-43ef-976c-97c046aecaaa'),('06341a1e-eebb-4558-844b-e0c889c172a1','vote_and_prefrence','15990459-2ea4-413f-b1f7-29a138fd7a97','0531e799-deb4-47fd-be06-bc3527d67da9'),('08e98f15-ed04-4dc1-a243-669bc0e2a7d1','Yes','fe2c2d7e-66de-406a-b887-1143023f8e54','632a9e4b-501b-4410-96a4-b2ca7c20286f'),('10de7586-9697-46ad-9e8a-527b8e67b140','Independent Group Leader','1243123','0531e799-deb4-47fd-be06-bc3527d67da9'),('111dbae5-2f16-43f6-a440-268c4875b1aa','No','fe2c2d7e-66de-406a-b887-1143023f8e72','c4468657-6084-4013-ab4a-3ed218bd652a'),('20eddbfd-d04d-4921-9b05-3ad90e19d655','50000','123213','0a349bd9-27e4-46b1-b31e-5a862bf7aefd'),('216f548a-7e4b-4168-b4e9-8c92718cb409','75000','1232132','632a9e4b-501b-4410-96a4-b2ca7c20286f'),('23b144fc-b5f2-4fef-a95d-c9f4f9a0bdbe','Allowed','253454355','0531e799-deb4-47fd-be06-bc3527d67da9'),('35945e9b-9b7f-4aa7-8dd2-5db2dcbbed18','75000','1232132','0531e799-deb4-47fd-be06-bc3527d67da9'),('3fefb7f1-5d44-441f-be3a-52ca11851ca4','NotAllowed','253454355','a5ddccd2-7b5d-4feb-9d15-109fabdbab0a'),('4361a410-9e92-4e04-ade4-923cb7019200','Party Secretory','1243123','904ae2d4-3239-43ef-976c-97c046aecaaa'),('4a51ccd1-18e7-42a0-bb76-502257618655','Yes','fe2c2d7e-66de-406a-b887-1143023f8e54','a5ddccd2-7b5d-4feb-9d15-109fabdbab0a'),('4d9c3af3-1f7a-455b-ad59-3eb540e14d90','Yes','fe2c2d7e-66de-406a-b887-1143023f8e72','0531e799-deb4-47fd-be06-bc3527d67da9'),('52861fb6-1688-43d0-a48c-2f596725ea6f','vote_and_prefrence','15990459-2ea4-413f-b1f7-29a138fd7a97','904ae2d4-3239-43ef-976c-97c046aecaaa'),('560789f3-9e28-4e86-9b8e-0526af6abcac','Party Secretory','1243123','632a9e4b-501b-4410-96a4-b2ca7c20286f'),('5e9433ea-8487-4c04-9ef6-bf380ddef65f','Yes','fe2c2d7e-66de-406a-b887-1143023f8e54','0a349bd9-27e4-46b1-b31e-5a862bf7aefd'),('6015bb44-570f-414c-b698-f729b9aef1e2','vote_and_prefrence','15990459-2ea4-413f-b1f7-29a138fd7a97','0a349bd9-27e4-46b1-b31e-5a862bf7aefd'),('60cabed4-9f79-4a86-b92e-8b313b6f40c1','NotAllowed','142343242343','c4468657-6084-4013-ab4a-3ed218bd652a'),('6767aa04-ae87-459b-8a40-453000eb59c6','Yes','fe2c2d7e-66de-406a-b887-1143023f8e54','0531e799-deb4-47fd-be06-bc3527d67da9'),('707ed21a-8d2b-4176-a1e6-612230034a48','No','fe2c2d7e-66de-406a-b887-1143023f8e54','c4468657-6084-4013-ab4a-3ed218bd652a'),('74ebe5c9-35b3-42cf-9a8d-9889639001a2','Independent Group Leader','1243123','904ae2d4-3239-43ef-976c-97c046aecaaa'),('7b76e7e1-9aef-4182-840b-78dc9a90bf59','Independent Group Leader','1243123','c4468657-6084-4013-ab4a-3ed218bd652a'),('80fdc829-2d14-4658-8cf0-b208fd81e0e9','50000','123213','0531e799-deb4-47fd-be06-bc3527d67da9'),('86885696-9f4f-4d5c-b5c5-69d85fcca189','Allowed','142343242343','0531e799-deb4-47fd-be06-bc3527d67da9'),('8ee6f279-a705-4b9e-907c-8e73214aa07a','Allowed','253454355','0a349bd9-27e4-46b1-b31e-5a862bf7aefd'),('936de440-249c-4679-aa70-36a5465cad7a','NotAllowed','253454355','904ae2d4-3239-43ef-976c-97c046aecaaa'),('988650da-deba-4b14-a128-215941c29bdc','Party Secretory','1243123','0531e799-deb4-47fd-be06-bc3527d67da9'),('9c8d2f94-f496-4403-b567-dacb966e5c42','Allowed','142343242343','0a349bd9-27e4-46b1-b31e-5a862bf7aefd'),('a16befa0-cf3a-4a34-beed-f3b2139211b7','No','fe2c2d7e-66de-406a-b887-1143023f8e72','a5ddccd2-7b5d-4feb-9d15-109fabdbab0a'),('a16c4f08-a49f-4d07-9706-30ef199318cf','Independent Group Leader','1243123','a5ddccd2-7b5d-4feb-9d15-109fabdbab0a'),('a283e9cf-4e68-463d-918b-3f38aae37e72','75000','1232132','a5ddccd2-7b5d-4feb-9d15-109fabdbab0a'),('aa41ef41-a83f-41a1-bce0-1a4d2e685be5','vote_and_prefrence','15990459-2ea4-413f-b1f7-29a138fd7a97','c4468657-6084-4013-ab4a-3ed218bd652a'),('b3f22034-de10-4f1d-91ab-cca02db47ff1','pure_prefrence_based','15990459-2ea4-413f-b1f7-29a138fd7a97','a5ddccd2-7b5d-4feb-9d15-109fabdbab0a'),('b6706f06-c180-470d-8a40-0fc273e6c3f9','Independent Group Leader','1243123','0a349bd9-27e4-46b1-b31e-5a862bf7aefd'),('b9564087-bb4b-42c8-b625-b15a82062cc9','NotAllowed','142343242343','a5ddccd2-7b5d-4feb-9d15-109fabdbab0a'),('c42571ef-fdef-4d7e-8f65-c6cc4409799d','Yes','fe2c2d7e-66de-406a-b887-1143023f8e72','632a9e4b-501b-4410-96a4-b2ca7c20286f'),('c4810bfa-ae1c-498d-b48f-ba77c4d068c8','NotAllowed','142343242343','632a9e4b-501b-4410-96a4-b2ca7c20286f'),('c6602939-27a1-442b-8055-0070ee44908e','Party Secretory','1243123','0a349bd9-27e4-46b1-b31e-5a862bf7aefd'),('dec9367c-fa18-4637-993a-e15d7b76fa89','Yes','fe2c2d7e-66de-406a-b887-1143023f8e72','0a349bd9-27e4-46b1-b31e-5a862bf7aefd'),('e6aa1e8d-f944-4525-b44d-a814603746f0','75000','1232132','0a349bd9-27e4-46b1-b31e-5a862bf7aefd'),('ea3b4f15-215b-4e10-ba9a-11d94e164a43','NotAllowed','142343242343','904ae2d4-3239-43ef-976c-97c046aecaaa'),('eb29b9fe-8756-4ebb-840a-a5b4fa1bed90','No','fe2c2d7e-66de-406a-b887-1143023f8e54','904ae2d4-3239-43ef-976c-97c046aecaaa'),('eed5d4b4-cdd1-49f5-b995-a4435af4947b','Allowed','253454355','632a9e4b-501b-4410-96a4-b2ca7c20286f'),('f017c373-2836-45c3-bf8d-5244d4790291','NotAllowed','253454355','c4468657-6084-4013-ab4a-3ed218bd652a'),('ff59c0a6-5a77-43cb-879d-99c8a0461593','50000','123213','632a9e4b-501b-4410-96a4-b2ca7c20286f');
/*!40000 ALTER TABLE `ELECTION_MODULE_CONFIG_DATA` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ELECTION_TEAM`
--

DROP TABLE IF EXISTS `ELECTION_TEAM`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ELECTION_TEAM` (
  `ID` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `TEAM_ID` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ELECTION_ID` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ELECTION_ID` (`ELECTION_ID`),
  CONSTRAINT `ELECTION_TEAM_ibfk_1` FOREIGN KEY (`ELECTION_ID`) REFERENCES `election` (`ID`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ELECTION_TEAM`
--

LOCK TABLES `ELECTION_TEAM` WRITE;
/*!40000 ALTER TABLE `ELECTION_TEAM` DISABLE KEYS */;
/*!40000 ALTER TABLE `ELECTION_TEAM` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ELECTION_TIMELINE`
--

DROP TABLE IF EXISTS `ELECTION_TIMELINE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ELECTION_TIMELINE` (
  `ID` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `NOMINATION_START` bigint(20) DEFAULT NULL,
  `NOMINATION_END` bigint(20) DEFAULT NULL,
  `OBJECTION_START` bigint(20) DEFAULT NULL,
  `OBJECTION_END` bigint(20) DEFAULT NULL,
  `ELECTION_ID` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PAYMENT_START` bigint(20) DEFAULT NULL,
  `PAYMENT_END` bigint(20) DEFAULT NULL,
  `APPROVAL_START` bigint(20) DEFAULT NULL,
  `APPROVAL_END` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ELECTION_ID` (`ELECTION_ID`),
  CONSTRAINT `ELECTION_TIMELINE_ibfk_1` FOREIGN KEY (`ELECTION_ID`) REFERENCES `election` (`ID`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ELECTION_TIMELINE`
--

LOCK TABLES `ELECTION_TIMELINE` WRITE;
/*!40000 ALTER TABLE `ELECTION_TIMELINE` DISABLE KEYS */;
INSERT INTO `ELECTION_TIMELINE` VALUES ('2a18cf4d-f123-4701-8776-de155770ca61',1577424900000,1577602860000,1577648520000,1577775660000,'c482b797-2298-4dc2-89a0-5629f34fe1be',NULL,NULL,NULL,NULL),('61b34801-fc36-4f65-a891-128e9d461c9f',1575961260000,1576096980000,1576393260000,1577170860000,'11384edf-00d8-40e3-8d31-ed40f6f290fb',NULL,NULL,NULL,NULL),('699d78e6-c7fc-496a-94e5-4bf249604ecb',1575959100000,1576134060000,1576911660000,1577343660000,'7d9c17ce-522e-4ae2-bd69-24a692781790',NULL,NULL,NULL,NULL),('70954513-eb5b-4671-9e7b-94973e903172',1577944860000,1578121260000,1578294060000,1579244460000,'76172c1e-3db8-4b84-8fe3-ad31918e870b',NULL,NULL,NULL,NULL),('9846893e-d200-4d79-bd1d-7353d61d5cb8',1580367660000,1580410920000,1580590920000,1580677440000,'64d0b8d7-c779-4037-94b7-26f3a4d0d6f2',1580410860000,1580540460000,1580807040000,1580979840000),('9f6569cc-3798-463c-9643-b6883ac9fddf',1576832640000,1576919040000,1577178240000,1577351040000,'3a40e484-b236-4531-8efa-00e36de8c82e',NULL,NULL,NULL,NULL),('aecfe087-3947-483d-a5ca-fec0ee660b7d',1575874860000,1576134060000,1576269780000,1576479660000,'833135b8-e990-4aea-badf-1522b747473a',NULL,NULL,NULL,NULL),('ee3477b3-0dea-4dc4-b4b6-614f4482e6a1',1576141440000,1576273320000,1576566060000,1577343660000,'4add46f4-17bd-4285-aea6-2d402c5d3853',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `ELECTION_TIMELINE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ELECTION_TIMELINE_CONFIG`
--

DROP TABLE IF EXISTS `ELECTION_TIMELINE_CONFIG`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ELECTION_TIMELINE_CONFIG` (
  `ID` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `KEY_NAME` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `DESCRIPTION` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ELECTION_TIMELINE_CONFIG`
--

LOCK TABLES `ELECTION_TIMELINE_CONFIG` WRITE;
/*!40000 ALTER TABLE `ELECTION_TIMELINE_CONFIG` DISABLE KEYS */;
INSERT INTO `ELECTION_TIMELINE_CONFIG` VALUES ('0f62755e-9784-4046-9804-8d4deed36f2a','nomination_start_date','Start date of Nomination in UNIX TIMESTAMP'),('64ae3e95-591a-4bf9-8a5b-10803e0eca82','objection_end_date','End date of Objection in UNIX TIMESTAMP'),('675ec08b-2937-4222-94a6-0143a94763f1','objection_start_date','Start date of Objection in UNIX TIMESTAMP'),('c06a789c-405c-4e7a-8df2-66766284589b','nomination_end_date','End date of Nomination in UNIX TIMESTAMP');
/*!40000 ALTER TABLE `ELECTION_TIMELINE_CONFIG` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ELECTION_TIMELINE_CONFIG_DATA`
--

DROP TABLE IF EXISTS `ELECTION_TIMELINE_CONFIG_DATA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ELECTION_TIMELINE_CONFIG_DATA` (
  `ID` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ELECTION_TIMELINE_CONFIG_ID` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ELECTION_ID` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `VALUE` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ELECTION_TIMELINE_CONFIG_ID` (`ELECTION_TIMELINE_CONFIG_ID`),
  KEY `ELECTION_ID` (`ELECTION_ID`),
  CONSTRAINT `ELECTION_TIMELINE_CONFIG_DATA_ibfk_1` FOREIGN KEY (`ELECTION_TIMELINE_CONFIG_ID`) REFERENCES `election_timeline_config` (`ID`) ON UPDATE CASCADE,
  CONSTRAINT `ELECTION_TIMELINE_CONFIG_DATA_ibfk_2` FOREIGN KEY (`ELECTION_ID`) REFERENCES `election` (`ID`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ELECTION_TIMELINE_CONFIG_DATA`
--

LOCK TABLES `ELECTION_TIMELINE_CONFIG_DATA` WRITE;
/*!40000 ALTER TABLE `ELECTION_TIMELINE_CONFIG_DATA` DISABLE KEYS */;
/*!40000 ALTER TABLE `ELECTION_TIMELINE_CONFIG_DATA` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ELIGIBILITY_CONFIG`
--

DROP TABLE IF EXISTS `ELIGIBILITY_CONFIG`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ELIGIBILITY_CONFIG` (
  `ID` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `DESCRIPTION` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ELIGIBILITY_CONFIG`
--

LOCK TABLES `ELIGIBILITY_CONFIG` WRITE;
/*!40000 ALTER TABLE `ELIGIBILITY_CONFIG` DISABLE KEYS */;
INSERT INTO `ELIGIBILITY_CONFIG` VALUES ('1','Minimum age 35 years'),('2','Does not serve as a Judicial Officer'),('3','Does not serve as as the Commissioner-General'),('4','Does not serve as the Auditor-General'),('5','Does not serve as a Judicial Officer'),('6','Is not standing nominated as a candidate for election by more than one recognized political party or independent group in respect of any electoral district');
/*!40000 ALTER TABLE `ELIGIBILITY_CONFIG` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ELIGIBILITY_CONFIG_DATA`
--

DROP TABLE IF EXISTS `ELIGIBILITY_CONFIG_DATA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ELIGIBILITY_CONFIG_DATA` (
  `ID` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ELIGIBILITY_CONFIG_ID` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `MODULE_ID` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `MODULE_ID` (`MODULE_ID`),
  KEY `ELIGIBILITY_CONFIG_DATA_ibfk_2` (`ELIGIBILITY_CONFIG_ID`),
  CONSTRAINT `ELIGIBILITY_CONFIG_DATA_ibfk_1` FOREIGN KEY (`MODULE_ID`) REFERENCES `election_module` (`ID`) ON UPDATE CASCADE,
  CONSTRAINT `ELIGIBILITY_CONFIG_DATA_ibfk_2` FOREIGN KEY (`ELIGIBILITY_CONFIG_ID`) REFERENCES `eligibility_config` (`ID`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ELIGIBILITY_CONFIG_DATA`
--

LOCK TABLES `ELIGIBILITY_CONFIG_DATA` WRITE;
/*!40000 ALTER TABLE `ELIGIBILITY_CONFIG_DATA` DISABLE KEYS */;
INSERT INTO `ELIGIBILITY_CONFIG_DATA` VALUES ('19c7a4ab-0e1b-4ad1-9660-1b8bdb9e7faa','3','632a9e4b-501b-4410-96a4-b2ca7c20286f'),('250fe6bd-5d7f-41ed-9aab-a2e7133f399d','1','0531e799-deb4-47fd-be06-bc3527d67da9'),('5d8a1b8f-22ab-4a20-91e9-412e5754aefa','2','632a9e4b-501b-4410-96a4-b2ca7c20286f'),('5d96a878-83fc-4553-9921-a687edf1d52c','6','632a9e4b-501b-4410-96a4-b2ca7c20286f'),('6353efea-b674-4937-9f88-b255a42d875b','1','904ae2d4-3239-43ef-976c-97c046aecaaa'),('692d3f6f-028f-4b5f-b06d-0d286c08eb68','2','a5ddccd2-7b5d-4feb-9d15-109fabdbab0a'),('6b94baa6-078e-4fac-85b4-7f1f171cc6ae','2','0a349bd9-27e4-46b1-b31e-5a862bf7aefd'),('8d073665-894e-4762-b13f-b1f63d56e49a','4','632a9e4b-501b-4410-96a4-b2ca7c20286f'),('983681f1-fb11-4b86-a5bc-4a2feafecb3c','5','0531e799-deb4-47fd-be06-bc3527d67da9'),('9851b280-e1b2-4205-9d59-a6368c1da218','4','0531e799-deb4-47fd-be06-bc3527d67da9'),('a8e92da4-aab6-4643-b53c-cc112986ef80','5','632a9e4b-501b-4410-96a4-b2ca7c20286f'),('ab41f635-377b-466a-bf66-a90579e1a06e','1','632a9e4b-501b-4410-96a4-b2ca7c20286f'),('b3843dbe-2249-4f1c-8d56-3677dee7dd99','5','0a349bd9-27e4-46b1-b31e-5a862bf7aefd'),('c6ab75e8-eb55-4904-a992-0dc7211398bb','1','c4468657-6084-4013-ab4a-3ed218bd652a'),('d1d5bea4-d56b-4679-adbd-7656fd444345','2','0531e799-deb4-47fd-be06-bc3527d67da9'),('d59781ce-32ec-4202-a474-bf0f47b69c75','3','0a349bd9-27e4-46b1-b31e-5a862bf7aefd'),('d6585a14-116f-468e-b393-640929525e00','1','a5ddccd2-7b5d-4feb-9d15-109fabdbab0a'),('e77bf439-a339-4c67-86f1-167b17d77659','3','0531e799-deb4-47fd-be06-bc3527d67da9'),('ec0c83cd-8398-40ea-a44c-a600696e17b3','6','0a349bd9-27e4-46b1-b31e-5a862bf7aefd'),('ee26d2dd-d0f2-4d5d-858f-5cd9fce20826','1','0a349bd9-27e4-46b1-b31e-5a862bf7aefd'),('f5d0c93b-f3bb-47cf-8d74-6f9f8361f1e2','4','0a349bd9-27e4-46b1-b31e-5a862bf7aefd');
/*!40000 ALTER TABLE `ELIGIBILITY_CONFIG_DATA` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `NOMINATION`
--

DROP TABLE IF EXISTS `NOMINATION`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `NOMINATION` (
  `ID` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `STATUS` enum('DRAFT','SUBMIT','NEW') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `TEAM_ID` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CREATED_BY` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CREATED_AT` bigint(20) DEFAULT NULL,
  `UPDATED_AT` bigint(20) DEFAULT NULL,
  `ELECTION_ID` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `DIVISION_CONFIG_ID` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ELECTION_ID` (`ELECTION_ID`),
  KEY `DIVISION_CONFIG_ID` (`DIVISION_CONFIG_ID`),
  KEY `TEAM_ID` (`TEAM_ID`),
  CONSTRAINT `NOMINATION_ibfk_1` FOREIGN KEY (`ELECTION_ID`) REFERENCES `election` (`ID`) ON UPDATE CASCADE,
  CONSTRAINT `NOMINATION_ibfk_2` FOREIGN KEY (`DIVISION_CONFIG_ID`) REFERENCES `division_config` (`ID`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `NOMINATION`
--

LOCK TABLES `NOMINATION` WRITE;
/*!40000 ALTER TABLE `NOMINATION` DISABLE KEYS */;
INSERT INTO `NOMINATION` VALUES ('0010ad9e-848f-46bf-b8fe-b4f0e6e4094c','NEW','22','123',123,123,'c482b797-2298-4dc2-89a0-5629f34fe1be','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('009e02ba-25e8-4cae-ac0b-4c6be7b7c3b2','NEW','33','123',123,123,'76172c1e-3db8-4b84-8fe3-ad31918e870b','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('01052bfc-e197-4f95-9eab-9db9b7ebc2b9','NEW','14','123',123,123,'76172c1e-3db8-4b84-8fe3-ad31918e870b','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('044f1580-b9d5-4460-a1db-0240edcc72b9','NEW','17','123',123,123,'833135b8-e990-4aea-badf-1522b747473a','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('057d647b-8241-4d90-9909-24ef37275ee8','NEW','6','123',123,123,'64d0b8d7-c779-4037-94b7-26f3a4d0d6f2','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('058a8b3c-1d4c-4f1c-86f0-4c0db637c483','NEW','23','123',123,123,'833135b8-e990-4aea-badf-1522b747473a','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('0654b82f-e5eb-42fe-b35e-4b00c4d50d34','NEW','13','123',123,123,'3a40e484-b236-4531-8efa-00e36de8c82e','5ba6aa8f-8a74-4812-8a4c-2c9ae3f750c1'),('0749f369-d964-4abb-8b0f-71888ade6c51','NEW','18','123',123,123,'64d0b8d7-c779-4037-94b7-26f3a4d0d6f2','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('082d88a7-9d3b-43f3-b54f-a3991f0f7353','NEW','28','123',123,123,'3a40e484-b236-4531-8efa-00e36de8c82e','5ba6aa8f-8a74-4812-8a4c-2c9ae3f750c1'),('0a4b0476-dfae-4ca9-bf44-3793eab6e0e2','NEW','4','123',123,123,'3a40e484-b236-4531-8efa-00e36de8c82e','5ba6aa8f-8a74-4812-8a4c-2c9ae3f750c1'),('0b347819-5808-4847-9802-fc880dbe7b15','NEW','25','123',123,123,'4add46f4-17bd-4285-aea6-2d402c5d3853','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('0ddead04-7e21-4cd1-a5d9-a6e82ee9d492','NEW','22','123',123,123,'833135b8-e990-4aea-badf-1522b747473a','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('0e82e23d-81a4-4e4a-ab53-1a7afd3a9645','NEW','11','123',123,123,'833135b8-e990-4aea-badf-1522b747473a','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('10179f15-89a5-41a9-9e9f-c229a0a9008c','NEW','36','123',123,123,'7d9c17ce-522e-4ae2-bd69-24a692781790','6f390a4e-7695-4775-bc63-bca21b36eca7'),('1186c0e1-9ca7-4975-9a2e-886c9179819b','NEW','36','123',123,123,'3a40e484-b236-4531-8efa-00e36de8c82e','5ba6aa8f-8a74-4812-8a4c-2c9ae3f750c1'),('11bd4ff1-9c4c-4829-b41e-2b73c7fdb822','NEW','31','123',123,123,'64d0b8d7-c779-4037-94b7-26f3a4d0d6f2','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('127b6e04-baad-4184-9eeb-578239698c74','NEW','6','123',123,123,'4add46f4-17bd-4285-aea6-2d402c5d3853','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('12aa303d-4823-4533-b8a9-4e9e9c2a5b52','NEW','33','123',123,123,'4add46f4-17bd-4285-aea6-2d402c5d3853','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('12f64483-ee72-46b2-b231-372c725f17d8','NEW','34','123',123,123,'3a40e484-b236-4531-8efa-00e36de8c82e','5ba6aa8f-8a74-4812-8a4c-2c9ae3f750c1'),('13154b65-1313-4723-8b61-7fa8e04425d5','NEW','36','123',123,123,'4add46f4-17bd-4285-aea6-2d402c5d3853','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('132aa23d-0912-400a-a724-3547d6b65466','NEW','20','123',123,123,'833135b8-e990-4aea-badf-1522b747473a','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('142939b9-cc3b-4b5c-9ed2-2f872993f017','NEW','12','123',123,123,'11384edf-00d8-40e3-8d31-ed40f6f290fb','bee486ca-d3b8-456e-8313-a8d8937d1616'),('15cb6879-de6c-47de-ad9d-b2ab54f093c4','NEW','23','123',123,123,'64d0b8d7-c779-4037-94b7-26f3a4d0d6f2','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('15fa77e2-13cd-4f6b-a4af-a29a9b2fe377','NEW','5','123',123,123,'4add46f4-17bd-4285-aea6-2d402c5d3853','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('1661a690-8843-40f7-b4b8-bb78504bfba9','NEW','5','123',123,123,'11384edf-00d8-40e3-8d31-ed40f6f290fb','bee486ca-d3b8-456e-8313-a8d8937d1616'),('18a32ebb-c00b-4b91-a6ad-1eca4f128426','NEW','7','123',123,123,'4add46f4-17bd-4285-aea6-2d402c5d3853','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('18d527a6-152d-45cc-84f4-2079118126ec','NEW','12','123',123,123,'64d0b8d7-c779-4037-94b7-26f3a4d0d6f2','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('18e56a41-ccfe-4448-b962-4dfc457ae0c4','NEW','21','123',123,123,'64d0b8d7-c779-4037-94b7-26f3a4d0d6f2','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('1a4e7c8a-9fee-4ed0-a28a-336c3c34c576','NEW','36','123',123,123,'833135b8-e990-4aea-badf-1522b747473a','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('1bdd5e64-a0cb-4096-bef5-e922bea44bba','NEW','26','123',123,123,'833135b8-e990-4aea-badf-1522b747473a','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('1caeee86-e183-4aed-aab4-a579f9aa2c86','SUBMIT','1','123',123,123,'c482b797-2298-4dc2-89a0-5629f34fe1be','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('1cafe8f2-7358-48da-8063-754390f45de4','NEW','19','123',123,123,'11384edf-00d8-40e3-8d31-ed40f6f290fb','bee486ca-d3b8-456e-8313-a8d8937d1616'),('1e588624-c102-4238-8d00-473f8ca19e0b','NEW','15','123',123,123,'64d0b8d7-c779-4037-94b7-26f3a4d0d6f2','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('1e78ffb2-55aa-4fe7-9153-0e023413e6cf','NEW','26','123',123,123,'7d9c17ce-522e-4ae2-bd69-24a692781790','6f390a4e-7695-4775-bc63-bca21b36eca7'),('20667190-a30e-49fc-a21b-add99854c0dc','NEW','5','123',123,123,'64d0b8d7-c779-4037-94b7-26f3a4d0d6f2','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('20ece445-3c81-4a8e-a76d-409ff62ea34d','NEW','18','123',123,123,'833135b8-e990-4aea-badf-1522b747473a','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('22324031-2e75-48d3-8fb5-fad7f6586940','NEW','24','123',123,123,'11384edf-00d8-40e3-8d31-ed40f6f290fb','bee486ca-d3b8-456e-8313-a8d8937d1616'),('22a13e5e-505b-4671-b7cd-1b061d482ee6','NEW','17','123',123,123,'11384edf-00d8-40e3-8d31-ed40f6f290fb','bee486ca-d3b8-456e-8313-a8d8937d1616'),('2406da04-7cef-4047-a2b0-622cd7cdb6f8','NEW','13','123',123,123,'7d9c17ce-522e-4ae2-bd69-24a692781790','6f390a4e-7695-4775-bc63-bca21b36eca7'),('24505896-e0d1-4b3f-b0f5-6ca20fe3e8d7','NEW','34','123',123,123,'76172c1e-3db8-4b84-8fe3-ad31918e870b','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('25b6c4ca-4bcd-45c0-9155-55107e270808','NEW','5','123',123,123,'833135b8-e990-4aea-badf-1522b747473a','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('2601a376-4d69-4eaf-a6f7-990ff67897cb','NEW','3','123',123,123,'76172c1e-3db8-4b84-8fe3-ad31918e870b','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('27284601-2ea9-4734-9efe-4f3ce50e5cb2','NEW','2','123',123,123,'833135b8-e990-4aea-badf-1522b747473a','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('27c3a297-647c-4e66-b102-7ca9449653c0','NEW','37','123',123,123,'833135b8-e990-4aea-badf-1522b747473a','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('2887e559-2a1b-4672-9a38-2684b8bb5ebc','NEW','29','123',123,123,'64d0b8d7-c779-4037-94b7-26f3a4d0d6f2','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('28c2c3c1-c839-41d2-9349-8ab2788bad5d','NEW','30','123',123,123,'833135b8-e990-4aea-badf-1522b747473a','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('28ff3172-ff1f-4ef7-85be-9b80a9dea487','NEW','33','123',123,123,'7d9c17ce-522e-4ae2-bd69-24a692781790','6f390a4e-7695-4775-bc63-bca21b36eca7'),('29d36ee7-cd9f-4c12-ae10-a1ac2cf5ec79','NEW','33','123',123,123,'11384edf-00d8-40e3-8d31-ed40f6f290fb','bee486ca-d3b8-456e-8313-a8d8937d1616'),('2a144635-250e-4f33-a5ca-a1c7d7c872a3','NEW','2','123',123,123,'4add46f4-17bd-4285-aea6-2d402c5d3853','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('2b424a37-13dc-475a-90fe-b498e81dfaf7','NEW','35','123',123,123,'3a40e484-b236-4531-8efa-00e36de8c82e','5ba6aa8f-8a74-4812-8a4c-2c9ae3f750c1'),('2b5ab41e-d753-46de-8d21-a8d29705221f','NEW','19','123',123,123,'c482b797-2298-4dc2-89a0-5629f34fe1be','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('2c8c91d5-f796-4927-8398-0bfaa5992712','NEW','20','123',123,123,'c482b797-2298-4dc2-89a0-5629f34fe1be','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('2ccd059b-6ea5-4a10-96a8-7591e383e1c0','NEW','1','123',123,123,'4add46f4-17bd-4285-aea6-2d402c5d3853','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('2e371d12-e841-4d4d-b007-2190df718ab8','NEW','4','123',123,123,'7d9c17ce-522e-4ae2-bd69-24a692781790','6f390a4e-7695-4775-bc63-bca21b36eca7'),('2fe5795f-fc19-4c28-b31d-3bf23c56dac2','NEW','14','123',123,123,'64d0b8d7-c779-4037-94b7-26f3a4d0d6f2','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('333a3d2e-b716-4894-8191-01269c5f5772','NEW','31','123',123,123,'833135b8-e990-4aea-badf-1522b747473a','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('3516af1e-c98d-4ff6-b746-4f700ae59160','NEW','20','123',123,123,'64d0b8d7-c779-4037-94b7-26f3a4d0d6f2','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('355e081c-9a1f-4782-b040-de54e1779d8b','NEW','25','123',123,123,'76172c1e-3db8-4b84-8fe3-ad31918e870b','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('35e6d880-5188-41a1-aae2-6bdfc28b2fa4','NEW','39','123',123,123,'4add46f4-17bd-4285-aea6-2d402c5d3853','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('370c241d-5f15-491f-bf12-309974baac35','NEW','26','123',123,123,'11384edf-00d8-40e3-8d31-ed40f6f290fb','bee486ca-d3b8-456e-8313-a8d8937d1616'),('38085111-87e0-406e-b11b-02e3aef72dd5','NEW','13','123',123,123,'64d0b8d7-c779-4037-94b7-26f3a4d0d6f2','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('390698bb-8fad-40ae-a1a3-1b13268b1604','NEW','33','123',123,123,'833135b8-e990-4aea-badf-1522b747473a','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('3a7975c4-4e34-4caa-8644-bb754ffeca17','NEW','19','123',123,123,'4add46f4-17bd-4285-aea6-2d402c5d3853','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('3aaca558-4f93-4015-8bb5-98702b8247ea','NEW','29','123',123,123,'11384edf-00d8-40e3-8d31-ed40f6f290fb','bee486ca-d3b8-456e-8313-a8d8937d1616'),('3bb7421f-2ac6-48d5-9330-1622554251b8','NEW','23','123',123,123,'c482b797-2298-4dc2-89a0-5629f34fe1be','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('3c048c1d-fea6-438a-9cc8-d597e765b063','NEW','27','123',123,123,'833135b8-e990-4aea-badf-1522b747473a','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('3c97a0cf-5566-450b-83e0-f8801d41b983','NEW','31','123',123,123,'4add46f4-17bd-4285-aea6-2d402c5d3853','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('3d7abc70-002f-4367-b0a9-74cf34c3d083','NEW','35','123',123,123,'7d9c17ce-522e-4ae2-bd69-24a692781790','6f390a4e-7695-4775-bc63-bca21b36eca7'),('3ec101cd-a465-4a16-9117-7a923f3d69c6','NEW','26','123',123,123,'76172c1e-3db8-4b84-8fe3-ad31918e870b','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('3f369e2c-b630-4991-af25-75f3f6637fea','NEW','16','123',123,123,'76172c1e-3db8-4b84-8fe3-ad31918e870b','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('4075cc9f-5e77-41e3-9b04-d9e9e8234d7d','NEW','29','123',123,123,'833135b8-e990-4aea-badf-1522b747473a','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('409bd539-b269-44e4-bfe9-3d543236f3e0','NEW','18','123',123,123,'11384edf-00d8-40e3-8d31-ed40f6f290fb','bee486ca-d3b8-456e-8313-a8d8937d1616'),('4148c992-979a-4ff4-b81b-2d2dcaf8546f','NEW','3','123',123,123,'c482b797-2298-4dc2-89a0-5629f34fe1be','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('41af96fd-d01c-431f-b3c6-7922b7da6e91','NEW','13','123',123,123,'c482b797-2298-4dc2-89a0-5629f34fe1be','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('42d438d1-27f2-44f1-9d3d-aab4ade9a3c8','NEW','3','123',123,123,'4add46f4-17bd-4285-aea6-2d402c5d3853','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('4317bd78-07e2-430a-94df-36b0977c87ac','NEW','21','123',123,123,'11384edf-00d8-40e3-8d31-ed40f6f290fb','bee486ca-d3b8-456e-8313-a8d8937d1616'),('43a105e7-efdc-438c-a441-65be777d8b46','NEW','30','123',123,123,'76172c1e-3db8-4b84-8fe3-ad31918e870b','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('44294e85-e8a2-41a1-85d7-d8db4bb9e793','NEW','11','123',123,123,'3a40e484-b236-4531-8efa-00e36de8c82e','5ba6aa8f-8a74-4812-8a4c-2c9ae3f750c1'),('444a8210-2186-4eeb-8470-eb0beb1257ec','NEW','34','123',123,123,'7d9c17ce-522e-4ae2-bd69-24a692781790','6f390a4e-7695-4775-bc63-bca21b36eca7'),('449b4dd5-42f1-42f9-b541-74a5157ea2df','NEW','32','123',123,123,'64d0b8d7-c779-4037-94b7-26f3a4d0d6f2','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('45439c8d-a360-4d29-9cfe-226434727523','SUBMIT','1','123',123,123,'76172c1e-3db8-4b84-8fe3-ad31918e870b','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('46c3afa4-9992-4fbf-a5df-4c099bc87f93','NEW','8','123',123,123,'4add46f4-17bd-4285-aea6-2d402c5d3853','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('4781557f-b901-4203-8217-054c50031c07','NEW','37','123',123,123,'3a40e484-b236-4531-8efa-00e36de8c82e','5ba6aa8f-8a74-4812-8a4c-2c9ae3f750c1'),('47a173bb-d4c6-4af4-af60-afe9412682bd','NEW','8','123',123,123,'11384edf-00d8-40e3-8d31-ed40f6f290fb','bee486ca-d3b8-456e-8313-a8d8937d1616'),('489a283f-9b43-4b78-9579-ee77fe5a25d7','NEW','14','123',123,123,'7d9c17ce-522e-4ae2-bd69-24a692781790','6f390a4e-7695-4775-bc63-bca21b36eca7'),('48ad9776-e391-4754-92bc-fbacf01b36b3','NEW','5','123',123,123,'7d9c17ce-522e-4ae2-bd69-24a692781790','6f390a4e-7695-4775-bc63-bca21b36eca7'),('493462a4-8e95-4137-bc7f-094e0ed71d78','NEW','35','123',123,123,'76172c1e-3db8-4b84-8fe3-ad31918e870b','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('49fe2edf-890e-4092-a6c7-009ad5e11890','NEW','18','123',123,123,'4add46f4-17bd-4285-aea6-2d402c5d3853','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('4a071ba8-7250-40b5-9def-3641102660ff','NEW','9','123',123,123,'64d0b8d7-c779-4037-94b7-26f3a4d0d6f2','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('4ace6a99-d2d8-4a77-bbac-bfa3f15f1a0a','NEW','31','123',123,123,'76172c1e-3db8-4b84-8fe3-ad31918e870b','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('4b03dc17-217b-4196-9520-ee47a28bb9c9','NEW','14','123',123,123,'4add46f4-17bd-4285-aea6-2d402c5d3853','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('4bc0f3df-d384-4e09-9bbc-867229e74717','NEW','27','123',123,123,'4add46f4-17bd-4285-aea6-2d402c5d3853','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('4ca89460-9110-4b95-90b9-de6118c207ec','NEW','12','123',123,123,'76172c1e-3db8-4b84-8fe3-ad31918e870b','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('4d24f99a-4cc1-4612-a360-95558ee6b2c4','NEW','37','123',123,123,'64d0b8d7-c779-4037-94b7-26f3a4d0d6f2','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('4d850156-89e9-44f4-9e58-005bfea8662c','NEW','40','123',123,123,'76172c1e-3db8-4b84-8fe3-ad31918e870b','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('4f1a57d9-0fa0-4c46-87e0-faff448b55a5','NEW','28','123',123,123,'c482b797-2298-4dc2-89a0-5629f34fe1be','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('50a621c5-7a0a-4598-baa0-a7ec4a2bf5b5','NEW','24','123',123,123,'4add46f4-17bd-4285-aea6-2d402c5d3853','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('5291cc68-08f1-458b-9135-deebb9163e3e','NEW','37','123',123,123,'7d9c17ce-522e-4ae2-bd69-24a692781790','6f390a4e-7695-4775-bc63-bca21b36eca7'),('5307b999-37b9-4ce3-806a-cad29fa22a25','NEW','2','123',123,123,'76172c1e-3db8-4b84-8fe3-ad31918e870b','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('5416b769-51cf-4ac3-86ef-6b42b703212f','NEW','40','123',123,123,'7d9c17ce-522e-4ae2-bd69-24a692781790','6f390a4e-7695-4775-bc63-bca21b36eca7'),('544b2e59-2785-46ca-a84b-9106f7280a89','NEW','18','123',123,123,'3a40e484-b236-4531-8efa-00e36de8c82e','5ba6aa8f-8a74-4812-8a4c-2c9ae3f750c1'),('54624055-6023-43c4-aaf2-3f0690f42fc9','NEW','35','123',123,123,'11384edf-00d8-40e3-8d31-ed40f6f290fb','bee486ca-d3b8-456e-8313-a8d8937d1616'),('56d8fb1c-fa02-4772-93e2-d2b9c7c8e987','NEW','25','123',123,123,'11384edf-00d8-40e3-8d31-ed40f6f290fb','bee486ca-d3b8-456e-8313-a8d8937d1616'),('5743f0be-aace-4d20-9fdf-d517855ea4a7','NEW','22','123',123,123,'76172c1e-3db8-4b84-8fe3-ad31918e870b','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('583a1e79-fc30-4db4-bab2-c60f8d0537db','NEW','8','123',123,123,'76172c1e-3db8-4b84-8fe3-ad31918e870b','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('583a22ca-3c29-4428-aa7c-8cf8f8321ba3','NEW','38','123',123,123,'64d0b8d7-c779-4037-94b7-26f3a4d0d6f2','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('58b36fa0-591c-425a-a838-dc92132491f1','NEW','8','123',123,123,'7d9c17ce-522e-4ae2-bd69-24a692781790','6f390a4e-7695-4775-bc63-bca21b36eca7'),('58fcc43f-c314-4ecb-86a5-a19db4e0c391','NEW','3','123',123,123,'11384edf-00d8-40e3-8d31-ed40f6f290fb','bee486ca-d3b8-456e-8313-a8d8937d1616'),('5ad0bfb0-4f1e-4b99-a887-5d25fd9f8312','NEW','18','123',123,123,'c482b797-2298-4dc2-89a0-5629f34fe1be','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('5b77c6bc-5632-4da6-bc2a-cc9bf7dc8aa6','NEW','2','123',123,123,'7d9c17ce-522e-4ae2-bd69-24a692781790','6f390a4e-7695-4775-bc63-bca21b36eca7'),('5bd1d05b-7c1a-4bb1-aa38-5f869c694a10','NEW','20','123',123,123,'76172c1e-3db8-4b84-8fe3-ad31918e870b','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('5ca485d6-33e6-41f0-af41-cd90d1abeaf7','NEW','29','123',123,123,'3a40e484-b236-4531-8efa-00e36de8c82e','5ba6aa8f-8a74-4812-8a4c-2c9ae3f750c1'),('5d2e3e5d-8722-43d1-a6d1-8a599a6c9dee','NEW','9','123',123,123,'76172c1e-3db8-4b84-8fe3-ad31918e870b','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('5de2b9fa-85da-468f-ade2-cc751b7f5abf','NEW','12','123',123,123,'833135b8-e990-4aea-badf-1522b747473a','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('5e624e89-f94f-416b-bf96-f13728e4116e','NEW','9','123',123,123,'c482b797-2298-4dc2-89a0-5629f34fe1be','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('5e764bbd-01a1-426f-9bf0-f97c298ce844','NEW','5','123',123,123,'3a40e484-b236-4531-8efa-00e36de8c82e','5ba6aa8f-8a74-4812-8a4c-2c9ae3f750c1'),('5f28454b-3870-4136-91b8-2d98c5619c58','NEW','37','123',123,123,'76172c1e-3db8-4b84-8fe3-ad31918e870b','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('605f797f-0a3d-4608-a31a-a9dc66575b74','NEW','9','123',123,123,'11384edf-00d8-40e3-8d31-ed40f6f290fb','bee486ca-d3b8-456e-8313-a8d8937d1616'),('611b9fcb-8a28-42f3-a31a-53358b260ee1','NEW','15','123',123,123,'3a40e484-b236-4531-8efa-00e36de8c82e','5ba6aa8f-8a74-4812-8a4c-2c9ae3f750c1'),('6129124f-6f05-4cff-bef8-b8eb0b541ba3','NEW','14','123',123,123,'c482b797-2298-4dc2-89a0-5629f34fe1be','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('61670f0e-5781-49a9-b500-804d7378d234','NEW','40','123',123,123,'4add46f4-17bd-4285-aea6-2d402c5d3853','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('620976a1-a3f2-4c7f-97c0-e9a40b97722e','NEW','35','123',123,123,'4add46f4-17bd-4285-aea6-2d402c5d3853','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('63ffe3f0-4bf0-4031-bc1d-ae20d5600a07','NEW','39','123',123,123,'c482b797-2298-4dc2-89a0-5629f34fe1be','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('647b2711-aff3-4893-9959-efe6516e3570','NEW','12','123',123,123,'4add46f4-17bd-4285-aea6-2d402c5d3853','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('647ec9eb-1282-4d66-a838-1be0966b6872','NEW','28','123',123,123,'4add46f4-17bd-4285-aea6-2d402c5d3853','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('649cce49-882a-4b14-a98b-1bd168b67001','NEW','17','123',123,123,'c482b797-2298-4dc2-89a0-5629f34fe1be','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('66d7ddb5-c439-4a27-a5d6-1263d342f64e','NEW','19','123',123,123,'3a40e484-b236-4531-8efa-00e36de8c82e','5ba6aa8f-8a74-4812-8a4c-2c9ae3f750c1'),('6966aad7-57dc-4de1-9e98-25d5dd66f143','NEW','13','123',123,123,'11384edf-00d8-40e3-8d31-ed40f6f290fb','bee486ca-d3b8-456e-8313-a8d8937d1616'),('69930d5a-e521-4a44-b00f-4392d047f187','NEW','10','123',123,123,'3a40e484-b236-4531-8efa-00e36de8c82e','5ba6aa8f-8a74-4812-8a4c-2c9ae3f750c1'),('6a56c1c4-aa33-4430-bc67-822966a7807d','NEW','38','123',123,123,'c482b797-2298-4dc2-89a0-5629f34fe1be','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('6b0fdb8a-439d-497e-84f5-2ef6451bcde9','NEW','8','123',123,123,'c482b797-2298-4dc2-89a0-5629f34fe1be','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('6c4e28e8-cabd-47e9-bfb2-1ee0f02f26de','NEW','1','123',123,123,'11384edf-00d8-40e3-8d31-ed40f6f290fb','bee486ca-d3b8-456e-8313-a8d8937d1616'),('6cfde3f9-d4b6-46b2-bbf5-211c5b0f23b0','NEW','23','123',123,123,'76172c1e-3db8-4b84-8fe3-ad31918e870b','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('6d48f6c8-baa0-483f-9c1a-51ef71c9dbd2','NEW','24','123',123,123,'3a40e484-b236-4531-8efa-00e36de8c82e','5ba6aa8f-8a74-4812-8a4c-2c9ae3f750c1'),('6de409dc-da77-40a2-85f0-fe1ee6809d5e','NEW','25','123',123,123,'3a40e484-b236-4531-8efa-00e36de8c82e','5ba6aa8f-8a74-4812-8a4c-2c9ae3f750c1'),('6df3ea97-3c35-4a15-bf26-ac71aea438be','NEW','6','123',123,123,'76172c1e-3db8-4b84-8fe3-ad31918e870b','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('6faae08e-d4b8-4462-abab-00f7ba47e4e4','NEW','21','123',123,123,'7d9c17ce-522e-4ae2-bd69-24a692781790','6f390a4e-7695-4775-bc63-bca21b36eca7'),('70243f1c-803b-4aea-8013-d3c29ed59e0f','NEW','30','123',123,123,'4add46f4-17bd-4285-aea6-2d402c5d3853','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('7244a2bd-e598-4325-a6f4-9130bb4e9c58','NEW','12','123',123,123,'c482b797-2298-4dc2-89a0-5629f34fe1be','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('72aa5b5b-2bf8-440d-b0af-7bfac33fb41b','NEW','16','123',123,123,'7d9c17ce-522e-4ae2-bd69-24a692781790','6f390a4e-7695-4775-bc63-bca21b36eca7'),('73063ef3-7773-46e5-adab-08fa36a60bfc','NEW','13','123',123,123,'76172c1e-3db8-4b84-8fe3-ad31918e870b','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('7569ecfa-dfe8-4234-bd4b-5d86127db465','NEW','16','123',123,123,'833135b8-e990-4aea-badf-1522b747473a','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('759fedaf-7f32-44a9-8eb7-48755538c7cf','NEW','21','123',123,123,'3a40e484-b236-4531-8efa-00e36de8c82e','5ba6aa8f-8a74-4812-8a4c-2c9ae3f750c1'),('7630171e-c534-426f-85de-4a68f4fb65aa','NEW','23','123',123,123,'11384edf-00d8-40e3-8d31-ed40f6f290fb','bee486ca-d3b8-456e-8313-a8d8937d1616'),('7670926a-0443-44eb-9ec5-db53d622fdaf','NEW','24','123',123,123,'76172c1e-3db8-4b84-8fe3-ad31918e870b','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('76d0b09e-9df7-4a4b-9656-84b8b8cb9052','NEW','37','123',123,123,'c482b797-2298-4dc2-89a0-5629f34fe1be','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('7711c90a-97a2-4939-a97b-ca3380cd9781','NEW','11','123',123,123,'4add46f4-17bd-4285-aea6-2d402c5d3853','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('77a95c9f-0a7d-4a9a-ba4e-6bdeda57f13a','NEW','2','123',123,123,'3a40e484-b236-4531-8efa-00e36de8c82e','5ba6aa8f-8a74-4812-8a4c-2c9ae3f750c1'),('7823819f-f21e-48ca-8c35-20bf78a56221','NEW','3','123',123,123,'7d9c17ce-522e-4ae2-bd69-24a692781790','6f390a4e-7695-4775-bc63-bca21b36eca7'),('7a682890-1c75-4067-bcb3-03880c102ca4','NEW','40','123',123,123,'c482b797-2298-4dc2-89a0-5629f34fe1be','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('7a7bd738-035a-44e9-91c3-64aaf6a6896f','NEW','13','123',123,123,'4add46f4-17bd-4285-aea6-2d402c5d3853','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('7b07c40a-484c-4048-9e47-f493900c77d8','NEW','35','123',123,123,'c482b797-2298-4dc2-89a0-5629f34fe1be','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('7b1998d3-4778-44b7-bb64-ee27a62b00f1','NEW','32','123',123,123,'833135b8-e990-4aea-badf-1522b747473a','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('7b4e6bd5-cab6-4fc4-87ec-c33ccd8bd3a0','NEW','19','123',123,123,'76172c1e-3db8-4b84-8fe3-ad31918e870b','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('7b6c7dd1-3203-4231-883d-57f631764445','NEW','13','123',123,123,'833135b8-e990-4aea-badf-1522b747473a','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('7c6e56aa-1198-4661-a78b-142cad5374fb','NEW','33','123',123,123,'c482b797-2298-4dc2-89a0-5629f34fe1be','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('7cc87a66-32f5-40f7-bb37-145825a52016','NEW','22','123',123,123,'11384edf-00d8-40e3-8d31-ed40f6f290fb','bee486ca-d3b8-456e-8313-a8d8937d1616'),('7cc9b00b-1093-48aa-8cac-6d8d57318610','NEW','15','123',123,123,'4add46f4-17bd-4285-aea6-2d402c5d3853','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('7d387b2d-7f97-46ec-815a-4231258f5d98','NEW','7','123',123,123,'7d9c17ce-522e-4ae2-bd69-24a692781790','6f390a4e-7695-4775-bc63-bca21b36eca7'),('7ed9bf2f-8091-4a54-b5f1-fe8580837c3f','NEW','10','123',123,123,'7d9c17ce-522e-4ae2-bd69-24a692781790','6f390a4e-7695-4775-bc63-bca21b36eca7'),('80c3aa2b-1db6-4e47-ae8e-6c29d9654980','NEW','32','123',123,123,'76172c1e-3db8-4b84-8fe3-ad31918e870b','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('80dcef07-4422-4ac8-ae58-524d10f61500','NEW','31','123',123,123,'7d9c17ce-522e-4ae2-bd69-24a692781790','6f390a4e-7695-4775-bc63-bca21b36eca7'),('8139caeb-968a-48d5-b92c-99b92753058e','NEW','23','123',123,123,'7d9c17ce-522e-4ae2-bd69-24a692781790','6f390a4e-7695-4775-bc63-bca21b36eca7'),('8232cc63-b559-4213-ac61-fd93d9b744e5','NEW','23','123',123,123,'3a40e484-b236-4531-8efa-00e36de8c82e','5ba6aa8f-8a74-4812-8a4c-2c9ae3f750c1'),('82f296c5-7bda-440b-8271-41ff75452258','NEW','17','123',123,123,'3a40e484-b236-4531-8efa-00e36de8c82e','5ba6aa8f-8a74-4812-8a4c-2c9ae3f750c1'),('8439bcb9-78f6-45ce-9d90-34761654d67a','NEW','16','123',123,123,'c482b797-2298-4dc2-89a0-5629f34fe1be','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('850237d4-1c41-4596-9482-5152297d7f56','NEW','29','123',123,123,'7d9c17ce-522e-4ae2-bd69-24a692781790','6f390a4e-7695-4775-bc63-bca21b36eca7'),('85376c51-66b1-405c-b62a-2c537e4001b2','NEW','28','123',123,123,'833135b8-e990-4aea-badf-1522b747473a','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('86ce0aec-bf34-4fd2-b1f2-cf027bfa0718','NEW','28','123',123,123,'64d0b8d7-c779-4037-94b7-26f3a4d0d6f2','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('86d61f90-f950-402f-87b3-742fea25d0bd','NEW','9','123',123,123,'833135b8-e990-4aea-badf-1522b747473a','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('87b3821f-1e7b-4925-83da-2808dd022a76','SUBMIT','1','123',123,123,'833135b8-e990-4aea-badf-1522b747473a','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('87b8c682-d52f-4e13-91ec-c9ba1cd925ab','NEW','7','123',123,123,'76172c1e-3db8-4b84-8fe3-ad31918e870b','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('87eb237b-dcad-4b5b-be26-14d2bc0ae749','NEW','11','123',123,123,'11384edf-00d8-40e3-8d31-ed40f6f290fb','bee486ca-d3b8-456e-8313-a8d8937d1616'),('8813801e-2618-4d5a-9ebc-41b1d9296389','NEW','17','123',123,123,'7d9c17ce-522e-4ae2-bd69-24a692781790','6f390a4e-7695-4775-bc63-bca21b36eca7'),('88424318-42c3-44ff-b572-a1fb096c76ec','NEW','21','123',123,123,'833135b8-e990-4aea-badf-1522b747473a','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('88ac975a-7f0e-41d1-b023-468c4942f901','NEW','17','123',123,123,'64d0b8d7-c779-4037-94b7-26f3a4d0d6f2','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('890e6922-815a-4960-8ae8-929b2cd1f862','NEW','32','123',123,123,'11384edf-00d8-40e3-8d31-ed40f6f290fb','bee486ca-d3b8-456e-8313-a8d8937d1616'),('8a814f12-1e3b-40f6-a375-648efcb7d87b','NEW','24','123',123,123,'c482b797-2298-4dc2-89a0-5629f34fe1be','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('8c4c4964-8376-4a3d-a975-943690aa104a','NEW','34','123',123,123,'11384edf-00d8-40e3-8d31-ed40f6f290fb','bee486ca-d3b8-456e-8313-a8d8937d1616'),('8cad8ea3-1731-4a22-a082-e09e0fe840b4','NEW','9','123',123,123,'4add46f4-17bd-4285-aea6-2d402c5d3853','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('8cde4d56-b7e5-4c4c-9d03-b480aca5345c','NEW','19','123',123,123,'64d0b8d7-c779-4037-94b7-26f3a4d0d6f2','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('8de8fbed-7634-4c4d-bbbe-357ca150e862','NEW','22','123',123,123,'4add46f4-17bd-4285-aea6-2d402c5d3853','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('8e5a4fc5-6c14-4304-a549-d79db7d73b46','NEW','39','123',123,123,'7d9c17ce-522e-4ae2-bd69-24a692781790','6f390a4e-7695-4775-bc63-bca21b36eca7'),('8e93dbb6-8432-43d3-b2ef-ba153d1b2475','NEW','38','123',123,123,'7d9c17ce-522e-4ae2-bd69-24a692781790','6f390a4e-7695-4775-bc63-bca21b36eca7'),('8ec4edbb-70da-424a-9635-24d133def5a6','NEW','36','123',123,123,'c482b797-2298-4dc2-89a0-5629f34fe1be','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('8f6c1a70-baf3-410b-aa72-e1c656264ca3','NEW','20','123',123,123,'3a40e484-b236-4531-8efa-00e36de8c82e','5ba6aa8f-8a74-4812-8a4c-2c9ae3f750c1'),('90489cc4-1f7a-4dff-9af7-206eae7318d9','NEW','6','123',123,123,'833135b8-e990-4aea-badf-1522b747473a','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('90ce88e2-7f85-416e-bae3-af9d356dfe9e','NEW','26','123',123,123,'3a40e484-b236-4531-8efa-00e36de8c82e','5ba6aa8f-8a74-4812-8a4c-2c9ae3f750c1'),('91517a6a-a6ab-4610-a8bd-c0b67022423e','NEW','28','123',123,123,'7d9c17ce-522e-4ae2-bd69-24a692781790','6f390a4e-7695-4775-bc63-bca21b36eca7'),('9267f8da-ef82-428f-b50a-53e94ccfdc7a','NEW','32','123',123,123,'3a40e484-b236-4531-8efa-00e36de8c82e','5ba6aa8f-8a74-4812-8a4c-2c9ae3f750c1'),('932b9d10-66cb-42ea-84f7-853ee3e7fd04','NEW','27','123',123,123,'3a40e484-b236-4531-8efa-00e36de8c82e','5ba6aa8f-8a74-4812-8a4c-2c9ae3f750c1'),('95552a2f-b71b-42f7-b0be-de5176eda014','NEW','2','123',123,123,'c482b797-2298-4dc2-89a0-5629f34fe1be','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('967ad4a2-b608-4200-9eec-e80dd8890bb3','NEW','37','123',123,123,'4add46f4-17bd-4285-aea6-2d402c5d3853','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('977feb02-20a1-46f5-a667-02cc592c3a73','NEW','25','123',123,123,'64d0b8d7-c779-4037-94b7-26f3a4d0d6f2','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('99ebee05-e789-4f05-a0f0-9ee6a62a143a','NEW','30','123',123,123,'c482b797-2298-4dc2-89a0-5629f34fe1be','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('9a847d5d-488f-4949-b5ef-3d7dc1a08f65','NEW','35','123',123,123,'64d0b8d7-c779-4037-94b7-26f3a4d0d6f2','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('9ca5ade7-43ff-405e-ab73-a94ddd54ccb4','NEW','16','123',123,123,'3a40e484-b236-4531-8efa-00e36de8c82e','5ba6aa8f-8a74-4812-8a4c-2c9ae3f750c1'),('9dfe641f-5d39-43b3-86d6-918f5352e10d','NEW','10','123',123,123,'c482b797-2298-4dc2-89a0-5629f34fe1be','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('9e784d9c-4f1f-4747-aa6d-461341f6ec45','NEW','7','123',123,123,'64d0b8d7-c779-4037-94b7-26f3a4d0d6f2','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('a076c32f-b8e4-435a-af71-fef24ff02764','NEW','5','123',123,123,'c482b797-2298-4dc2-89a0-5629f34fe1be','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('a0842136-1d55-4841-9e02-385abbf71cf1','NEW','22','123',123,123,'3a40e484-b236-4531-8efa-00e36de8c82e','5ba6aa8f-8a74-4812-8a4c-2c9ae3f750c1'),('a0a49be1-1aa9-4f40-a32d-7711b9734f4c','NEW','15','123',123,123,'76172c1e-3db8-4b84-8fe3-ad31918e870b','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('a0c01354-7ca7-4b9e-a44e-e47a5f4149ba','NEW','40','123',123,123,'833135b8-e990-4aea-badf-1522b747473a','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('a18c094b-f844-4598-a77c-d7fdc30514d4','NEW','10','123',123,123,'76172c1e-3db8-4b84-8fe3-ad31918e870b','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('a19cb588-6a65-470c-918c-915b3e374f80','NEW','1','123',123,123,'3a40e484-b236-4531-8efa-00e36de8c82e','5ba6aa8f-8a74-4812-8a4c-2c9ae3f750c1'),('a1ebc349-eb65-4d70-8c45-1c6b4f50d544','NEW','39','123',123,123,'833135b8-e990-4aea-badf-1522b747473a','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('a3c9350f-4f20-40c7-a0ae-34c20188e401','NEW','26','123',123,123,'c482b797-2298-4dc2-89a0-5629f34fe1be','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('a3e967b7-dd9a-4789-b167-712559dae124','NEW','34','123',123,123,'64d0b8d7-c779-4037-94b7-26f3a4d0d6f2','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('a43fa2a0-a7b8-40c6-b38e-f68f0508e396','NEW','25','123',123,123,'c482b797-2298-4dc2-89a0-5629f34fe1be','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('a55dba03-2bbd-4b72-b2c1-7ebc706837a8','NEW','8','123',123,123,'833135b8-e990-4aea-badf-1522b747473a','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('a59bb41d-da66-4aab-b06d-001d901d0ecb','NEW','7','123',123,123,'11384edf-00d8-40e3-8d31-ed40f6f290fb','bee486ca-d3b8-456e-8313-a8d8937d1616'),('a601f687-301d-4df1-8548-2f105f1071a2','NEW','21','123',123,123,'c482b797-2298-4dc2-89a0-5629f34fe1be','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('a61e4e79-7e38-4c59-ab4f-ee6cc2ba3134','NEW','19','123',123,123,'7d9c17ce-522e-4ae2-bd69-24a692781790','6f390a4e-7695-4775-bc63-bca21b36eca7'),('a7357f20-6dce-4d12-a4c8-9829fa3587d3','NEW','39','123',123,123,'11384edf-00d8-40e3-8d31-ed40f6f290fb','bee486ca-d3b8-456e-8313-a8d8937d1616'),('a80afd15-c83e-47e9-831e-68b89a88673f','NEW','38','123',123,123,'76172c1e-3db8-4b84-8fe3-ad31918e870b','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('aa64704c-d9e3-4f80-8188-1eccb30c3def','NEW','6','123',123,123,'7d9c17ce-522e-4ae2-bd69-24a692781790','6f390a4e-7695-4775-bc63-bca21b36eca7'),('aa6d53e8-92c0-47fe-8c0b-5d72949a763e','NEW','27','123',123,123,'c482b797-2298-4dc2-89a0-5629f34fe1be','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('aab73805-858f-456d-a9bc-85944b8100c5','NEW','11','123',123,123,'c482b797-2298-4dc2-89a0-5629f34fe1be','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('ab17c18c-887b-4f65-ad6e-5f95397611a5','NEW','15','123',123,123,'833135b8-e990-4aea-badf-1522b747473a','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('ab32bd84-b3e0-48de-9e1c-95e6415d190c','NEW','39','123',123,123,'3a40e484-b236-4531-8efa-00e36de8c82e','5ba6aa8f-8a74-4812-8a4c-2c9ae3f750c1'),('ab443876-0555-489a-adf2-30a709b6c28f','NEW','6','123',123,123,'11384edf-00d8-40e3-8d31-ed40f6f290fb','bee486ca-d3b8-456e-8313-a8d8937d1616'),('ac5a40d7-e393-4353-a0e2-bca3db042070','NEW','31','123',123,123,'11384edf-00d8-40e3-8d31-ed40f6f290fb','bee486ca-d3b8-456e-8313-a8d8937d1616'),('ae089edd-59d8-4f51-acc1-9a742bbaf49c','NEW','32','123',123,123,'7d9c17ce-522e-4ae2-bd69-24a692781790','6f390a4e-7695-4775-bc63-bca21b36eca7'),('af73e935-3138-4451-9104-74b5fad89fdd','NEW','11','123',123,123,'7d9c17ce-522e-4ae2-bd69-24a692781790','6f390a4e-7695-4775-bc63-bca21b36eca7'),('afa987ba-b413-4e85-9d8d-d32044090c44','NEW','29','123',123,123,'4add46f4-17bd-4285-aea6-2d402c5d3853','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('b085fc77-609c-4b27-bd7a-e198303c2161','NEW','36','123',123,123,'11384edf-00d8-40e3-8d31-ed40f6f290fb','bee486ca-d3b8-456e-8313-a8d8937d1616'),('b0d98e1a-e74a-4a33-99cf-5cddd338fa3e','NEW','3','123',123,123,'833135b8-e990-4aea-badf-1522b747473a','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('b3b54eeb-5080-48c4-82f5-783eebd82b99','NEW','15','123',123,123,'c482b797-2298-4dc2-89a0-5629f34fe1be','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('b3ed2e87-9e76-40bc-8eb7-5b116f3d37d9','NEW','24','123',123,123,'64d0b8d7-c779-4037-94b7-26f3a4d0d6f2','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('b4fd209d-ff39-469b-833c-539eee8ba7a3','NEW','16','123',123,123,'64d0b8d7-c779-4037-94b7-26f3a4d0d6f2','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('b5d3da97-96b3-4328-a764-ebb950eabbdd','NEW','6','123',123,123,'3a40e484-b236-4531-8efa-00e36de8c82e','5ba6aa8f-8a74-4812-8a4c-2c9ae3f750c1'),('b866e78e-6499-4cec-a944-4078f610385e','NEW','12','123',123,123,'3a40e484-b236-4531-8efa-00e36de8c82e','5ba6aa8f-8a74-4812-8a4c-2c9ae3f750c1'),('b89b9152-9623-4dbe-8448-28e69b964fc8','NEW','11','123',123,123,'76172c1e-3db8-4b84-8fe3-ad31918e870b','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('b94080d6-8fb0-4ab3-bfe2-e1d922f38f36','NEW','26','123',123,123,'64d0b8d7-c779-4037-94b7-26f3a4d0d6f2','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('baaeaa80-c480-4dee-98a0-e232c159e14d','NEW','3','123',123,123,'3a40e484-b236-4531-8efa-00e36de8c82e','5ba6aa8f-8a74-4812-8a4c-2c9ae3f750c1'),('bb7d7088-c28c-49d2-b1c7-dbf64cbb388d','NEW','17','123',123,123,'76172c1e-3db8-4b84-8fe3-ad31918e870b','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('bd3c3c02-65ef-44d4-9f51-c8fa5ac7c779','NEW','14','123',123,123,'11384edf-00d8-40e3-8d31-ed40f6f290fb','bee486ca-d3b8-456e-8313-a8d8937d1616'),('be4b84f3-7aa7-4cb8-9e58-609538b13274','NEW','16','123',123,123,'11384edf-00d8-40e3-8d31-ed40f6f290fb','bee486ca-d3b8-456e-8313-a8d8937d1616'),('bfa9c9fa-4175-441e-8364-52da0adb508c','NEW','34','123',123,123,'4add46f4-17bd-4285-aea6-2d402c5d3853','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('c050f2c6-4ffb-41cc-a901-d09d5e0b3c36','NEW','20','123',123,123,'7d9c17ce-522e-4ae2-bd69-24a692781790','6f390a4e-7695-4775-bc63-bca21b36eca7'),('c06bbc1e-578d-407b-ab65-899a7757ef8e','NEW','10','123',123,123,'64d0b8d7-c779-4037-94b7-26f3a4d0d6f2','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('c0f7d296-159a-42db-a034-f305c222ca43','NEW','27','123',123,123,'11384edf-00d8-40e3-8d31-ed40f6f290fb','bee486ca-d3b8-456e-8313-a8d8937d1616'),('c28915f7-d7ef-4392-9a3b-5a7f5714ae4e','NEW','8','123',123,123,'3a40e484-b236-4531-8efa-00e36de8c82e','5ba6aa8f-8a74-4812-8a4c-2c9ae3f750c1'),('c4fadb18-2722-480f-8dbd-1e1e2899e0dd','NEW','10','123',123,123,'11384edf-00d8-40e3-8d31-ed40f6f290fb','bee486ca-d3b8-456e-8313-a8d8937d1616'),('c4fdd01d-d911-45dd-8fee-d40f1effedc7','NEW','38','123',123,123,'4add46f4-17bd-4285-aea6-2d402c5d3853','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('c5ed5a61-c411-4014-88cb-c049923b9ae6','NEW','31','123',123,123,'3a40e484-b236-4531-8efa-00e36de8c82e','5ba6aa8f-8a74-4812-8a4c-2c9ae3f750c1'),('c7950815-83d8-4655-93d5-39780d6fbdf8','NEW','14','123',123,123,'833135b8-e990-4aea-badf-1522b747473a','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('c7c3a854-df55-488b-8b2d-d5dc5c7bfcaa','NEW','40','123',123,123,'3a40e484-b236-4531-8efa-00e36de8c82e','5ba6aa8f-8a74-4812-8a4c-2c9ae3f750c1'),('c97987e2-603f-4233-a822-7fdf357e82a6','NEW','28','123',123,123,'11384edf-00d8-40e3-8d31-ed40f6f290fb','bee486ca-d3b8-456e-8313-a8d8937d1616'),('cacb7f3c-de03-4339-91f8-a9f213aab974','NEW','29','123',123,123,'c482b797-2298-4dc2-89a0-5629f34fe1be','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('cae90cfa-db0f-463a-918c-22d2a5efde98','NEW','39','123',123,123,'64d0b8d7-c779-4037-94b7-26f3a4d0d6f2','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('cb8cd3a0-87d9-482c-81f3-5b39e3e2436c','NEW','9','123',123,123,'3a40e484-b236-4531-8efa-00e36de8c82e','5ba6aa8f-8a74-4812-8a4c-2c9ae3f750c1'),('cd8cf553-93d2-43bb-9e36-2aa726dff1fa','NEW','20','123',123,123,'4add46f4-17bd-4285-aea6-2d402c5d3853','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('d012bbc5-9506-47e7-80f3-ae99866f1863','NEW','4','123',123,123,'833135b8-e990-4aea-badf-1522b747473a','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('d0f5b066-281f-4dd9-9d6a-243f98cca679','NEW','25','123',123,123,'7d9c17ce-522e-4ae2-bd69-24a692781790','6f390a4e-7695-4775-bc63-bca21b36eca7'),('d17553ae-0968-465c-b653-9db26fc632e8','NEW','25','123',123,123,'833135b8-e990-4aea-badf-1522b747473a','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('d1b8be3d-6e2f-45e0-82fb-e73d63a0d25d','NEW','37','123',123,123,'11384edf-00d8-40e3-8d31-ed40f6f290fb','bee486ca-d3b8-456e-8313-a8d8937d1616'),('d22e1fcb-4ccc-4879-a03a-31130c81bb54','NEW','29','123',123,123,'76172c1e-3db8-4b84-8fe3-ad31918e870b','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('d2b480aa-f2e9-40c1-9075-42ea8ea4ab95','NEW','38','123',123,123,'833135b8-e990-4aea-badf-1522b747473a','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('d2d1cce2-f2b0-45d1-8b2e-83ec34bc81f3','NEW','15','123',123,123,'7d9c17ce-522e-4ae2-bd69-24a692781790','6f390a4e-7695-4775-bc63-bca21b36eca7'),('d335f22e-a57e-4fe4-ac05-490762e619b8','NEW','38','123',123,123,'3a40e484-b236-4531-8efa-00e36de8c82e','5ba6aa8f-8a74-4812-8a4c-2c9ae3f750c1'),('d49cf65a-c076-4b8c-87c1-36c44ffb9c39','NEW','2','123',123,123,'11384edf-00d8-40e3-8d31-ed40f6f290fb','bee486ca-d3b8-456e-8313-a8d8937d1616'),('d4bf93b3-58f8-47ba-80e5-cdf958ebd12b','NEW','3','123',123,123,'64d0b8d7-c779-4037-94b7-26f3a4d0d6f2','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('d6a6f012-93fb-4f3f-9158-0f4c03e487fe','NEW','4','123',123,123,'76172c1e-3db8-4b84-8fe3-ad31918e870b','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('d83865a8-e0ff-49c5-915a-c351dec59141','NEW','19','123',123,123,'833135b8-e990-4aea-badf-1522b747473a','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('d8a56b22-5f0f-4b19-a54f-1199d8ae9d88','NEW','7','123',123,123,'3a40e484-b236-4531-8efa-00e36de8c82e','5ba6aa8f-8a74-4812-8a4c-2c9ae3f750c1'),('d9224209-0f67-4b1c-8f4f-be68c27a3d64','NEW','32','123',123,123,'4add46f4-17bd-4285-aea6-2d402c5d3853','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('d9d6fd9a-11ae-47e6-93ed-cd10989aa2bf','NEW','15','123',123,123,'11384edf-00d8-40e3-8d31-ed40f6f290fb','bee486ca-d3b8-456e-8313-a8d8937d1616'),('d9e0e5e5-92c9-4d60-ae17-9cb0ab8534f2','NEW','8','123',123,123,'64d0b8d7-c779-4037-94b7-26f3a4d0d6f2','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('db3f949e-05db-4756-8f56-648a2314819c','NEW','40','123',123,123,'64d0b8d7-c779-4037-94b7-26f3a4d0d6f2','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('db45e7e5-d1f7-404b-b7d9-a642c8342fe9','NEW','31','123',123,123,'c482b797-2298-4dc2-89a0-5629f34fe1be','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('dd3e632b-c5fe-4b20-9749-7850794b4587','NEW','6','123',123,123,'c482b797-2298-4dc2-89a0-5629f34fe1be','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('def2bc8e-347d-491f-84f4-ee6631886741','NEW','27','123',123,123,'7d9c17ce-522e-4ae2-bd69-24a692781790','6f390a4e-7695-4775-bc63-bca21b36eca7'),('df2c59a9-55c8-4503-ba2b-4faf64c4977b','NEW','22','123',123,123,'7d9c17ce-522e-4ae2-bd69-24a692781790','6f390a4e-7695-4775-bc63-bca21b36eca7'),('e25d54ae-7073-4a9e-b912-eb875444600a','NEW','36','123',123,123,'76172c1e-3db8-4b84-8fe3-ad31918e870b','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('e2c061aa-1e53-4b1e-bc39-ec9a2df3cb5b','NEW','36','123',123,123,'64d0b8d7-c779-4037-94b7-26f3a4d0d6f2','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('e53bc39a-0294-4672-9144-079992d3940b','NEW','7','123',123,123,'833135b8-e990-4aea-badf-1522b747473a','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('e5cde94d-705a-453b-97b9-fb42c04a2e71','NEW','16','123',123,123,'4add46f4-17bd-4285-aea6-2d402c5d3853','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('e5d2e1e6-5135-438b-90c0-841daff11f83','NEW','10','123',123,123,'4add46f4-17bd-4285-aea6-2d402c5d3853','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('e7f4fd8a-e8df-44a1-85fc-392d4f12908e','NEW','14','123',123,123,'3a40e484-b236-4531-8efa-00e36de8c82e','5ba6aa8f-8a74-4812-8a4c-2c9ae3f750c1'),('e8875bba-cb7e-439b-8ee2-1f81dc3f0809','NEW','26','123',123,123,'4add46f4-17bd-4285-aea6-2d402c5d3853','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('e9e94a76-6e68-4378-9976-68d60d383e11','NEW','2','123',123,123,'64d0b8d7-c779-4037-94b7-26f3a4d0d6f2','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('ea097cf1-7e17-498e-87e0-1942deb6e6ce','NEW','18','123',123,123,'76172c1e-3db8-4b84-8fe3-ad31918e870b','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('ea24863e-6438-41ae-ac8e-23a968632384','NEW','4','123',123,123,'11384edf-00d8-40e3-8d31-ed40f6f290fb','bee486ca-d3b8-456e-8313-a8d8937d1616'),('ead2ffdb-5581-42af-9a2f-abd91519d1dd','NEW','1','123',123,123,'64d0b8d7-c779-4037-94b7-26f3a4d0d6f2','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('eaf2ce07-8ac0-44b6-af22-b5fdbda0f74b','NEW','30','123',123,123,'64d0b8d7-c779-4037-94b7-26f3a4d0d6f2','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('eb464b99-1420-4e12-9066-cb102ef0632c','NEW','5','123',123,123,'76172c1e-3db8-4b84-8fe3-ad31918e870b','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('eda937b2-3919-4765-a827-69769ecefc39','NEW','20','123',123,123,'11384edf-00d8-40e3-8d31-ed40f6f290fb','bee486ca-d3b8-456e-8313-a8d8937d1616'),('edaecfce-365c-42e4-9668-c3ce56ecfef0','NEW','21','123',123,123,'4add46f4-17bd-4285-aea6-2d402c5d3853','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('edd37848-52bd-4720-9ba0-f03dfe2edfa6','NEW','4','123',123,123,'64d0b8d7-c779-4037-94b7-26f3a4d0d6f2','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('edf5b5b1-d0fe-4803-b667-64d1b383316d','NEW','9','123',123,123,'7d9c17ce-522e-4ae2-bd69-24a692781790','6f390a4e-7695-4775-bc63-bca21b36eca7'),('ee4f90d4-323a-4a7c-a4c5-da95b68c6abf','NEW','27','123',123,123,'76172c1e-3db8-4b84-8fe3-ad31918e870b','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('eea5d5fa-56fe-4cac-b3d0-8e8fc8775cf8','NEW','35','123',123,123,'833135b8-e990-4aea-badf-1522b747473a','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('ef3e56f9-c1dd-4025-a287-5982f96b804f','NEW','21','123',123,123,'76172c1e-3db8-4b84-8fe3-ad31918e870b','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('f08f578e-5c7e-4f0a-ace4-e051ca6d4ef1','NEW','10','123',123,123,'833135b8-e990-4aea-badf-1522b747473a','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('f0c3d3d4-6aa1-413c-9bc3-78f686841e3f','NEW','24','123',123,123,'833135b8-e990-4aea-badf-1522b747473a','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('f1dc7b4c-842f-40ee-8712-142ae476d03e','NEW','28','123',123,123,'76172c1e-3db8-4b84-8fe3-ad31918e870b','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('f25384e2-399d-4c34-a663-a8292e71aac2','NEW','33','123',123,123,'64d0b8d7-c779-4037-94b7-26f3a4d0d6f2','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('f2a20a8f-422b-4b0a-90ca-78293f85f4a2','NEW','7','123',123,123,'c482b797-2298-4dc2-89a0-5629f34fe1be','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('f37a72d0-6e40-4a49-a85c-22f77894ba45','NEW','40','123',123,123,'11384edf-00d8-40e3-8d31-ed40f6f290fb','bee486ca-d3b8-456e-8313-a8d8937d1616'),('f3ade4fb-d7fd-413b-b0af-3dc5dcf6fdb9','NEW','11','123',123,123,'64d0b8d7-c779-4037-94b7-26f3a4d0d6f2','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('f4595a41-30d4-4d2a-90a3-e78684f01f06','NEW','38','123',123,123,'11384edf-00d8-40e3-8d31-ed40f6f290fb','bee486ca-d3b8-456e-8313-a8d8937d1616'),('f4f57691-d4ee-46e7-8200-8ae57705c1bb','NEW','30','123',123,123,'7d9c17ce-522e-4ae2-bd69-24a692781790','6f390a4e-7695-4775-bc63-bca21b36eca7'),('f581fd39-3fd6-49a7-8278-f80721a7f031','NEW','30','123',123,123,'11384edf-00d8-40e3-8d31-ed40f6f290fb','bee486ca-d3b8-456e-8313-a8d8937d1616'),('f6bc0359-fdbb-438c-a6ea-0607093251e7','NEW','18','123',123,123,'7d9c17ce-522e-4ae2-bd69-24a692781790','6f390a4e-7695-4775-bc63-bca21b36eca7'),('f83b7a0b-f74a-4ffa-a543-95526cdd2526','NEW','34','123',123,123,'c482b797-2298-4dc2-89a0-5629f34fe1be','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('f84500a5-c2f9-4345-a3c9-62137b03c943','NEW','39','123',123,123,'76172c1e-3db8-4b84-8fe3-ad31918e870b','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('f8562110-a391-4949-971a-26dea4b3bc19','NEW','33','123',123,123,'3a40e484-b236-4531-8efa-00e36de8c82e','5ba6aa8f-8a74-4812-8a4c-2c9ae3f750c1'),('f8abf78d-d5e4-46b5-b015-4237903af604','NEW','22','123',123,123,'64d0b8d7-c779-4037-94b7-26f3a4d0d6f2','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('faa99774-ce8a-43a4-884b-8b35cea191e3','NEW','4','123',123,123,'4add46f4-17bd-4285-aea6-2d402c5d3853','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('fb8ae4fb-b758-4e47-a57c-f3727d6a614f','NEW','4','123',123,123,'c482b797-2298-4dc2-89a0-5629f34fe1be','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('fc98edfd-17e6-483b-96f6-4adf73933252','NEW','32','123',123,123,'c482b797-2298-4dc2-89a0-5629f34fe1be','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('fca3a1e0-2a43-4331-9686-41fe7a82bfcc','NEW','17','123',123,123,'4add46f4-17bd-4285-aea6-2d402c5d3853','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('fdada61e-844d-4492-8456-29c9cabd5059','SUBMIT','1','123',123,123,'7d9c17ce-522e-4ae2-bd69-24a692781790','6f390a4e-7695-4775-bc63-bca21b36eca7'),('fdcfbdf3-4290-45fe-ab1c-463ef4caef09','NEW','12','123',123,123,'7d9c17ce-522e-4ae2-bd69-24a692781790','6f390a4e-7695-4775-bc63-bca21b36eca7'),('fde1fb22-8107-4a2a-99e5-6c7ad8be9899','NEW','24','123',123,123,'7d9c17ce-522e-4ae2-bd69-24a692781790','6f390a4e-7695-4775-bc63-bca21b36eca7'),('fe3cccc1-cfe7-4a42-ba42-eb8ebe3810e1','NEW','27','123',123,123,'64d0b8d7-c779-4037-94b7-26f3a4d0d6f2','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('fe9cde6f-c835-4ad0-a723-82018c25c080','NEW','30','123',123,123,'3a40e484-b236-4531-8efa-00e36de8c82e','5ba6aa8f-8a74-4812-8a4c-2c9ae3f750c1'),('fecb30d7-107c-434b-a84a-f9749938f578','NEW','23','123',123,123,'4add46f4-17bd-4285-aea6-2d402c5d3853','e5ddf7b8-ff32-4564-9161-601a18176ca4'),('ff8964f8-f81e-4acb-b541-6ad54ea96694','NEW','34','123',123,123,'833135b8-e990-4aea-badf-1522b747473a','e5ddf7b8-ff32-4564-9161-601a18176ca4');
/*!40000 ALTER TABLE `NOMINATION` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `NOMINATION_APPROVAL`
--

DROP TABLE IF EXISTS `NOMINATION_APPROVAL`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `NOMINATION_APPROVAL` (
  `ID` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `APPROVED_BY` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `APPROVED_AT` bigint(20) DEFAULT NULL,
  `UPDATED_AT` bigint(20) DEFAULT NULL,
  `STATUS` enum('1ST-APPROVE','2ND-APPROVE','REJECT') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `REVIEW_NOTE` text COLLATE utf8mb4_unicode_ci,
  `NOMINATION_ID` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `NOMINATION_ID` (`NOMINATION_ID`),
  CONSTRAINT `NOMINATION_APPROVAL_ibfk_1` FOREIGN KEY (`NOMINATION_ID`) REFERENCES `nomination` (`ID`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `NOMINATION_APPROVAL`
--

LOCK TABLES `NOMINATION_APPROVAL` WRITE;
/*!40000 ALTER TABLE `NOMINATION_APPROVAL` DISABLE KEYS */;
INSERT INTO `NOMINATION_APPROVAL` VALUES ('0c3147aa-be0c-413f-889a-3bfb59381ce6','admin',1577946416000,1577946416000,'1ST-APPROVE','ss','45439c8d-a360-4d29-9cfe-226434727523'),('75353d78-f952-4d71-92ca-f27443301a3e','admin',1577427723000,1577427723000,'1ST-APPROVE','a','1caeee86-e183-4aed-aab4-a579f9aa2c86'),('8e3d866f-4cba-43c9-b0b0-f9d69153d0d6','admin',1576822410000,1576822410000,'1ST-APPROVE','tt','87b3821f-1e7b-4925-83da-2808dd022a76'),('ca74008f-d432-45cf-a1ef-46de03d978c3','admin',1577424159000,1577424159000,'1ST-APPROVE','a','fdada61e-844d-4492-8456-29c9cabd5059');
/*!40000 ALTER TABLE `NOMINATION_APPROVAL` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `NOMINATION_SUPPORT_DOC`
--

DROP TABLE IF EXISTS `NOMINATION_SUPPORT_DOC`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `NOMINATION_SUPPORT_DOC` (
  `ID` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ORIGINAL_NAME` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FILE_PATH` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `SUPPORT_DOC_CONFIG_ID` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `NOMINATION_ID` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `STATUS` enum('NEW','DELETE') COLLATE utf8mb4_unicode_ci DEFAULT 'NEW',
  PRIMARY KEY (`ID`),
  KEY `SUPPORT_DOC_CONFIG_ID` (`SUPPORT_DOC_CONFIG_ID`),
  KEY `NOMINATION_ID` (`NOMINATION_ID`),
  CONSTRAINT `NOMINATION_SUPPORT_DOC_ibfk_1` FOREIGN KEY (`SUPPORT_DOC_CONFIG_ID`) REFERENCES `support_doc_config` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `NOMINATION_SUPPORT_DOC_ibfk_2` FOREIGN KEY (`NOMINATION_ID`) REFERENCES `nomination` (`ID`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `NOMINATION_SUPPORT_DOC`
--

LOCK TABLES `NOMINATION_SUPPORT_DOC` WRITE;
/*!40000 ALTER TABLE `NOMINATION_SUPPORT_DOC` DISABLE KEYS */;
INSERT INTO `NOMINATION_SUPPORT_DOC` VALUES ('111e07fe-f8ec-40d4-ad50-efab46c1d8bb','20191227_153844.jpg','f9487c0a264bd4c74852ce60b1d5af25','31232','45439c8d-a360-4d29-9cfe-226434727523','DELETE'),('12338dd5-a273-40e6-a159-517d9ef1d614','x-directory-nfs-server.jpg','1bc1e9210c521d7a6da57456c42b1126','b20dd58c-e5bb-469d-98c9-8711d6da1879','1caeee86-e183-4aed-aab4-a579f9aa2c86','DELETE'),('1ad32a6b-7a66-40a5-9366-48135a6ed1f0','20191227_153844.jpg','16da76a7aaa722a0a1de52b00cdf3f09','31232','45439c8d-a360-4d29-9cfe-226434727523','DELETE'),('297c0482-947c-4364-ac3d-c2471f139a22','20191227_153844.jpg','f9487c0a264bd4c74852ce60b1d5af25','31232','45439c8d-a360-4d29-9cfe-226434727523','DELETE'),('3e33f09c-cf6d-47a3-9501-1173936e1084','20191227_153844.jpg','f9487c0a264bd4c74852ce60b1d5af25','31232','45439c8d-a360-4d29-9cfe-226434727523','DELETE'),('3e682b5d-20d2-4e1d-94b0-e792f03f04dc','high-level-architecture-nomination.png','96f9bc3c5b90017e5babc0974bc95dfb','31232','87b3821f-1e7b-4925-83da-2808dd022a76','NEW'),('434c882e-c5de-411b-97ed-23a7f30fa2e3','1577441463808.png','5a12ddcfab92d7c3a359c59245affdfa','b20dd58c-e5bb-469d-98c9-8711d6da1879','45439c8d-a360-4d29-9cfe-226434727523','NEW'),('5505a9cb-eb84-4c94-ba05-e964daed021e','20191227_153844.jpg','16da76a7aaa722a0a1de52b00cdf3f09','31232','45439c8d-a360-4d29-9cfe-226434727523','DELETE'),('674f22f4-d6bf-412a-8a50-597458878007','x-directory-nfs-server.jpg','f5c875d35e2311f9ff6fafbd2b1f16f9','31232','1caeee86-e183-4aed-aab4-a579f9aa2c86','DELETE'),('71406d87-821b-4def-9762-90fd902ff47b','20191227_153844.jpg','16da76a7aaa722a0a1de52b00cdf3f09','31232','45439c8d-a360-4d29-9cfe-226434727523','DELETE'),('83e696dc-2558-4f0a-b264-f008d3caa432','20191227_153844.jpg','2a190a2f74c698b8d627fe5e307f84e3','31232','45439c8d-a360-4d29-9cfe-226434727523','DELETE'),('ade046b7-f3d5-4c0e-8bab-d012f68e2508','1577441463808.png','5a12ddcfab92d7c3a359c59245affdfa','b20dd58c-e5bb-469d-98c9-8711d6da1879','45439c8d-a360-4d29-9cfe-226434727523','DELETE'),('b49a396e-a2db-4349-97f4-7e51dad37f0f','x-directory-nfs-server.jpg','f5c875d35e2311f9ff6fafbd2b1f16f9','31232','1caeee86-e183-4aed-aab4-a579f9aa2c86','DELETE'),('c3d76b78-b778-4e15-b2e7-9fdfe0fbbde3','high-level-architecture-nomination.png','bb5374383b46db4e081c961e39a02085','31232','fdada61e-844d-4492-8456-29c9cabd5059','NEW'),('c5b515fc-53a3-4321-9f08-a3fa60acee1a','1577441463808.png','5a12ddcfab92d7c3a359c59245affdfa','b20dd58c-e5bb-469d-98c9-8711d6da1879','45439c8d-a360-4d29-9cfe-226434727523','DELETE'),('d317a751-92cc-4524-bd01-9f5b1e24e4c2','20191227_153844.jpg','16da76a7aaa722a0a1de52b00cdf3f09','31232','45439c8d-a360-4d29-9cfe-226434727523','NEW'),('e4f6d09d-f534-4725-90da-f47a72785f19','x-directory-nfs-server.jpg','51685de193497c10e00e884454cae7b7','31232','1caeee86-e183-4aed-aab4-a579f9aa2c86','NEW'),('ef842b85-82f5-4f5c-8624-5f5a7bf5fd71','20191227_153844.jpg','16da76a7aaa722a0a1de52b00cdf3f09','31232','45439c8d-a360-4d29-9cfe-226434727523','DELETE'),('fd129b31-ea29-4e30-be21-13ddadac805c','high-level-architecture-nomination.png','96f9bc3c5b90017e5babc0974bc95dfb','31232','87b3821f-1e7b-4925-83da-2808dd022a76','DELETE');
/*!40000 ALTER TABLE `NOMINATION_SUPPORT_DOC` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OBJECTION`
--

DROP TABLE IF EXISTS `OBJECTION`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `OBJECTION` (
  `ID` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `DESCRIPTION` text COLLATE utf8mb4_unicode_ci,
  `CREATED_AT` bigint(20) DEFAULT NULL,
  `CREATED_BY` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CREATED_BY_TEAM_ID` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `NOMINATION_ID` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `NOMINATION_ID` (`NOMINATION_ID`),
  CONSTRAINT `OBJECTION_ibfk_1` FOREIGN KEY (`NOMINATION_ID`) REFERENCES `nomination` (`ID`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OBJECTION`
--

LOCK TABLES `OBJECTION` WRITE;
/*!40000 ALTER TABLE `OBJECTION` DISABLE KEYS */;
/*!40000 ALTER TABLE `OBJECTION` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OBJECTION_REVIEW`
--

DROP TABLE IF EXISTS `OBJECTION_REVIEW`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `OBJECTION_REVIEW` (
  `ID` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CREATED_BY` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CREATED_AT` bigint(20) DEFAULT NULL,
  `NOTE` text COLLATE utf8mb4_unicode_ci,
  `OBJECTION_ID` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `STATUS` enum('APPROVED','REJECTED') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `OBJECTION_ID` (`OBJECTION_ID`),
  CONSTRAINT `OBJECTION_REVIEW_ibfk_1` FOREIGN KEY (`OBJECTION_ID`) REFERENCES `objection` (`ID`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OBJECTION_REVIEW`
--

LOCK TABLES `OBJECTION_REVIEW` WRITE;
/*!40000 ALTER TABLE `OBJECTION_REVIEW` DISABLE KEYS */;
/*!40000 ALTER TABLE `OBJECTION_REVIEW` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OBJECTION_SUPPORT_DOC`
--

DROP TABLE IF EXISTS `OBJECTION_SUPPORT_DOC`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `OBJECTION_SUPPORT_DOC` (
  `ID` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `FILE_PATH` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `SUPPORT_DOC_CONFIG_ID` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `OBJECTION_ID` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `SUPPORT_DOC_CONFIG_ID` (`SUPPORT_DOC_CONFIG_ID`),
  KEY `OBJECTION_ID` (`OBJECTION_ID`),
  CONSTRAINT `OBJECTION_SUPPORT_DOC_ibfk_1` FOREIGN KEY (`SUPPORT_DOC_CONFIG_ID`) REFERENCES `support_doc_config` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `OBJECTION_SUPPORT_DOC_ibfk_2` FOREIGN KEY (`OBJECTION_ID`) REFERENCES `objection` (`ID`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OBJECTION_SUPPORT_DOC`
--

LOCK TABLES `OBJECTION_SUPPORT_DOC` WRITE;
/*!40000 ALTER TABLE `OBJECTION_SUPPORT_DOC` DISABLE KEYS */;
/*!40000 ALTER TABLE `OBJECTION_SUPPORT_DOC` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PAYMENT`
--

DROP TABLE IF EXISTS `PAYMENT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PAYMENT` (
  `ID` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `SERIAL_NO` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DEPOSITOR` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DEPOSIT_DATE` bigint(20) DEFAULT NULL,
  `AMOUNT` decimal(13,4) DEFAULT NULL,
  `FILE_PATH` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `STATUS` enum('PENDING','APPROVE','REJECT') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CREATED_BY` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CREATED_AT` bigint(20) DEFAULT NULL,
  `UPDATED_AT` bigint(20) DEFAULT NULL,
  `NOMINATION_ID` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `NOTE` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`ID`),
  KEY `NOMINATION_ID` (`NOMINATION_ID`),
  CONSTRAINT `PAYMENT_ibfk_1` FOREIGN KEY (`NOMINATION_ID`) REFERENCES `nomination` (`ID`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PAYMENT`
--

LOCK TABLES `PAYMENT` WRITE;
/*!40000 ALTER TABLE `PAYMENT` DISABLE KEYS */;
INSERT INTO `PAYMENT` VALUES ('03c482d3-98df-48ec-965e-457dde05511c','00006','kamal',1575936000000,50000.0000,'upload','APPROVE','kamal',1575954233000,1580114912000,'f08f578e-5c7e-4f0a-ace4-e051ca6d4ef1','edwed'),('06f04247-11dc-44d7-b119-2573f4c346ed','00021','sadasd',1579564800000,50000.0000,'upload','APPROVE','sadasd',1579606158000,1579606158000,'a18c094b-f844-4598-a77c-d7fdc30514d4',NULL),('0d76d0cf-d011-4425-bf4b-7489fe3e145b','00032','adefef',1579651200000,50000.0000,'upload','APPROVE','adefef',1579683471000,1579683471000,'5307b999-37b9-4ce3-806a-cad29fa22a25',NULL),('2b5a3f3d-9912-4e6c-a253-72e0d4915d01','00016','aaaa',1579564800000,50000.0000,'upload','APPROVE','aaaa',1579601851000,1579601851000,'45439c8d-a360-4d29-9cfe-226434727523',NULL),('36c43d43-728a-44ca-9ba5-a147072ac1a8','00026','adad',1579651200000,50000.0000,'upload','APPROVE','adad',1579673636000,1579673636000,'f581fd39-3fd6-49a7-8278-f80721a7f031',NULL),('3ff51713-9386-4cd2-b296-532a51c76412','00033','kassun',1580083200000,50000.0000,'upload','APPROVE','kassun',1580115201000,1580115473000,'6b0fdb8a-439d-497e-84f5-2ef6451bcde9','as'),('418b8c22-d713-4c5b-ba2c-250673a50021','00010','sdfsdfd',1579564800000,50000.0000,'upload','APPROVE','sdfsdfd',1579597792000,1579597792000,'0e82e23d-81a4-4e4a-ab53-1a7afd3a9645',NULL),('45762773-847a-4e62-904e-2cb186a0e950','00029','dvgdfgf',1579651200000,50000.0000,'upload','APPROVE','dvgdfgf',1579674670000,1579674670000,'7670926a-0443-44eb-9ec5-db53d622fdaf',NULL),('49b2b74a-15f3-4e44-aacf-7938cd231eb3','00023','wfewf',1579651200000,50000.0000,'upload','APPROVE','wfewf',1579673183000,1579673183000,'d2d1cce2-f2b0-45d1-8b2e-83ec34bc81f3',NULL),('4ebe1696-d019-4673-b228-91e44791b17d','00031','drgdgr',1579651200000,75000.0000,'upload','APPROVE','drgdgr',1579683195000,1579846770000,'24505896-e0d1-4b3f-b0f5-6ca20fe3e8d7','as'),('4f3575ed-a652-406f-8819-fb47f76a873d','00011','qsaxasx',1579564800000,50000.0000,'upload','APPROVE','qsaxasx',1579599746000,1579599746000,'5de2b9fa-85da-468f-ade2-cc751b7f5abf',NULL),('53166950-2126-47a0-984f-1f8376556e87','00025','sdfsdf',1579651200000,50000.0000,'upload','APPROVE','sdfsdf',1579673416000,1579673416000,'649cce49-882a-4b14-a98b-1bd168b67001',NULL),('58e57abd-ccaa-4924-9c5b-5f523a1e6c9d','00007','kamal',1575936000000,75000.0000,'upload','APPROVE','kamal',1575960343000,1575960343000,'7ed9bf2f-8091-4a54-b5f1-fe8580837c3f',NULL),('64bad501-cb80-44da-b0f6-301aa6386569','00015','sdfsdf',1579564800000,50000.0000,'upload','APPROVE','sdfsdf',1579600854000,1579600854000,'7711c90a-97a2-4939-a97b-ca3380cd9781',NULL),('6cf5e9b5-1fce-4aea-ab69-8aef24555b0b','00020','qsxwxw',1579564800000,50000.0000,'upload','APPROVE','qsxwxw',1579604275000,1579604275000,'4b03dc17-217b-4196-9520-ee47a28bb9c9',NULL),('73fa8cfa-bd79-40c5-85c1-05e40389073a','00017','aasas',1579564800000,50000.0000,'upload','APPROVE','aasas',1579603742000,1579603742000,'73063ef3-7773-46e5-adab-08fa36a60bfc',NULL),('980af755-5e03-4a4d-a2ee-57dee172a433','00027','fdgfdgd',1579651200000,50000.0000,'upload','APPROVE','fdgfdgd',1579674441000,1579674441000,'7b4e6bd5-cab6-4fc4-87ec-c33ccd8bd3a0',NULL),('9d27b34f-2ff6-4c3f-9889-da9483a22613','00024','wfrrf',1579651200000,50000.0000,'upload','APPROVE','wfrrf',1579673248000,1579673248000,'a61e4e79-7e38-4c59-ab4f-ee6cc2ba3134',NULL),('a084ee94-081d-481f-b658-f9e29b86fbf8','00012','df',1579564800000,50000.0000,'upload','APPROVE','df',1579600028000,1579600028000,'c4fadb18-2722-480f-8dbd-1e1e2899e0dd',NULL),('ac7bd977-7d77-478b-911a-568fc126a39f','00022','dfvsdf',1579651200000,50000.0000,'upload','APPROVE','dfvsdf',1579672769000,1579672769000,'489a283f-9b43-4b78-9579-ee77fe5a25d7',NULL),('bb0b892a-6909-4307-98e8-74c8772d0ac9','00019','sasss',1579564800000,50000.0000,'upload','APPROVE','sasss',1579604020000,1579604020000,'a0a49be1-1aa9-4f40-a32d-7711b9734f4c',NULL),('d0924cf4-fde1-4ca6-a45e-e41e4d05a516','00013','sass',1579564800000,50000.0000,'upload','APPROVE','sass',1579600433000,1579600433000,'fdcfbdf3-4290-45fe-ab1c-463ef4caef09',NULL),('d186f1bd-7f8f-4ecd-8118-4842438572fd','00030','fdgdfg',1579651200000,50000.0000,'upload','APPROVE','fdgdfg',1579674845000,1579674845000,'df2c59a9-55c8-4503-ba2b-4faf64c4977b',NULL),('e44aedd3-03f9-452e-acd9-e26728619b28','00008','kasun',1576108800000,50000.0000,'upload','APPROVE','kasun',1576146341000,1576146341000,'8de8fbed-7634-4c4d-bbbe-357ca150e862',NULL),('e47f2ad7-c694-4e45-98d9-4e46521bfa75','00018','asas',1579564800000,50000.0000,'upload','APPROVE','asas',1579603950000,1579603950000,'01052bfc-e197-4f95-9eab-9db9b7ebc2b9',NULL),('ec662d13-e8d5-4b4c-ba76-7a22feb92a5e','00009','dfgdg',1579564800000,50000.0000,'upload','APPROVE','dfgdg',1579588642000,1579588642000,'87b3821f-1e7b-4925-83da-2808dd022a76',NULL),('ec84d71f-cfec-407f-88e3-d44c211f98d4','00028','sdfsd',1579651200000,50000.0000,'upload','APPROVE','sdfsd',1579674534000,1579674534000,'49fe2edf-890e-4092-a6c7-009ad5e11890',NULL),('f3345c1c-a8a3-4716-bfe7-b24b842c3f15','00014','adssds',1579564800000,50000.0000,'upload','APPROVE','adssds',1579600527000,1579600527000,'e5d2e1e6-5135-438b-90c0-841daff11f83',NULL);
/*!40000 ALTER TABLE `PAYMENT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PAYMENT_SERIAL`
--

DROP TABLE IF EXISTS `PAYMENT_SERIAL`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PAYMENT_SERIAL` (
  `ID` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FORM` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `NUM` int(5) unsigned zerofill DEFAULT '00001',
  `START` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DESCRIPTION` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PAYMENT_SERIAL`
--

LOCK TABLES `PAYMENT_SERIAL` WRITE;
/*!40000 ALTER TABLE `PAYMENT_SERIAL` DISABLE KEYS */;
INSERT INTO `PAYMENT_SERIAL` VALUES ('1','nomination_payment',00034,'','nomination security deposit');
/*!40000 ALTER TABLE `PAYMENT_SERIAL` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PAYMENT_SUPPORT_DOC`
--

DROP TABLE IF EXISTS `PAYMENT_SUPPORT_DOC`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PAYMENT_SUPPORT_DOC` (
  `ID` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ORIGINAL_NAME` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FILE_PATH` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PAYMENT_ID` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `STATUS` enum('NEW','DELETE') COLLATE utf8mb4_unicode_ci DEFAULT 'NEW',
  PRIMARY KEY (`ID`),
  KEY `PAYMENT_SUPPORT_DOC` (`PAYMENT_ID`),
  CONSTRAINT `PAYMENT_SUPPORT_DOC` FOREIGN KEY (`PAYMENT_ID`) REFERENCES `PAYMENT` (`ID`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PAYMENT_SUPPORT_DOC`
--

LOCK TABLES `PAYMENT_SUPPORT_DOC` WRITE;
/*!40000 ALTER TABLE `PAYMENT_SUPPORT_DOC` DISABLE KEYS */;
INSERT INTO `PAYMENT_SUPPORT_DOC` VALUES ('07e4bae0-4345-4598-99e0-6fe1bbe10e82','subscribe-png-39347.png','593bc3f36355faa7018329704d70180f','3ff51713-9386-4cd2-b296-532a51c76412','NEW'),('28ca5afa-12a9-4c46-82c1-0b35355fa30b','subscribe-png-39347.png','083889c6e1b300cc72499197ac443739','4ebe1696-d019-4673-b228-91e44791b17d','NEW'),('64ffb5fc-7ab4-4be9-a4d2-f029b0b1c001','subscribe.png','bc222b52d1e6d8e87dd7f0cf1ce84e91','3ff51713-9386-4cd2-b296-532a51c76412','DELETE'),('6c8e867a-a949-488a-821e-44bc72a960dd','subscribe.png','2b35d590e7ef0a6fad70b2ecfa92c41f','03c482d3-98df-48ec-965e-457dde05511c','DELETE'),('8931022d-f6d5-4324-a308-0d30ff5bf2a8','subscribe.png','8f27b4f96f193ca186d9bca9497820e3','0d76d0cf-d011-4425-bf4b-7489fe3e145b','NEW'),('8d31f458-f56e-41ce-8faa-0390f2b9ca11','subscribe-png-39347.png','35709c5c164454978794a189841c0f97','3ff51713-9386-4cd2-b296-532a51c76412','NEW'),('a2ab4696-946a-4fbf-84f6-8349f13ee859','subscribe-png-39347.png','56c39ccd1186d97a6b0b607df9c2a03e','3ff51713-9386-4cd2-b296-532a51c76412','NEW'),('b136ee0d-ec71-431c-a2ac-b6ef572b3860','subscribe.png','87b5d909bc375b7d3b54203418e32027','4ebe1696-d019-4673-b228-91e44791b17d','DELETE'),('e9408286-2542-49cf-870e-23984a89c8c6','subscribe.png','2b35d590e7ef0a6fad70b2ecfa92c41f','03c482d3-98df-48ec-965e-457dde05511c','NEW'),('f112c623-dfe2-4ae5-902f-70b35bc3325e','subscribe.png','87b5d909bc375b7d3b54203418e32027','4ebe1696-d019-4673-b228-91e44791b17d','NEW');
/*!40000 ALTER TABLE `PAYMENT_SUPPORT_DOC` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SUPPORT_DOC_CONFIG`
--

DROP TABLE IF EXISTS `SUPPORT_DOC_CONFIG`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SUPPORT_DOC_CONFIG` (
  `ID` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `KEY_NAME` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `DESCRIPTION` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DOC_CATEGORY` enum('NOMINATION','CANDIDATE','OBJECTION','PAYMENT') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CATEGORY` enum('SECURITY DEPOSIT','IDENTITY','REPRESENTATION','FINANCIAL','OTHER') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SUPPORT_DOC_CONFIG`
--

LOCK TABLES `SUPPORT_DOC_CONFIG` WRITE;
/*!40000 ALTER TABLE `SUPPORT_DOC_CONFIG` DISABLE KEYS */;
INSERT INTO `SUPPORT_DOC_CONFIG` VALUES ('15990459-2ea4-413f-b1f7-29a138fd7a97','Affidavit','Affidavit','CANDIDATE','REPRESENTATION'),('31232','Scan of Security Deposit Payment Slip','nomination pay slip','PAYMENT','SECURITY DEPOSIT'),('32423','Declaration of Asset & Liabilities Form','ss','CANDIDATE','REPRESENTATION'),('3fac66f2-302c-4d27-b9ae-1d004037a9ba','Declaration of Female Representation','Declaration form that denotes the precentage of female representation for the nomination','NOMINATION','REPRESENTATION'),('59f4d9df-006b-4d7c-82dc-736041e97f37','Objection Support Document','Submit any type of document related to objection','OBJECTION','REPRESENTATION'),('b20dd58c-e5bb-469d-98c9-8711d6da1879','Completed & Signed Nomination Form','Completed & Signed Nomination Form','NOMINATION','OTHER'),('fe2c2d7e-66de-406a-b887-1143023f8e72','National Identity Card (NIC)','National Identity Card (NIC)','CANDIDATE','IDENTITY'),('ff4c6768-bdbe-4a16-b680-5fecb6b1f747','Birth Certificate','Birth Certificate','CANDIDATE','IDENTITY');
/*!40000 ALTER TABLE `SUPPORT_DOC_CONFIG` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SUPPORT_DOC_CONFIG_DATA`
--

DROP TABLE IF EXISTS `SUPPORT_DOC_CONFIG_DATA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SUPPORT_DOC_CONFIG_DATA` (
  `ID` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `SUPPORT_DOC_CONFIG_ID` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `MODULE_ID` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `MODULE_ID` (`MODULE_ID`),
  KEY `SUPPORT_DOC_CONFIG_ID` (`SUPPORT_DOC_CONFIG_ID`),
  CONSTRAINT `SUPPORT_DOC_CONFIG_DATA_ibfk_1` FOREIGN KEY (`MODULE_ID`) REFERENCES `election_module` (`ID`) ON UPDATE CASCADE,
  CONSTRAINT `SUPPORT_DOC_CONFIG_DATA_ibfk_2` FOREIGN KEY (`SUPPORT_DOC_CONFIG_ID`) REFERENCES `support_doc_config` (`ID`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SUPPORT_DOC_CONFIG_DATA`
--

LOCK TABLES `SUPPORT_DOC_CONFIG_DATA` WRITE;
/*!40000 ALTER TABLE `SUPPORT_DOC_CONFIG_DATA` DISABLE KEYS */;
INSERT INTO `SUPPORT_DOC_CONFIG_DATA` VALUES ('0ac44fee-fb1d-4da1-a739-396994788513','59f4d9df-006b-4d7c-82dc-736041e97f37','0531e799-deb4-47fd-be06-bc3527d67da9'),('1719a251-160b-4c4e-a068-2045f86b25b8','3fac66f2-302c-4d27-b9ae-1d004037a9ba','632a9e4b-501b-4410-96a4-b2ca7c20286f'),('4524ae49-a945-404b-9fd9-afca566879f3','59f4d9df-006b-4d7c-82dc-736041e97f37','632a9e4b-501b-4410-96a4-b2ca7c20286f'),('4b4f18c9-4e62-4de8-adfb-dc4159c2dc83','fe2c2d7e-66de-406a-b887-1143023f8e72','904ae2d4-3239-43ef-976c-97c046aecaaa'),('56db127b-6f28-4cf0-b5e4-0caf087a38f6','15990459-2ea4-413f-b1f7-29a138fd7a97','0531e799-deb4-47fd-be06-bc3527d67da9'),('656549d6-4bd9-4829-b5e9-118490d925b4','3fac66f2-302c-4d27-b9ae-1d004037a9ba','0a349bd9-27e4-46b1-b31e-5a862bf7aefd'),('67580a08-eb64-409b-8d0f-d47c72cfaf6a','fe2c2d7e-66de-406a-b887-1143023f8e72','0a349bd9-27e4-46b1-b31e-5a862bf7aefd'),('6b37177d-c8f8-4175-8e6a-6948836f79ad','31232','0a349bd9-27e4-46b1-b31e-5a862bf7aefd'),('73324fb2-68bb-4fd1-b667-1c7b25508f0f','32423','632a9e4b-501b-4410-96a4-b2ca7c20286f'),('79db168c-d275-4967-b8f6-f9a5361027b1','fe2c2d7e-66de-406a-b887-1143023f8e72','a5ddccd2-7b5d-4feb-9d15-109fabdbab0a'),('7d78004e-ed2f-471b-88ed-3baccdcb491c','15990459-2ea4-413f-b1f7-29a138fd7a97','632a9e4b-501b-4410-96a4-b2ca7c20286f'),('8afde3f3-fba8-46db-bec0-2848f026b0b5','3fac66f2-302c-4d27-b9ae-1d004037a9ba','0531e799-deb4-47fd-be06-bc3527d67da9'),('8d731bfd-7285-42d9-a2a8-969d15125099','ff4c6768-bdbe-4a16-b680-5fecb6b1f747','0a349bd9-27e4-46b1-b31e-5a862bf7aefd'),('9085258b-d265-43fa-9100-ee0a3a9d5598','fe2c2d7e-66de-406a-b887-1143023f8e72','0531e799-deb4-47fd-be06-bc3527d67da9'),('9ce2691a-47e5-4b48-933e-53c1ad67c375','31232','0531e799-deb4-47fd-be06-bc3527d67da9'),('b97f9243-c818-4983-81d4-e0fc3f81dccd','59f4d9df-006b-4d7c-82dc-736041e97f37','0a349bd9-27e4-46b1-b31e-5a862bf7aefd'),('c5000165-da28-46df-814d-f8c9da082ba7','fe2c2d7e-66de-406a-b887-1143023f8e72','c4468657-6084-4013-ab4a-3ed218bd652a'),('d58134ab-6b50-44e4-b046-b51f7b20c679','fe2c2d7e-66de-406a-b887-1143023f8e72','632a9e4b-501b-4410-96a4-b2ca7c20286f'),('e1a5c5fe-86cd-4829-8e26-d36f73e1708e','b20dd58c-e5bb-469d-98c9-8711d6da1879','0531e799-deb4-47fd-be06-bc3527d67da9');
/*!40000 ALTER TABLE `SUPPORT_DOC_CONFIG_DATA` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TEAM_CONFIG`
--

DROP TABLE IF EXISTS `TEAM_CONFIG`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TEAM_CONFIG` (
  `ID` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `TEAM_NAME` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TEAM_CONFIG`
--

LOCK TABLES `TEAM_CONFIG` WRITE;
/*!40000 ALTER TABLE `TEAM_CONFIG` DISABLE KEYS */;
INSERT INTO `TEAM_CONFIG` VALUES ('1111','United National Party ( UNP )'),('2222','United People\'s Freedom Alliance ( UPFA )'),('3333','Janatha Vimukthi Peramuna ( JVP )'),('4444','Jana Setha Peramuna ( JSP )'),('5555','Sri Lanka Muslim Congress ( SLMC )'),('6666','Sri Lanka People\'s Party ( SLPP )'),('7777','United Socialist Party ( USP )  '),('8888','United Lanka People\'s Party ( ULPP ) '),('9999','New Sinhala Heritage ( NSH )');
/*!40000 ALTER TABLE `TEAM_CONFIG` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `USER`
--

DROP TABLE IF EXISTS `USER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `USER` (
  `ID` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `NAME` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `TEAM_ID` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `EMAIL` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USER`
--

LOCK TABLES `USER` WRITE;
/*!40000 ALTER TABLE `USER` DISABLE KEYS */;
INSERT INTO `USER` VALUES ('123','CLEMENT','2222',NULL),('234','yujith','3333','sk'),('345','dinuka','3333',NULL);
/*!40000 ALTER TABLE `USER` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-30 18:33:35
