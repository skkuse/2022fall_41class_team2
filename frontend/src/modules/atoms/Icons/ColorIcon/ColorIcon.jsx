import styled from "styled-components";

const Circle = styled.div`
  width: 43px;
  height: 43px;

  border: 2px solid #bfbfbf;

  /* &:focus {
    outline: "none";
    border-color: "#4844DE";
  } */
  border-radius: 50%;
  background: ${(props) => props.color};
  cursor: pointer;
`;

export const ColorIcon = ({ className, color, ...restProps }) => {
  console.log(color);
  return <Circle color={color}></Circle>;
};
