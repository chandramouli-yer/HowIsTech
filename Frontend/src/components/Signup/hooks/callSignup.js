import axios from 'axios';
import { SignupApi } from '../../../utils/const.dev';

export const callSignupApi = async ( firstName, lastName,email,password ) => {
    const response= await axios.post(SignupApi, {
      firstName,
      lastName,
      email,
      password,
    })
    return response;
  };