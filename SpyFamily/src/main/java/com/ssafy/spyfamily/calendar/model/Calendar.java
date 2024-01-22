package com.ssafy.spyfamily.calendar.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

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

    public Integer getCalendar_id() {
        return calendar_id;
    }

    public void setCalendar_id(Integer calendar_id) {
        this.calendar_id = calendar_id;
    }

    public Integer getCouple_id() {
        return couple_id;
    }

    public void setCouple_id(Integer couple_id) {
        this.couple_id = couple_id;
    }

    public Integer getUser_id() {
        return user_id;
    }

    public void setUser_id(Integer user_id) {
        this.user_id = user_id;
    }

    public String getStart_date() {
        return start_date;
    }

    public void setStart_date(String start_date) {
        this.start_date = start_date;
    }

    public String getEnd_date() {
        return end_date;
    }

    public void setEnd_date(String end_date) {
        this.end_date = end_date;
    }

    public String getEvent_type() {
        return event_type;
    }

    public void setEvent_type(String event_type) {
        this.event_type = event_type;
    }

    public String getContents() {
        return contents;
    }

    public void setContents(String contents) {
        this.contents = contents;
    }
}
