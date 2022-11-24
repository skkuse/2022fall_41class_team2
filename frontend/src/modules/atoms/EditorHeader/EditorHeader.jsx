import styled from "styled-components";

const Header = styled.div`
  display: flex;
  align-items: center;

  height: 41px;

  background: ${(props) => (props.darkMode ? "#525263" : "#bfbfbf")};

  font-family: "Gmarket Sans TTF";
  font-style: normal;
  font-weight: 700;
  font-size: 19.5296px;
  line-height: 22px;

  color: ${(props) => (props.darkMode ? "#d8d8d8" : "#1e1e1e")};
  
  padding 0 14.02px 0 14.02px;

  cursor: pointer;
`;

export const EditorHeader = ({ content, darkMode, ...restProps }) => {
  return <Header darkMode={darkMode}>{content}</Header>;
};
