import axios from "axios";

interface LoginCredentials {
  email: string;
  password: string;
}

export const login = async ({ email, password }: LoginCredentials) => {
  const response = await axios.post(
    `${process.env.REACT_APP_SERVER_URL}users/login`,
    {
      email: email,
      password: password,
    },
    {
      headers: {
        Authorization: undefined,
      },
    }
  );
  return response.data;
};
