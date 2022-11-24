import styled from "styled-components";
import { EditorHeader, EditorBackground } from "../../atoms";

const DescWrapper = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
`;

export const GradingMaster = ({ bodyContent, darkMode,...restProps }) => {
  const headerContent = "채점결과";
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
};
