# 언제, 어디서나, 당신과 함께. "너에게, 로그인"

광주 2반 C105

## 1. 개요

프로젝트 명 : 너에게, 로그인
프로젝트 기간 : 2024-01-08 ~ 2024-02-16 (6주)
프로젝트 개요 : WebRTC 기술을 활용한 커플 다이어리 서비스
<br>
<br>
<br>

## 2. 기획배경

서로를 잘 모르는 커플들, 원거리 연애를 하는 커플등 자주 만나지 못하는 커플들을 위한
원거리 교류 애플리케이션의 필요성의 대두
<br>
<br>
<br>

## 3. 주요 기능

1. 원거리에 있는 연인과 동시에 사진 촬영

- MediaPipe를 활용한 원거리 사진 합성 기술
- WebRTC를 활용한 원거리 영상통화 기술

![사진찍기](https://github.com/JoSuhun/TIL/assets/91961052/14dd59e3-8b60-43ab-88bd-39b9d274c255)



2. 촬영한 사진을 활용한 다이어리 작성

- 일별 촬영 사진 모아보기 기능
- 그 날의 대표이미지 설정 기능
- 일별 사진이 포함된 다이어리 작성 가능

![diary](https://github.com/JoSuhun/TIL/assets/91961052/80f5fa35-b0c4-4d72-8ee0-a142c441b6e9)

3.  영상통화 및 채팅 기능

- WebSocket을 활용한 채팅 기능
- WebRTC를 활용한 영상통화 기능

![채팅1](https://github.com/JoSuhun/TIL/assets/91961052/0b8d48b7-a196-4aa7-ba36-89a31de5c83d)
![영통](https://github.com/JoSuhun/TIL/assets/91961052/6074d7b8-a66e-44d5-be46-db311134e1df)


## 4. 기술 스택

### 4.1 Front End

<img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=Typescript&logoColor=white">
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">
<img src="https://img.shields.io/badge/WebRTC-333333?style=for-the-badge&logo=WebRTC&logoColor=white"/>
<img src="https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&logo=PWA&logoColor=white"/>
<img src="https://img.shields.io/badge/AXIOS-5A29E4?style=for-the-badge&logo=AXIOS&logoColor=white"/>
<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=wihte"/>
<img src="https://img.shields.io/badge/Mui-007FFF?style=for-the-badge&logo=Mui&logoColor=white"/>

### 4.2 Back End

<img src="https://img.shields.io/badge/SpringBoot-6DB33F?style=for-the-badge&logo=SpringBoot&logoColor=white"/>
<img src="https://img.shields.io/badge/STOMP-010101?style=for-the-badge"/>
<img src="https://img.shields.io/badge/SpringSecurity-6DB33F?style=for-the-badge&logo=SpringSecurity&logoColor=white"/>
<img src="https://img.shields.io/badge/KAKAO-FFCD00?style=for-the-badge&logo=Kakao&logoColor=black">
<img src="https://img.shields.io/badge/Java-E79537?style=for-the-badge"/>
<img src="https://img.shields.io/badge/JPA-2496ED?style=for-the-badge"/>
<img src="https://img.shields.io/badge/Lombok-EB1F1F?style=for-the-badge"/>
<img src="https://img.shields.io/badge/JWT-184D66?style=for-the-badge"/>

#### DB

<img src="https://img.shields.io/badge/MySql-4479A1?style=for-the-badge&logo=MySql&logoColor=white"/>

### Deployment

<img src="https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=Jenkins&logoColor=black">
<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white">
<img src="https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=Nginx&logoColor=white">

#### Server

<img src="https://img.shields.io/badge/EC2-FF9900?style=for-the-badge&logo=EC2&logoColor=white"/>

### Communication

<img src="https://img.shields.io/badge/Gitlab-FC6D26?style=for-the-badge&logo=Gitlab&logoColor=white">
<img src="https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=JiraSoftware&logoColor=white">
<img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white">
<img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white">

## 5. 시스템 구조도

![Web App Reference Architecture (5)](https://github.com/giyoung-Lee/Hub/assets/19604808/d75bf7ed-24c9-4b33-9e55-de11b1b52b7c){: width="50%" height="50%"}

## 6. API 설계

![main_camera](https://github.com/giyoung-Lee/Hub/assets/19604808/29e21fe8-8a6c-414f-9c74-42c078058ccc)

## 7. 팀 구성원

### 7.1. Front-end

<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky">팀원</th>
    <th class="tg-0pky">김영일</th>
    <th class="tg-0pky">조수훈</th>
    <th class="tg-0pky">백민정</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky">GitHub</td>
    <td class="tg-0pky">-</td>
    <td class="tg-0pky">-</td>
    <td class="tg-0pky">-</td>
  </tr>
  <tr>
    <td class="tg-0pky">역할 및 담당 기능</td>
    <td class="tg-0pky">
    - FE 리더<br>
    - MediaPipe<br>
    - WebRTC<br>
    - </td>
    <td class="tg-0pky">
    - 서기<br>
    - UI/UX 설계<br>
    - FCM Push<br>
    - WebRTC</td>
    <td class="tg-0pky">
    - 팀장
    - STOMP<br>
    - UI/UX<br>
    - JWT</td>
  </tr>
</tbody>
</table>

<br>

### 7.2. Back-end

<table>
<thead>
  <tr>
    <th class="tg-0pky">팀원</th>
    <th class="tg-0pky">김유산</th>
    <th class="tg-0pky">이기영</th>
    <th class="tg-0pky">이항우</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky">GitHub</td>
    <td class="tg-0pky">-</td>
    <td class="tg-0pky">-</td>
    <td class="tg-0pky">-</td>
  </tr>
  <tr>
    <td class="tg-0pky">역할 및 담당 기능</td>
    <td class="tg-0pky">
    - BE 리더<br>
    - REST API<br>
    - WebSocket.io <br>
    - FCM Push <br>
    - JWT</td>
    <td class="tg-0pky">
    - API 총괄
    - REST API<br>
    - oAuth 2.0<br>
    - Image Handling <br>
    - ERD 설계 </td>
    <td class="tg-0pky">
    - DevOps <br>
    - REST API <br>
    - CI/CD <br>
    - EC2 Server</td>
  </tr>
</tbody>
</table>

## 8. 팀 노션 페이지
https://booming-ceiling-4b5.notion.site/b66fda469031406dbba5a4e9704c900d?pvs=4

<br><br>
