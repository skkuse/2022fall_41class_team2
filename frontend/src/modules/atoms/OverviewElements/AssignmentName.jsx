// 과제명
import styled from "styled-components";

const AssignmentNameStyle = styled.div`
  font-family: "Gmarket Sans TTF";
  font-style: normal;
  font-weight: 500;
  font-size: 19.4234px;
  line-height: 22px;
  text-align: end;

  border-radius: 10px;

  width: 550px;
  height: 68px;
  color: #000000;
  background: ${(props) => props.background};
`;

export const AssignmentName = ({ assignment, background }) => {
  return (
    <AssignmentNameStyle background={background}>
      {assignment}
    </AssignmentNameStyle>
  );
};
