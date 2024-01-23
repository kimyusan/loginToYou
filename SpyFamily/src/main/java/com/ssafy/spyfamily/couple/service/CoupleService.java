package com.ssafy.spyfamily.couple.service;

import com.ssafy.spyfamily.couple.model.Couple;

import java.util.ArrayList;

public interface CoupleService {

    // 커플방 만들기
    Couple coupleCteate(String userA, String userB);

    ArrayList<Couple> mainCoupleInfo(Integer couple_id);

}
