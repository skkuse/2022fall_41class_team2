import styled from "styled-components";

import { ExitButton, SettingsButton } from "../../molecules";

const Bg = styled.div`
  display: flex;
  flex-direction: row;

  background: #3c3c3c;

  padding: 12px 40.91px 23.59px 52px;

  width: 100%;
  height: 55px;

  text-color: #ffffff;
`;

export const Banner = ({
  lectureName,
  reamainingTime,
  assignmentName,
  saveState,
}) => {
  /* saveState는 임시 저장 세 번까지를 구현하려고 넣어보았습니다 @bw-99 어떻게 구현하는지에 따라서 달라질 것 같습니다. */

  return (
    <Bg>
      {/* Exit */}
      <ExitButton />
      {/* Settings */}
      <div style={{ marginLeft: "15px" }}>
        <SettingsButton inverted={true} />
      </div>
      {/* Lecture Name */}
    </Bg>
  );
};
