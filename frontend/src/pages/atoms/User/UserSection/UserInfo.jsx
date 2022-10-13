// TODO: 유저 로그인 기능 구현?

import fetchUserInfo from "../fetchUserInfo"

function UserInfo(props) {
    
    fetchUserInfo(props.UserInfo);
    
    return <div>
        구현 예정: 유저 정보
    </div>
}