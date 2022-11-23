// 제출 결과 창

import { SubmissionMaster } from "../../molecules";

export const SubmissionResult = ({ resultObj, darkMode, ...restProps }) => {
  // 예시용 데이터 오브젝트
  resultObj = {
    id: 0,
    references: {
      additionalProp1: ["string"],
      additionalProp2: ["string"],
      additionalProp3: ["string"],
    },
    code_description: "string",
    functionality_result: {
      id: 0,
      testcase_results: [
        {
          is_hidden: true,
          input: "string",
          is_error: true,
          expected_output: "string",
          actual_output: "string",
          is_pass: true,
        },
        {
          is_hidden: true,
          input: "string",
          is_error: true,
          expected_output: "string",
          actual_output: "string",
          is_pass: false,
        },
        {
          is_hidden: true,
          input: "string",
          is_error: true,
          expected_output: "string",
          actual_output: "string",
          is_pass: false,
        },
      ],
    },
    efficiency_result: {
      id: 2,
      loc_score: 10,
      control_flow_complexity_score: 20,
      reservation_words_score: 30,
      data_flow_complexity_score: 40,
    },
    plagiarism_result: {
      id: 0,
      num_files_compared: 0,
      similarity_score: 23,
    },
    readability_result: {
      id: 1,
      pylint_score: 25,
      pycodestyle_score: 30,
      mypy_score: 35,
    },
  };

  return <SubmissionMaster resultObj={resultObj} darkMode={darkMode} />;
};
