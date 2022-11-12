import { Img } from "../../Img";

export const Save2 = ({ saved, ...restProps }) => {
  return saved ? (
    <Img src={"/images/save2.svg"} alt="save2" />
  ) : (
    <Img src={"/images/empty2.svg"} alt="empty2" />
  );
};
