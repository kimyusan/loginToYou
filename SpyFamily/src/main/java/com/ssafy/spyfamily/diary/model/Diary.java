package com.ssafy.spyfamily.diary.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@Entity
public class Diary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer diaryId;
    private Integer coupleId;
    private String saveFolder;
    private String originalName;
    private String saveName;
    private String subject;
    private String registerDate;

}
