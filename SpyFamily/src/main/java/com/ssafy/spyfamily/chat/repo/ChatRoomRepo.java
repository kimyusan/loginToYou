package com.ssafy.spyfamily.chat.repo;

import com.ssafy.spyfamily.chat.model.ChatRoom;
import com.ssafy.spyfamily.diary.model.DiaryMemo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

public interface ChatRoomRepo extends JpaRepository<ChatRoom, String> {

    ChatRoom findByCoupleId(Integer coupleId);


    @Transactional
    @Modifying
    @Query("DELETE FROM ChatRoom c WHERE c.coupleId = :coupleId")
    void deleteByCoupleId(Integer coupleId);

    ChatRoom findByRoomId(String roomId);

    @Modifying
    @Query("update ChatRoom c set c.loginUserCount = c.loginUserCount +1  where c.roomId = :roomId")
    void loginChatRoom(String roomId);

    @Modifying
    @Query("update ChatRoom c set c.loginUserCount = c.loginUserCount -1  where c.roomId = :roomId")
    void logoutChatRoom(String roomId);
}
