import React from "react";

import { SettingsIcon } from "./../../atoms";

import { Link } from "react-router-dom";

export const SettingsButton = ({ className, inverted, ...restProps }) => {
  return (
    <Link
      to="/settings"
      className={`${className} common-settings-button`}
      {...restProps}
    >
      <SettingsIcon inverted={inverted} />
    </Link>
  );
};
