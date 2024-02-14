package com.ssafy.spyfamily.chat.service;

import com.ssafy.spyfamily.chat.model.ChatMessage;
import com.ssafy.spyfamily.chat.model.ChatRoom;
import com.ssafy.spyfamily.chat.repo.ChatMessageRepository;
import com.ssafy.spyfamily.chat.repo.ChatRoomRepo;
import com.ssafy.spyfamily.util.AesUtil;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatServiceImpl implements  ChatService{
    private final ChatMessageRepository chatMessageRepository;
    private final ChatRoomRepo chatRoomRepository;

    private final AesUtil aesUtil;


    public ChatServiceImpl (ChatMessageRepository chatMessageRepository, ChatRoomRepo ChatRoomRepository, AesUtil aesUtil){
        this.chatMessageRepository = chatMessageRepository;
        this.chatRoomRepository = ChatRoomRepository;
        this.aesUtil = aesUtil;
    }

    @Override
    public void save(ChatMessage message) throws Exception {

        String encodeMessage = aesUtil.aesCBCEncode(message.getMessage());

        message.setMessage(encodeMessage);
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
    public List<ChatMessage> loadMessage(String roomId) throws Exception {
        List<ChatMessage> chatMessages = chatMessageRepository.findByRoomId(roomId);

        for(ChatMessage chatMessage : chatMessages){
            String decodeMessage = aesUtil.aesCBCDDecode(chatMessage.getMessage());
            chatMessage.setMessage(decodeMessage);
        }
        return chatMessages;
    }

    @Transactional
    @Override
    public void readUser(String roomId, String userId) {
        List<ChatMessage> chatMessages = chatMessageRepository.findByRoomIdAndSendUserIdNot(roomId,userId);

        for(ChatMessage chatMessage:chatMessages){
            chatMessage.setReadCount(false);
            chatMessageRepository.save(chatMessage);
        }

    }

    @Override
    public ChatRoom findByRoomId(String roomId) {
        return chatRoomRepository.findByRoomId(roomId);
    }

    @Override
    public int unreadMessage(String roomId, String userId) {
        return chatMessageRepository.countByRoomIdAndSendUserIdNotAndReadCount(roomId , userId,true);
    }

    public ChatRoom findByCoupleId(int coupleId) {
        return  chatRoomRepository.findByCoupleId(coupleId);

    }
}
