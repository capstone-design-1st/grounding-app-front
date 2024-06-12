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
import welcomeLogo from "../../assets/imgs/welcome.png";
import { useNavigate } from "react-router-dom";
import { formatTime } from "../../util/formatTime";
import { isValidEmail, isValidPhoneNumber } from "../../util/validCheck";
import "./styles.css";
import spinner from "../../assets/imgs/spinner.gif";
import { useMutation } from "react-query";
import {
  sendValidateEmailCode,
  checkEmailCode,
  postSignin,
} from "../../apis/Signin";
import ConfettiExplosion from "react-confetti-explosion";

interface FormData {
  name: string;
  email: string;
  emailCode: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  wallet: string;
}

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState(0);
  //아이디, 비밀번호, 이메일 유효성, 핸드폰 번호 유효성 확인
  const [validPassword, setValidPassword] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [phoneValid, setPhoneValid] = useState(false);
  const [lengthValid, setLengthValid] = useState(false);
  const [numberValid, setNumberValid] = useState(false);
  const [specialCharValid, setSpecialCharValid] = useState(false);
  //이메일 인증 인풋 보여주기 여부
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  //이메일 인증 완료 여부
  const [emailVerified, setEmailVerified] = useState(false);
  //인증 타이머
  const [remainingTime, setRemainingTime] = useState(300); //5분
  const [timerActive, setTimerActive] = useState(false);

  //약관 동의 체크박스
  const [allAgreed, setAllAgreed] = useState(false);
  //유효성 확인 후 버튼 색 변경
  const [buttonColor, setButtonColor] = useState({
    backgroundColor: "var(--grey2)",
    color: "var(--grey5)",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    emailCode: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    wallet: `${process.env.REACT_APP_WALLET_ADDRESS}`,
  });

  const [showAmount, setShowAmount] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAmount(true);
    }, 500); // 1초 후에 금액 정보를 표시

    return () => clearTimeout(timer);
  }, []);

  /*회원가입 */
  const { mutate: signin } = useMutation(postSignin);

  const postSignup = () => {
    console.log({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      wallet: formData.wallet,
      phoneNumber: formData.phoneNumber,
    });

    signin({
      email: formData.email,
      password: formData.password,
      name: formData.name,
      phoneNumber: formData.phoneNumber,
      wallet: formData.wallet,
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const emailInputContainer = document.getElementById(
        "emailInputContainer"
      );
      console.log(emailInputContainer);
      if (emailInputContainer) {
        emailInputContainer.style.display = "block";
        emailInputContainer.classList.add("visible");
      }
    }
  };

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

    if (name === "phoneNumber") {
      const isValid = isValidPhoneNumber(value);
      setPhoneValid(isValid);
    }

    // 비밀번호 확인 로직 추가
    if (name === "confirmPassword") {
      setValidPassword(formData.password === value);
    }
  };

  const { mutate: sendEmailCode, isLoading } = useMutation(
    sendValidateEmailCode,
    {
      onSuccess: (data) => {
        alert("인증번호가 발송되었습니다.");
        setShowEmailVerification(true);
        setTimerActive(true);
      },
      onError: (error) => {
        alert("인증번호 전송 실패하였습니다.");
      },
    }
  );

  const { mutate: verifyEmailCode } = useMutation(checkEmailCode, {
    onSuccess: (data) => {
      console.log("Verification success:", data);
      alert("이메일 인증이 완료되었습니다.");
      setEmailVerified(true);
      setTimerActive(false);
    },
    onError: (error) => {
      console.error("Verification failed:", error);
      setEmailVerified(false);
      alert("인증번호가 일치하지 않습니다.");
    },
  });

  const handleShowEmailVerification = () => {
    if (isValidEmail(formData.email)) {
      sendEmailCode(formData.email);
    } else {
      alert("이메일 형식이 올바르지 않습니다.");
    }
  };

  const handleEmailVerification = () => {
    // 이메일 인증 처리 로직
    verifyEmailCode({ email: formData.email, code: formData.emailCode });

    // if (formData.emailCode === "1234") {
    //   setEmailVerified(true);
    //   setTimerActive(false);
    //   alert("이메일 인증이 완료되었습니다.");
    // } else {
    //   setEmailVerified(false);
    //   alert("인증번호가 일치하지 않습니다.");
    // }
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

  /*다음 절차로 이동 */
  const goToNextTab = () => {
    setActiveIndex((prevIndex) => (prevIndex < 4 ? prevIndex + 1 : prevIndex));
    if (activeIndex === 1) {
      postSignup();
    }
  };
  /*이전 절차로 이동 */
  const goToPreviousTab = () => {
    setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  /*모든 조건 만족하면 버튼 색 변경 */
  useEffect(() => {
    // 모든 조건이 참일 때 버튼 색 변경
    if (
      emailValid &&
      emailVerified &&
      validPassword &&
      formData.phoneNumber &&
      activeIndex === 0
    ) {
      setButtonColor({
        backgroundColor: "var(--main)",
        color: "#ffffff",
      });

      setIsButtonDisabled(false);
    } else if (allAgreed && activeIndex === 1) {
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
    activeIndex,
    emailValid,
    emailVerified,
    formData.emailCode,
    validPassword,
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

              {lengthValid && numberValid && specialCharValid && (
                <div
                  className={`inputContainer ${
                    lengthValid && numberValid && specialCharValid
                      ? "visible"
                      : ""
                  }`}
                >
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
                      {!validPassword && formData.password !== "" && (
                        <div className="checkItem invalid">
                          비밀번호가 일치하지 않습니다
                        </div>
                      )}
                    </div>
                  }
                </div>
              )}

              {phoneValid && (
                <div
                  className={`inputContainer ${phoneValid ? "visible" : ""}`}
                >
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
                        color: specialCharValid
                          ? "var(--main)"
                          : "var(--grey4)",
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
              )}

              {emailVerified && (
                <div
                  className={`inputContainer ${emailVerified ? "visible" : ""}`}
                >
                  <div className="subTitle">휴대폰 번호</div>
                  <input
                    name="phoneNumber"
                    type="tel"
                    placeholder="휴대폰 번호를 입력해주세요"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                  />
                </div>
              )}

              {showEmailVerification && (
                <div
                  className={`inputContainer 
                  verificationContainer
                  ${showEmailVerification ? "visible" : ""}`}
                >
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

              <div id="emailInputContainer" className="inputContainer hidden">
                <div className="subTitle">이메일</div>
                <div className="verifyWrapper">
                  <input
                    name="email"
                    type="text"
                    placeholder="이메일을 입력해주세요"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {isLoading ? (
                    <div>
                      <img
                        src={spinner}
                        alt="Loading..."
                        style={{ width: "50px" }}
                      />
                    </div>
                  ) : (
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
                  )}
                </div>
              </div>

              <div className="inputContainer visible">
                <div className="subTitle">이름</div>

                <input
                  name="name"
                  type="text"
                  placeholder="이름을 입력해주세요"
                  value={formData.name}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyPress}
                />
              </div>
            </div>
          </>
        );

      case 1:
        return (
          <div className="SignInTabWrapper">
            <div className="title">약관에 동의해주세요</div>
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
      case 2: //회원가입 완료
        return (
          <>
            <div className="SignInCompleteWrapper signInContainer">
              <div
                className="subTitle"
                style={{
                  fontFamily: "HSSanTokki20-Regular",
                  margin: "80px 0 20px 0",
                  fontSize: "40px",
                  fontWeight: "bold",
                  animation: "slideIn 0.5s ease-out forwards",
                }}
              >
                회원가입 완료!
              </div>
              <div
                style={{
                  margin: "0px 0 40px 0",
                  fontSize: "16px",
                  textAlign: "center",
                  animation: "slideIn 0.5s ease-out forwards",
                }}
              >
                조각 투자를 위한 지갑 생성이 완료되었어요.
                <br />
                원하는 매물에 투자해보세요!
              </div>

              <ConfettiExplosion force={0.7} duration={3000} />
              <img
                className={`${showAmount ? "show" : ""}`}
                src={welcomeLogo}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  width: "100%",
                  animation: "slideIn 0.5s ease-out forwards",
                  animationDelay: "0.5s",
                  opacity: 0,
                  marginTop: "-18%",
                }}
                alt="회원가입 완료"
              />

              <div className="buttonWrapper">
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
      {activeIndex < 2 && (
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
            {[...Array(2)].map((_, index) => (
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
      <div className="signInContainer">
        {activeIndex < 2 && (
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
      </div>
    </>
  );
};

export default SignUp;
