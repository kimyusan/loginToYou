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
public class Balance {

    @Id
    private Integer balanceGameId;
    private String subject;
    private Integer fItem;
    private Integer sItem;
    private Integer fVote;
    private Integer sVote;

}
