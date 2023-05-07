import styled from "@emotion/styled";

export const SlideWrapper = styled.div<{ xPos: number }>`
  width: 100%;
  display: flex;
  transform: translateX(${(props) => props.xPos}px);
  transition: transform 0.5s ease-in-out;
  white-space: nowrap;
  background: white;
  height: 100%;
`;

export const SlideContainer = styled.div`
  width: 90%;
  position: relative;
  min-height: 15rem;
  background: white;
  overflow: hidden;
`;

export const SlideItem = styled.div<{ width: number }>`
  width: ${(props) => props.width}px;
  height: 100%;
  padding: 1rem;
  flex-shrink: 0;
`;
export const PrevArrow = styled.div`
  position: absolute;
  left: -100px;
  top: 50%;
  cursor: pointer;
  background: black;
  z-index: 100;
`;

export const NextArrow = styled.div`
  position: absolute;
  right: -100px;
  top: 50%;
  cursor: pointer;
`;

export const ItemContainer = styled.div`
  display: flex;
  column-gap: 10px;
`;
