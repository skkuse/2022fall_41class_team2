import React from "react";

import SettingsIcon from "../atoms/SettingsIcon";

import { Link } from "react-router-dom";


const SettingsButton = ({ className, ...restProps }) => {
  return (
    <Link to="/settings" className={`${className} common-settings-button`} {...restProps}>
      <SettingsIcon />
    </Link>
  );
}

export default SettingsButton