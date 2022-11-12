import { Img } from "../../Img";

export const Save1 = ({ saved, ...restProps }) => {
  // console.log(`Save1: saved = ${saved}`);
  return saved ? (
    <Img src={"/images/saved1.svg"} alt="saved1" />
  ) : (
    <Img src={"/images/empty1.svg"} alt="empty1" />
  );
};
