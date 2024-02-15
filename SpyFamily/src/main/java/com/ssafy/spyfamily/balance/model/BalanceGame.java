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
public class BalanceGame {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer balanceGameId;
    private String subject;
    private String fItem;
    private String sItem;
    private Integer fVote;
    private Integer sVote;

}
