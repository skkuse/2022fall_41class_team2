// 과제명
import styled from "styled-components";
import { Text } from "../../atoms";

const AssignmentNameStyle = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  font-family: "Gmarket Sans TTF";
  font-style: normal;
  font-weight: 500;
  font-size: 19.4234px;
  line-height: 22px;

  border-radius: 10px;

  width: 550px;
  height: 68px;
  color: #000000;
  background: ${(props) => (props.danger ? "#F9565680" : props.background)};
`;

export const AssignmentName = ({
  assignment,
  background,
  submission,
  remainingTime,
}) => {
  // console.log(`SUBMISSION PROP: ${submission}`);
  const danger = remainingTime.split(" ")[0] === "0d" ? true : false;

  if (submission) {
    background = `linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), ${background}`;
    return (
      <AssignmentNameStyle background={background}>
        <div style={{ marginRight: "12px" }}>{assignment}</div>
      </AssignmentNameStyle>
    );
  } else {
    return (
      <AssignmentNameStyle danger={danger} background={background}>
        <div style={{ marginRight: "12px" }}>{assignment}</div>
      </AssignmentNameStyle>
    );
  }
};
