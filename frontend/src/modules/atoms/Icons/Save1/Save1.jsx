import { Img } from "../../Img";

export const Save1 = ({ saved, ...restProps }) => {
  return saved ? (
    <Img src={"/images/save1.svg"} alt="save1" />
  ) : (
    <Img src={"/images/empty1.svg"} alt="empty2" />
  );
};
