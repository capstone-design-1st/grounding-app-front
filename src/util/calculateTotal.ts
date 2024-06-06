// 자산 배열의 총 수익률을 계산하는 함수
export function calculateTotalReturn(assets: any[]): number {
  let totalInvestment = 0;
  let totalReturn = 0;

  assets.forEach((asset) => {
    const investment = asset.evaluation_price * asset.quantity;
    const returnAmount = (investment * asset.fluctuation_rate) / 100;

    totalInvestment += investment;
    totalReturn += returnAmount;
  });

  // 전체 수익률을 계산 (총 수익 / 총 투자) * 100
  const totalEarningRatio = (totalReturn / totalInvestment) * 100;

  return totalEarningRatio;
}
