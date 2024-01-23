package com.ssafy.spyfamily.calendar.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Setter
@Getter
@Entity
public class Calendar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer calendar_id;
    private Integer couple_id;
    private Integer user_id;
    private String start_date;
    private String end_date;
    private String event_type;
    private String contents;

}
