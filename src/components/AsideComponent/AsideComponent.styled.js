import styled from "styled-components";

export const Aside = styled.aside`
  width: 400px;
  height: 100vh;
  background-color: ${(props) => props.theme.color.bgSecondaryColor};
`;

export const AvatarImg = styled.img`
  border-radius: 20px;
`;

export const AsideHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  height: 80px;
  border: 1px solid #c8bb91;
  background-color: ${(props) => props.theme.color.bgAsideColor};
`;

export const ButtonAdd = styled.button`
  display: inline-block;
  padding: 5px;
  border: none;
  background-color: transparent;
  transition: border 500ms linear;

  &:hover,
  &:focus {
    border: 1px solid #a1a1a1;
    border-radius: 5px;
  }
`;
