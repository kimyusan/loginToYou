package com.ssafy.spyfamily.couple.service;

import com.ssafy.spyfamily.couple.model.Couple;
import com.ssafy.spyfamily.couple.repository.CoupleRepository;
import com.ssafy.spyfamily.user.model.User;
import com.ssafy.spyfamily.user.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;
import java.util.zip.CheckedOutputStream;

@Service
public class CoupleServiceImpl implements CoupleService{

    private final CoupleRepository coupleRepository;

    private final UserRepository userRepository;

    public CoupleServiceImpl(CoupleRepository coupleRepository, UserRepository userRepository) {
        this.coupleRepository = coupleRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Couple coupleCteate(String userA, String userB) {

        Couple couple = new Couple();

        // 이메일로 유저 정보 가져오기
        User userA_info = userRepository.findByEmail(userA);
        User userB_info = userRepository.findByEmail(userB);

        // 커플에 유저 id 담기
        couple.setF_user_id(userA_info.getUserId());
        couple.setS_user_id(userB_info.getUserId());

        // 커플저장
        couple = coupleRepository.save(couple);

        // 생성된 커플id 유저 정보에 넣어주기
        userA_info.setCoupleId(couple.getCouple_id());
        userB_info.setCoupleId(couple.getCouple_id());

        System.out.println("커플 구성원 1 : " + userA_info.toString());
        System.out.println("커플 구성원 2 : " + userB_info.toString());
        System.out.println("커플 방 : " + couple.toString());

        // 유저 정보 갱신
        userRepository.save(userA_info);
        userRepository.save(userB_info);

        System.out.println("유저 정보 저장 완료");

        return couple;
    }

    @Override
    public ArrayList<Couple> mainCoupleInfo(Integer couple_id) {

        Optional<Couple> couple = coupleRepository.findById(couple_id);
        System.out.println(couple.toString());

        return null;
    }
}
