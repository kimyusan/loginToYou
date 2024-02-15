package com.ssafy.spyfamily.balance.service;

import com.ssafy.spyfamily.balance.model.BalanceGame;
import com.ssafy.spyfamily.balance.model.CoupleBalanceGame;
import com.ssafy.spyfamily.balance.repository.BalanceRepository;
import com.ssafy.spyfamily.balance.repository.CoupleBalanceRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
@Slf4j
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
    public CoupleBalanceGame saveBalance(CoupleBalanceGame coupleBalanceGame) {

        BalanceGame balanceGame = balanceRepository.findByBalanceGameId(coupleBalanceGame.getBalanceGameId());

        Long count = coupleBalanceRepository.countAllByUserIdAndBalanceGameId(
                coupleBalanceGame.getUserId(),
                coupleBalanceGame.getBalanceGameId()
        );

        log.info("해당 유저의 응답결과 수(0 또는 1 정상) : " + count);

        // 처음 등록할때
        if (count == 0) {
            log.info("처음 등록할 때");
            if (Objects.equals(balanceGame.getSItem(), coupleBalanceGame.getUserVote())) {
                balanceGame.setSVote(balanceGame.getSVote() + 1);
            } else {
                balanceGame.setFVote(balanceGame.getFVote() + 1);
            }
            balanceRepository.save(balanceGame);

            return coupleBalanceRepository.save(coupleBalanceGame);
        } else {    // 두번째 등록할때(수정)
            log.info("두번 째 등록할 때");
            CoupleBalanceGame temp = coupleBalanceRepository.findByBalanceGameIdAndUserId(
                    coupleBalanceGame.getUserId(),
                    coupleBalanceGame.getBalanceGameId()
            );

            if (!Objects.equals(temp.getUserVote(), coupleBalanceGame.getUserVote())) {
                if (Objects.equals(balanceGame.getFItem(), coupleBalanceGame.getUserVote())) {

                    balanceGame.setFVote(balanceGame.getFVote() + 1);

                    if(balanceGame.getSVote() != 0) {
                        balanceGame.setSVote(balanceGame.getSVote() - 1);
                    }

                } else {

                    if (balanceGame.getFVote() != 0){
                        balanceGame.setFVote(balanceGame.getFVote() - 1);
                    }

                    balanceGame.setSVote(balanceGame.getSVote() + 1);
                }
                log.info("질문지 저장");
                balanceRepository.save(balanceGame);
                log.info("수정된값 DB에 저장");

                coupleBalanceGame.setCoupleBalanceGameId(temp.getCoupleBalanceGameId());

                return coupleBalanceRepository.save(coupleBalanceGame);
            } else {
                log.info("값이 변경되지 않았는데요?");

                return coupleBalanceGame;
            }
        }
    }


    @Transactional
    @Override
    public void deleteByUserId(Integer userId) {
        List<CoupleBalanceGame> coupleBalanceGames = coupleBalanceRepository.findByUserId(userId);
        log.info("밸런스 게임 결과 삭제 시행 횟수 : " + coupleBalanceGames.size());
        for (CoupleBalanceGame coupleBalanceGame : coupleBalanceGames) {
            // CoupleBalanceGame 삭제
            coupleBalanceRepository.delete(coupleBalanceGame);

            // BalanceGame 업데이트
            BalanceGame balanceGame = balanceRepository.findById(coupleBalanceGame.getBalanceGameId()).orElse(null);
            if (balanceGame != null) {
                if (balanceGame.getFItem().equals(coupleBalanceGame.getUserVote())) {
                    balanceGame.setFVote(balanceGame.getFVote() - 1);
                } else if (balanceGame.getSItem().equals(coupleBalanceGame.getUserVote())) {
                    balanceGame.setSVote(balanceGame.getSVote() - 1);
                }
                balanceRepository.save(balanceGame);
            }
        }
    }
}
