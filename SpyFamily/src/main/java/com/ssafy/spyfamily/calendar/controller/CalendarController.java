package com.ssafy.spyfamily.calendar.controller;


import com.ssafy.spyfamily.calendar.model.Calendar;
import com.ssafy.spyfamily.calendar.service.CalendarService;
import com.ssafy.spyfamily.calendar.service.CalendarServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/calendar", produces = "application/json")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}, maxAge = 6000)
public class CalendarController {

    private final CalendarServiceImpl calendarService;

    public CalendarController(CalendarServiceImpl calendarService) {
        this.calendarService = calendarService;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createCalendar(@RequestBody Calendar calendar) {
        try {
            System.out.println("캘린더 이벤트 등록 시도");
            calendarService.saveCalendar(calendar);

            System.out.println("캘린더 이벤트 등록 성공");
            return new ResponseEntity<Void>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("캘린더 이벤트 등록 실패");
            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping("/read")
    public ResponseEntity<?> readCalendar(@RequestParam Integer calendar_id) {
        try {
            System.out.println("캘린더 불러오기 시도, calender_id : " + calendar_id);

//            Calendar calendar = calendarService.

            return new ResponseEntity<Calendar>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
        }
    }
}

