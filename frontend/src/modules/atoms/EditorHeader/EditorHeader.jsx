import styled from "styled-components";

const Header = styled.div`
  display: flex;
  align-items: center;

  height: 41px;

  background: #bfbfbf;

  font-family: "Gmarket Sans TTF";
  font-style: normal;
  font-weight: 700;
  font-size: 19.5296px;
  line-height: 22px;

  color: #1e1e1e;
  padding 0 14.02px 0 14.02px;
`;

export const EditorHeader = ({ content, ...restProps }) => {
  return <Header>{content}</Header>;
};
