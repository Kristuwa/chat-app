import { nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = "https://api.green-api.com";

export const checkAuth = async (data) => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/waInstance${data.idInstance}/getStateInstance/${data.apiTokenInstance}`,
      headers: {},
    };

    const response = await axios.request(config);
    return response.data.stateInstance;
  } catch (err) {
    toast.error(err.message);
  }
};

export const sendMessage = async (data, idInstance, apiTokenInstance) => {
  try {
    let newData = JSON.stringify(data);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: newData,
    };

    const result = await axios.request(config);
    return result.data.idMessage;
  } catch (err) {
    toast.error(err.message);
  }
};

const deleteNotification = async (receiptId, idInstance, apiTokenInstance) => {
  try {
    let configDelete = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`,
      headers: {},
    };

    await axios.request(configDelete);
  } catch (error) {
    toast.error(error.message);
  }
};

export const getNotification = async (
  idInstance,
  apiTokenInstance,
  setListNotification
) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`,
    headers: {},
  };

  try {
    const result = await axios.request(config);

    if (result.data !== null) {
      const { receiptId, body } = result.data;
      await deleteNotification(receiptId, idInstance, apiTokenInstance);

      if (body.messageData && body.messageData.textMessageData) {
        const newMessage = {
          id: nanoid(),
          message: body.messageData.textMessageData.textMessage,
        };
        setListNotification((prevState) => [...prevState, newMessage]);
      }
    }
  } catch (error) {
    toast.error(error.message);
  }
};
