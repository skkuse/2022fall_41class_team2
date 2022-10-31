import styled, { css } from "styled-components";

const Button = styled.div`
  font-family: "Gmarket Sans TTF";
  font-style: normal;
  font-weight: 500;
  font-size: 22px
  line-height: 25.3px;
  text-align: center;
  width: 100%;
  height: auto;
  color: #000000;
  margin: auto;
  
`;

export const BannerIcon = ({
  children,
  className,
  variant,
  as,
  ...restProps
}) => {
  return (
    <div>
      <Button register className={`${className}`} {...restProps}>
        {children}
      </Button>
    </div>
  );
};
