import { Img } from "../../Img";

export const Save2 = ({ saved, ...restProps }) => {
  // console.log(`Save2: saved = ${saved}`);

  return saved === true ? (
    <Img src={"/images/saved2.svg"} alt="saved2" />
  ) : (
    <Img src={"/images/empty2.svg"} alt="empty2" />
  );
};
