package com.ssafy.spyfamily.couple.service;

import com.ssafy.spyfamily.couple.model.Couple;
import com.ssafy.spyfamily.couple.repository.CoupleRepository;
import com.ssafy.spyfamily.user.model.User;
import com.ssafy.spyfamily.user.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

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
        couple.setFUserId(userA_info.getUserId());
        couple.setSUserId(userB_info.getUserId());

        // 커플저장
        couple = coupleRepository.save(couple);

        // 생성된 커플id 유저 정보에 넣어주기
        userA_info.setCoupleId(couple.getCoupleId());
        userB_info.setCoupleId(couple.getCoupleId());

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
    public ArrayList<Object> mainCoupleInfo(Integer coupleId) {
        System.out.println(coupleId);

        // CoupleRepository에서 couple_id로 Couple을 조회
        Optional<Couple> coupleOptional = coupleRepository.findById(coupleId);
        System.out.println(coupleOptional);

        if (coupleOptional.isPresent()) {
            Couple couple = coupleOptional.get();

            // Couple에서 f_user_id와 s_user_id로 User를 조회
            Optional<User> userFOptional = userRepository.findById(couple.getFUserId());
            Optional<User> userSOptional = userRepository.findById(couple.getSUserId());

            // User가 존재하는지 확인하고 Map에 추가
            ArrayList<Object> resultList = new ArrayList<>();
            userFOptional.ifPresent(user -> resultList.add(user));
            userSOptional.ifPresent(user -> resultList.add(user));

            // Couple 정보를 Map에 추가
            Map<String, Object> coupleInfo = new HashMap<>();
            coupleInfo.put("coupleId", couple.getCoupleId());
            coupleInfo.put("name", couple.getName());
            coupleInfo.put("startDate", couple.getStartDate());
            coupleInfo.put("fuserId", couple.getFUserId());
            coupleInfo.put("suserId", couple.getSUserId());

            resultList.add(coupleInfo);

            return resultList;
        }
        return null;
    }

    @Override
    public Couple updateCouple(Couple couple) {
        return coupleRepository.save(couple);
    }



}
