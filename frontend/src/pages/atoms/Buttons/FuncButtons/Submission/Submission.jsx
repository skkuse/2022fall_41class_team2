// 제출 버튼

function Submission() {
  return (
    <Button
      type="primary"
      shape="round"
      icon={<CheckOutlined />}
      size="large"
      style={{ width: '100%' }}
    >
      제출
    </Button>
  );
}

export default Submission;