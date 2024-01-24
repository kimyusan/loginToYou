package com.ssafy.spyfamily.chat.service;

import com.ssafy.spyfamily.chat.model.ChatMessage;
import com.ssafy.spyfamily.chat.model.ChatRoom;
import com.ssafy.spyfamily.chat.repo.ChatMessageRepository;
import com.ssafy.spyfamily.chat.repo.ChatRoomRepo;
import com.ssafy.spyfamily.chat.repo.ChatRoomRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatServiceImpl implements  ChatService{
    private final ChatMessageRepository chatMessageRepository;
    private final ChatRoomRepo chatRoomRepository;

    public ChatServiceImpl (ChatMessageRepository chatMessageRepository, ChatRoomRepo ChatRoomRepository){
        this.chatMessageRepository = chatMessageRepository;
        this.chatRoomRepository = ChatRoomRepository;
    }

    @Override
    public void save(ChatMessage message) {
        chatMessageRepository.save(message);
    }

    @Override
    public ChatRoom enterRoom(int coupleId) {

        return chatRoomRepository.findByCoupleId(coupleId);
    }

    @Override
    public void createRoom(Long coupleId) {
        ChatRoom chatRoom = ChatRoom.create(coupleId);
        chatRoomRepository.save(chatRoom);
    }

    @Override
    public List<ChatMessage> loadMessage(String roomId) {
        return chatMessageRepository.findByRoomIdAndType(roomId, 1);
    }

}
