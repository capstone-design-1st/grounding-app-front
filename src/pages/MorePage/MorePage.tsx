import banner from "../../assets/imgs/banner1.png";
import arrow from "../../assets/icons/arrow.svg";
import "./styles.css";
import { Header, Navbar } from "../../components";
import { useNavigate } from "react-router-dom";

const MorePage = () => {
  const navigate = useNavigate();
  return (
    <div className="morePage">
      <Header
        leftContent={
          <div>
            <img src={arrow} alt="logo" onClick={() => navigate(-1)} />
          </div>
        }
      />
      <img
        className="banner"
        src={banner}
        alt="banner"
        style={{ width: "100%" }}
      />
      <div className="morePageContent">
        <div className="sectionTitle">고객지원</div>
        <div className="listItem">
          <div className="listText">공지사항</div>
          <img className="arrowIcon" src={arrow} alt="arrow" />
        </div>
        <div className="listItem">
          <div className="listText">자주 묻는 질문</div>
          <img className="arrowIcon" src={arrow} alt="arrow" />
        </div>
        <div className="listItem">
          <div className="listText">1:1 문의</div>
          <img className="arrowIcon" src={arrow} alt="arrow" />
        </div>
        <div className="listItem">
          <div className="listText">매물 상장 신청하기</div>
          <img className="arrowIcon" src={arrow} alt="arrow" />
        </div>

        <div className="sectionTitle">알림 설정</div>
        <div className="listItem">
          <div className="listText">서비스 이용 알림</div>
          <img className="arrowIcon" src={arrow} alt="arrow" />
        </div>
        <div className="listItem">
          <div className="listText">새 매물 등록 알림</div>
          <img className="arrowIcon" src={arrow} alt="arrow" />
        </div>

        <div className="sectionTitle">약관 및 정책</div>
        <div className="listItem">
          <div className="listText">이용 약관 동의 내역</div>
          <img className="arrowIcon" src={arrow} alt="arrow" />
        </div>
        <div className="listItem">
          <div className="listText">개인정보 처리방침</div>
          <img className="arrowIcon" src={arrow} alt="arrow" />
        </div>

        <div className="bottomButtons">
          <button className="bottomButton">로그아웃</button>
          <button className="bottomButton">탈퇴하기</button>
        </div>
      </div>
      <Navbar selected="more" />
    </div>
  );
};

export default MorePage;
