// 강의 이름 아이콘
// 과제 수의 배수 만큼 높이가 커져야 함

import styled from "styled-components";

export const LectureNameStyle = styled.div`
  display: flex;
  align-items: center;

  font-family: "Gmarket Sans TTF";
  font-style: normal;
  font-weight: 500;
  font-size: 19.4234px;
  line-height: 22px;
  text-align: center;
  padding: 21px;

  border-radius: 10px;

  width: 140px;

  color: #000000;
  background: ${(props) => props.background};

`;

export const LectureName = ({ name, background, ...resProps }) => {
  return <LectureNameStyle background={background}>{name}</LectureNameStyle>;
};
