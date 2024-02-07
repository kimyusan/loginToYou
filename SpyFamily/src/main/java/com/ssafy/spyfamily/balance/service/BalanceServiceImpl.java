package com.ssafy.spyfamily.balance.service;

import com.ssafy.spyfamily.balance.model.BalanceGame;
import com.ssafy.spyfamily.balance.model.CoupleBalanceGame;
import com.ssafy.spyfamily.balance.repository.BalanceRepository;
import com.ssafy.spyfamily.balance.repository.CoupleBalanceRepository;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class BalanceServiceImpl implements BalanceService{

    private final BalanceRepository balanceRepository;
    private final CoupleBalanceRepository coupleBalanceRepository;

    public BalanceServiceImpl(BalanceRepository balanceRepository,
                              CoupleBalanceRepository coupleBalanceRepository) {
        this.balanceRepository = balanceRepository;
        this.coupleBalanceRepository = coupleBalanceRepository;
    }

    @Override
    public BalanceGame getBalance(Integer balanceGameId) {
        return balanceRepository.findByBalanceGameId(balanceGameId);
    }

    @Override
    public CoupleBalanceGame getBalanceAnswer(Integer userId, Integer balanceGameId) {
        return coupleBalanceRepository.findByBalanceGameIdAndUserId(userId, balanceGameId);
    }

    @Override
    public void saveBalance(CoupleBalanceGame coupleBalanceGame) {
        BalanceGame balanceGame = balanceRepository.findByBalanceGameId(coupleBalanceGame.getBalanceGameId());

        if (Objects.equals(balanceGame.getSItem(), coupleBalanceGame.getUserVote())) {
            balanceGame.setSVote(balanceGame.getSVote() + 1);
        } else {
            balanceGame.setFVote(balanceGame.getFVote() + 1);
        }
        balanceRepository.save(balanceGame);

        coupleBalanceRepository.save(coupleBalanceGame);
    }

    @Override
    public void updateBalance(CoupleBalanceGame coupleBalanceGame) {
        BalanceGame balanceGame = balanceRepository.findByBalanceGameId(coupleBalanceGame.getBalanceGameId());
        CoupleBalanceGame temp = coupleBalanceRepository.findByCoupleBalanceGameId(coupleBalanceGame.getCoupleBalanceGameId());

        if (!Objects.equals(temp.getUserVote(), coupleBalanceGame.getUserVote())) {
            if (Objects.equals(balanceGame.getFItem(), coupleBalanceGame.getUserVote())) {
                balanceGame.setFVote(balanceGame.getFVote() + 1);
                balanceGame.setSVote(balanceGame.getSVote() - 1);
            } else {
                balanceGame.setFVote(balanceGame.getFVote() - 1);
                balanceGame.setSVote(balanceGame.getSVote() + 1);
            }
        } else {
            System.out.println("값이 변경되지 않았는데요?");
        }
        System.out.println("질문지 저장");
        balanceRepository.save(balanceGame);
        System.out.println("수정된값 DB에 저장");
        coupleBalanceRepository.save(coupleBalanceGame);
    }

}
