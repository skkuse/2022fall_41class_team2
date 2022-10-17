// 제출 버튼

import submitter from "../../../Core/submitter";

function Submission() {

  function submit() {
    submitter.submit();
  }  
  return (
    <Button
      type="primary"
      shape="round"
      icon={<CheckOutlined />}
      size="large"
      style={{ width: '100%' }}
    >
      제출,  OnClick={submit}
    </Button>
  );
}

export default Submission;