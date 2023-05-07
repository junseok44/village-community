import React, { useState, useRef } from "react";
import styled from "@emotion/styled";

const SlideWrapper = styled.div<{ xPos: number }>`
  display: flex;
  transform: translateX(${(props) => props.xPos}rem);
  transition: transform 0.5s ease-in-out;
  white-space: nowrap;
  background: white;
  height: 100%;
`;

const SlideContainer = styled.div`
  height: 15rem;
  width: 80rem;
  position: relative;
  min-height: 15rem;
  border: 1px solid black;
  background: white;
  overflow: hidden;
`;

const SlideItem = styled.div`
  flex-shrink: 0;
  width: 20rem;
  height: 100%;
  border: 1px solid black;
  background: black;
  color: white;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PrevArrow = styled.div`
  position: absolute;
  left: -100px;
  top: 50%;
  cursor: pointer;
  background: black;
  z-index: 100;
`;

const NextArrow = styled.div`
  position: absolute;
  right: -100px;
  top: 50%;
  cursor: pointer;
`;

// Define the interface for the carousel item
interface CarouselItem {
  id: number;
  title: string;
  image: string | null;
}

// Define the props interface for the carousel component
interface CarouselProps {
  items: CarouselItem[];
}

const Carosel = () => {
  // const initialPosition = windowItem
  const [xPos, setXPos] = useState(-100);
  const [index, setIndex] = useState(0);
  const sliderWrapper = useRef<HTMLDivElement>(null);
  const client = sliderWrapper.current?.getBoundingClientRect();
  const itemWidth = 20;
  // itemWidth를 정해두는게 아니라. windowsize를 정하면 그걸 itemWidth로 나눠주는것.
  const windowItem = 5;

  const numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const transitionOff = () => {
    if (sliderWrapper.current) sliderWrapper.current.style.transition = "none";
  };
  const transitionOn = () => {
    if (sliderWrapper.current)
      sliderWrapper.current.style.transition = "transform 0.5s ease-in-out";
  };
  const forceTransition = () => {
    if (sliderWrapper.current) {
      sliderWrapper.current.style.transition = "0ms";
    }
  };
  const handlePrevArrow = () => {
    if (!sliderWrapper.current) return;
    transitionOn();
    moveToIndex(index - 1);

    if (index == -3) {
      sliderWrapper.current.ontransitionend = () => {
        if (sliderWrapper.current) {
          transitionOff();
          moveToIndex(6);
          sliderWrapper.current.ontransitionend = null;
        }
      };
    }
  };

  const handleNextArrow = () => {
    if (!sliderWrapper.current) return;
    transitionOn();
    moveToIndex(index + 1);

    if (index == 9) {
      sliderWrapper.current.ontransitionend = () => {
        if (sliderWrapper.current) {
          transitionOff();
          moveToIndex(0);
          sliderWrapper.current.ontransitionend = null;
        }
      };
    }
  };

  const moveToIndex = (index: number) => {
    if (!sliderWrapper.current) return;
    setXPos(-100 - index * 20);
    setIndex(index);
  };

  return (
    <>
      <SlideContainer>
        <PrevArrow onClick={handlePrevArrow}>back</PrevArrow>
        <SlideWrapper xPos={xPos} ref={sliderWrapper}>
          {numberArray.slice(5).map((item) => (
            <SlideItem>{item}</SlideItem>
          ))}
          {numberArray.map((item) => (
            <SlideItem>{item}</SlideItem>
          ))}
          {numberArray.slice(0, 5).map((item) => (
            <SlideItem>{item}</SlideItem>
          ))}
        </SlideWrapper>
        <NextArrow onClick={handleNextArrow}>next</NextArrow>
      </SlideContainer>
      <div>{index}</div>
      <button onClick={handlePrevArrow}>prev</button>
      <button onClick={handleNextArrow}>next</button>
    </>
  );
};

export default Carosel;
