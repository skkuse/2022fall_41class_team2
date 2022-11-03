import React from "react";
const variantClasses = {
  h1: "font-medium lg:text-[5px] xl:text-[6px] 2xl:text-[7px] 3xl:text-[8px] text-[9.66px]",
  h2: "font-medium lg:text-[35px] xl:text-[43px] 2xl:text-[49px] 3xl:text-[59px] text-[65.67px]",
  h3: "font-bold lg:text-[27px] xl:text-[34px] 2xl:text-[39px] 3xl:text-[47px] text-[52.39px]",
  h4: "font-normal lg:text-[17px] xl:text-[21px] 2xl:text-[24px] 3xl:text-[28px] text-[32px]",
  h5: "font-medium lg:text-[11px] xl:text-[14px] 2xl:text-[16px] 3xl:text-[19px] text-[22px]",
  h6: "font-bold lg:text-[10px] xl:text-[13px] 2xl:text-[15px] 3xl:text-[18px] text-[20.46px]",
  body1:
    "lg:text-[10px] xl:text-[13px] 2xl:text-[15px] 3xl:text-[18px] text-[20px]",
  body2:
    "font-bold lg:text-[10px] xl:text-[13px] 2xl:text-[14px] 3xl:text-[17px] text-[19.53px]",
  body3:
    "font-medium lg:text-[10px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[17px] text-[19.42px]",
  body4:
    "font-bold xl:text-[12px] 2xl:text-[13px] 3xl:text-[16px] text-[18px] lg:text-[9px]",
  body5:
    "font-medium xl:text-[10px] 2xl:text-[11px] 3xl:text-[14px] text-[15.62px] lg:text-[8px]",
  body6:
    "font-normal 3xl:text-[10px] text-[12px] lg:text-[6px] xl:text-[8px] 2xl:text-[9px]",
  body7:
    "font-medium text-[10.69px] lg:text-[5px] xl:text-[7px] 2xl:text-[8px] 3xl:text-[9px]",
};
const Text = ({ children, className, variant, as, ...restProps }) => {
  const Component = as || "span";
  return (
    <Component
      className={`${className} ${variantClasses[variant]}`}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export { Text };
