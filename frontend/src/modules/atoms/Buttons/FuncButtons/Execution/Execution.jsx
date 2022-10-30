// 실행 버튼
/*        - 터미널을 통해 코드 실행
       - 실행 여러번 가능
       - 백엔드에 실행 요청 보내고 6번 섹션에서 결과 표시하는 방법 */

import executioner from "../../../Core/executioner";

function Execution(props) {
    
    executioner();
    return <h1>실행</h1>
    
}

export default Execution;