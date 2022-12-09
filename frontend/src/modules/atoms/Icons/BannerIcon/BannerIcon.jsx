import styled, { css } from "styled-components";
import { COLOR_SET } from './../../../../service/GetColor';
import { useSelector } from 'react-redux';

const Button = styled.div`
  font-family: "Gmarket Sans TTF";
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 25.3px;
  text-align: center;
  width: 100%;
  height: auto;
  /* color: ${(props) => (props.darkMode ? "#D8D8D8" : "#000000")}; */
  margin: auto;
`;

export const BannerIcon = ({ children, className, darkMode, ...restProps }) => {
  const settingSelector = useSelector((state) => state.SettingReducer);
  return (
    <div>
      <Button
        register
        className={`${className}`}
        style={{color:COLOR_SET['MAIN_BANNER_FONT'][settingSelector.backgroundColor]}}
        {...restProps}
      >
        {children}
      </Button>
    </div>
  );
};
