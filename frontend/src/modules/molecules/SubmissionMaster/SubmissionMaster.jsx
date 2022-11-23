import styled from "styled-components";
import { EditorHeader, EditorBackground } from "../../atoms";

const DescWrapper = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
`;

const PlagiarismIndicator = styled.div`
  font-family: "Gmarket Sans TTF";
  font-style: normal;
  font-weight: 700;
  font-size: 19.5296px;
  line-height: 22px;
  text-align: center;

  color: #3c3c3c;

  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #bfbfbf;
`;

export const SubmissionMaster = ({ resultObj, darkMode,...restProps }) => {
  console.log(resultObj);
  const id = resultObj.id;
  const plagiarism = resultObj.plagiarism_result;

  const headerContent = "제출결과";
  return (
    <DescWrapper>
      <PlagiarismIndicator darkMode={darkMode}>
        <EditorHeader
          content={headerContent}
          assignmentId={restProps.assignmentId}
          darkMode={darkMode}
        />
        <div style={{ marginRight: "11px" }}>
          표절률 {plagiarism.similarity_score}%
        </div>
      </PlagiarismIndicator>
      <EditorBackground
        mode="submit"
        assignmentId={id}
        content={resultObj}
        darkMode={darkMode}
      />
    </DescWrapper>
  );
};
