import { FormNumber } from "../FormNumber/FormNumber";
import { Overlay, ModalContainer } from "./Modal.styled";
import { useEffect } from "react";

export const Modal = ({ onModalClose, onSubmit }) => {
  const onCloseEsc = (e) => {
    if (e.code === "Escape") {
      onModalClose();
    }
  };

  const onCloseBackdrop = (e) => {
    if (e.currentTarget === e.target) {
      onModalClose();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", onCloseEsc);

    return () => {
      window.removeEventListener("keydown", onCloseEsc);
    };
  });

  return (
    <Overlay onClick={onCloseBackdrop}>
      <ModalContainer>
        <FormNumber onSubmit={onSubmit} />
      </ModalContainer>
    </Overlay>
  );
};
