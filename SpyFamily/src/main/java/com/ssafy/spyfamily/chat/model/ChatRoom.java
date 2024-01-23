package com.ssafy.spyfamily.chat.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@Entity
public class ChatRoom {

    @Id
    private String roomId;

    private Long coupleId;

    public static ChatRoom create(Long coupleId) {
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.roomId = UUID.randomUUID().toString();
        chatRoom.coupleId = coupleId;
        return chatRoom;
    }
}
