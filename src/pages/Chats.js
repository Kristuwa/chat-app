import React, { useState } from "react";
import { Modal } from "../components/Modal/Modal";
import { useCallback } from "react";
import { ForTextMessage } from "../components/FormTextMessage/FormTextMessage";
import { enterMessage } from "../api/api";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/auth/selectors";

const Chats = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { idInstance, apiTokenInstance } = useSelector(selectUser);

  const onSubmit = useCallback((values, { resetForm }) => {
    setPhoneNumber(values.phone);
    setIsModalOpen(false);
    resetForm();
  }, []);

  const onSubmitMessage = useCallback(
    async (values, { resetForm }) => {
      const data = {
        chatId: `${phoneNumber}@c.us`,
        message: values.text,
      };
      await enterMessage(data, idInstance, apiTokenInstance);
      resetForm();
    },
    [phoneNumber, apiTokenInstance, idInstance]
  );

  return (
    <div>
      <div>
        <div>
          <button type="button" onClick={() => setIsModalOpen(true)}>
            +
          </button>
        </div>
        <ul></ul>
      </div>
      <div>
        {phoneNumber && (
          <div>
            <p>{phoneNumber}</p>
            <div></div>
            <ForTextMessage onSubmitMessage={onSubmitMessage} />
          </div>
        )}
      </div>
      {isModalOpen && (
        <Modal
          onModalClose={() => {
            setIsModalOpen(false);
          }}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

export default Chats;
