package com.ssafy.spyfamily.balance.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
@Entity
public class CoupleBalanceGame {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer coupleBalanceGameId;
    private Integer userId;
    private Integer balanceGameId;
    private String userVote;

}
