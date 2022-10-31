// 1. 헤드 섹션

/* 
<REQUIREMENTS>  
홈 버튼: {맨 처음으로 돌아가기 위한 버튼 ,
    TODO: landing page 정의 필요 }
강의명: {강의 제목}
과제명: {과제 제목, 
    과제 이동}
마감일: {과제 기한}
설정: {
    배경색 변경,
    코드 에디터 변경 ,
    TODO: 어떤 변경?
}
TODO: 유저 정보: User 로그인 기능 구현
*/

import HeaderMaster from "../molecules/HeaderMaster/HeaderMaster";

function Header(props) {
    
    return <div>
        <HeaderMaster/>
    </div>
} 

export default Header;