// 헤드 섹션-강의 제목
// TODO: 추가기능: 강의에 따른 과제 이동 기능

import assignmentSelector from "../assignmentSelector";
import assignmentSwitcher from "../assignmentSwitcher";

function Lecture(props) {
    assignmentSelector(props.Lecture);
    
    if (ASSIGNMENT SWITCHES)
        assignmentSwitcher(TARGET ASSIGNMENT);
    
    return <h1>Lecture component</h1>
}

export default Lecture;