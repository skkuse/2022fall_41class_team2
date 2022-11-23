// 제출 결과 창

import { SubmissionMaster } from "../../molecules";

export const SubmissionResult = ({submitResult}) => {
  return (
    <SubmissionMaster bodyContent={"결과 그래프..."}>
      {
        JSON.stringify(submitResult)
      }
    </SubmissionMaster>
  );
};
