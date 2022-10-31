import React from "react";

export const Img = ({
  className,
  src = "images/defaultNoData.JPG",
  alt = "OOPS NO IMAGE",
  ...restProps
}) => {
  return (
    <img
      className={`${className} common-image`}
      src={src}
      alt={alt}
      {...restProps}
      loading={"lazy"}
    />
  );
};
