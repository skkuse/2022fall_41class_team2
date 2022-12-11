import { Img } from "../../Img";

export const Save1 = ({ saved,isSelected, ...restProps }) => {
  // console.log(`Save1: saved = ${saved}`);
  return saved ? (
    <Img 
    src={"/images/saved1.svg"} alt="saved1" isSelected={isSelected} type="save"/>
  ) : (
    <Img src={"/images/empty1.svg"} alt="empty1" isSelected={isSelected} type="save"/>
  );
};
