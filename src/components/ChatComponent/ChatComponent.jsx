import { AsideHeader } from "../AsideComponent/AsideComponent.styled";
import { FormTextMessage } from "../FormTextMessage/FormTextMessage";
import { MessagesList } from "../MessagesList/MessagesList";

export const ChatComponent = ({
  phoneNumber,
  listNotification,
  onSubmitMessage,
}) => {
  return (
    <>
      <AsideHeader>
        <p>{phoneNumber}</p>
      </AsideHeader>
      {listNotification.length > 0 && <MessagesList list={listNotification} />}
      <FormTextMessage onSubmitMessage={onSubmitMessage} />
    </>
  );
};
