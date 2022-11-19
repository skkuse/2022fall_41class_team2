import styled from "styled-components";
import { EditorBackground, EditorHeader } from "../../atoms/";

const DescWrapper = styled.div`
  display: flex;
  flex-direction: column;

  height:100%
`;

function ProblemMaster({ bodyContent, ...restProps }) {
  // console.log(`Problem props: ${bodyContent}`);
  const headerContent = "문제/참조&제약사항";
  return (
    <DescWrapper>
      <EditorHeader
        content={headerContent}
        assignmentId={restProps.assignmentId}
      />
      <EditorBackground
        content={bodyContent}
        assignmentId={restProps.assignmentId}
      />
    </DescWrapper>
  );
}

export default ProblemMaster;
