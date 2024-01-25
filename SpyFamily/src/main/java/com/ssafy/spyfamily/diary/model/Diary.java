package com.ssafy.spyfamily.diary.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@Entity
public class Diary {

    @Id
    @Column(name="diary_id")
    private Integer diaryId;

    @Column(name="couple_id")
    private Integer coupleId;

    @Column(name="save_folder")
    private String saveFolder;

    @Column(name="original_name")
    private String originalName;

    @Column(name="save_name")
    private String saveName;

    @Column(name="subject")
    private String subject;

    @Column(name="register_date")
    private String registerDate;

}
