package com.ssafy.spyfamily.user.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@Entity
public class ProfileImg {

    @Id
    private Integer profileImgId;
    private Integer userId;
    private String saveFolder;
    private String originalName;
    private String saveName;

}
