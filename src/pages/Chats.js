import React, { useEffect, useState } from "react";
import { Modal } from "../components/Modal/Modal";
import { useCallback } from "react";
import { FormTextMessage } from "../components/FormTextMessage/FormTextMessage";
import { sendMessage, getNotification } from "../api/api";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/auth/selectors";
import { toast } from "react-toastify";
import { Container } from "./Home.styled";
import { ContainerChats, ChatSideContainer } from "./Chats.styled";
import { AsideComponent } from "../components/AsideComponent/AsideComponent";
import { AsideHeader } from "../components/AsideComponent/AsideComponent.styled";

const Chats = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { idInstance, apiTokenInstance } = useSelector(selectUser);
  const [listNotification, setListNotification] = useState([]);

  const onModalOpen = useCallback(() => setIsModalOpen(true), []);

  const onModalClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const onSubmit = useCallback((values, { resetForm }) => {
    setPhoneNumber(values.phone);
    setIsModalOpen(false);
    setListNotification([]);
    resetForm();
  }, []);

  const onSubmitMessage = useCallback(
    async (values, { resetForm }) => {
      try {
        const data = {
          chatId: `${phoneNumber}@c.us`,
          message: values.text,
        };

        const id = await sendMessage(data, idInstance, apiTokenInstance);
        setListNotification((prevState) => [
          ...prevState,
          { id, message: data.message },
        ]);
        resetForm();
      } catch (error) {
        toast.error(error.message);
      }
    },
    [phoneNumber, apiTokenInstance, idInstance]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      getNotification(idInstance, apiTokenInstance, setListNotification);
    }, 5000);

    return () => clearInterval(interval);
  }, [apiTokenInstance, idInstance]);

  return (
    <main>
      <Container>
        <ContainerChats>
          <AsideComponent onModalOpen={onModalOpen} />
          <ChatSideContainer>
            {phoneNumber && (
              <>
                <AsideHeader>
                  <p>{phoneNumber}</p>
                </AsideHeader>
                {listNotification.length > 0 && (
                  <ul>
                    {listNotification.map(({ id, message }) => (
                      <li key={id}>{message}</li>
                    ))}
                  </ul>
                )}
                <FormTextMessage onSubmitMessage={onSubmitMessage} />
              </>
            )}
          </ChatSideContainer>
          {isModalOpen && (
            <Modal onModalClose={onModalClose} onSubmit={onSubmit} />
          )}
        </ContainerChats>
      </Container>
    </main>
  );
};

export default Chats;
