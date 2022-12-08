import styled from "styled-components";
import { EditorBackground, EditorHeader } from "../../atoms/";

const DescWrapper = styled.div`
  
  

  height:100%

  overflow-x: hidden;
`;

const GeneralContainer = styled.div`
  height: 100vh;
`;

function ProblemMaster({ bodyContent, darkMode, ...restProps }) {
  // console.log(`Problem props: ${bodyContent}`);
  const headerContent = "문제/참조&제약사항";
  return (
    <DescWrapper>
      <EditorHeader
        content={headerContent}
        assignmentId={restProps.assignmentId}
        darkMode={darkMode}
      />
      <EditorBackground
        content={bodyContent}
        assignmentId={restProps.assignmentId}
        darkMode={darkMode}
      />
    </DescWrapper>
  );
}

export default ProblemMaster;
