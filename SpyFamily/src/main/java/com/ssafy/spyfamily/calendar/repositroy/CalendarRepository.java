package com.ssafy.spyfamily.calendar.repositroy;

import com.ssafy.spyfamily.calendar.model.Calendar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CalendarRepository extends JpaRepository<Calendar, Integer> {

}
