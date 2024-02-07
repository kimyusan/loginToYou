package com.ssafy.spyfamily.user.controller;

import com.google.api.Http;
import com.ssafy.spyfamily.user.dto.FCMNotificationRequestDto;
import com.ssafy.spyfamily.user.model.User;
import com.ssafy.spyfamily.user.service.FCMNotificationService;
import com.ssafy.spyfamily.user.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/fcm")
@Slf4j
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}, maxAge = 6000)
public class FCMNotificationApiController {

    private final FCMNotificationService fcmNotificationService;
    private final UserService userService;

    @PostMapping("/notification")
    @Transactional
    public ResponseEntity<?> sendNotificationByToken(@RequestBody FCMNotificationRequestDto requestDto) {
        // 상대방 유저 아이디 가져오기  로직
        log.info(" /fcm/notification 시작 requestDTo : " + requestDto);

        try {
            Integer otherUserId = fcmNotificationService.selectOtherUserId(requestDto.getUserId());

            //메세지 보내기
            String message =  fcmNotificationService.sendNotificationByToken(requestDto, otherUserId);

            return new ResponseEntity<String>(message, HttpStatus.OK);
        } catch (Exception e ){
            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
        }

    }

    //상대방 유저 아이디 조회후 상대방 fcm 토큰 가져오기
    @GetMapping("/search/other/fcm")
    public ResponseEntity<?>  searchOtherUserFcmToken(@RequestParam Integer UserId){

        try {
            Integer otherUserId = fcmNotificationService.selectOtherUserId(UserId);

            User user =userService.findByUserId(otherUserId);

            if (user.getIsPushOk()){
                String fcmToken = user.getFcmToken();
                return new ResponseEntity<String>(fcmToken, HttpStatus.OK);
            } else {

                return new ResponseEntity<>("상대방 수신알림 거부", HttpStatus.OK);
            }
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
        }

    }

    @PostMapping("/setting")
    public ResponseEntity<?> setIsPushOk( @RequestParam Integer userId , @RequestParam boolean isPushOk ){

        try {
            fcmNotificationService.setIsPushOK(userId , isPushOk );

            return new ResponseEntity<Void>(HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
        }

    }

    @PostMapping("/issue/fcmtoken")
    public ResponseEntity<?> issueFcmtoken(@RequestParam Integer userId, @RequestParam String fcmToken ){
//        log.info("fcm/issue/token/ 실행 userId : fcmtoken :" + userId +" " + fcmToken );

        try {
            fcmNotificationService.issueFcmtoken(userId, fcmToken);

            return  new ResponseEntity<Void>(HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return  new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
        }
    }


}