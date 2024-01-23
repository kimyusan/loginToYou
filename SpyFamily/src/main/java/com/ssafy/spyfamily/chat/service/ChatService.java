package com.ssafy.spyfamily.chat.service;

import com.ssafy.spyfamily.chat.model.ChatMessage;
import com.ssafy.spyfamily.chat.model.ChatRoom;

public interface ChatService {
    void save(ChatMessage message);

    ChatRoom enterRoom(int coupleId);

    void createRoom(Long coupleId);
}
