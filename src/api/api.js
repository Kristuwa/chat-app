import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = "https://api.green-api.com";

export const enterMessage = async (data, idInstance, apiTokenInstance) => {
  try {
    const { phone, text } = data;

    let newData = JSON.stringify({
      chatId: `${phone}@c.us`,
      message: text,
    });

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
