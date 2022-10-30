// Landing page
import React from "react";
import { Link } from "react-router-dom";

import { Column, Row, Img, Text, Line, Stack } from "../../modules/atoms";

export const LandingPage = () => {
  // test
  // return <h1>hello world</h1>;

  return (
    <>
      <Column className="bg-white_A700 font-gmarketsansttf items-center justify-end mx-[auto] w-[100%]">
        <header className="w-[100%]">
          <Column className="bg-white_A700 justify-end lg:pt-[4px] 2xl:pt-[6px] xl:pt-[6px] 3xl:pt-[8px] lg:px-[4px] 2xl:px-[6px] xl:px-[6px] 3xl:px-[8px] shadow-bs w-[100%]">
            <Column className="justify-start lg:ml-[5px] xl:ml-[7px] 2xl:ml-[8px] 3xl:ml-[9px] w-[85%]">
              <Row className="items-start w-[100%]">
                {/* Settings icon */}
                <Img
                  src="../assets/images/img_settings.svg"
                  className="settings"
                  alt="settings"
                />

                <Text
                  className="cursor-pointer hover:font-medium xl:ml-[1007px] 2xl:ml-[1133px] 3xl:ml-[1359px] lg:ml-[805px] mt-[4px] text-gray_700 w-[auto]"
                  variant="body7"
                >
                  회원가입
                </Text>
                <Line className="bg-gray_700 h-[0.53px] lg:ml-[3px] 2xl:ml-[4px] xl:ml-[4px] 3xl:ml-[5px] lg:mt-[2px] 2xl:mt-[3px] xl:mt-[3px] 3xl:mt-[4px] rotate-[90deg] w-[1px]" />
                <Line className="bg-gray_700 h-[0.53px] lg:mt-[2px] 2xl:mt-[3px] xl:mt-[3px] 3xl:mt-[4px] rotate-[90deg] w-[1px]" />
                <Text
                  className="cursor-pointer hover:font-medium ml-[4px] mt-[4px] text-gray_700 w-[auto]"
                  variant="body7"
                >
                  로그인
                </Text>
              </Row>
              <Row className="items-center justify-end ml-[auto] 2xl:mt-[10px] 3xl:mt-[12px] lg:mt-[7px] xl:mt-[9px] w-[67%]">
                <Text
                  className="my-[1px] text-black_900 w-[auto]"
                  as="h5"
                  variant="h5"
                >
                  문제
                </Text>
                <Text
                  className="xl:ml-[100px] 2xl:ml-[112px] 3xl:ml-[135px] lg:ml-[80px] my-[1px] text-black_900 w-[auto]"
                  as="h5"
                  variant="h5"
                >
                  강의
                </Text>
                <Text
                  className="xl:ml-[100px] 2xl:ml-[112px] 3xl:ml-[135px] lg:ml-[80px] mt-[1px] text-black_900 w-[auto]"
                  as="h5"
                  variant="h5"
                >
                  공지사항
                </Text>
                <Text
                  className="mb-[1px] xl:ml-[100px] 2xl:ml-[112px] 3xl:ml-[135px] lg:ml-[80px] text-black_900 w-[auto]"
                  as="h5"
                  variant="h5"
                >
                  도움말
                </Text>
                <Text
                  className="xl:ml-[100px] 2xl:ml-[112px] 3xl:ml-[135px] lg:ml-[80px] my-[1px] text-black_900 w-[auto]"
                  as="h5"
                  variant="h5"
                >
                  게시판
                </Text>
                <Text
                  className="mb-[1px] xl:ml-[100px] 2xl:ml-[112px] 3xl:ml-[135px] lg:ml-[80px] text-black_900 w-[auto]"
                  as="h5"
                  variant="h5"
                >
                  그룹
                  <br />
                </Text>
              </Row>
              <Stack className="xl:h-[3px] lg:h-[3px] 3xl:h-[4px] 2xl:h-[4px] lg:ml-[212px] xl:ml-[265px] 2xl:ml-[298px] 3xl:ml-[358px] lg:mt-[10px] xl:mt-[12px] 2xl:mt-[14px] 3xl:mt-[17px] w-[6%]">
                <Line className="absolute bg-indigo_400 h-[4px] w-[100%]" />
                <Line className="absolute bg-indigo_400 h-[4px] w-[100%]" />
              </Stack>
            </Column>
          </Column>
        </header>
        <Column className="items-center justify-end lg:mt-[48px] xl:mt-[60px] 2xl:mt-[67px] 3xl:mt-[81px] w-[41%]">
          <Text className="text-black_900 w-[auto]" as="h2" variant="h2">
            Coding Cat
            <br />
          </Text>
          <Text className="TwentyNine" variant="body3">
            프로그래밍 문제를 풀고 온라인으로 채점받을 수 있는 곳입니다.
          </Text>
          <Stack
            className="bg-cover bg-repeat lg:h-[13px] xl:h-[17px] 2xl:h-[19px] 3xl:h-[22px] lg:mt-[18px] xl:mt-[22px] 2xl:mt-[25px] 3xl:mt-[30px] lg:w-[12px] xl:w-[16px] 2xl:w-[18px] 3xl:w-[21px]"
            style={{ backgroundImage: "url('images/img_group27.svg')" }}
          >
            <Img
              src="images/img_group27.svg"
              className="arrowdown"
              alt="arrowdown"
            />
          </Stack>
          <Row className="items-center xl:mt-[10px] 2xl:mt-[11px] 3xl:mt-[13px] lg:mt-[8px] w-[1px]">
            <Line className="bg-black_900 lg:h-[37px] xl:h-[46px] 2xl:h-[52px] 3xl:h-[62px] w-[1px]" />
            <Line className="bg-black_900 lg:h-[37px] xl:h-[46px] 2xl:h-[52px] 3xl:h-[62px] w-[1px]" />
          </Row>
          <Img
            src="images/img_illustration1_911X788.svg"
            className="illustrationOne1"
            alt="illustrationOne"
          />
        </Column>
      </Column>
    </>
  );
};