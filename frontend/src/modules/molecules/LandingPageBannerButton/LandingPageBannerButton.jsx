import { Link } from "react-router-dom";

import { BannerIcon } from "../../atoms";

export const LandingPageBannerButton = ({
  children,
  className,
  as,
  darkMode,
  ...restProps
}) => {
  return (
    <Link
      to="/overview"
      className={`${className} common-login-and-register-button`}
      style={{ textDecoration: "none" }}
      {...restProps}
    >
      <BannerIcon
        children={children}
        className={className}
        darkMode={darkMode}
      />
    </Link>
  );
};
