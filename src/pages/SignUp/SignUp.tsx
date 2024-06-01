import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Header,
  PasswordInput,
} from "../../components/index";
import arrow from "../../assets/icons/arrow.svg";
import x from "../../assets/icons/x.png";
import check from "../../assets/icons/check.png";
import fillCheck from "../../assets/icons/check-fill.png";
import welcomeLogo from "../../assets/imgs/big-logo.png";
import { useNavigate } from "react-router-dom";
import { formatTime } from "../../util/formatTime";
import "./styles.css";

interface FormData {
  email: string;
  emailCode: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  phoneCode: string;
}

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState(0);
  //아이디, 비밀번호, 이메일 유효성 확인
  const [validPassword, setValidPassword] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [lengthValid, setLengthValid] = useState(false);
  const [numberValid, setNumberValid] = useState(false);
  const [specialCharValid, setSpecialCharValid] = useState(false);
  //이메일 인증 완료 여부
  const [emailVerified, setEmailVerified] = useState(false);
  //이메일 인증 인풋 보여주기 여부
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  //인증 타이머
  const [remainingTime, setRemainingTime] = useState(300); //5분
  const [timerActive, setTimerActive] = useState(false);

  //휴대폰 인증 완료 여부
  const [phoneVerified, setPhoneVerified] = useState(false);
  //약관 동의 체크박스
  const [allAgreed, setAllAgreed] = useState(false);
  //유효성 확인 후 버튼 색 변경
  const [buttonColor, setButtonColor] = useState({
    backgroundColor: "var(--grey2)",
    color: "var(--grey5)",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const [formData, setFormData] = useState<FormData>({
    email: "",
    emailCode: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    phoneCode: "",
  });

  /*회원가입 */
  //   const postSignup = async () => {
  //     console.log({
  //       userId: signinFormData.userId,
  //       password: signinFormData.password,
  //       universityName: signinFormData.universityName,
  //       universityEmail: signinFormData.universityEmail,
  //       styleTags: formData.styleTags,
  //     });
  //     const response = await instance.post("/signup", {
  //       userId: signinFormData.userId,
  //       password: signinFormData.password,
  //       universityName: signinFormData.universityName,
  //       universityEmail: signinFormData.universityEmail,
  //       styleTags: formData.styleTags,
  //     });
  //     console.log(response.data);
  //   };

  /*입력창 변경시 */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // setSignInFormData({
    //   [name]: value,
    // });

    if (name === "email") {
      const isValid = isValidEmail(value);
      setEmailValid(isValid);
    }

    // 비밀번호 확인 로직 추가
    if (name === "confirmPassword") {
      setValidPassword(formData.password === value);
    }
  };

  //비밀번호 동일 여부 확인
  useEffect(() => {
    setValidPassword(formData.password === formData.confirmPassword);
  }, [formData.password, formData.confirmPassword]);

  const handleShowEmailVerification = () => {
    const isValid = isValidEmail(formData.email);
    if (isValid) {
      setShowEmailVerification(true);
      setTimerActive(true);
      setRemainingTime(300);
      alert("인증번호가 발송되었습니다.");
    } else {
      alert("이메일 형식이 올바르지 않습니다.");
    }
  };

  //인증 타이머
  useEffect(() => {
    let timer: NodeJS.Timeout | number;
    if (timerActive) {
      timer = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setTimerActive(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timerActive]);

  const handleEmailVerification = () => {
    // 이메일 인증 처리 로직
    if (formData.emailCode === "1234") {
      setEmailVerified(true);
      setTimerActive(false);
      alert("이메일 인증이 완료되었습니다.");
    } else {
      setEmailVerified(false);
      alert("인증번호가 일치하지 않습니다.");
    }
  };

  const handlePhoneVerification = () => {
    // 휴대폰 인증 처리 로직
    if (formData.phoneCode === "1234") {
      setPhoneVerified(true);
      alert("휴대폰 인증이 완료되었습니다.");
    } else {
      setPhoneVerified(false);
      alert("인증번호가 일치하지 않습니다.");
    }
  };

  /*비밀번호 유효성 체크 */
  useEffect(() => {
    const lengthCheck =
      formData.password.length >= 8 && formData.password.length <= 20;
    const numberCheck = /\d/.test(formData.password);
    const specialCharCheck = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);

    setLengthValid(lengthCheck);
    setNumberValid(numberCheck);
    setSpecialCharValid(specialCharCheck);
  }, [formData.password]);

  // 이메일 유효성 검사
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /*다음 절차로 이동 */
  const goToNextTab = () => {
    setActiveIndex((prevIndex) => (prevIndex < 4 ? prevIndex + 1 : prevIndex));
  };
  /*이전 절차로 이동 */
  const goToPreviousTab = () => {
    setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  /*모든 조건 만족하면 버튼 색 변경 */
  useEffect(() => {
    // 모든 조건이 참일 때 버튼 색 변경
    if (emailValid && emailVerified && validPassword) {
      setButtonColor({
        backgroundColor: "var(--main)",
        color: "#ffffff",
      });
      setIsButtonDisabled(false);
    } else if (phoneVerified && formData.phoneNumber) {
      setButtonColor({
        backgroundColor: "var(--main)",
        color: "#ffffff",
      });
      setIsButtonDisabled(false);
    } else if (allAgreed) {
      setButtonColor({
        backgroundColor: "var(--main)",
        color: "#ffffff",
      });
      setIsButtonDisabled(false);
    } else {
      // 그렇지 않으면 회색으로 설정
      setButtonColor({
        backgroundColor: "var(--grey2)",
        color: "var(--grey5)",
      });
    }
  }, [
    emailValid,
    emailVerified,
    formData.emailCode,
    validPassword,
    phoneVerified,
    formData.phoneNumber,
    allAgreed,
  ]);

  /*탭 전환  */
  const renderTabContent = () => {
    switch (activeIndex) {
      case 0: // 아이디와 비밀번호 입력 탭
        return (
          <>
            <div className="SignInTabWrapper">
              <div className="title">회원가입</div>

              <div className="inputContainer">
                <div className="subTitle">이메일</div>
                <div className="verifyWrapper">
                  <input
                    name="email"
                    type="text"
                    placeholder="이메일을 입력해주세요"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <Button
                    text="인증"
                    width="50px"
                    padding="20px 10px"
                    fontSize="13px"
                    background="var(--main)"
                    color="#ffffff"
                    onClick={() => {
                      handleShowEmailVerification();
                    }}
                  />
                </div>
              </div>

              {showEmailVerification && (
                <div className="inputContainer verificationContainer">
                  <div className="subTitle">인증번호</div>
                  <div className="verifyWrapper">
                    <input
                      name="emailCode"
                      type="tel"
                      placeholder="인증번호를 입력해주세요"
                      value={formData.emailCode}
                      onChange={handleInputChange}
                    />
                    <Button
                      text="확인"
                      width="50px"
                      padding="20px 10px"
                      fontSize="13px"
                      background="var(--main)"
                      color="#ffffff"
                      onClick={() => {
                        handleEmailVerification();
                      }}
                    />
                  </div>
                  <div className="timer">
                    {emailVerified
                      ? "이메일이 확인되었습니다."
                      : remainingTime > 0
                      ? `남은 시간: ${formatTime(remainingTime)}`
                      : "인증 시간이 만료되었습니다. 다시 시도해주세요."}
                  </div>
                </div>
              )}

              <div className="inputContainer">
                <div className="subTitle">비밀번호</div>
                <PasswordInput
                  name="password"
                  placeholder="비밀번호를 입력해주세요"
                  value={formData.password}
                  onChange={handleInputChange}
                  handleInputChange={handleInputChange}
                />
                <div className="checkListContainer">
                  <div
                    className="checkItem"
                    style={{
                      color: numberValid ? "var(--main)" : "var(--grey4)",
                    }}
                  >
                    ✓ 숫자
                  </div>
                  <div
                    className="checkItem"
                    style={{
                      color: specialCharValid ? "var(--main)" : "var(--grey4)",
                    }}
                  >
                    ✓ 특수문자
                  </div>
                  <div
                    className="checkItem"
                    style={{
                      color: lengthValid ? "var(--main)" : "var(--grey4)",
                    }}
                  >
                    ✓ 8~20자 이내
                  </div>
                </div>
              </div>

              <div className="inputContainer">
                <div className="subTitle">비밀번호 확인</div>
                <PasswordInput
                  name="confirmPassword"
                  placeholder="비밀번호를 한 번 더 입력해주세요"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  handleInputChange={handleInputChange}
                />

                {
                  <div
                    className="checkItem"
                    style={{
                      color: validPassword ? "var(--main)" : "var(--red)",

                      fontSize: "14px",
                      marginTop: "10px",
                    }}
                  >
                    {!validPassword && (
                      <div className="checkItem invalid">
                        비밀번호가 일치하지 않습니다
                      </div>
                    )}
                  </div>
                }
              </div>
            </div>
          </>
        );
      case 1: // 재학생 인증 탭
        return (
          <>
            <div className="SignInTabWrapper">
              <div className="title">휴대폰 인증</div>
              <div className="inputContainer">
                <div className="subTitle">휴대폰 번호</div>
                <input
                  name="phoneNumber"
                  type="tel"
                  placeholder="휴대폰 번호를 입력해주세요"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>

              <div className="inputContainer">
                <div className="subTitle">휴대폰 인증번호</div>
                <div className="verifyWrapper">
                  <input
                    name="phoneCode"
                    type="tel"
                    placeholder="인증번호 입력"
                    value={formData.phoneCode}
                    onChange={handleInputChange}
                  />
                  <Button
                    text="확인"
                    width="50px"
                    padding="15px 10px"
                    fontSize="13px"
                    background="var(--main)"
                    color="#ffffff"
                    onClick={handlePhoneVerification}
                  />
                </div>
              </div>

              <div className="resentLabel">
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("인증번호가 재전송되었습니다.");
                  }}
                >
                  인증번호 재전송
                </a>
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <div className="SignInTabWrapper">
            <div className="title">약관 동의</div>
            <div className="allAgree">
              <Checkbox
                label=""
                id={"allAgree"}
                checked={allAgreed}
                setIsChecked={setAllAgreed}
              />
              <div>
                <label htmlFor="allAgree">
                  <div className="allAgreeText">모두 동의합니다</div>

                  <div className="agreeText">
                    전체 동의는 필수 및 선택정보에 대한 동의도 포함되어 있으며,
                    개별적으로도 동의를 선택하실 수 있습니다.
                  </div>
                </label>
              </div>
            </div>

            <ul className="termsList">
              <li className={`termsItem ${allAgreed ? "valid" : ""}`}>
                <img
                  src={allAgreed ? fillCheck : check}
                  alt="check"
                  style={{ width: "24px", height: "24px" }}
                />
                (필수) 만 18세 이상입니다.
              </li>
              <li className={`termsItem ${allAgreed ? "valid" : ""}`}>
                <img
                  src={allAgreed ? fillCheck : check}
                  alt="check"
                  style={{ width: "24px", height: "24px" }}
                />
                (필수) 개인정보 수집 및 이용 동의
              </li>
              <li className={`termsItem ${allAgreed ? "valid" : ""}`}>
                <img
                  src={allAgreed ? fillCheck : check}
                  alt="check"
                  style={{ width: "24px", height: "24px" }}
                />{" "}
                (필수) 서비스 이용약관 동의
              </li>
              <li className={`termsItem ${allAgreed ? "valid" : ""}`}>
                <img
                  src={allAgreed ? fillCheck : check}
                  alt="check"
                  style={{ width: "24px", height: "24px" }}
                />
                (선택) 혜택/이벤트 정보 수신 동의
              </li>
            </ul>
          </div>
        );
      case 3: //회원가입 완료
        return (
          <>
            <div className="SignInCompleteWrapper">
              <img
                src={welcomeLogo}
                style={{
                  width: "135px",
                  height: "125px",
                  marginBottom: "20px",
                  marginTop: "170px",
                }}
                alt="회원가입 완료"
              />

              <div
                className="subTitle"
                style={{
                  fontSize: "16px",
                  marginTop: "-10px",
                  color: "var(--main)",
                }}
              >
                회원가입이 완료되었습니다
              </div>
              <div
                style={{
                  position: "fixed",
                  bottom: 40,
                  width: "100%",
                  padding: "20px",
                  backgroundColor: "#ffffff",
                  boxSizing: "border-box",
                }}
              >
                <Button
                  onClick={() => navigate("/")}
                  text="로그인 하러 가기"
                  width="100%"
                  padding="16px"
                  fontSize="18px"
                  background={"var(--main)"}
                  color={"#ffffff"}
                />
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/*TAB */}
      {activeIndex < 3 && (
        <>
          {" "}
          <Header
            leftContent={
              <img src={arrow} alt="btn-back" onClick={goToPreviousTab} />
            }
            rightContent={
              <img
                src={x}
                style={{ width: "24px" }}
                alt="btn-close"
                onClick={() => navigate("/")}
              />
            }
          />
          <div className="dotWrapper">
            {[...Array(3)].map((_, index) => (
              <div
                className={`dot ${index === activeIndex ? "active" : ""}`}
                key={index}
              ></div>
            ))}
          </div>
        </>
      )}

      {/*TAB 내용 렌더링 */}
      {renderTabContent()}

      {activeIndex < 3 && (
        <div className="buttonWrapper">
          <Button
            onClick={goToNextTab}
            text="다음"
            width="100%"
            padding="16px"
            fontSize="18px"
            background={buttonColor.backgroundColor}
            color={buttonColor.color}
            disabled={isButtonDisabled}
          />
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            이미 회원이신가요?{" "}
            <span
              onClick={() => navigate("/login")}
              style={{ color: "var(--main)" }}
            >
              로그인하기
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;
