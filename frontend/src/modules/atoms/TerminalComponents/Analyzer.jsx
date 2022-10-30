/*        - CodeDiff
         - 정답 코드랑의 비교를 통해 확인 및 표시
           - 사용자 코드를 백엔드에 보내면서 해당 작업을 호출한다.
         - 코드 입력창 확대 시 좌우로 표기
           - conditional rendering
             - header section, termianl section 제외한 모든 화면을 수정 방안을 나타내는 editor section으로 채운다. */

import sender from "../Core/comms/sender";
import receiver from "../Core/comms/receiver";

import SubmissionResult from "./AnalysisComponents/SubmissionResult";
import Explanation from "./AnalysisComponents/Explanation";
import Recommender from "./AnalysisComponents/Recommender";

function Analyzer() {
    CONDITIONAL RENDERING ON CLICK
        < SubmissionResult /> or <Explanation/> or <Recommender/>
        
}

export default Analyzer;