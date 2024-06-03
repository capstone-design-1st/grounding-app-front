/**
 *  * 날짜 문자열을 "yy.mm.dd" 형식으로 변환
 * @param dateString - 변환할 날짜 문자열 ("yyyy-mm-dd")
 * @returns 변환된 날짜 문자열 ("yy.mm.dd")
 */

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string");
  }

  const year = date.getFullYear().toString().substr(-2); // 년도의 마지막 두 자리
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 월 (0-11이므로 1을 추가)
  const day = date.getDate().toString().padStart(2, "0"); // 일

  return `${year}.${month}.${day}`;
}

/**
 * 특정 deadline과 오늘 날짜 사이의 남은 일수를 계산합니다.
 * @param deadline - 'yyyy-mm-dd' 형식의 문자열로 표현된 마감일
 * @returns 남은 일수 (0 또는 양의 정수)
 */
export function calculateDaysLeft(deadline: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // 시간, 분, 초, 밀리초를 0으로 설정하여 오늘 날짜만 비교

  const deadlineDate = new Date(deadline);
  deadlineDate.setHours(0, 0, 0, 0); // 시간, 분, 초, 밀리초를 0으로 설정

  const difference = deadlineDate.getTime() - today.getTime(); // 두 날짜의 차이를 밀리초 단위로 계산

  if (difference < 0) {
    return 0; // 이미 지난 경우 0 반환
  }

  return Math.ceil(difference / (1000 * 60 * 60 * 24)); // 밀리초 단위 차이를 일 단위로 변환
}

/**
 * 주어진 날짜 문자열을 '월 일 요일' 형식의 한국어로 변환.
 * @param dateString - 'yyyy-mm-dd' 형식의 날짜 문자열
 * @returns 변환된 날짜 문자열 (예: '10월 24일 월요일')
 */
export function formatDateToKorean(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return dateString;
  }

  const months = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];
  const dayOfWeek = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];

  const month = months[date.getMonth()]; // 월
  const day = date.getDate(); // 일
  const weekDay = dayOfWeek[date.getDay()]; // 요일

  return `${month} ${day}일 ${weekDay}`;
}
