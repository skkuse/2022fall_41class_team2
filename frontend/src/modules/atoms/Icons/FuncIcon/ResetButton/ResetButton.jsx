// skeleton 코드로 초기화

/* - DB 접근
       - 선택된 과제 record의 skeleton code 멤버에 접근해서 값 가져오기
       - 에디터 섹션 업데이트 필요
       - 최초 로드시 해당 기능 실행 */

import assignmentSelector from "../../../Core/assignmentSelector";

function ResetButton({ reset }) {
  return (
    <Button
      type="button"
      onClick={reset}
      style={{ backgroundColor: 'white', color: 'black' }}
    >
      Reset
    </Button>
  );
}

export default ResetButton