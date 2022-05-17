import axios from "axios";
import { SIGNUP__URL, LOGIN__URL } from "../urls";

const handleUserSignUp = async (
  name,
  username,
  email,
  password,
  userSelectedRole
) => {
  try {
    const response = await axios.post(SIGNUP__URL, {
      name,
      username,
      email,
      password,
      userSelectedRole,
    });
    return response;
  } catch (error) {
    console.log({ error });
    alert(error.response.data.errorMessage);
  }
};

const handleUserLogin = async (email, password) => {
  try {
    const response = await axios.post(LOGIN__URL, { email, password });
    return response;
  } catch (error) {
    console.log({ error });
    alert(error.response.data.errorMessage);
  }
};

export { handleUserSignUp, handleUserLogin };
