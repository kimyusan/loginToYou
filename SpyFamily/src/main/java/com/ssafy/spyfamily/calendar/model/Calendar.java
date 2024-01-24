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
    @Column(name="calendar_id")
    private Integer calendarId;

    @Column(name="couple_id")
    private Integer coupleId;

    @Column(name="user_id")
    private Integer userId;

    @Column(name="start_date")
    private String startDate;

    @Column(name="end_date")
    private String endDate;

    @Column(name="event_type")
    private String eventType;

    private String contents;

}
