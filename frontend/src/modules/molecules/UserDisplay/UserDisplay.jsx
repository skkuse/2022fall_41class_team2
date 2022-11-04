export const UserDisplay = ({ user, className, ...restProps }) => {
  return (
    <div className={`${className} common-user-display`} {...restProps}>
      USERINFOHERE
      {/* <Stack>
        <Avatar src={user.avatarSrc} alt={user.name} />
        <Text>{user.name}</Text>
      </Stack> */}
    </div>
  );
};
