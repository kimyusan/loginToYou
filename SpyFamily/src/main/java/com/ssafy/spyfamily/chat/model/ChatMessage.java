package com.ssafy.spyfamily.chat.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;


@Getter
@Setter
@Entity
@ToString
public class ChatMessage {

    // 메시지 타입 : 입장, 채팅
    public enum MessageType {
        ENTER, TALK
    }

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)

    private Long messageId;

    private MessageType type; // 메시지 타입
    private String roomId; // 방번호
    private String sendUserId; // 메시지 보낸사람
    private String message; // 메시지
    private String contentType; // 사진 or 문자
    @Column(columnDefinition = "tinyint(1) default 1")
    private boolean readCount;

    private String createdAt;

}
