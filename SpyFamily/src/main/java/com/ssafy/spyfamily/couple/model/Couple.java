package com.ssafy.spyfamily.couple.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
public class Couple {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer couple_id;

    private String name;

    private String start_date;

    private Integer f_user_id;

    private Integer s_user_id;

}
