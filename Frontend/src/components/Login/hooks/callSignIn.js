
import axios  from "axios";
import { LoginApi } from "../../../utils/const.dev";

 export const callSignIn = async (email,password) => {
     const response=await axios.post(LoginApi, {
      email,
      password,
    });
    return response;
  };