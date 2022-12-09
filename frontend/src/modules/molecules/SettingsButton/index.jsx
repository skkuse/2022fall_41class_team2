import React from "react";

import { SettingsIcon } from "./../../atoms";

import { Link } from "react-router-dom";
import { SettingsIconBlack } from "../../atoms/Icons/SettingsIcon/SettingsIcon";

export const SettingsButton = ({
  className,
  inverted,
  darkMode,
  ...restProps
}) => {
  return (
    <Link
      to="/settings"
      className={`${className} common-settings-button`}
      {...restProps}
    >
      <SettingsIcon inverted={inverted} darkMode={darkMode} />
    </Link>
  );
};


export const SettingsButtonBlack = ({
  className,
  inverted,
  darkMode,
  ...restProps
}) => {
  return (
    <Link
      to="/settings"
      className={`${className} common-settings-button`}
      {...restProps}
    >
      <SettingsIconBlack />
    </Link>
  );
};
