import { Save1 } from "../../atoms";

export const Save1FuncButton = ({ saved, ...restProps }) => {
  // console.log(`Save1FuncButton: saved = ${saved}`);
  return <Save1 saved={saved} restProps={restProps} />;
};
