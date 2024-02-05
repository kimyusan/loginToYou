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
public class CoupleBalance {

    @Id
    private Integer coupleBalanceGameId;
    private Integer coupleId;
    private Integer balanceGameId;
    private Integer fUserVote;
    private Integer sUserVote;

}
