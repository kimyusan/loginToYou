package com.ssafy.spyfamily.calendar.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
@Entity
public class Calendar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer calendarId;
    private Integer coupleId;
    private Integer userId;
    private String startDate;
    private String endDate;
    private String eventType;
    private String contents;

}
