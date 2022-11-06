import axios from "axios";

const request = axios.create({
  timeout: 12000,
  timeoutErrorMessage:
    "Either your internet connection is not strong or you have no internet connection",
  baseURL: "https://bincom-bend.herokuapp.com/api/v1",
});

class Api {
  post = async (URL, data) => {
    try {
      const res = await request.post(URL, data);
      return { errorStatus: false, ...res };
    } catch (err) {
      throw err;
    }
  };

  get = async (URL) => {
    try {
      const res = await request.get(URL);
      return { errorStatus: false, ...res };
    } catch (err) {
      throw err;
    }
  };
}

export default new Api();
