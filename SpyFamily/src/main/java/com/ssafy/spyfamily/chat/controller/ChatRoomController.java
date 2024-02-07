package com.ssafy.spyfamily.chat.controller;


import com.ssafy.spyfamily.chat.model.ChatMessage;
import com.ssafy.spyfamily.chat.model.ChatRoom;
import com.ssafy.spyfamily.chat.repo.ChatRoomRepository;
import com.ssafy.spyfamily.chat.service.ChatServiceImpl;
import com.ssafy.spyfamily.couple.service.CoupleService;
import com.ssafy.spyfamily.user.model.User;
import com.ssafy.spyfamily.user.service.UserService;
import com.ssafy.spyfamily.user.service.UserServiceImpl;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/chat")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}, maxAge = 6000)
public class ChatRoomController {

    private final ChatServiceImpl chatService;
    private final CoupleService coupleService;
    private final UserService userService;

    public ChatRoomController(ChatServiceImpl chatService, CoupleService coupleService, UserService userService){
        this.chatService = chatService;
        this.coupleService = coupleService;
        this.userService = userService;
    }
    //커플 id 로 방 id 를 조회
    @GetMapping("/enter")
    public ResponseEntity<String> enterRoom(@RequestParam int coupleId){

        ChatRoom chatRoom = chatService.enterRoom(coupleId);

        String roomId = chatRoom.getRoomId();
        return new ResponseEntity<String>(roomId,HttpStatus.OK);

    }

    //커플 생성시 룸id 만들어줌
    @PostMapping("/create")
    public ResponseEntity<?> createRoom(@RequestParam Long coupleId){

        try {
            chatService.createRoom(coupleId);

            return new ResponseEntity<Void> (HttpStatus.OK);
        } catch ( Exception e){
            e.printStackTrace();
            log.error(e.getMessage());

            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
        }


    }
    //채팅 읽지 않은 개수 메인화면에 알람 뜨게 하기
    @Transactional
    @GetMapping("/unread/message")
    public  ResponseEntity<?> unreadMessageCount(@RequestParam int userId){
        try {
            User user = userService.findByUserId(userId);
            int coupleId = user.getCoupleId();

            ChatRoom chatRoom = chatService.findByCoupleId(coupleId);
            String roomId = chatRoom.getRoomId() ;

            int unreadMessage  = chatService.unreadMessage(roomId , Integer.toString(userId));

            return  new ResponseEntity<Integer>(unreadMessage, HttpStatus.OK);
        } catch ( Exception e){
            e.printStackTrace();
            log.error(e.getMessage());

            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
        }


    }

    //상대방이 현재 접속해있는지 확인 핸들러에서 입장하면 db 에 카운트 +1 되게 해놓음  추후 redis 에 적용하면 좋을지도?
    @GetMapping("/connect/check")
    public ResponseEntity<?> connectCheck(@RequestParam String roomId){


        try {
            ChatRoom chatRoom= chatService.findByRoomId(roomId);
            Integer loginUserCount = chatRoom.getLoginUserCount();

            return new ResponseEntity<Integer>(loginUserCount , HttpStatus.OK);
        }
        catch (Exception e) {
            e.printStackTrace();
            log.error(e.getMessage());

            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);

        }

    }

    //상대방이 읽었을때
    @PostMapping("/readUser")
    public ResponseEntity<?> readUser(@RequestParam String roomId , @RequestParam String userId) {
        System.out.println(roomId +" 룸아디 and 유저아디"+ userId);
        try {
            chatService.readUser(roomId, userId);

            return new ResponseEntity<Void>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            log.error(e.getMessage());

            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);

        }
    }

    //채팅 불러오기
    @GetMapping("/load")
    public ResponseEntity<?> loadMessage(@RequestParam String roomId){

        List<ChatMessage> chatMessages = chatService.loadMessage(roomId);

//        if(chatMessages == null){
//            return new ResponseEntity<Void>(HttpStatus.OK);
//        }

        return new ResponseEntity<List<ChatMessage>>(chatMessages, HttpStatus.OK);
    }

//    private final ChatRoomRepository chatRoomRepository;



//    @GetMapping("/room")
//    public String rooms(Model model) {
//        return "/chat/room";
//    }
//
//    @GetMapping("/rooms")
//    @ResponseBody
//    public List<ChatRoom> room() {
//        return chatRoomRepository.findAllRoom();
//    }
//
//    @PostMapping("/room")
//    @ResponseBody
//    public ChatRoom createRoom(@RequestParam Long coupleId) {
//        return chatRoomRepository.createChatRoom(coupleId);
//    }
//
//    @GetMapping("/room/enter/{roomId}")
//    public String roomDetail(Model model, @PathVariable String roomId) {
//        model.addAttribute("roomId", roomId);
//        return "/chat/roomdetail";
//    }
//
//    @GetMapping("/room/{roomId}")
//    @ResponseBody
//    public ChatRoom roomInfo(@PathVariable String roomId) {
//        return chatRoomRepository.findRoomById(roomId);
//    }
}
