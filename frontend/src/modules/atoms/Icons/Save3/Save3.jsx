import { Img } from "../../Img";

export const Save3 = ({ saved,isSelected, ...restProps }) => {
  return saved === true ? (
    <Img src={"/images/saved3.svg"} alt="saved3"  isSelected={isSelected} type="save"/>
  ) : (
    <Img src={"/images/empty3.svg"} alt="empty3" isSelected={isSelected} type="save" />
  );
};
