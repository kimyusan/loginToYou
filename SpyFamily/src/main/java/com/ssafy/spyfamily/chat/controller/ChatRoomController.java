package com.ssafy.spyfamily.chat.controller;


import com.ssafy.spyfamily.chat.model.ChatMessage;
import com.ssafy.spyfamily.chat.model.ChatRoom;
import com.ssafy.spyfamily.chat.repo.ChatRoomRepository;
import com.ssafy.spyfamily.chat.service.ChatServiceImpl;
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

    public ChatRoomController(ChatServiceImpl chatService){
        this.chatService = chatService;
    }

    @GetMapping("/enter")
    public ResponseEntity<String> enterRoom(@RequestParam int coupleId){

        ChatRoom chatRoom = chatService.enterRoom(coupleId);

        String roomId = chatRoom.getRoomId();
        return new ResponseEntity<String>(roomId,HttpStatus.OK);

    }

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

    //상대방이 읽었을때
    @PostMapping
    public ResponseEntity<?> readUser(@RequestParam String roomId , @RequestParam String userId) {

        try {
            chatService.readUser(roomId, userId);

            return new ResponseEntity<Void>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            log.error(e.getMessage());

            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);

        }
    }

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
