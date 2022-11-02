import { Link } from "react-router-dom";
import { LoginIcon } from "../../atoms";

export const LoginAndRegisterButton = ({
  className,
  loggedOn,
  ...restProps
}) => {
  return (
    <Link
      to="/auth/login"
      className={`${className} common-login-and-register-button`}
      style={{ textDecoration: "none" }}
      loggedOn={loggedOn}
      {...restProps}
    >
      <LoginIcon />
    </Link>
  );
};
