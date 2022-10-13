/* 강의명: {강의 제목}
과제명: {과제 제목, 
    과제 이동}
마감일: {과제 기한}
설정: {
    배경색 변경,
    코드 에디터 변경 ,
    TODO: 어떤 변경?
}
TODO: 유저 정보 */

/* AssignmentSelector: {
        UserInfo,
        LectureName,
        AssignmentName,
        Deadline,
    }, */

import receiver from "../Core/Comms/receiver";

function assignmentSelector(props) {
  /* DB로부터 과제 정보 가져오는 함수  */

  result = receiver(INFO);

  return result;
}

export default assignmentSelector;
