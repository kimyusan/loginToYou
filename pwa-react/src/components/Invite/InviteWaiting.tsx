import React from "react";
import { User } from "../../interface/UserInterface";
import { FlexBox } from "../../styles/Invite/Block";
import { LongButton } from "../../styles/Invite/UI";

type Props = {
  invitedPerson: User | undefined;
  setIsInvited: (isInvited: boolean) => void;
  setInvitedPerson: (invitedPerson: User | undefined) => void;
};

function InviteWaiting({
  invitedPerson,
  setIsInvited,
  setInvitedPerson,
}: Props) {
  return invitedPerson == undefined ? null : (
    <FlexBox>
      <div>{invitedPerson.user_name} 님의 수락을 기다리는 중 ...</div>
      <LongButton
        onClick={() => {
          setIsInvited(false);
          setInvitedPerson(undefined);
        }}
      >
        요청 취소
      </LongButton>
    </FlexBox>
  );
}

export default InviteWaiting;
