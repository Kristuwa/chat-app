import { MessageItem } from "../MessageItem/MessageItem";
import { ListMessages } from "./MessagesList.styled";

export const MessagesList = ({ list }) => {
  return (
    <ListMessages>
      {list.map(({ id, message, sender }) => (
        <MessageItem key={id} message={message} sender={sender} />
      ))}
    </ListMessages>
  );
};
