// 채점 결과 창

import { GradingMaster } from "../../molecules";

export const Grading = ({darkMode, pfList}) => {
  const score = (pfList.filter((pf) => pf.is_pass).length / pfList.length)*100;

  const bodyContent = `총점: ${score}점\n` + pfList.map((pf, index) => {
    let content = "";
    if(pf.is_hidden) {
      content = `히든 테스트케이스 ${index}: ${pf.is_pass}`;
    }
    else{
      content = `공개 테스트케이스 ${index}: ${pf.is_pass}`;
    }
    return content;
  })
  return <GradingMaster bodyContent={bodyContent} darkMode={darkMode} pfList={pfList}/>;
};
