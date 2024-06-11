import { instanceWithToken } from '.';

// 유저 지갑 조회
export const getMyWallet = async () => {
  const response = await instanceWithToken.get('/users/wallet');
  return response.data.payload.wallet_address;
};
