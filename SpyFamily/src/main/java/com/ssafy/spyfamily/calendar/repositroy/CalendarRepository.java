package com.ssafy.spyfamily.calendar.repositroy;

import com.ssafy.spyfamily.calendar.model.Calendar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CalendarRepository extends JpaRepository<Calendar, Integer> {

    @Query("SELECT c FROM Calendar c WHERE c.couple_id = :coupleId")
    List<Calendar> findByCoupleId(Integer coupleId);

}
