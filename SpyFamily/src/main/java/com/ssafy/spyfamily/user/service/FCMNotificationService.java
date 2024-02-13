package com.ssafy.spyfamily.user.service;


import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import com.ssafy.spyfamily.couple.model.Couple;
import com.ssafy.spyfamily.couple.repository.CoupleRepository;
import com.ssafy.spyfamily.user.dto.FCMNotificationRequestDto;
import com.ssafy.spyfamily.user.model.User;
import com.ssafy.spyfamily.user.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

@Service
@Slf4j
public class FCMNotificationService {

    private final FirebaseMessaging firebaseMessaging;
    private final UserRepository userRepository;
    private final CoupleRepository coupleRepository;

    public FCMNotificationService(FirebaseMessaging firebaseMessaging , UserRepository userRepository, CoupleRepository coupleRepository){
        this.firebaseMessaging = firebaseMessaging;
        this.userRepository = userRepository;
        this.coupleRepository = coupleRepository;
    }

    public String sendNotificationByToken(FCMNotificationRequestDto requestDto, Integer otherUserId) {

        Optional<User> user = userRepository.findById(otherUserId);

        if (user.isPresent()) {
            if (user.get().getFcmToken() != null) {
                Notification notification = Notification.builder()
                        .setTitle(requestDto.getTitle())
                        .setBody(requestDto.getBody())
                        // .setImage(requestDto.getImage())
                        .build();

                Message message = Message.builder()
                        .setToken(user.get().getFcmToken())
                        .setNotification(notification)
                        // .putAllData(requestDto.getData())
                        .build();

                try {
                    firebaseMessaging.send(message);
                    return "알림을 성공적으로 전송했습니다. targetUserId=" + otherUserId;
                } catch (FirebaseMessagingException e) {
                    e.printStackTrace();
                    return "알림 보내기를 실패하였습니다. targetUserId=" + otherUserId;
                }
            } else {
                return "서버에 저장된 해당 유저의 FirebaseToken이 존재하지 않습니다. targetUserId=" + otherUserId;
            }

        } else {
            return "해당 유저가 존재하지 않습니다. targetUserId=" + otherUserId;
        }


    }

    public void issueFcmtoken(Integer userId, String fcmToken) {


        User user = userRepository.findByUserId(userId);
        user.setFcmToken(fcmToken);

        userRepository.save(user);
    }

    public void setIsPushOK(Integer userId, boolean isPushOk) {
        User user = userRepository.findByUserId(userId);

        user.setIsPushOk(isPushOk);

        userRepository.save(user);

    }


    public Integer selectOtherUserId(Integer userId) {
        Optional<User> user = userRepository.findById(userId);

        Integer coupleId = user.get().getCoupleId();

        Couple couple = coupleRepository.findByCoupleId(coupleId);
        log.info(couple.toString());

        Integer otherUserId = 0;
        if (!Objects.equals(couple.getFUserId(), userId)) {
        otherUserId = couple.getFUserId();
        } else if (!Objects.equals(couple.getSUserId(), userId)) {
        otherUserId = couple.getSUserId();
        }

        return otherUserId;
    }
}