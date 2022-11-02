/* UserDisplay molecule에 route 추가 */
import { Link } from "react-router-dom";
import { UserDisplay } from "../../molecules";

export const UserBox = ({ user, className, ...restProps }) => {
  return (
    <div className={`${className} common-user-box`} {...restProps}>
      <Link to="/login/redirect">
        <UserDisplay user={user} />
      </Link>
    </div>
  );
};
