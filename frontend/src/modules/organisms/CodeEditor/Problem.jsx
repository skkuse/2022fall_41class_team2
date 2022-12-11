// 2. 문제 설명 섹션
/* 
<REQUIREMENTS>  
문제: 과제 설명
참조/제약사항: 참조 내용 혹은 제약사항 설명
 */

import ProblemMaster from "../../molecules/ProblemMaster/ProblemMaster";

export const Problem = ({
  headerContent,
  bodyContent,
  darkMode,
  prob,
  restr,
  magnified,
  setMagnified,
  ...restProps
}) => {
  return (
    <ProblemMaster
      headerContent={headerContent}
      bodyContent={bodyContent}
      darkMode={darkMode}
      prob={prob}
      restr={restr}
      magnified={magnified}
      setMagnified={setMagnified}
    />
  );
};
