import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../notification/settingFCM";

import {
  Wrapper,
  FirstSection,
  SecondSection,
  ThirdSection,
} from "../styles/Main/Main";
import { UserInterface, CoupleInterface } from "../interface/UserInterface";
import { FaCamera } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useTheme } from "styled-components";
import { Card } from "../styles/common/card";
import axios from "axios";

import HeaderSection from "../components/Main/HeaderSection";
import CalendarCard from "../components/Main/CalendarCard";
import QuestionCard from "../components/Main/QuestionCard";
import useUserStore from "../stores/UserStore";
import useAuthStore from "../stores/AuthStore";
import useCoupleStore from "../stores/CoupleStore";
import useFCMStore from "../stores/FCMStore";
import TokenCheker from "../util/TokenCheker";
import MenuSection from "../components/MenuSection";
import { useShallow } from "zustand/react/shallow";
import { axiosAuth } from "../util/token";
import { GoPersonFill } from "react-icons/go";
import { BsPeopleFill } from "react-icons/bs";
import Carousel from "../components/Main/Carousel";
import ArrowLeft from "@mui/icons-material/ArrowLeft";
import ArrowRight from "@mui/icons-material/ArrowRight";

const Main = () => {
  const theme = useTheme();
  const { id } = useParams();
  const { setCouple, setYourName } = useCoupleStore(
    useShallow((state) => ({
      setCouple: state.setCouple,
      setYourName: state.setYourName,
    }))
  );
  const { setUser, setProfileImage } = useUserStore();
  const { yourFCMtoken, setYourFCMtoken } = useFCMStore();
  const userId = useUserStore.getState().userId;
  const coupleId = useUserStore.getState().coupleId;
  const [cp1, setCp1] = useState<UserInterface>();
  const [cp2, setCp2] = useState<UserInterface>();
  const [cpInfo, setCpInfo] = useState<CoupleInterface>();
  const [unreadMessage, setUnreadMessage] = useState(0);
  const [isCameraMode, setIsCameraMode] = useState(false);
  const PATH = useAuthStore.getState().PATH;
  const navigate = useNavigate();
  const setCoupleID = useUserStore.getState().setCoupleId;
  const { yourId, setYourProfileImage } = useCoupleStore(
    useShallow((state) => ({
      yourId: state.yourId,
      setYourProfileImage: state.setYourProfileImage,
    }))
  );

  // 채팅방 이동 시 roomId 조회
  const goChat = async () => {
    const res = await axiosAuth.get("/chat/enter", {
      params: { coupleId: coupleId },
    });
    console.log(res);
    navigate(`/chat/${res.data}`);
  };

  // 메인화면 접속 시 커플 정보 조회
  const callData = async () => {
    const res = await axiosAuth.get("/couple/main", {
      params: { coupleId: coupleId },
    });

    if (res.data == "") {
      setCoupleID(null);
      navigate("/");
    }

    setCouple({
      coupleId: res.data[2].coupleId,
      name: res.data[2].name,
      startDate: res.data[2].startDate,
      fuserId: res.data[2].fuserId,
      suserId: res.data[2].suserId,
    });

    if (res.data[0].userId === userId) {
      setYourName(res.data[1].userId, res.data[1].name, res.data[1].nickname);
      setUser(res.data[0]);
    } else {
      setYourName(res.data[0].userId, res.data[0].name, res.data[0].nickname);
      setUser(res.data[1]);
    }

    setCp1(res.data[0]);
    setCp2(res.data[1]);
    setCpInfo(res.data[2]);
  };

  // 내 프로필 이미지 조회
  useEffect(() => {
    axios
      .get(`${PATH}/profile/read`, {
        params: { userId: userId },
      })
      .then((response) => {
        if (!response.data) {
          setProfileImage(
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          );
        } else {
          const image = response.data;
          setProfileImage(
            `${PATH}/profile/getImg/${image.saveFolder}/${image.originalName}/${image.saveName}`
          );
        }
      });
  }, []);

  // 상대방 프로필 이미지 조회
  useEffect(() => {
    axios
      .get(`${PATH}/profile/read`, {
        params: { userId: yourId },
      })
      .then((response) => {
        if (!response.data) {
          setYourProfileImage(
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          );
        } else {
          const image = response.data;
          setYourProfileImage(
            `${PATH}/profile/getImg/${image.saveFolder}/${image.originalName}/${image.saveName}`
          );
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const checkChat = async () => {
    const res = await axiosAuth.get("/chat/unread/message", {
      params: {
        userId: userId,
      },
    });
    setUnreadMessage((prev) => (res.data > 99 ? 99 : res.data));
  };

  useEffect(() => {
    callData();
    checkChat();
    const check = setInterval(checkChat, 1000 * 60 * 2);
    return () => clearInterval(check);
  }, []);

  useEffect(() => {
    axiosAuth
      .get(`${PATH}/fcm/search/other`, {
        params: { otherUserId: yourId },
      })
      .then((res) => {
        setYourFCMtoken(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const goDiary = () => {
    navigate("/diary");
  };

  return (
    <>
      <TokenCheker />
      <MenuSection />
      <HeaderSection cp1={cp1} cp2={cp2} cpInfo={cpInfo} />
      <Wrapper>
        <Carousel />
        <FirstSection>
          {!isCameraMode ? (
            <>
              <Card
                className="camera"
                onClick={() => {
                  setIsCameraMode((prev) => !prev);
                }}
              >
                <div className="camera_title" style={isCameraMode ? { color: "white" } : undefined}>
                  <p>사진</p>
                  <p>찍으러 가기</p>
                </div>

                <IconContext.Provider
                  value={{ size: "10rem", color: theme.color.sub2 }}
                >
                  <FaCamera
                    className="cameraIcon"
                    style={
                      isCameraMode
                        ? {
                            transform: "rotate(15deg)",
                            color: theme.color.sub3,
                          }
                        : undefined
                    }
                  />
                </IconContext.Provider>
              </Card>
            </>
          ) : (
            <>
              <Card
                className="camera"
                onClick={() => {
                  setIsCameraMode((prev) => !prev);
                }}
              >
                <button className="camera_button close">
                  <ArrowLeft/>
                </button>
                <div className="camera_box">
                  <Card
                    className="camera_solo"
                    onClick={() => {
                      navigate("/camera/solo");
                    }}
                  >
                    <div className="iconLabel">같이찍기</div>
                    <p className="camera_des">우리가 함께 있을 때!</p>
                    <IconContext.Provider
                      value={{ size: "6rem", color: theme.color.sub3 }}
                    >
                      <GoPersonFill className="camera_icon" />
                    </IconContext.Provider>
                  </Card>
                  <Card
                    className="camera_couple"
                    onClick={() => {
                      navigate("/camera/couple");
                    }}
                  >
                    <div className="iconLabel">따로찍기</div>
                    <p className="camera_des">우리가 떨여지 있을 때도, 함께 있는 것처럼!</p>
                    <IconContext.Provider
                      value={{ size: "6rem", color: theme.color.sub1 }}
                    >
                      <BsPeopleFill className="camera_icon" />
                    </IconContext.Provider>
                  </Card>
                </div>
              </Card>
            </>
          )}

          <Card className="diary" onClick={goDiary}>
            <p>다이어리</p>
          </Card>
          <Card className="chat" onClick={goChat}>
            <p className="chat_name">채팅</p>
            <p className="chat_num">
              {unreadMessage > 99 ? 99 : unreadMessage}
            </p>
          </Card>
        </FirstSection>

        <SecondSection>
          <CalendarCard />
          <QuestionCard />
        </SecondSection>

        <ThirdSection>
          <Card
            className="balance_game"
            onClick={() => navigate("/balancegame")}
          >
            <div>밸런스게임</div>
            <div>VS</div>
          </Card>
          <Card className="challenge">
            <div>
              <div>매일</div>
              <div>챌린지</div>
            </div>
          </Card>
        </ThirdSection>
      </Wrapper>
    </>
  );
};

export default Main;
