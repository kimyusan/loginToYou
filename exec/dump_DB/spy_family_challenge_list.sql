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
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `challenge_list`
--

LOCK TABLES `challenge_list` WRITE;
/*!40000 ALTER TABLE `challenge_list` DISABLE KEYS */;
INSERT INTO `challenge_list` VALUES (1,1,'누적 다이어리 작성','다이어리 누적 작성 1회',0,1),(2,1,'누적 다이어리 작성','다이어리 누적 작성 10회',0,10),(3,1,'누적 다이어리 작성','다이어리 누적 작성 50회',0,50),(4,1,'연속 다이어리 작성','다이어리 연속 작성 3회',1,3),(5,1,'연속 다이어리 작성','다이어리 연속 작성 10회',1,10),(6,1,'연속 다이어리 작성','다이어리 연속 작성 30회',1,30),(7,2,'누적 출석','출석 누적 1일',0,1),(8,2,'누적 출석','출석 누적 10일',0,10),(9,2,'누적 출석','출석 누적 30일',0,30),(10,2,'연속 출석','출석 연속 3일',1,3),(11,2,'연속 출석','출석 연속 7일',1,10),(12,2,'연속 출석','출석 연속 30일',1,30),(13,3,'누적 오늘의 질문','오늘의 질문 누적 1회 답변',0,1),(14,3,'누적 오늘의 질문','오늘의 질문 누적 5회 답변',0,5),(15,3,'누적 오늘의 질문','오늘의 질문 누적 10회 답변',0,10),(16,3,'연속 오늘의 질문','오늘의 질문 연속 3회 답변',1,3),(17,3,'연속 오늘의 질문','오늘의 질문 연속 10회 답변',1,10),(18,3,'연속 오늘의 질문','오늘의 질문 연속 30회 답변',1,30),(19,4,'누적 밸런스게임','밸런스게임 누적 1회 답변',0,1),(20,4,'누적 밸런스게임','밸런스게임 누적 5회 답변',0,5),(21,4,'누적 밸런스게임','밸런스게임 누적 10회 답변',0,10),(22,4,'연속 밸런스게임','밸런스게임 연속 3회 답변',0,3),(23,4,'연속 밸런스게임','밸런스게임 연속 10회 답변',0,10),(24,4,'연속 밸런스게임','밸런스게임 연속 30회 답변',0,30),(25,5,'디데이 달성','100일 달성',0,100),(26,5,'디데이 달성','300일 달성',0,300),(27,5,'디데이 달성','1주년 달성',0,365);
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

-- Dump completed on 2024-02-13 16:37:03
