import React, { useState } from "react";
import { FlexBox } from "../../styles/Invite/Block";
import { WhiteBox, InputForm, LongButton } from "../../styles/Invite/UI";
import InviteSearch from "./InviteSearch";
import { User } from "../../interface/UserInterface";

// Props 설정 (DB 연동 후 변경)
interface Props extends User {
  user_id: number;
  user_name: string;
  user_code: string;
  setIsInvited: (isInvited: boolean) => void;
  setInvitedPerson: (invitedPerson: User) => void;
}

// 테스트용 더미
const findtest = {
  user_id: 2,
  user_name: "박싸피",
  user_code: "ABCDEFGH",
};

function InviteMain({
  user_id,
  user_name,
  user_code,
  setIsInvited,
  setInvitedPerson,
}: Props) {
  const [keyword, setKeyword] = useState<string | null>("");
  const [isOpen, setIsOpen] = useState(false);

  // 서치창 개폐 함수
  const findPerson = function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsOpen(true);
  };

  return (
    <FlexBox>
      <div>연인을 추가하고 Spy x Couple을 시작해 보세요</div>
      <div>{user_name}님의 코드</div>
      <WhiteBox>{user_code}</WhiteBox>

      <InputForm onSubmit={findPerson}>
        <div>코드로 추가하기</div>

        {/* 상대 검색 input */}
        <WhiteBox
          contentEditable
          value={keyword}
          onInput={(e: React.ChangeEvent<HTMLDivElement>) => {
            setKeyword(e.target.textContent);
          }}
        />

        <LongButton>검색</LongButton>
      </InputForm>

      {/* 검색 결과 표시창(검색 후 개폐) */}
      <InviteSearch
        isOpen={isOpen}
        findtest={findtest}
        setIsOpen={setIsOpen}
        setIsInvited={setIsInvited}
        setInvitedPerson={setInvitedPerson}
      />
    </FlexBox>
  );
}

export default InviteMain;
