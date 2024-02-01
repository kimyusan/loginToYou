package com.ssafy.spyfamily.diary.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
public class DiaryMemo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer diaryMemoId;
    private Integer coupleId;
    private Integer userId;
    private String registerDate;
    private String content;

}
