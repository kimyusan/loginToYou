package com.ssafy.spyfamily.chat.repo;

import com.ssafy.spyfamily.chat.model.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatRoomRepo extends JpaRepository<ChatRoom, String> {

    ChatRoom findByCoupleId(Integer coupleId);


}
