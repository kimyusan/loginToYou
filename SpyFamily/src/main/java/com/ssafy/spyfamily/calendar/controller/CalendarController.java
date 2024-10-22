package com.ssafy.spyfamily.calendar.controller;


import com.ssafy.spyfamily.calendar.model.Calendar;
import com.ssafy.spyfamily.calendar.service.CalendarServiceImpl;
import lombok.extern.log4j.Log4j2;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
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
            log.info("캘린더 이벤트 등록 시도");
            log.info(calendar.toString());
            calendarService.saveCalendar(calendar);

            log.info("캘린더 이벤트 등록 성공");
            return new ResponseEntity<Void>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            log.info("캘린더 이벤트 등록 실패");
            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/read")
    public ResponseEntity<?> readCalendar(@RequestParam Integer coupleId) {
        try {
            log.info("캘린더 불러오기 시도, couple_id: " + coupleId);
            List<Calendar> calendars = calendarService.getCalendarByCoupleId(coupleId);
            log.info("log 테스트");

            if (!calendars.isEmpty()) {
                for (Calendar calendar : calendars) {
                    log.info(calendar.toString());
                }
                return new ResponseEntity<List<Calendar>>(calendars, HttpStatus.OK);
            } else {
                // 캘린더가 없을 경우에 대한 처리
                log.info("캘린더가 존재하지 않습니다.");
                return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
        }
    }



    @PutMapping("/update")
    public ResponseEntity<?> updatecalendar(@RequestBody Calendar calendar) {
        try {
            log.info("캘린더 업데이트 불러오기 시도");
            log.info(calendar.toString());

            calendarService.updateCalendar(calendar);

            return new ResponseEntity<Void>(HttpStatus.OK);
        } catch (Exception e) {
            log.info("캘린더 업데이트 불러오기 실패");
            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteCalendar(@RequestParam Integer calenderId) {
        try {
            // 삭제 로직 수행
            calendarService.deleteCalendar(calenderId);

            log.info("캘린더 삭제 성공");
            return new ResponseEntity<Void>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            log.info("캘린더 삭제 실패");
            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
        }
    }

}

