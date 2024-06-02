// 이메일 유효성 검사
export const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
//핸드폰 번호 유효성 검사
export const isValidPhoneNumber = (phoneNumber: string) => {
  const regex = /^(\+?\d{1,3}[- ]?)?\d{11}$/;
  return regex.test(phoneNumber);
};
