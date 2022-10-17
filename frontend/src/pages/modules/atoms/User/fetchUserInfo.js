import sender from "../Core/Comms/sender";
import receiver from "../Core/Comms/receiver";

function fetchUserInfo(props) {
  /* DB로부터 유저 정보 가져오는 함수  */
  result = receiver(INFO);

  return result;
}

export default fetchUserInfo;
