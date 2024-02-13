import React, { useState, useEffect } from "react";
import {
  Wrapper,
  Container,
  Slides,
  Slide,
  PrevButton,
  NextButton,
  IndexBox,
  CardIndex,
} from "../../styles/Main/Carousel";
import CarouselItem from "./CarouselItem";
import { Navigate } from "react-router";

type Props = {};

function Carousel({}: Props) {
  const [counter, setCounter] = useState(0);
  const cards = ["question", "balancegame", "challenge"];
  const handleNext = () => {
    if (counter >= cards.length - 1) {
      setCounter(0);
    } else {
      setCounter(counter + 1);
    }
  };

  const handlePrev = () => {
    if (counter <= 0) {
      setCounter(cards.length - 1);
    } else {
      setCounter(counter - 1);
    }
  };

  // 캐러셀 3초마다 넘김
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) =>
        prevCounter === cards.length - 1 ? 0 : prevCounter + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [cards.length]);

  return (
    <Wrapper>
      <Container>
        <PrevButton onClick={handlePrev} />
        <Slides style={{ transform: `translateX(${-90 * counter}dvw)` }}>
          {cards.map((card, index) => (
            <Slide key={index}>
              <CarouselItem type={card}/>
            </Slide>
          ))}
        </Slides>
        <NextButton onClick={handleNext} />
      </Container>

      <IndexBox>
        {cards.map((image, index) => (
          <CardIndex className={index === counter ? "focused_card" : ""} />
        ))}
      </IndexBox>
    </Wrapper>
  );
}

export default Carousel;
