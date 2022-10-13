/*        - 코드 채점
       - 채점은 여러번 가능 
       - 백엔드에 실행 요청 보내고 6번 섹션에서 결과 표시하는 방법
         - executioner() 호출 */


import executioner from "../../../Core/executioner";

function Grading() {
  return (
    <div>
      <button type="button" className="btn btn-secondary">
        채점
      </button>
    </div>
  );
}

export default Grading;