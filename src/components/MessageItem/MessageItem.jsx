import { MessageItemContainer, SenderName } from "./MessageItem.styled";

export const MessageItem = ({ message, sender }) => {
  const senderText =
    sender === "You" ? sender : sender.slice(0, sender.length - 5);
  return (
    <MessageItemContainer self={sender === "You" ? "my" : ""}>
      <SenderName>{senderText}</SenderName>
      <p>{message}</p>
    </MessageItemContainer>
  );
};
