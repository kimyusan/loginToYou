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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `name` varchar(20) NOT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `birthday` varchar(255) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `couple_id` int DEFAULT NULL,
  `nickname` varchar(30) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `fcm_token` varchar(255) DEFAULT NULL,
  `is_push_ok` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (16,'qwer@qwer','qwer1234!',NULL,NULL,NULL,2,NULL,'$2a$10$opTrhFHy33p1XlNZnqhp4eo8zMJxzMbDn/vdP8vjkxnioDXZwuf6G','eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InF3ZXJAcXdlciIsImlhdCI6MTcwNzEwMDY1MCwiZXhwIjoxNzA3NzA1NDUwfQ.duRRRECbzcMQ54Dle8ZBpy7NxxX-Kd8IopYjDXttcrc',NULL,NULL,1),(17,'asdf@asdf','asdf1234!',NULL,NULL,NULL,2,NULL,'$2a$10$7RXbpaAffNaCUr0a9.3XXO3WSEj11LE2MVao0nIbUcxWbVEa1bCpq','eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImFzZGZAYXNkZiIsImlhdCI6MTcwNzA5OTc1MywiZXhwIjoxNzA3NzA0NTUzfQ.2VRBPh6lwrzwO7HJfmrz1YPkEdjB9K97ZNJTqnh1TXw',NULL,NULL,1),(18,'dddd@dddd','ddddd',NULL,NULL,NULL,1,NULL,'$2a$10$8P7qa2LutHjMMS3VUsCWrOqrLtVU5OVY9SLifc.7of/HiJV8Sy6P2','eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImRkZGRAZGRkZCIsImlhdCI6MTcwNzExNjAwNSwiZXhwIjoxNzA3NzIwODA1fQ.rPLwQnmk31zyFIUawWBQ1yunVyBc2BMrlDMSgqvish4',NULL,NULL,1),(19,'ffff@ffff','ffff@',NULL,NULL,NULL,1,NULL,'$2a$10$0Z130rX6LRk2A3a21wi4m.6Qgg.lbAo68eyIgcywFIhK7PHu5.VI6','eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImZmZmZAZmZmZiIsImlhdCI6MTcwNzExNjA1NCwiZXhwIjoxNzA3NzIwODU0fQ.MzVs6hdKx4kN_5SLzW1LEcWZNFhFpXYcoGi0OJhXt5I',NULL,NULL,1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-06 13:47:19
