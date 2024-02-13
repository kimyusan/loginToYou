-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: spy_family
-- ------------------------------------------------------
-- Server version	8.0.35

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
-- Table structure for table `challenge_list`
--

DROP TABLE IF EXISTS `challenge_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `challenge_list` (
  `challenge_list_id` int NOT NULL AUTO_INCREMENT,
  `type` int DEFAULT NULL,
  `subject` varchar(31) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `is_continuous` tinyint(1) DEFAULT NULL,
  `goal` int DEFAULT NULL,
  PRIMARY KEY (`challenge_list_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `challenge_list`
--

LOCK TABLES `challenge_list` WRITE;
/*!40000 ALTER TABLE `challenge_list` DISABLE KEYS */;
INSERT INTO `challenge_list` VALUES (7,1,'다이어리 누적 작성','다이어리 누적 작성 1회',0,1),(8,1,'다이어리 누적 작성','다이어리 누적 작성 5회',0,5),(9,1,'다이어리 연속 작성','다이어리 연속 작성 3회',1,3),(10,1,'다이어리 연속 작성','다이어리 연속 작성 5회',1,5),(11,2,'출석 누적','출석 누적 5일',0,5),(12,2,'출석 누적','출석 누적 10일',0,10),(13,2,'출석 연속','출석 연속 3일',1,3),(14,2,'출석 연속','출석 연속 5일',1,5);
/*!40000 ALTER TABLE `challenge_list` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-09 22:20:09
