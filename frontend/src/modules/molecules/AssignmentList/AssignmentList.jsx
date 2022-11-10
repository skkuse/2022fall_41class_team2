import { AssignmentName, Deadline, LectureName } from "../../atoms";
import { Text } from "../../atoms";

import styled from "styled-components";

const GeneralContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 100%;
`;

export const AssignmentList = ({ className, ...restProps }) => {
  return (
    <>
      {/* <GeneralContainer>
        <Text>HERE</Text>
        <AssignmentName></AssignmentName>
        <LectureName></LectureName>
        <Deadline></Deadline>
      </GeneralContainer> */}
    </>
  );
};
