package com.ssafy.spyfamily.user.controller;

import com.ssafy.spyfamily.user.dto.FCMNotificationRequestDto;
import com.ssafy.spyfamily.user.service.FCMNotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/fcm")
public class FCMNotificationApiController {

    private final FCMNotificationService fcmNotificationService;


    @PostMapping("/notification")
    public ResponseEntity<?> sendNotificationByToken(@RequestBody FCMNotificationRequestDto requestDto) {
        // 상대방 유저 아이디 가져오기  로직

        Integer otherUserId = fcmNotificationService.selectOtherUserId(requestDto.getUserId());

        //메세지 보내기
        String message =  fcmNotificationService.sendNotificationByToken(requestDto, otherUserId);

        return new ResponseEntity<String>(message, HttpStatus.OK);
    }



    @PostMapping("/setting")
    public ResponseEntity<?> setIsPushOk( @RequestParam Integer userId , @RequestParam boolean isPushOk ){

        try {
            fcmNotificationService.setIsPushOK(userId , isPushOk );

            return  new ResponseEntity<Void>(HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return  new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
        }

    }

    @PostMapping("/issue/fcmtoken")
    public ResponseEntity<?> issueFcmtoken(@RequestBody Integer userId, @RequestBody String fcmToken ){


        try {
            fcmNotificationService.issueFcmtoken(userId, fcmToken);

            return  new ResponseEntity<Void>(HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return  new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
        }
    }


}