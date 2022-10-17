// 헤드 섹션-과제 기한
/*        - assignmentSelector() 함수로 DB에서 과제 정보를 받아옴
       - 과제 기한 표시 (ex. DD일 HH시간 MM분 남았습니다. ) */

import assignmentSelector from "../assignmentSelector";

function Deadline(props) {
    assignmentSelector(props.Deadline);
    return <h1>Deadline component</h1>
}

export default Deadline;