/**
 * 주어진 숫자에 대해 천 단위마다 쉼표를 추가하여 문자열로 반환.
 * @param num - 형식화할 숫자
 * @returns 천 단위마다 쉼표가 추가된 문자열
 */
export function formatNumberWithCommas(num: number): string {
  if (isNaN(num)) return String(num);
  return num.toLocaleString("en-US");
}
