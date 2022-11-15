import styled from "styled-components";
import { EditorHeader, EditorBackground } from "../../atoms";

const DescWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 598px;
  height: 880px;
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

export const SubmissionMaster = ({ bodyContent, ...restProps }) => {
  const headerContent = "제출결과";
  return (
    <DescWrapper>
      <PlagiarismIndicator>
        <EditorHeader
          content={headerContent}
          assignmentId={restProps.assignmentId}
        />
        <div style={{ marginRight: "11px" }}>표절률 00%</div>
      </PlagiarismIndicator>
      <EditorBackground
        content={bodyContent}
        assignmentId={restProps.assignmentId}
      />
    </DescWrapper>
  );
};
