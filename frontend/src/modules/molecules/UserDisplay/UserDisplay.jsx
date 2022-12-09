import { Stack } from "./../../atoms/Stack/index";
import { useSelector } from 'react-redux';
import { COLOR_SET } from './../../../service/GetColor';

export const UserDisplay = ({
  userData,
  className,
  darkMode,
  ...restProps
}) => {

  const settingSelector = useSelector((state) => state.SettingReducer);
  return (
    <div className={`${className} common-user-display`} {...restProps}>
      {/* USERINFOHERE */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          style={{ 
            borderRadius: "50%",
            // border: `1px solid ${COLOR_SET['MAIN_BANNER_FONT'][settingSelector.backgroundColor]}`
          }}
          width={21}
          height={21}
          src={userData.profile_image_url}
        />
        <div
          style={{
            fontFamily: "Roboto",
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "10.6895px",
            lineHeight: "12px",
            textAlign: "center",
            marginLeft: "6px",
            color:COLOR_SET['MAIN_BANNER_FONT'][settingSelector.backgroundColor]
          }}
        >
          {userData.nickname}
        </div>
      </div>
    </div>
  );
};
