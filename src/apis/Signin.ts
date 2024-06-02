import { instanceWithoutToken } from ".";

//이메일 인증번호 전송
export const sendValidateEmailCode = async (email: string) => {
  const response = await instanceWithoutToken.post(`/users/email/validation`, {
    email: email,
  });
  return response.data;
};

// 이메일 코드 검증 함수 정의
export const checkEmailCode = async ({
  email,
  code,
}: {
  email: string;
  code: string;
}) => {
  const response = await instanceWithoutToken.post(
    `/users/email/verification`,
    {
      email: email,
      verification_code: code,
    }
  );
  return response.data;
};

//회원가입
export const postSignin = async ({
  email,
  password,
  name,
  phoneNumber,
  wallet,
}: {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  wallet: string;
}) => {
  const response = await instanceWithoutToken.post(`/users`, {
    email: email,
    password: password,
    name: name,
    phone_number: phoneNumber,
    wallet_address: wallet,
  });
  return response.data;
};
