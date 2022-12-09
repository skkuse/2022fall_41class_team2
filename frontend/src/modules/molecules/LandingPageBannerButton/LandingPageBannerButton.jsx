import { Link } from "react-router-dom";

import { BannerIcon } from "../../atoms";
import { useSelector } from 'react-redux';
import { COLOR_SET } from './../../../service/GetColor';

export const LandingPageBannerButton = ({
  children,
  className,
  as,
  darkMode,
  ...restProps
}) => {
  const settingSelector = useSelector((state) => state.SettingReducer);
  return (
    <Link
      to="/overview"
      className={`${className} common-login-and-register-button`}
      style={{ textDecoration: "none", color:COLOR_SET['MAIN_BANNER_FONT'][settingSelector.backgroundColor] }}
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
