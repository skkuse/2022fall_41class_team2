import styled from "styled-components";

import { Img } from "../../atoms";

const Title = styled.div`
  font-family: "Gmarket Sans TTF";
  font-style: normal;
  font-weight: 500;
  font-size: 65.6711px;
  line-height: 76px;
  /* identical to box height */

  text-align: center;
`;

const SubTitle = styled.div`
  font-family: "Gmarket Sans TTF";
  font-style: normal;
  font-weight: 500;
  font-size: 19.4234px;
  line-height: 22px;
  text-align: center;

  color: #000000;
`;

const ImageWrapper = styled.div`
  

export const LandingPageScenery = (props) => {
  return (
    <>
      <div style={{ marginTop: "82px" }}>
        <Title>Coding Cat</Title>
      </div>
      <div style={{ marginTop: "15.67px" }}>
        <SubTitle>
          프로그래밍 문제를 풀고 온라인으로 채점받을 수 있는 곳입니다.
        </SubTitle>
      </div>
      <Img
        src="images/img_illustration1_911X788.svg"
        className="illustrationOne1"
        alt="scenery"
      />
    </>
  );
};
