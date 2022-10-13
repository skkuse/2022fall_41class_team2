// 헤드 섹션-과제 기한

import assignmentSelector from "../assignmentSelector";

function Deadline(props) {
    assignmentSelector(props.Deadline);
    return <h1>Deadline component</h1>
}

export default Deadline;