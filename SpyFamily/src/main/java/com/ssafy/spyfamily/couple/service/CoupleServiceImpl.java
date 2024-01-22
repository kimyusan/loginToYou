package com.ssafy.spyfamily.couple.service;

import com.ssafy.spyfamily.couple.model.Couple;
import com.ssafy.spyfamily.couple.repository.CoupleRepository;
import com.ssafy.spyfamily.user.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class CoupleServiceImpl implements CoupleService{

    private final CoupleRepository coupleRepository;

    private UserRepository userRepository;

    public CoupleServiceImpl(CoupleRepository coupleRepository, UserRepository userRepository) {
        this.coupleRepository = coupleRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Couple coupleCteate(String userA, String userB) {

        Couple couple = new Couple();

        System.out.println("확인용---------------------1");
        System.out.println(userA);
        System.out.println(userB);

        Integer userIdA = userRepository.getUserIdByEmail(userA);
        Integer userIdB = userRepository.getUserIdByEmail(userB);

        couple.setF_user_id(userIdA);
        couple.setS_user_id(userIdB);

        System.out.println(couple.getF_user_id());
        System.out.println(couple.getS_user_id());

        // Couple 저장
        return coupleRepository.save(couple);
    }
}
