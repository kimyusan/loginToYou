package com.ssafy.spyfamily.couple.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Couple {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer couple_id;

    private String name;

    private String start_date;

    private Integer f_user_id;

    private Integer s_user_id;

    public int getCouple_id() {
        return couple_id;
    }

    public void setCouple_id(int couple_id) {
        this.couple_id = couple_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStart_date() {
        return start_date;
    }

    public void setStart_date(String start_date) {
        this.start_date = start_date;
    }

    public Integer getF_user_id() {
        return f_user_id;
    }

    public void setF_user_id(Integer f_user_id) {
        this.f_user_id = f_user_id;
    }

    public Integer getS_user_id() {
        return s_user_id;
    }

    public void setS_user_id(Integer s_user_id) {
        this.s_user_id = s_user_id;
    }
}
