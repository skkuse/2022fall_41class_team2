import { Link } from "react-router-dom";
import { LoginIcon } from "../../atoms";

export const LoginAndRegisterButton = ({ className, ...restProps }) => {
  return (
    <Link
      to="/login"
      className={`${className} common-login-and-register-button`}
      style={{ textDecoration: "none" }}
      {...restProps}
    >
      <LoginIcon />
    </Link>
  );
};
