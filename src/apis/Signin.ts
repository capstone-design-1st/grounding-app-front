import { instanceWithoutToken } from ".";

//이메일 인증번호 전송
export const sendValidateEmailCode = async (email: string) => {
  const response = await instanceWithoutToken.post(`/users/email/validation`, {
    email: email,
  });
  return response.data;
};

//이메일 중복 확인
export const checkEmail = async (email: string) => {
  const response = await instanceWithoutToken.post(
    `/users/sign-up/email/validation`,
    {
      email: email,
    }
  );
  return response.data;
};
