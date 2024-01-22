package com.ssafy.spyfamily.couple.service;

import com.ssafy.spyfamily.couple.model.Couple;

public interface CoupleService {


    // 커플방 만들기
    Couple coupleCteate(String userA, String userB);
}
