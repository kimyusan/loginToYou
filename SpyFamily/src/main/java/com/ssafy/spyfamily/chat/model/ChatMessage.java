package com.ssafy.spyfamily.chat.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Entity
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
    private boolean isRead;
    private String createdAt;

}
