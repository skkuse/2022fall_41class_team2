import styled from "styled-components";
import { Img } from "../..";

const Wrapper = styled.div`
  height: auto;
  flex: 1;
`;

export const TimerIcon = (danger, ...restProps) => {
  return (
    <div>
      <Wrapper>
        {/* 남은 시간에 따른 표시 변화 */}
        {danger ? (
          <Img src="/images/danger.svg" alt="timer" />
        ) : (
          <Img src="/images/normal.svg" alt="timer" />
        )}
      </Wrapper>
    </div>
  );
};
