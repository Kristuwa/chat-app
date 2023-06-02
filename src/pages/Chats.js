import React, { useEffect, useState, useCallback } from "react";
import { sendMessage, getNotification } from "../api/api";
import { useSelector } from "react-redux";
import {
  selectError,
  selectIsLoading,
  selectUser,
} from "../redux/auth/selectors";
import { toast } from "react-toastify";
import { Container } from "./Home.styled";
import { ContainerChats, ChatSideContainer } from "./Chats.styled";
import { Modal } from "../components/Modal/Modal";
import { AsideComponent } from "../components/AsideComponent/AsideComponent";
import { ChatComponent } from "../components/ChatComponent/ChatComponent";
import { Loader } from "../components/Loader/Loader";

const getPhoneFromStorage = () => {
  const storagePhone = localStorage.getItem("phone");
  return storagePhone ? JSON.parse(storagePhone) : "";
};

const getChatsFromStorage = (phoneNumber) => {
  const storageList = localStorage.getItem("listMessages");
  if (storageList) {
    const parseList = JSON.parse(storageList);
    const currentList = parseList.find(
      (item) => item.phoneNumber === phoneNumber
    );
    return currentList ? currentList.listNotification : [];
  }
  return [];
};

const Chats = () => {
  const [phoneNumber, setPhoneNumber] = useState(getPhoneFromStorage);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { idInstance, apiTokenInstance } = useSelector(selectUser);
  const [listNotification, setListNotification] = useState(() =>
    getChatsFromStorage(phoneNumber)
  );
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const onModalOpen = useCallback(() => setIsModalOpen(true), []);

  const onModalClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const onSubmit = useCallback((values, { resetForm }) => {
    const { phone } = values;
    setPhoneNumber(phone);
    setIsModalOpen(false);
    setListNotification(() => getChatsFromStorage(phone));
    resetForm();
  }, []);

  const onSubmitMessage = useCallback(
    async (values, { resetForm }) => {
      setLoading(true);
      try {
        const data = {
          chatId: `${phoneNumber}@c.us`,
          message: values.text,
        };

        const id = await sendMessage(data, idInstance, apiTokenInstance);
        setListNotification((prevState) => [
          ...prevState,
          { id, message: data.message, sender: "You" },
        ]);
        resetForm();
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
        setErr(error.message);
      }
    },
    [phoneNumber, apiTokenInstance, idInstance]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      getNotification(
        idInstance,
        apiTokenInstance,
        setListNotification,
        phoneNumber
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [apiTokenInstance, idInstance, phoneNumber]);

  useEffect(() => {
    const listStorage = localStorage.getItem("listMessages");

    if (listStorage) {
      const list = JSON.parse(listStorage);

      const matchNumber = list.find((item) => item.phoneNumber === phoneNumber);

      if (matchNumber) {
        const updateList = list.map((item) =>
          item.phoneNumber === matchNumber.phoneNumber
            ? { phoneNumber, listNotification }
            : item
        );

        localStorage.setItem("listMessages", JSON.stringify(updateList));
      } else {
        list.push({ phoneNumber, listNotification });
        localStorage.setItem("listMessages", JSON.stringify(list));
      }
    } else {
      localStorage.setItem(
        "listMessages",
        JSON.stringify([{ phoneNumber, listNotification }])
      );
    }

    localStorage.setItem("phone", JSON.stringify(phoneNumber));
  }, [listNotification, phoneNumber]);

  return (
    <main>
      <Container>
        {!isLoading && !error && (
          <ContainerChats>
            <AsideComponent onModalOpen={onModalOpen} />
            <ChatSideContainer>
              {phoneNumber && (
                <ChatComponent
                  phoneNumber={phoneNumber}
                  listNotification={listNotification}
                  onSubmitMessage={onSubmitMessage}
                  loading={loading}
                  error={err}
                />
              )}
            </ChatSideContainer>
            {isModalOpen && (
              <Modal onModalClose={onModalClose} onSubmit={onSubmit} />
            )}
          </ContainerChats>
        )}
        {isLoading && !error && <Loader />}
        {!isLoading && error && <p>{error.message}</p>}
      </Container>
    </main>
  );
};

export default Chats;
