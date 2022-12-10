import styled from "styled-components";
import { EditorHeader, EditorBackground } from "../../atoms";
import { useSelector } from 'react-redux';
import { COLOR_SET } from './../../../service/GetColor';

const DescWrapper = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
  max-width: 605px;
`;

const PlagiarismIndicator = styled.div`
  font-family: "Gmarket Sans TTF";
  font-style: normal;
  font-weight: 700;
  font-size: 19.5296px;
  line-height: 22px;
  text-align: center;

  color: ${(props) => (props.darkMode ? "#d8d8d8" : "#1e1e1e")};

  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${(props) => (props.darkMode ? "#525263" : "#bfbfbf")};
`;

export const SubmissionMaster = ({ resultObj, darkMode, ...restProps }) => {
  console.log(`SubmissionMaster ${JSON.stringify(resultObj)}`);
  const settingSelector = useSelector((state) => state.SettingReducer);
  const data = resultObj.data;

  console.log(`${data}`);
  const id = data.id;
  const plagiarism = data.plagiarism_result;
  const headerContent = "제출결과";
  return (
    <DescWrapper>
      <PlagiarismIndicator style={{
        backgroundColor: COLOR_SET['EDITOR_EXPLAIN'][settingSelector.backgroundColor],
        color: COLOR_SET['EDITOR_EXPLAIN_FONT'][settingSelector.backgroundColor]
      }}>
        <EditorHeader
          content={headerContent}
          assignmentId={restProps.assignmentId}
          darkMode={darkMode}
        />
        {plagiarism && <div style={{ marginRight: "11px" }}>
          표절률 {plagiarism? plagiarism.similarity_score : 0}%
        </div>}
      </PlagiarismIndicator>
      <EditorBackground
        mode="submit"
        assignmentId={id}
        content={data}
        darkMode={darkMode}
      />
    </DescWrapper>
  );
};
