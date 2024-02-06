package com.ssafy.spyfamily.balance.repository;

import com.ssafy.spyfamily.balance.model.Balance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BalanceRepository extends JpaRepository<Balance, Integer> {

    Balance findByBalanceGameId(Integer balanceGameId);
}
