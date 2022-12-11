import styled from "styled-components";
import { EditorBackground, EditorHeader } from "../../atoms/";
import { useSelector } from "react-redux";

import { Img } from "../../atoms/";
import { COLOR_SET } from "./../../../service/GetColor";
const DescWrapper = styled.div`
  height:100%
  overflow-x: hidden;
`;

const MagnifierContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function ProblemMaster({
  bodyContent,
  darkMode,
  prob,
  restr,
  magnified,
  setMagnified,
  ...restProps
}) {
  const settingSelector = useSelector((state) => state.SettingReducer);

  // console.log(`Problem props: ${bodyContent}`);
  const headerContent = "문제/참조&제약사항";
  return (
    <DescWrapper>
      <MagnifierContainer
        style={{
          background:
            COLOR_SET["EDITOR_EXPLAIN"][settingSelector.backgroundColor],
          color:
            COLOR_SET["EDITOR_EXPLAIN_FONT"][settingSelector.backgroundColor],
        }}
      >
        <EditorHeader
          content={headerContent}
          assignmentId={restProps.assignmentId}
          darkMode={darkMode}
          magnified={magnified}
          setMagnified={setMagnified}
        />
        <div style={{ marginRight: "10px" }}>
          <Img
            src={magnified ? "/images/minimize.svg" : "/images/maximize.svg"}
            onClick={() => setMagnified(!magnified)}
          />
        </div>
      </MagnifierContainer>
      <EditorBackground
        content={bodyContent}
        assignmentId={restProps.assignmentId}
        darkMode={darkMode}
        prob={prob}
        restr={restr}
      />
    </DescWrapper>
  );
}

export default ProblemMaster;
