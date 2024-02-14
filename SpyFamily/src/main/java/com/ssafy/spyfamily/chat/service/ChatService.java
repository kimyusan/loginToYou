package com.ssafy.spyfamily.chat.service;

import com.ssafy.spyfamily.chat.model.ChatMessage;
import com.ssafy.spyfamily.chat.model.ChatRoom;

import java.util.List;

public interface ChatService {
    void save(ChatMessage message) throws Exception;

    ChatRoom enterRoom(int coupleId);

    void createRoom(Long coupleId);

    List<ChatMessage> loadMessage(String roomId) throws Exception;

    void readUser(String roomId, String userId);

    ChatRoom findByRoomId(String roomId);



    int unreadMessage(String roomId, String userId);
}
