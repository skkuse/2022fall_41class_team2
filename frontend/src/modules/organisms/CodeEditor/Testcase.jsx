// 3. 테스트 케이스 섹션

import TestcaseMaster from "../../molecules/TestcaseMaster/TestcaseMaster";

export const Testcase = ({ headerContent, bodyContent, testCases, ...restProps }) => {
  return (
    <TestcaseMaster headerContent={headerContent} bodyContent={bodyContent} testCases={testCases} />
  );
};
