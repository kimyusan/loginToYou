package com.ssafy.spyfamily.chat.repo;

import com.ssafy.spyfamily.chat.model.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Repository

public interface ChatMessageRepository extends JpaRepository<ChatMessage , Long> {

    List<ChatMessage> findByRoomId(String roomId) ;

    @Transactional
    @Modifying
    @Query("DELETE FROM ChatMessage c WHERE c.roomId = :roomId")
    void deleteByRoomId(String roomId);

    List<ChatMessage> findByRoomIdAndSendUserIdNot(String roomId , String readUser);

    //string int 로 바꿔줘야함
    int countByRoomIdAndSendUserIdNotAndReadCount(String roomId , String userId, boolean isUnRead);
}
