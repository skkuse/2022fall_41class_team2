import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { taskItem } from "../../pages/LandingPage/LandingConstants";
import { RootState } from "../../reducers/index.js";
import HomePageIconOn from "../../assets/images/btn-tabbar-home-on@3x.png";
import HomePageIconOff from "../../assets/images/btn-tabbar-home-off@3x.png";

import SearchPageIconOn from "../../assets/images/btn-tabbar-search-on@3x.png";
import SearchPageIconOff from "../../assets/images/btn-tabbar-search-off@3x.png";

import ChatPageIconOn from "../../assets/images/btn-tabbar-chat-on@3x.png";
import ChatPageIconOff from "../../assets/images/btn-tabbar-chat-off@3x.png";

import LikePageIconOn from "../../assets/images/btn-tabbar-like-on@3x.png";
import LikePageIconOff from "../../assets/images/btn-tabbar-like-off@3x.png";

import MyPageIconOff from "../../assets/images/btn-tabbar-mypage-off@3x.png";
import styled from "styled-components";
import { GOTO_CHAT_PAGE, GOTO_HOME_PAGE, GOTO_LIKE_PAGE, GOTO_MY_PAGE, GOTO_SEARCH_PAGE } from "./BottomNavigationBarActions";

const IconItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const IconImage = styled.img`
  width: 24px;
  height: 24px;
  padding: 10px 25px 7px 25px;
  object-fit: contain;
`
const IconTextSelected = styled.div`
  font-family: AppleSDGothicNeo;
  font-size: 10px;
  font-weight: 800;
  color: #fb6159;
`

const IconTextNotSelected = styled.div`
  font-family: AppleSDGothicNeo;
  font-size: 10px;
  font-weight: 500;
  color: #272727;
`

export const BottomNavigationBar = () => {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const pageIndex = useSelector((state) => state.BottomNavigationBarReducer.index);
        
    // //? 새로고침 했을 때 루트 페이지로 이동?
    // useEffect(() => {
    //     window.addEventListener("beforeunload", refreshApp);
    //     return () => {
    //     window.removeEventListener("beforeunload", refreshApp);
    //     };
    // }, []);

    // const refreshApp = (e: BeforeUnloadEvent) => {
    //     e.preventDefault();
    //     let redirectPath = location.pathname.split('/')[1];
    //     console.log(redirectPath);
        
    //     switch (redirectPath) {
    //         case '':
    //             dispatch(GOTO_HOME_PAGE());
    //             break;
    //         case 'search':
    //             dispatch(GOTO_SEARCH_PAGE());
    //             break;  
    //         case 'like':
    //             console.log("???????????????????????????");
                
    //             dispatch(GOTO_LIKE_PAGE());
    //             break;
    //         case 'chat':
    //             dispatch(GOTO_CHAT_PAGE());
    //             break;
    //         case 'mypage':
    //             dispatch(GOTO_MY_PAGE());
    //             break;
    //         default:
    //             dispatch(GOTO_HOME_PAGE());
    //         break;
    //     }
        
    //     // dispatch(GOTO_HOME_PAGE());
    // };

    return(
        <div>
            <div style={{height:"64px"}} ></div>

            <div style={{position:"fixed", zIndex: 10000,bottom: 0,width:"100vw", height:"64px", backgroundColor: "#f5f5f5", display: "flex", justifyContent: "space-between"}}>
                {IconItemComponent(
                    0,
                )}
                {IconItemComponent(
                    1,
                )}
                {IconItemComponent(
                    2,
                )}
                {IconItemComponent(
                    3,
                )}
                {IconItemComponent(
                    4,
                )}
            </div>
        </div>
        
    );
}

const IconItemComponent = (itemNumber) => {
    const selectedNumber = useSelector((state) => state.BottomNavigationBarReducer.index);
    const navigate = useNavigate();

    let isSelected = itemNumber == selectedNumber;

    const actionList = [
        GOTO_HOME_PAGE, GOTO_SEARCH_PAGE, GOTO_LIKE_PAGE, GOTO_CHAT_PAGE, GOTO_MY_PAGE
    ];
    const routeList = [
        "/main", "/search", "/like", "/chat", "/mypage", 
    ]

    const textList = [
        "HOME", "검색", "찜하기", "메세지", "마이페이지"
    ];

    const imageList = [
        // ON OFF
        [HomePageIconOn, HomePageIconOff],
        [SearchPageIconOn, SearchPageIconOff],
        [LikePageIconOn, LikePageIconOff],
        [ChatPageIconOn, ChatPageIconOff],
        [MyPageIconOff, MyPageIconOff],
    ]

    const dispatch = useDispatch();
    
    return (
        <div onClick={()=> {
            navigate(routeList[itemNumber]);
            dispatch(actionList[itemNumber]());
        }}>
            <IconItem>
                {isSelected? <IconImage src={imageList[itemNumber][0]} />: <IconImage src={imageList[itemNumber][1]} />}
                {isSelected? <IconTextSelected>{textList[itemNumber]}</IconTextSelected> : <IconTextNotSelected>{textList[itemNumber]}</IconTextNotSelected>}
            </IconItem>
        </div>
        
    );
}