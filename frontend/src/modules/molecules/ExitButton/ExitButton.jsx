import { Img } from "../../atoms";
import { Link } from "react-router-dom";

export const ExitButton = ({ onClick }) => (
  <Link to="/overview" style={{ textDecoration: "none" }}>
    <Img src="images/exit.svg" alt="exit icon"></Img>
  </Link>
);
