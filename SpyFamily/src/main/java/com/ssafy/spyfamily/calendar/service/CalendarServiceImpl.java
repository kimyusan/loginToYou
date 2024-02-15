package com.ssafy.spyfamily.calendar.service;

import com.ssafy.spyfamily.calendar.model.Calendar;
import com.ssafy.spyfamily.calendar.repository.CalendarRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CalendarServiceImpl implements CalendarService {

    private final CalendarRepository calendarRepository;

    public CalendarServiceImpl(CalendarRepository calendarRepository) {
        this.calendarRepository = calendarRepository;
    }

    @Override
    public Calendar saveCalendar(Calendar calendar) {
        System.out.println("서비스 들어옴 !!" + calendar.toString());
        return calendarRepository.save(calendar);
    }

    @Override
    public List<Calendar> getCalendarByCoupleId(Integer coupleId) {
        return calendarRepository.findByCoupleId(coupleId);
    }
    @Override
    public Calendar updateCalendar(Calendar calendar) {
        // 추가 할 필요가 없는듯

        return calendarRepository.save(calendar);
    }

    @Override
    public void deleteCalendar(Integer id) {
        calendarRepository.deleteById(id);
    }
}
