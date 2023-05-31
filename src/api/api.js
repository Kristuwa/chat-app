import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = "https://api.green-api.com";

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
    console.log(result);
  } catch (err) {
    toast.error(err.message);
  }
};

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

export const getNotification = async (idInstance, apiTokenInstance) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`,
    headers: {},
  };

  try {
    const result = await axios.request(config);
    console.log(result.data);
    if (result.data !== null) {
      const { receiptId, body } = result.data;
      console.log("body", body.messageData?.textMessageData?.textMessage);
      let configDelete = {
        method: "delete",
        maxBodyLength: Infinity,
        url: `${BASE_URL}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`,
        headers: {},
      };

      console.log(receiptId);

      const resultDelete = await axios.request(configDelete);
      console.log(resultDelete);
    }
  } catch (error) {
    toast.error(error.message);
  }
};
