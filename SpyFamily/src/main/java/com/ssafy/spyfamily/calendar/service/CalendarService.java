package com.ssafy.spyfamily.calendar.service;

import com.ssafy.spyfamily.calendar.model.Calendar;

import java.util.List;

public interface CalendarService {

    // 저장
    public Calendar saveCalendar(Calendar calendar);
    // 조회
    public List<Calendar> getCalendarByCoupleId(Integer couple_id);
    // 수정
    public Calendar updateCalendar(Calendar calendar);
    // 삭제
    public void deleteCalendar(Integer id);
}
