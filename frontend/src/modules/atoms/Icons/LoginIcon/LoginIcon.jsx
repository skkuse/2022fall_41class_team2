import styled, { css } from "styled-components";

const Button = styled.div`
  font-family: "Gmarket Sans TTF";
  font-style: normal;
  font-weight: 500;
  font-size: 10.6895px;
  line-height: 12px;
  text-align: center;
  width: 100%;
  height: auto;
  color: #5b5b5b;
  margin-left: auto;
  margin-right : 284.95px
  flex: 1;
`;

export const LoginIcon = (props) => {
  return (
    <div>
      <Button register>회원가입 | 로그인</Button>
    </div>
  );
};
