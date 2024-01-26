import React, {useState} from 'react'

import Navbar from "../components/Navbar";
import DiaryBox from '../components/Diary/DiaryBox';
import PictureBox from '../components/Diary/PictureBox';

import { BurgerButton } from "../styles/common/hamburger";
import { DaySelect } from '../styles/Diary/Diary';
import { SlArrowLeft,SlArrowRight } from "react-icons/sl";

const Diary = () => {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);

  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);

  const toggleNavigation = () => {
    setIsNavigationOpen(!isNavigationOpen);
  };

  const decreaseMonth = () => {
    setMonth(prevMonth => {
      if (prevMonth === 1) {
        setYear(prevYear => prevYear - 1);
        return 12;
      } else {
        return prevMonth - 1;
      }
    });
  };

  const increaseMonth = () => {
    setMonth(prevMonth => {
      if (prevMonth === 12) {
        setYear(prevYear => prevYear + 1);
        return 1;
      } else {
        return prevMonth + 1;
      }
    });
  };

  return (
    <div>
      <BurgerButton onClick={toggleNavigation}>
        {isNavigationOpen ? "×" : "☰"}
      </BurgerButton>

      <Navbar isOpen={isNavigationOpen} />

      <DaySelect>
        <div className='subBox'>
          <SlArrowLeft onClick={decreaseMonth}></SlArrowLeft>
          <div className='dayBox'>
            {year}.{month.toString().padStart(2, "0")}
          </div>
          <SlArrowRight onClick={increaseMonth}></SlArrowRight>
        </div>
      </DaySelect>
      <DiaryBox></DiaryBox>
      <PictureBox></PictureBox>
    </div>
  )
}

export default Diary
