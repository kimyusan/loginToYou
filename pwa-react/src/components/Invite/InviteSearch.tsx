import React from "react";
import { FlexBox, InviteSearchBox } from "../../styles/Invite/Block";
import { LongButton } from "../../styles/Invite/UI";
import { User } from "../../interface/UserInterface";

type Props = {
  setIsOpen: (isOpen: boolean) => void;
  setIsInvited: (isInvited: boolean) => void;
  setInvitedPerson: (invitedPerson: User) => void;
  isOpen: boolean;
  findtest: User;
};

function InviteSearch({
  isOpen,
  setIsOpen,
  findtest,
  setIsInvited,
  setInvitedPerson,
}: Props) {
  return (
    <InviteSearchBox className={isOpen && "opened"}>
      <FlexBox>
        <div>{findtest.user_name} 님께 요청을 보내시겠습니까?</div>
        <LongButton
          onClick={() => {
            setIsInvited(true);
            setIsOpen(false);
            setInvitedPerson(findtest);
          }}
        >
          확인
        </LongButton>
        <LongButton
          onClick={() => {
            setIsOpen(false);
          }}
        >
          취소
        </LongButton>
      </FlexBox>
    </InviteSearchBox>
  );
}

export default InviteSearch;
