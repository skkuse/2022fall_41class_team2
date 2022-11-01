import styled from "styled-components";

const Circle = styled.circle`
  
      width="43px"
      height="43px"
      box-sizing="border-box"
      border="2px solid #BFBFBF"
      border-radius: 50%; 
      background ${(props) => props.color}
      `;

export const ColorIcon = ({ className, color, ...restProps }) => {
  console.log(color);
  return <Circle color={color} />;
};
