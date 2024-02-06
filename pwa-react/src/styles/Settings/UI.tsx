import styled from "styled-components";
import { SaveButton } from "../UserInfo/UserInfo";

export const Header = styled.div`
  background-color: white;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 15px;
  height: 8dvh;
  border-bottom: 1px solid ${(props) => props.theme.color.lightgrey};
  div {
    color: ${(props) => props.theme.color.grey};
  }
`;

export const MenuTitle = styled.div`
  background-color: ${(props) => props.theme.color.lightgrey};
  color: ${(props) => props.theme.color.grey};
  padding: 3px 10px;
  box-sizing: border-box;

  width: 100%;
`;

export const Menu = styled.div`
  background-color: white;
  width: 100%;
  height: 8dvh;
  box-sizing: border-box;
  border-bottom: 1px solid ${(props) => props.theme.color.lightgrey};
  display: flex;
  align-items: center;
  padding-left: 15px;
`;

export const CancelButton = styled(SaveButton)`
  margin-top: 5% !important;
  width: 100%;
  align-items: center;
  color: ${(props) => {
    return props.theme.color.sub1;
  }} !important;
  font-size: 1rem !important;
  background-color: white !important;
  border: 1px solid
    ${(props) => {
      return props.theme.color.sub1;
    }} !important;
`;
