import styled from "styled-components";

export const MessageItemContainer = styled.li`
  height: auto;
  padding: 10px;
  border-radius: 10px;
  margin-left: ${(props) => (props.self === "my" ? "0" : "auto")};
  background-color: ${(props) => props.theme.color.bgAsideColor};
`;

export const SenderName = styled.p`
  font-size: 12px;
  color: ${(props) => props.theme.color.thirdColor};
  margin-bottom: 5px;
`;
