package com.ssafy.spyfamily.couple.service;

import com.ssafy.spyfamily.couple.model.Couple;
import com.ssafy.spyfamily.user.model.User;

import java.util.ArrayList;

public interface CoupleService {

    // 커플방 만들기
    Couple coupleCteate(String userA, String userB);

    ArrayList<Object> mainCoupleInfo(Integer coupleId);

}
