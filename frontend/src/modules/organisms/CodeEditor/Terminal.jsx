// 6. 실행 결과 섹션 (터미널)

import { TerminalMaster } from "../../molecules";

export const Terminal = ({ darkMode }) => {
  return <TerminalMaster bodyContent={"실행결과"} darkMode={darkMode} />;
};
