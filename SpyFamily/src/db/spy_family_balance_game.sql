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
-- Table structure for table `balance_game`
--

DROP TABLE IF EXISTS `balance_game`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `balance_game` (
  `balance_game_id` int NOT NULL AUTO_INCREMENT,
  `subject` varchar(100) NOT NULL,
  `f_item` varchar(100) NOT NULL,
  `s_item` varchar(100) NOT NULL,
  `f_vote` int DEFAULT '1',
  `s_vote` int DEFAULT '1',
  PRIMARY KEY (`balance_game_id`)
) ENGINE=InnoDB AUTO_INCREMENT=367 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `balance_game`
--

LOCK TABLES `balance_game` WRITE;
/*!40000 ALTER TABLE `balance_game` DISABLE KEYS */;
INSERT INTO `balance_game` VALUES (1,'피아노 연주 vs 바이올린 연주','피아노 연주','바이올린 연주',1,1),(2,'미술 수업 vs 공예 수업','미술 수업','공예 수업',1,1),(3,'건강 간식','견과류','건조 과일',1,1),(4,'맛집 투어','스트리트 푸드','고급 레스토랑',1,1),(5,'뮤지컬 감상','로맨틱 뮤지컬','코믹 뮤지컬',1,1),(6,'수제 공예 vs DIY 프로젝트','수제 공예','DIY 프로젝트',1,1),(7,'헬스장 운동 vs 홈 트레이닝','헬스장 운동','홈 트레이닝',1,1),(8,'한식 메뉴','비빔밥','된장찌개',1,1),(9,'힐링 여행','스파 여행','요가 여행',1,1),(10,'곱창 vs 막창','곱창','막창',1,1),(11,'아메리카노 vs 카페라테','아메리카노','카페라테',1,1),(12,'쫄면 vs 냉면','쫄면','냉면',1,1),(13,'야식 고르기','김치볶음밥','훠궈',1,1),(14,'한식 메뉴','잡채','갈비탕',1,1),(15,'튀김우동 vs 생생우동','튀김우동','생생우동',1,1),(16,'수영 vs 자전거 타기','수영','자전거 타기',1,1),(17,'전통 문화 체험','한복 체험','사무라이 체험',1,1),(18,'소주 vs 맥주','소주','맥주',1,1),(19,'액티비티 중심 데이트','낚시 체험','패러글라이딩 체험',1,1),(20,'육회 vs 육사시미','육회','육사시미',1,1),(21,'돌솥비빔밥 vs 전주비빔밥','돌솥비빔밥','전주비빔밥',1,1),(22,'패스트푸드','버거','핫도그',1,1),(23,'남져밤이 vs 낮이밤져','남져밤이','낮이밤져',1,1),(24,'요구르트에 김치 말아먹기 vs 라면에 초콜릿 넣기','요구르트에 김치 말아먹기','라면에 초콜릿 넣기',1,1),(25,'수영 vs 요가','수영','요가',1,1),(26,'시장 쇼핑','향신료 시장','고급 디자이너 매장',1,1),(27,'평생 치통 vs 평생 두통','평생 치통','평생 두통',1,1),(28,'호수 풍경 여행','이탈리아 코모 호수','캐나다 밴프 국립 공원의 호수',1,1),(29,'아침 식사','시리얼','토스트',1,1),(30,'양식 선택','스테이크','파스타',1,1),(31,'악기 연주 vs 노래 부르기','악기 연주','노래 부르기',1,1),(32,'휴일 아침','팬케이크','아보카도 토스트',1,1),(33,'포토 지점 찾기','유럽 거리 사진 찍기','일본 정원 사진 찍기',1,1),(34,'파스타 vs 리조또','파스타','리조또',1,1),(35,'물냉 vs 비냉','물냉','비냉',1,1),(36,'호캉스','풀 빌라','스파 리조트',1,1),(37,'소개팅에서 전 애인과의 추억을 자꾸 얘기하는 사람 vs 소개팅에서 전 애인과의 추억을 자꾸 묻는 사람','전 애인과의 추억을 자꾸 얘기하는 사람','전 애인과의 추억을 자꾸 묻는 사람',1,1),(38,'칼국수 vs 수제비','칼국수','수제비',1,1),(39,'가족 식사','불고기','갈비찜',1,1),(40,'영화 감상 vs 캠핑','영화 감상','캠핑',1,1),(41,'양념 고르기','간장','마라 소스',1,1),(42,'떡 vs 빵','떡','빵',1,1),(43,'플레이보이 vs 마마보이','플레이보이','마마보이',1,1),(44,'닭갈비 vs 막국수','닭갈비','막국수',1,1),(45,'카레라이스 vs 돈가스','카레라이스','돈가스',1,1),(46,'간단한 요리','스파게티','볶음밥',1,1),(47,'전 남자 친구의 절친과 사귀기 vs 절친의 전 남자 친구와 사귀기','전 남자 친구의 절친과 사귀기','절친의 전 남자 친구와 사귀기',1,1),(48,'후라이드치킨 vs 양념치킨','후라이드치킨','양념치킨',1,1),(49,'사과와 배 중에 하나만 먹을 수 있다면?','사과','배',1,1),(50,'음악 페스티벌 여행','코첼라 페스티벌','우즈 공연',1,1),(51,'캔들 만들기 vs 비누 만들기','캔들 만들기','비누 만들기',1,1),(52,'15년 연애했던 전 애인(헤어진 이후로 연락은 안 함) vs 한 달 사귀었는데 친구처럼 지내는 애인','15년 연애했던 전 애인(헤어진 이후로 연락은 안 함)','한 달 사귀었는데 친구처럼 지내는 애인',1,1),(53,'요리 수업','이탈리안 쿠킹','한식 요리',1,1),(54,'로제파스타 vs 까르보나라','로제파스타','까르보나라',1,1),(55,'토스트 vs 스프','토스트','스프',1,1),(56,'보드 게임 카페','전략 보드 게임','파티 게임',1,1),(57,'초밥과 라면 중에 하나만 먹을 수 있다면?','초밥','라면',1,1),(58,'수육 vs 홍어삼합','수육','홍어삼합',1,1),(59,'마카롱 종류 선택','딸기 마카롱','초콜릿 마카롱',1,1),(60,'베프 집에 내 애인 속옷 vs 애인 집에 내 베프 속옷','베프 집에 내 애인 속옷','애인 집에 내 베프 속옷',1,1),(61,'과일빙수 vs 인절미빙수','과일빙수','인절미빙수',1,1),(62,'산악 지형 여행','네팔 히말라야 트레킹','스위스 알프스',1,1),(63,'이혼한적 있는 애인 vs 숨겨진 자식이 있는 애인','이혼한적 있는 애인','숨겨진 자식이 있는 애인',1,1),(64,'다이어트 간식','요거트','다크 초콜릿',1,1),(65,'평화로운 자연 감상','호수 야경 감상','산 속 간헐천 산책',1,1),(66,'망고 vs 파인애플','망고','파인애플',1,1),(67,'영어 공부 vs 프랑스어 공부','영어 공부','프랑스어 공부',1,1),(68,'수상 스포츠','카약','서핑',1,1),(69,'밥버거 vs 컵라면','밥버거','컵라면',1,1),(70,'콩나물국밥 vs 뼈해장국','콩나물국밥','뼈해장국',1,1),(71,'컴퓨터 게임 vs 보드 게임','컴퓨터 게임','보드 게임',1,1),(72,'토마토 vs 방울토마토','토마토','방울토마토',1,1),(73,'떡볶이 vs 순대','떡볶이','순대',1,1),(74,'부대찌개 vs 순두부찌개','부대찌개','순두부찌개',1,1),(75,'고르곤졸라 vs 마르게리타','고르곤졸라','마르게리타',1,1),(76,'과소비 심한 vs 심한 짠돌이','과소비 심한','심한 짠돌이',1,1),(77,'피아노 연주 vs 조각','피아노 연주','조각',1,1),(78,'모자 만들기 vs 가방 만들기','모자 만들기','가방 만들기',1,1),(79,'끝나지 않는 디저트','아이스크림 샌드위치','생과일 브릭스',1,1),(80,'스파게티 vs 스테이크','스파게티','스테이크',1,1),(81,'해변 휴가','모래사장 리조트','산속 풍경 숙소',1,1),(82,'수박 vs 참외','수박','참외',1,1),(83,'수시로 똥방구 뀌는 애인 vs 수시로 트림하는 애인','수시로 똥방구 뀌는 애인','수시로 트림하는 애인',1,1),(84,'매일 소주 1병은 먹어야 잠드는 알코올 중독 vs 담배 하루 2갑피는 골초','매일 소주 1병은 먹어야 잠드는 알코올 중독','담배 하루 2갑피는 골초',1,1),(85,'자동차 수집 vs 도서 수집','자동차 수집','도서 수집',1,1),(86,'수갑 vs 채찍','수갑','채찍',1,1),(87,'서브웨이 vs 수제샌드위치','서브웨이','수제샌드위치',1,1),(88,'종교적 장소 방문','성당 투어','사원 순례',1,1),(89,'쌀국수 vs 팟타이','쌀국수','팟타이',1,1),(90,'얼리 어닝 여행','일출을 보며 여행','노을을 감상하는 여행',1,1),(91,'그림 그리기 vs 사진 찍기','그림 그리기','사진 찍기',1,1),(92,'계란후라이 vs 스팸','계란후라이','스팸',1,1),(93,'어묵 vs 붕어빵','어묵','붕어빵',1,1),(94,'치킨과 피자 중에 하나만 먹을 수 있다면?','치킨','피자',1,1),(95,'가족 식사','비빔냉면','돼지고기 김치찌개',1,1),(96,'족발 vs 보쌈','족발','보쌈',1,1),(97,'공예 클래스 참여','도예 클래스','캔들 만들기',1,1),(98,'종류별 빵','바게트','크로와상',1,1),(99,'음료수 고르기','콜라','녹차',1,1),(100,'타코야끼 vs 오코노미야끼','타코야끼','오코노미야끼',1,1),(101,'섬 여행','사무라이 섬 여행','그린랜드 여행',1,1),(102,'치즈피자 vs 페퍼로니피자','치즈피자','페퍼로니피자',1,1),(103,'화보 찍기','테마 촬영','자연에서의 화보',1,1),(104,'10살차이 연하 vs 10살차이 연상','10살차이 연하','10살차이 연상',1,1),(105,'커피믹스 vs 율무차','커피믹스','율무차',1,1),(106,'평소에 양치 절대 안 하는 애인 vs 평소에 머리 절대 안 감는 애인','평소에 양치 절대 안 하는 애인','평소에 머리 절대 안 감는 애인',1,1),(107,'빚이 30억 있는 이상형 만나기 vs 부자지만 내가 싫어하는 사람과 연애','빚이 30억 있는 이상형 만나기','부자지만 내가 싫어하는 사람과 연애',1,1),(108,'엽기떡볶이 vs 신전떡볶이','엽기떡볶이','신전떡볶이',1,1),(109,'김치찌개 vs 된장찌개','김치찌개','된장찌개',1,1),(110,'절친의 전 애인과 사귀기 vs 전 애인의 절친과 사귀기','절친의 전 애인과 사귀기','전 애인의 절친과 사귀기',1,1),(111,'이성 친구가 나 씻겨주기 vs 내가 이성 친구 씻겨주기','이성 친구가 나 씻겨주기','내가 이성 친구 씻겨주기',1,1),(112,'뿌링클 vs 허니콤보','뿌링클','허니콤보',1,1),(113,'푸짐한 자연 경치','캐나다 자연 경관','뉴질랜드의 초원',1,1),(114,'반반의 확률로 10억 받기 vs 5000만 원 받기','반반의 확률로 10억 받기','5000만 원 받기',1,1),(115,'자연 속 여행','숲속 캐빈','호수 풍경 캠핑',1,1),(116,'피아노 연주 vs 수영','피아노 연주','수영',1,1),(117,'차와 함께하는 데이트','차 테이스팅','차와 디저트 세트',1,1),(118,'매일 전화하는 유형 vs 한달에 한번 전화할까 말까 하는 유형','매일 전화하는 유형','한달에 한번 전화할까 말까 하는 유형',1,1),(119,'샐러드 vs 샌드위치','샐러드','샌드위치',1,1),(120,'철판볶음밥 vs 야끼소바','철판볶음밥','야끼소바',1,1),(121,'사막 여행','나미비아 남부 사막','미국 아리조나 안틸로프 캐니언',1,1),(122,'바람피우는데 부자인 사람과 결혼하기 vs 나를 아껴주고 사랑해주는 사람과 결혼하기','바람피우는데 부자인 사람과 결혼하기','나를 아껴주고 사랑해주는 사람과 결혼하기',1,1),(123,'짜장면 vs 짬뽕','짜장면','짬뽕',1,1),(124,'음악 감상 vs 콘서트 참여','음악 감상','콘서트 참여',1,1),(125,'미술관 데이트','현대미술 전시','고전미술 감상',1,1),(126,'탕수육 vs 깐풍기','탕수육','깐풍기',1,1),(127,'호수 야경 감상','배 타고 호수 여행','호수 야경 산책',1,1),(128,'도심 속 산책','도시 공원 투어','강변 산책로',1,1),(129,'캠핑 vs 등산','캠핑','등산',1,1),(130,'내가 좋아하는 사람이 날 싫어하게 되기 vs 나를 싫어하던 사람이 목숨 걸 만큼 날 좋아하게 되기','내가 좋아하는 사람이 날 싫어하게 되기','나를 싫어하던 사람이 목숨 걸 만큼 날 좋아하게 되기',1,1),(131,'빠네 vs 리코타치즈샐러드','빠네','리코타치즈샐러드',1,1),(132,'자전거 타기 vs 산책','자전거 타기','산책',1,1),(133,'수제 맥주 만들기 vs 와인 양조','수제 맥주 만들기','와인 양조',1,1),(134,'소고기 vs 돼지고기','소고기','돼지고기',1,1),(135,'햄버거 vs 감자튀김','햄버거','감자튀김',1,1),(136,'삼각 vs 사각','삼각','사각',1,1),(137,'등산 vs 캠핑','등산','캠핑',1,1),(138,'음료수 선택','오렌지 주스','사이다',1,1),(139,'회 vs 매운탕','회','매운탕',1,1),(140,'캘리그라피 쓰기 vs 손글씨 쓰기','캘리그라피 쓰기','손글씨 쓰기',1,1),(141,'영화 감상 vs 만화책 읽기','영화 감상','만화책 읽기',1,1),(142,'양식 선택','카프레제 샐러드','포테이토 그라탕',1,1),(143,'캠퍼스 데이트','도서관에서 책 읽기','공원에서 피크닉',1,1),(144,'데이트 액티비티 선택','요가 수업','그림 그리기 수업',1,1),(145,'커피 vs 차','라떼','히비스커스 티',1,1),(146,'도심 속 휴가','도심 속 풀빌라','도시 스파 호텔',1,1),(147,'스포츠 경기 관람','야구 경기','축구 경기',1,1),(148,'삼계탕 vs 닭죽','삼계탕','닭죽',1,1),(149,'왜 화났는지 끝까지 말 안하는 애인 vs 화 날 때마다 이유 말하면서 하나하나 다 따지는 애인','왜 화났는지 끝까지 말 안하는 애인','화 날 때마다 이유 말하면서 하나하나 다 따지는 애인',1,1),(150,'뮤지엄 카페','미술관 카페','과학 박물관 카페',1,1),(151,'여행 컴퍼니 선택','국내 여행사','세계 여행사',1,1),(152,'빚 100억 있는 최애 연예인과 결혼 vs 자산 100억 있는 일반인과 결혼','빚 100억 있는 최애 연예인과 결혼','자산 100억 있는 일반인과 결혼',1,1),(153,'자전거 타기 vs 독서','자전거 타기','독서',1,1),(154,'놀이동산 데이트','롤러코스터 타기','푸드 페스티벌 즐기기',1,1),(155,'짜장밥 vs 오므라이스','짜장밥','오므라이스',1,1),(156,'레트로 여행','스팀 기차 여행','비행기 없이 여행하기',1,1),(157,'전시회 관람','사진전','공예 전시회',1,1),(158,'미드나잇 무비','야외 무비 나이트','홈시어터 무비 나이트',1,1),(159,'도시 여행','도심 호텔','아트 갤러리 숙소',1,1),(160,'매일 1시간 이상 운동하자는 애인 vs 매일 1시간 이상 맛있는거 먹자는 애인','매일 1시간 이상 운동하자는 애인','매일 1시간 이상 맛있는거 먹자는 애인',1,1),(161,'독서 vs 오디오 북','독서','오디오 북',1,1),(162,'종류별 빵','프렌치 토스트','파이',1,1),(163,'핫도그 vs 소시지','핫도그','소시지',1,1),(164,'연어초밥 vs 광어초밥','연어초밥','광어초밥',1,1),(165,'1년 동안 폰 없이 살기 vs 1년동안 친구 없기','1년 동안 폰 없이 살기','1년동안 친구 없기',1,1),(166,'매운 음식','매운 라면','매운 양념 치킨',1,1),(167,'끝나지 않는 디저트','아이스크림','와플',1,1),(168,'월 200만 원 백수 되기 vs 월 600만 원 직장인(정년까지 일 못 그만둠)','월 200만 원 백수 되기','월 600만 원 직장인(정년까지 일 못 그만둠)',1,1),(169,'동물원 데이트','동물 돌보기 체험','동물쇼 감상',1,1),(170,'결혼했는데 전 남자 친구or 전 여자 친구 옆집 vs 결혼했는데 배우자의 전남친 or 전여친 옆집','결혼했는데 전 남자 친구or 전 여자 친구 옆집','결혼했는데 배우자의 전남친 or 전여친 옆집',1,1),(171,'바다 경치 즐기기','해변 산책','배 타기',1,1),(172,'돼지갈비 vs 소갈비','돼지갈비','소갈비',1,1),(173,'닭발 vs 오돌뼈','닭발','오돌뼈',1,1),(174,'항공사 선택','에미레이트 항공','대한항공',1,1),(175,'드라마 시청 vs 영화 감상','드라마 시청','영화 감상',1,1),(176,'식물성 식품','토마토 샐러드','콩고기',1,1),(177,'짜파게티 vs 불닭볶음면','짜파게티','불닭볶음면',1,1),(178,'불족발 vs 마늘족발','불족발','마늘족발',1,1),(179,'여름에 히터 틀고 자기 vs 겨울에 에어컨 켜고 자기','여름에 히터 틀고 자기','겨울에 에어컨 켜고 자기',1,1),(180,'다이어트 간식','고구마 스틱','라이트 치즈',1,1),(181,'올림픽 체험','클라이밍 체험','활쏘기 체험',1,1),(182,'해물파전 vs 김치전','해물파전','김치전',1,1),(183,'음악 공연 관람','콘서트','재즈 바에서 음악 감상',1,1),(184,'비빔밥 vs 제육볶음','비빔밥','제육볶음',1,1),(185,'내가 준 선물 당근마켓에 파는 애인 vs 내가 준 선물 다른 사람한테 그대로 선물하는 애인','내가 준 선물 당근마켓에 파는 애인','내가 준 선물 다른 사람한테 그대로 선물하는 애인',1,1),(186,'사과 vs 배','사과','배',1,1),(187,'드론 조종 vs 모형 비행기 조립','드론 조종','모형 비행기 조립',1,1),(188,'아이스크림 vs 팥빙수','아이스크림','팥빙수',1,1),(189,'사진 편집 vs 동영상 편집','사진 편집','동영상 편집',1,1),(190,'부모님 원수와 바람난 애인 vs 내 애인과 바람 핀 절친','부모님 원수와 바람난 애인','내 애인과 바람 핀 절친',1,1),(191,'점심 도시락','도시락 삼각김밥','햄 샌드위치',1,1),(192,'모르는 사람 과실로 폰 깨졌는데 사과도 안 하고 가기 vs 친구 과실로 폰 깨졌는데 이후로 잠적하기','모르는 사람 과실로 폰 깨졌는데 사과도 안 하고 가기','친구 과실로 폰 깨졌는데 이후로 잠적하기',1,1),(193,'테마파크 여행','디즈니랜드','유니버설 스튜디오',1,1),(194,'간단한 요리','닭가슴살 샐러드','미트볼 스파게티',1,1),(195,'숲속 여행','아마존 정글 투어','캐나다 밴쿠버 섬 나무군락',1,1),(196,'미술 전시회 관람 vs 공예 수업','미술 전시회 관람','공예 수업',1,1),(197,'반려동물 동반 데이트','강아지와 산책','고양이와 놀이',1,1),(198,'요리 vs 베이킹','요리','베이킹',1,1),(199,'음악 감상 vs 악기 연주','음악 감상','악기 연주',1,1),(200,'만두 vs 찐빵','만두','찐빵',1,1),(201,'마을 체험 여행','프랑스 시골 마을 투어','일본 전통 산책로',1,1),(202,'비치 리조트','말디브 리조트','피지 섬 리조트',1,1),(203,'라볶이 vs 쫄볶이','라볶이','쫄볶이',1,1),(204,'피아노 연주 vs 기타 연주','피아노 연주','기타 연주',1,1),(205,'세계 자연 유산 여행','그랜드 캐니언','아마존 우림',1,1),(206,'간식 선택','과일','나쵸',1,1),(207,'허니문 여행지','몰디브 리조트','세이셸스 아일랜드 여행',1,1),(208,'매일 사랑을 표현하는 애인 vs 말 없이 깜짝 이벤트 해주는 애인','매일 사랑을 표현하는 애인','말 없이 깜짝 이벤트 해주는 애인',1,1),(209,'똥 안 먹었는데 먹었다고 소문나기 vs 진짜로 먹었는데 아무도 모르기','똥 안 먹었는데 먹었다고 소문나기','진짜로 먹었는데 아무도 모르기',1,1),(210,'문화 체험 여행','일본 전통 예술 감상','인도 춤추는 축제 참여',1,1),(211,'미술 클래스 체험','유화 그리기','도자기 만들기',1,1),(212,'삼겹살 vs 목살','삼겹살','목살',1,1),(213,'평생 탄산 안 마시기 vs 평생 라면 못 먹기','평생 탄산 안 마시기','평생 라면 못 먹기',1,1),(214,'레저 스포츠 여행','스노클링 리조트','골프 여행',1,1),(215,'로또 당첨되면 애인에게 바로 말한다 vs 숨긴다','로또 당첨되면 애인에게 바로 말한다','숨긴다',1,1),(216,'요가 클래스 참여','실내 요가','야외 요가',1,1),(217,'바다 놀러갔는데 건물 안에만 있으려는 친구 vs 바다 놀러 갔는데 해산물 먹기 싫다는 친구','건물에만 있으려는 친구','바다 놀러 갔는데 해산물 먹기 싫다는 친구',1,1),(218,'휴양지 선택','괌 여행','하와이 여행',1,1),(219,'새우깡 vs 오징어집','새우깡','오징어집',1,1),(220,'도심 속 놀이터','런던 아쿠아리움','뉴욕 센트럴 파크',1,1),(221,'매운 음식','떡볶이','마라탕',1,1),(222,'양념 고르기','간장','고추장',1,1),(223,'바둑 vs 체스','바둑','체스',1,1),(224,'바다와 산 여행','알래스카 크루즈 여행','알고나 산맥 트레킹',1,1),(225,'양꼬치 vs 꿔바로우','양꼬치','꿔바로우',1,1),(226,'잔치국수 vs 비빔국수','잔치국수','비빔국수',1,1),(227,'요가 vs 사진 찍기','요가','사진 찍기',1,1),(228,'섬나라 여행','마요르카 섬','세이셸스 아일랜드',1,1),(229,'알리오올리오 vs 봉골레','알리오올리오','봉골레',1,1),(230,'요가 vs 필라테스','요가','필라테스',1,1),(231,'캠핑 데이트','캠프파이어','텐트에서 별보기',1,1),(232,'엄마 친구랑 연애하기 vs 친구 엄마랑 연애하기','엄마 친구랑 연애하기','친구 엄마랑 연애하기',1,1),(233,'낚시 vs 스쿠버 다이빙','낚시','스쿠버 다이빙',1,1),(234,'만화책 읽기 vs 소설 읽기','만화책 읽기','소설 읽기',1,1),(235,'자연 속 피크닉','산에서 소풍','호수 앞에서 소풍',1,1),(236,'불고기버거 vs 새우버거','불고기버거','새우버거',1,1),(237,'초코우유 vs 딸기우유','초코우유','딸기우유',1,1),(238,'스낵 타임','견과류 믹스','팝콘',1,1),(239,'육개장 vs 갈비탕','육개장','갈비탕',1,1),(240,'식도락 여행','이탈리아 와인 투어','프랑스 치즈 테이스팅',1,1),(241,'동남아 여행','태국 방콕','필리핀 세부',1,1),(242,'돈가스 vs 생선가스','돈가스','생선가스',1,1),(243,'커플 마사지','스파 마사지','발 마사지',1,1),(244,'콜라 vs 사이다','콜라','사이다',1,1),(245,'액티비티 중심 여행','스키 리조트','서핑 핫스팟',1,1),(246,'커피 vs 차','아메리카노','홍차',1,1),(247,'이상형 팬티 속에 손넣기 vs 내 팬티 속에 이상형 손 들어오기','이상형 팬티 속에 손넣기','내 팬티 속에 이상형 손 들어오기',1,1),(248,'쭈꾸미삼겹살 vs 대패삼겹살','쭈꾸미삼겹살','대패삼겹살',1,1),(249,'고구마피자 vs 포테이토피자','고구마피자','포테이토피자',1,1),(250,'캐릭터 카페','디즈니 캐릭터 카페','만화 캐릭터 카페',1,1),(251,'과자 vs 젤리','과자','젤리',1,1),(252,'간편 간식','과자','떡',1,1),(253,'호캉스','오션뷰 룸','히든 플로팅 풀',1,1),(254,'참치김밥 vs 치즈김밥','참치김밥','치즈김밥',1,1),(255,'사진 찍기 여행','알레프라 포토 투어','유럽 거리 사진 찍기',1,1),(256,'김밥 vs 라면','김밥','라면',1,1),(257,'공원 데이트','피크닉','자전거 라이딩',1,1),(258,'반려동물 키우기 vs 식물 키우기','반려동물 키우기','식물 키우기',1,1),(259,'요가 vs 산책','요가','산책',1,1),(260,'연락 없이 항상 1시간 늦는 애인 vs 항상 1시간 일찍 나와 독촉하는 애인','연락 없이 항상 1시간 늦는 애인','항상 1시간 일찍 나와 독촉하는 애인',1,1),(261,'공원 피크닉 vs 산책','공원 피크닉','산책',1,1),(262,'자장면 vs 짬뽕밥','자장면','짬뽕밥',1,1),(263,'군만두 vs 찐만두','군만두','찐만두',1,1),(264,'룸메 코 시끄럽게 자는 것 vs 일주일에 한 번만 씻는 룸메','코 시끄럽게 자는 룸메','일주일에 한 번만 씻는 룸메',1,1),(265,'미술 전시회 관람 vs 사진 찍기','미술 전시회 관람','사진 찍기',1,1),(266,'마라탕 vs 마라샹궈','마라탕','마라샹궈',1,1),(267,'가족과 함께하는 데이트','동물원 가족 투어','테마파크 가족 데이트',1,1),(268,'흘러내릴 정도로 박시하게 입는 애인 vs 딱 달라붙는 옷 입는 애인','흘러내릴 정도로 박시하게 입는 애인','딱 달라붙는 옷 입는 애인',1,1),(269,'아구찜 vs 해물찜','아구찜','해물찜',1,1),(270,'파전 vs 막걸리','파전','막걸리',1,1),(271,'닭볶음탕 vs 찜닭','닭볶음탕','찜닭',1,1),(272,'고양이상 vs 강아지상','고양이상','강아지상',1,1),(273,'밤하늘 관측','별자리 찾기','월광 보며 이야기 나누기',1,1),(274,'키즈 놀이터','놀이동산 데이트','야외 피크닉',1,1),(275,'귤 vs 오렌지','귤','오렌지',1,1),(276,'외모 빼고 모든 것이 안 맞는 애인 vs 외모 빼고 모든 것이 잘 맞는 애인','외모 빼고 모든 것이 안 맞는 애인','외모 빼고 모든 것이 잘 맞는 애인',1,1),(277,'서점 데이트','소설 읽기','시집 읽기',1,1),(278,'케이크 vs 마카롱','케이크','마카롱',1,1),(279,'국밥 vs 해장국','국밥','해장국',1,1),(280,'드라마 시청 vs 음악 감상','드라마 시청','음악 감상',1,1),(281,'미니 골프','야외 미니 골프','실내 미니 골프',1,1),(282,'원하는 얼굴로 태어나기 vs 원하는 몸매로 태어나기','원하는 얼굴로 태어나기','원하는 몸매로 태어나기',1,1),(283,'넷플릭스 평생 금지 vs 인스타그램 평생 금지','넷플릭스 평생 금지','인스타그램 평생 금지',1,1),(284,'하와이안피자 vs 콤비네이션피자','하와이안피자','콤비네이션피자',1,1),(285,'닌자 트레이닝 vs 사격 연습','닌자 트레이닝','사격 연습',1,1),(286,'카페 데이트','아트 카페','앤틱 카페',1,1),(287,'콘치즈 vs 감바스','콘치즈','감바스',1,1),(288,'수영 vs 달리기','수영','달리기',1,1),(289,'설렁탕 vs 곰탕','설렁탕','곰탕',1,1),(290,'건강 간식','허니 알몬드','건조 과일 믹스',1,1),(291,'점심 도시락','김밥','샐러드',1,1),(292,'패스트푸드','치즈버거','핫크리스피 치킨',1,1),(293,'야식 고르기','라면','치킨',1,1),(294,'역사 여행','로마 유적지 탐방','경주 역사 마을 숙박',1,1),(295,'종교적 명소 여행','이스라엘 예루살렘','인도 바라나시',1,1),(296,'캠핑 vs 글램핑','캠핑카 여행','글램핑 트립',1,1),(297,'이상형 만나는 대신 평생 친구 잃기 vs 평범한 사람 만나기','이상형 만나는 대신 평생 친구 잃기','평범한 사람 만나기',1,1),(298,'피아노 연주 vs 노래 부르기','피아노 연주','노래 부르기',1,1),(299,'항상 불 환하게 키고 자는 룸메(불 끄면 일어나서 다시 끔) vs 밤마다 몰래 타자기 두드리는 룸메(시끄럽지는 않은데 거슬림)','불 환하게 키고 자는 룸메','밤마다 몰래 타자기 두드리는 룸메',1,1),(300,'전통 차 소품 만들기','한지공예','도예 수업',1,1),(301,'초밥 vs 가락국수','초밥','가락국수',1,1),(302,'숲속 숙박','트리하우스 숙소','숲속 캠핑',1,1),(303,'샤브샤브 vs 월남쌈','샤브샤브','월남쌈',1,1),(304,'스포츠 관람 vs 운동','스포츠 관람','운동',1,1),(305,'양식 선택','피자','스테이크',1,1),(306,'놀이 공원 여행','롯데월드 어드벤처','에버랜드',1,1),(307,'여행 용품 선택','백팩','캐리어',1,1),(308,'과거 숨기는 애인 vs 내 과거 캐고 다니는 애인','과거 숨기는 애인','내 과거 캐고 다니는 애인',1,1),(309,'축제 참가 여행','톰소네 축제','리우 카니발',1,1),(310,'친구와 더블 데이트','볼링','칵테일 바에서 맥주 마시기',1,1),(311,'나를 좋아하는 사람 vs 내가 좋아하는 사람','나를 좋아하는 사람','내가 좋아하는 사람',1,1),(312,'독심술 초능력 생겼는데 모든 사람 생각 읽기 vs 거짓말하면 죽는 병 걸리기','독심술 초능력 생겼는데 모든 사람 생각 읽기','거짓말하면 죽는 병 걸리기',1,1),(313,'얼굴 vs 몸매','얼굴','몸매',1,1),(314,'디저트 고르기','아이스크림','과일 타르트',1,1),(315,'간섭 하나도 안하는 방목형 vs 1분1초라도 연락안되면 불안해하는 불안형','간섭 하나도 안하는 방목형','1분1초라도 연락안되면 불안해하는 불안형',1,1),(316,'반려동물 카페','고양이 카페','강아지 카페',1,1),(317,'디저트 고르기','파르페','크레페',1,1),(318,'자유로운 일정 여행','방황하는 여행','계획적인 여행',1,1),(319,'말 없이 스킨십만 하는 연애 vs 스킨십 없이 말만 하는 연애','말 없이 스킨십만 하는 연애','스킨십 없이 말만 하는 연애',1,1),(320,'알아서 잘하는 연애고수 vs 하나부터 열까지 가르쳐야 하는 연애초보','알아서 잘하는 연애고수','하나부터 열까지 가르쳐야 하는 연애초보',1,1),(321,'전 여친(남친)의 현 애인 vs 현 여친(남친)의 전 애인','전 여친(남친)의 현 애인','현 여친(남친)의 전 애인',1,1),(322,'허브 화장품 만들기','로즈마리 샴푸','라벤더 로션',1,1),(323,'묶이기 vs 묶기','묶이기','묶기',1,1),(324,'바이올린 연주 듣기','클래식 음악회','스트리트 음악 듣기',1,1),(325,'약속해서 만났는데 핸드폰만 보는 사람 vs 약속은 항상 먼저 잡으면서 돈은 절대 안 내는 사람','약속해서 만났는데 핸드폰만 보는 사람','약속은 항상 먼저 잡으면서 돈은 절대 안 내는 사람',1,1),(326,'간장치킨 vs 양념치킨','간장치킨','양념치킨',1,1),(327,'비오는 날 데이트','카페에서 차 마시기','영화관에서 영화 보기',1,1),(328,'피자 종류 선택','페퍼로니 피자','치즈 바베큐 피자',1,1),(329,'홍대 한복판에서 프로포즈 vs 집에서 깜짝 프로포즈','홍대 한복판에서 프로포즈','집에서 깜짝 프로포즈',1,1),(330,'냉모밀 vs 판모밀','냉모밀','판모밀',1,1),(331,'양념 고르기','후식 소스','마요네즈',1,1),(332,'물냉면 vs 비빔냉면','물냉면','비빔냉면',1,1),(333,'식물성 식품','퀴노아 샐러드','비건 버거',1,1),(334,'딸기 vs 바나나','딸기','바나나',1,1),(335,'유적지 탐방 여행','페루 마추픽추','이집트 피라미드',1,1),(336,'아시아 여행','발리 여행','도쿄 여행',1,1),(337,'잠수 이별 vs 환승 이별','잠수 이별','환승 이별',1,1),(338,'음료수 고르기','아이스 티','스무디',1,1),(339,'수제버거 vs 수제샌드위치','수제버거','수제샌드위치',1,1),(340,'신라면 vs 너구리','신라면','너구리',1,1),(341,'홈 카페 데이트','홈메이드 커피','홈베이킹 먹기',1,1),(342,'다국적 요리','타코스','카레라이스',1,1),(343,'크림파스타 vs 토마토파스타','크림파스타','토마토파스타',1,1),(344,'볶음밥 vs 덮밥','볶음밥','덮밥',1,1),(345,'잠수 이별 vs 환승 이별','잠수 이별','환승 이별',1,1),(346,'드라이브 데이트','해안도로 드라이브','산악 도로 드라이브',1,1),(347,'스파게티와 라자냐 중에 하나만 먹을 수 있다면?','스파게티','라자냐',1,1),(348,'유럽 여행','파리 여행','프라하 여행',1,1),(349,'장어구이 vs 조개구이','장어구이','조개구이',1,1),(350,'애인한테 꼬리 치는 베프 vs 베프한테 꼬리 치는 애인','애인한테 꼬리 치는 베프','베프한테 꼬리 치는 애인',1,1),(351,'초콜릿 vs 사탕','초콜릿','사탕',1,1),(352,'체험 레스토랑','어둠 속 레스토랑','기차 레스토랑',1,1),(353,'체스 vs 바둑','체스','바둑',1,1),(354,'전 애인과 술 한잔 하기 vs 이성 친구와 1박 2일 놀러 가기','전 애인과 술 한잔 하기','이성 친구와 1박 2일 놀러 가기',1,1),(355,'백숙 vs 오리백숙','백숙','오리백숙',1,1),(356,'테마파크 데이트','롤러코스터 타기','테마파크 쇼 감상',1,1),(357,'요가 수련 vs 명상','요가 수련','명상',1,1),(358,'100%확률로 1억 벌기 vs 50% 확률로 20억 받기','100%확률로 1억 벌기','50% 확률로 20억 받기',1,1),(359,'포도주 투어','프랑스 와인 투어','이탈리아 와인 투어',1,1),(360,'새 신발인데 물웅덩이에 빠지고 1시간 이상 돌아다니기 vs 양말 젖어서 1시간 이상 돌아다니는데 발 냄새 심하게 나기','새 신발인데 물웅덩이에 빠지고 1시간 이상 돌아다니기','양말 젖어서 1시간 이상 돌아다니는데 발 냄새 심하게 나기',1,1),(361,'김밥과 샌드위치 중에 하나만 먹을 수 있다면?','김밥','샌드위치',1,1),(362,'다이빙 vs 서핑','다이빙','서핑',1,1),(363,'일몰 감상 여행','샌프란시스코 골든게이트 일몰','세이로섬 일본 해안 일몰',1,1),(364,'요가 vs 독서','요가','독서',1,1),(365,'지하 도시 탐험','카푸아 카빌레','뿌리 자그마한 지하 마을',1,1),(366,'쇼핑 몰 투어','의류 쇼핑','가전제품 쇼핑',1,1);
/*!40000 ALTER TABLE `balance_game` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-08 14:03:54
