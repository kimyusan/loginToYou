package com.ssafy.spyfamily.chat.repo;

import com.ssafy.spyfamily.chat.model.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRoomRepo extends JpaRepository<ChatRoom, String> {

    ChatRoom findByCoupleId(Integer coupleId);
}
