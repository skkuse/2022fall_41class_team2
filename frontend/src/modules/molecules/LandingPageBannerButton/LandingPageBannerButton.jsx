import { Link } from "react-router-dom";

import { BannerIcon } from "../../atoms";

export const LandingPageBannerButton = ({
  children,
  className,
  variant,
  as,
  ...restProps
}) => {
  return (
    <Link
      to="/main"
      className={`${className} common-login-and-register-button`}
      style={{ textDecoration: "none" }}
      {...restProps}
    >
      <BannerIcon />
    </Link>
  );
};


