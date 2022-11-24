// 채점 결과 창

import { GradingMaster } from "../../molecules";

export const Grading = ({darkMode}) => {
  return <GradingMaster bodyContent={"총점: 60점 ..."} darkMode={darkMode} />;
};
