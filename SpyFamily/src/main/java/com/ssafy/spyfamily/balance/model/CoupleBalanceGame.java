package com.ssafy.spyfamily.balance.model;

import jakarta.persistence.Entity;
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
    private Integer coupleBalanceGameId;
    private Integer userId;
    private Integer balanceGameId;
    private Integer userVote;

}
