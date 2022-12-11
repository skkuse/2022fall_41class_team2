import React from "react";

import styled from "styled-components";

const Image = styled.img`
  align-self: center;
`;

export const Img = ({
  className,
  src = "images/defaultNoData.JPG",
  alt = "OOPS NO IMAGE",
  isSelected,
  type,
  ...restProps
}) => {
  if(type == "save") {
    return (
      <Image
        style={{
          border: isSelected ? '1px solid #6ff18b' : 'none',
          width: '26px',
          height:'26px',
          borderRadius: isSelected? '50%':  '0%',
        }}
        className={`${className} common-image`}
        src={src}
        alt={alt}
        {...restProps}
        loading={"lazy"}
      />
    );
  } 
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
