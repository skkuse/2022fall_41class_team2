import React from "react";
import PropTypes from "prop-types";

const shapes = { CircleBorder36: "rounded-radius36" };
const variants = {
  FillIndigo300: "bg-indigo_300 text-white_A700",
  FillBluegray600: "bg-bluegray_600 text-white_A700",
};
const sizes = {
  sm: "p-[10px] lg:p-[5px] xl:p-[6px] 2xl:p-[7px] 3xl:p-[9px]",
  md: "lg:p-[11px] xl:p-[14px] 2xl:p-[15px] 3xl:p-[18px] p-[21px]",
};

const Button = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape,
  variant,
  size,
  ...restProps
}) => {
  return (
    <button
      className={`${className} ${shapes[shape] || ""} ${
        variants[variant] || ""
      } ${sizes[size] || ""} common-button `}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  shape: PropTypes.oneOf(["CircleBorder36"]),
  variant: PropTypes.oneOf(["FillIndigo300", "FillBluegray600"]),
  size: PropTypes.oneOf(["sm", "md"]),
};
Button.defaultProps = {
  className: "",
  shape: "",
  variant: "FillIndigo300",
  size: "sm",
};

export { Button };
