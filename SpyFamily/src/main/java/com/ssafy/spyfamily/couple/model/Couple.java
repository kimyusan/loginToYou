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
    private Integer coupleId;
    private String name;
    private String startDate;
    private Integer fUserId;
    private Integer sUserId;

}
