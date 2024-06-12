import { Client, Transaction, Wallet } from 'xrpl';

// 트러스트라인 설정 함수
async function setTrustLine(client: Client | null, wallet: Wallet, currency: string, issuerAddress: string) {
  const trust_set_tx: Transaction = {
    TransactionType: 'TrustSet',
    Account: wallet.classicAddress,
    LimitAmount: {
      currency: currency,
      value: '1000000000000',
      issuer: issuerAddress,
    },
  };

  const prepared = await client?.autofill(trust_set_tx);
  const signed = wallet.sign(prepared as Transaction);
  const result = await client?.submitAndWait(signed.tx_blob);
  console.log(`TrustLine 설정 응답 for ${wallet.classicAddress}:`, result);
}

// 토큰 전송 함수
async function sendToken(
  client: Client | null,
  senderWallet: Wallet,
  recipientAddress: string,
  currency: string,
  amount: string,
  issuerAddress: string
) {
  try {
    const transaction: Transaction = {
      TransactionType: 'Payment',
      Account: senderWallet.classicAddress,
      Destination: recipientAddress,
      Amount: {
        currency: currency,
        value: amount,
        issuer: issuerAddress,
      },
    };

    const prepared = await client?.autofill(transaction);
    const signed = senderWallet.sign(prepared as Transaction);
    const result = await client?.submitAndWait(signed.tx_blob);

    console.log(result);

    console.log(`Sent ${amount} ${currency} from ${senderWallet.classicAddress} to ${recipientAddress}`);
  } catch (error) {
    console.error('Failed to send token:', error);
    throw error;
  }
}

export { setTrustLine, sendToken };
