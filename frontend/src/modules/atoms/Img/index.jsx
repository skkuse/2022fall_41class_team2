import React from "react";

import styled from "styled-components";

const Image = styled.img`
  alignself: center;
`;

export const Img = ({
  className,
  src = "images/defaultNoData.JPG",
  alt = "OOPS NO IMAGE",
  ...restProps
}) => {
  return (
    <Image
      className={`${className} common-image`}
      src={src}
      alt={alt}
      {...restProps}
      loading={"lazy"}
    />
  );
};
