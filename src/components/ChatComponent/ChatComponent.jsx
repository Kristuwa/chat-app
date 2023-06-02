import { AsideHeader } from "../AsideComponent/AsideComponent.styled";
import { FormTextMessage } from "../FormTextMessage/FormTextMessage";
import { Loader } from "../Loader/Loader";
import { MessagesList } from "../MessagesList/MessagesList";

export const ChatComponent = ({
  phoneNumber,
  listNotification,
  onSubmitMessage,
  loading,
  error,
}) => {
  return (
    <>
      <AsideHeader>
        <p>{phoneNumber}</p>
      </AsideHeader>
      {listNotification.length > 0 && !loading && !error && (
        <MessagesList list={listNotification} />
      )}
      {loading && !error && <Loader />}
      {!loading && error && <p>{error.message}</p>}
      <FormTextMessage onSubmitMessage={onSubmitMessage} />
    </>
  );
};
