package com.ssafy.spyfamily.balance.repository;

import com.ssafy.spyfamily.balance.model.BalanceGame;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BalanceRepository extends JpaRepository<BalanceGame, Integer> {

    BalanceGame findByBalanceGameId(Integer balanceGameId);

}
