package com.ssafy.spyfamily.diary.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
public class DiaryMemo {

    @Id
    @Column(name="diary_memo_id")
    private Integer diaryMemoId;

    @Column(name="diary_id")
    private Integer diaryId;

    @Column(name="user_id")
    private Integer userId;

    @Column(name="register_date")
    private String registerDate;

    private String content;
}
