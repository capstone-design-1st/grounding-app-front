import { instanceWithoutToken } from ".";

interface LoginCredentials {
  email: string;
  password: string;
}

export const login = async ({ email, password }: LoginCredentials) => {
  const response = await instanceWithoutToken.post(`/users/login`, {
    email: email,
    password: password,
  });
  return response.data;
};
