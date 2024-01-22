package com.ssafy.spyfamily.calendar.service;

import com.ssafy.spyfamily.calendar.model.Calendar;
import com.ssafy.spyfamily.calendar.repositroy.CalendarRepository;
import org.springframework.stereotype.Service;

@Service
public class CalendarServiceImpl implements CalendarService {

    private final CalendarRepository calendarRepository;

    public CalendarServiceImpl(CalendarRepository calendarRepository) {
        this.calendarRepository = calendarRepository;
    }

    @Override
    public Calendar saveCalendar(Calendar calendar) {
        return calendarRepository.save(calendar);
    }

    @Override
    public Calendar getCalendarById(Integer calendar_id) {
        return calendarRepository.findById(calendar_id).orElse(null);
    }

    @Override
    public Calendar updateCalendar(Calendar calendar) {
        // 추가


        return calendarRepository.save(calendar);
    }

    @Override
    public void deleteCalendar(Integer id) {
        calendarRepository.deleteById(id);
    }
}
