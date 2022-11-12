import { Img } from "../../Img";

export const Save3 = ({ saved, ...restProps }) => {
  return saved ? (
    <Img src={"/images/save3.svg"} alt="save3" />
  ) : (
    <Img src={"/images/empty3.svg"} alt="empty3" />
  );
};
