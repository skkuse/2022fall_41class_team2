// 과제명
import styled from "styled-components";
import { Img } from "../Img";

const Wrapper = styled.div`
  height: auto;
  flex: 1;
`;

const DeadlineBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  font-family: "Gmarket Sans TTF";
  font-style: normal;
  font-weight: 500;
  font-size: 19.4234px;
  line-height: 22px;
  text-align: end;

  border-radius: 10px;

  flex: 1;
  height: 68px;
  color: #000000;
  background: ${(props) => props.background};


`;

export const Deadline = ({
  danger,
  remainingTime,
  background,
  ...restProps
}) => {
  console.log("deadline");
  console.log(danger);
  return (
    <DeadlineBlock background={background}>
      <div style={{ marginRight: "11.32px" }}>
        <Wrapper>
          {/* 남은 시간에 따른 표시 변화 */}
          {danger ? (
            <Img src="/images/danger.svg" alt="timer" />
          ) : (
            <Img src="/images/normal.svg" alt="timer" />
          )}
        </Wrapper>
      </div>
      <div style={{ marginRight: "11px" }}>{remainingTime}</div>
    </DeadlineBlock>
  );
};
