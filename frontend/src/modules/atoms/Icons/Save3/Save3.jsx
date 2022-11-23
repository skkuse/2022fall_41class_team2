import { Img } from "../../Img";

export const Save3 = ({ saved, ...restProps }) => {
  return saved === true ? (
    <Img src={"/images/saved3.svg"} alt="saved3" />
  ) : (
    <Img src={"/images/empty3.svg"} alt="empty3" />
  );
};
