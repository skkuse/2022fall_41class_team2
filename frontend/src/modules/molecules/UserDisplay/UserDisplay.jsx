import { Stack } from './../../atoms/Stack/index';

export const UserDisplay = ({ userData, className, ...restProps }) => {

  return (
    <div className={`${className} common-user-display`} {...restProps}>
      {/* USERINFOHERE */}
      <div style={{display: "flex", alignItems:"center"}}>
        <img style={{borderRadius: "50%"}} width={21} height={21} src={userData.profile_image_url} />
        <div style={{
          fontFamily: 'Roboto',
          fontStyle: "normal",
          fontWeight: 500,
          fontSize: "10.6895px",
          lineHeight: "12px",
          textAlign: "center",
          color: "#5B5B5B",
          marginLeft: "6px"}}> 
          {userData.nickname}
        </div>
      </div>
    </div>
  );
};
