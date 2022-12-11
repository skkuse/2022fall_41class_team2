import styled from "styled-components";
import { EditorHeader, EditorBackground } from "../../atoms";
import { useSelector } from "react-redux";
import { Img } from "../../atoms/";

import { COLOR_SET } from "./../../../service/GetColor";
const DescWrapper = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
`;

const MagnifierContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const GradingMaster = ({
  bodyContent,
  darkMode,
  pfList,
  magnified,
  setMagnified,
  ...restProps
}) => {
  const headerContent = "채점결과";

  const settingSelector = useSelector((state) => state.SettingReducer);
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
        mode={"gradingAndExecution"}
        pfList={pfList}
      />
    </DescWrapper>
  );
};
