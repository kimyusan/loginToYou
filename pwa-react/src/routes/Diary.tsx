import TokenCheker from "../util/TokenCheker";
import MenuSection from "../components/MenuSection";
import DaySelection from "../components/Diary/DaySelection";
import DiaryItem from "../components/Diary/DiaryItem";

import useUserStore from "../stores/UserStore";
import { useTheme } from "styled-components";
import { axiosAuth } from "../util/token";
import { useEffect, useState } from "react";
import { DiaryInterface } from "../interface/DiaryInterface";
import { DiaryWrapper } from "../styles/Diary/UI";
import { useNavigate } from "react-router-dom";

const Diary = () => {
  const theme = useTheme();
  const coupleId = useUserStore.getState().coupleId;
  const navigate = useNavigate();

  // 다이어리 변수
  const [diaryList, setDiaryList] = useState<DiaryInterface[]>([]);
  const [diaryThisMonth, setDiaryThisMonth] = useState<DiaryInterface[]>([]);

  // 선택된 연+월
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const setDiaries = (data: DiaryInterface[]) => {
    setDiaryThisMonth((prev) => {
      return data.filter((each: DiaryInterface) => {
        let imgYear = each.registerDate.split("-")[0];
        let imgMonth = each.registerDate.split("-")[1];
        return Number(imgYear) == year && Number(imgMonth) == month;
      });
    });
  };

  // 전체 다이어리 call 함수
  const callDiary = async () => {
    try {
      const res = await axiosAuth.get("/diary/read", {
        params: { coupleId },
      });

      // 전체 다이어리 리스트
      setDiaryList((prev) => res.data);
      setDiaries(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setDiaries(diaryList);
  }, [month]);

  useEffect(() => {
    callDiary();
  }, []);

  return (
    <div style={{ backgroundColor: theme.color.bgColor }}>
      <TokenCheker />
      <MenuSection />
      <DaySelection
        year={year}
        month={month}
        setYear={setYear}
        setMonth={setMonth}
      />
      <DiaryWrapper>
        {diaryThisMonth.map((diary, idx) => {
          if (diary.isThumbnail == 1) {
            return (
              <div
                key={idx}
                onClick={() => {
                  navigate(`/diarydetail/${diary.diaryId}`, {
                    state: {
                      diary,
                      images: diaryList.filter((each: DiaryInterface) => {
                        if (each.saveFolder == diary.saveFolder) {
                          return each;
                        }
                      }),
                    },
                  });
                }}
              >
                <DiaryItem diary={diary} />
              </div>
            );
          }
        })}
      </DiaryWrapper>
    </div>
  );
};

export default Diary;
