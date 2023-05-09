import * as S from "../styles/Carousel";
import React, { useState, useRef, useEffect, useLayoutEffect } from "react";

interface CarouselProps {
  items: JSX.Element[];
  windowSize: number;
}

let isAutoplay = false;
let timer: NodeJS.Timeout;
const Carousel = ({ items, windowSize }: CarouselProps) => {
  const sliderWrapper = useRef<HTMLDivElement>(null);
  const [itemWidth, setItemWidth] = useState(0);
  const initialPos = -itemWidth * windowSize;
  const [xPos, setXPos] = useState(initialPos);
  const [index, setIndex] = useState(0);
  const [isMoving, setIsMoving] = useState(false);

  if (index == items.length && sliderWrapper.current) {
    sliderWrapper.current.ontransitionend = () => {
      if (sliderWrapper.current) {
        transitionOff();
        moveToIndex(0);
        sliderWrapper.current.ontransitionend = null;
      }
    };
  }
  if (index == -windowSize && sliderWrapper.current) {
    sliderWrapper.current.ontransitionend = () => {
      if (sliderWrapper.current) {
        transitionOff();
        moveToIndex(
          items.length >= windowSize
            ? items.length - windowSize
            : (windowSize % items.length) + 1
        );
        sliderWrapper.current.ontransitionend = null;
      }
    };
  }

  const handleAutoPlay = () => {
    timer = setInterval(() => {
      transitionOn();
      setIndex((index) => index + 1);
      setXPos((prev) => prev - itemWidth);
    }, 3000);
  };
  const stopAutoPlay = () => {
    clearInterval(timer);
  };

  useLayoutEffect(() => {
    const client = sliderWrapper.current?.getBoundingClientRect();
    if (client) {
      setItemWidth(client.width / windowSize);
      setXPos(-(client.width / windowSize) * windowSize);
    }
    console.log(isAutoplay, itemWidth);
  }, [sliderWrapper, windowSize]);

  useLayoutEffect(() => {
    if (!isAutoplay && itemWidth > 0) {
      console.log(isAutoplay, itemWidth);

      handleAutoPlay();
      isAutoplay = true;
    }
  }, [itemWidth]);

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
  };

  const handleNextArrow = () => {
    if (!sliderWrapper.current) return;
    transitionOn();
    moveToIndex(index + 1);
  };

  const sliceBack = (arr: JSX.Element[], windowSize: number) => {
    let result = [];

    if (arr.length >= windowSize) {
      result = arr.slice(arr.length - windowSize);
    } else {
      while (result.length < windowSize) {
        for (let i = arr.length - 1; i >= 0; i--) {
          result.unshift(arr[i]);
          if (result.length >= windowSize) break;
        }
      }
    }

    return result;
  };

  const sliceFront = (arr: JSX.Element[], windowSize: number) => {
    let result = [];

    if (arr.length >= windowSize) {
      result = arr.slice(0, windowSize);
    } else {
      while (result.length < windowSize) {
        for (let i = 0; i < arr.length; i++) {
          result.push(arr[i]);
          if (result.length >= windowSize) break;
        }
      }
    }
    return result;
  };
  const moveToIndex = (index: number) => {
    if (index == -windowSize - 1 || index == items.length + 1) {
      return;
    }
    if (!sliderWrapper.current) return;
    if (isMoving) forceTransition();
    setIsMoving(true);
    setIndex(index);
    setXPos(initialPos - index * itemWidth);
    setIsMoving(false);
  };
  return (
    <>
      <S.SlideContainer>
        <S.PrevArrow onClick={handlePrevArrow}>back</S.PrevArrow>
        <S.SlideWrapper xPos={xPos} ref={sliderWrapper}>
          {sliceBack(items, windowSize).map((item) => (
            <S.SlideItem width={itemWidth}>{item}</S.SlideItem>
          ))}
          {items.map((item) => (
            <S.SlideItem width={itemWidth}>{item}</S.SlideItem>
          ))}

          {sliceFront(items, windowSize).map((item) => (
            <S.SlideItem width={itemWidth}>{item}</S.SlideItem>
          ))}
        </S.SlideWrapper>
        <S.NextArrow onClick={handleNextArrow}>next</S.NextArrow>
      </S.SlideContainer>
      <div>{index}</div>
      {/* <button onClick={handleAutoPlay}>autoplay</button> */}
      {/* <button onClick={stopAutoPlay}>stopAutoplay</button> */}
    </>
  );
};

export default Carousel;
