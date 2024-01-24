package com.ssafy.spyfamily.couple.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
public class Couple {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="couple_id")
    private Integer coupleId;

    private String name;

    @Column(name="start_date")
    private String startDate;

    @Column(name="f_user_id")
    private Integer fUserId;

    @Column(name="s_user_id")
    private Integer sUserId;

}
