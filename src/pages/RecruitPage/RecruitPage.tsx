import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Header,
  Badge,
  Button,
  InvestPoint,
  Map,
  AssetTable,
  TimeLine,
} from "../../components";
import arrow from "../../assets/icons/arrow.svg";
import locationIcon from "../../assets/icons/location.png";
import defaultImg from "../../assets/imgs/main.png";
import "./styles.css";

const RecruitPage = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0); //스크롤 감지

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const points = [
    "연 6% 고정 배당금 지급",
    "시세 대비 낮은 공모가, 매각 차익 기대",
    "신도림역 더블 역세권, 오피스 최적 입지",
  ];

  return (
    <div className="recruit">
      <Header
        leftContent={
          <img src={arrow} alt="Arrow Icon" onClick={() => navigate(-1)} />
        }
        centerContent={scrollY !== 0 ? <strong>{name}</strong> : ""}
      />
      <div className="recruitInfo">
        <div className="title">{name} </div>
        <div className="flexWrap">
          <div className="row recruitDesc">공실률 0% 성수동 오피스 투자</div>
          <div className="row recruitDate">24.04.18 ~ 24.05.10</div>
        </div>
      </div>
      <img src={defaultImg} alt="Main" className="mainImg" />

      <div className="recruitButtonWrap">
        <div className="recruitText flexWrap">
          <div className="mainColor">
            <span>101</span>명 참여
            <Badge color="var(--main)" background="#E7F9F9" text="28일 남음" />
          </div>
          <div>
            <span>2,583,000</span>원 달성
            <Badge
              color="var(--grey5)"
              background="var(--grey2)"
              text="82% 달성"
            />
          </div>
        </div>

        <Button
          text="투자하기"
          color="var(--white)"
          background="var(--main)"
          padding="15px 0"
          width="100%"
          fontSize="16px"
          onClick={() => {
            alert("준비중입니다.");
          }}
        />
      </div>
      <div className="divideBox"></div>

      <div className="sidePadding">
        <div className="title">투자 포인트</div>
        <InvestPoint points={points} />
      </div>

      <div className="divideBox"></div>

      <div className="sidePadding">
        <div className="title">모집 현황</div>
        <TimeLine />
      </div>

      <div className="divideBox"></div>

      <div className="locationWrap">
        <div className="title">건물 알아보기</div>
        <div>
          <img src={locationIcon} alt="Location Icon" />
          <p>서울 구로구 경인로 21</p>
        </div>
      </div>
      <Map address="서울 구로구 경인로 21" />

      <div className="wrap">
        <AssetTable data={assetDataDetails} />
      </div>
      <div className="divideBox"></div>

      <div className="wrap">
        <div className="publishInfo">발행 정보</div>
        <AssetTable data={assetDataDetails} />
      </div>

      <div className="divideBox"></div>

      <div className="wrap">
        <div className="title">공간 운영사 정보</div>
        <div>제일저지주식회사</div>
        <p>회사 소개</p>
        <span className="companyDescription">
          제일저지(주)는 골프, 아웃도어, 스포츠레저 웨어 등의 저지원단을
          생산하는 소재 전문 기업으로 국내외 브랜드에 적용되는 섬유 소재의
          핵심기술과 트허를 보유한 원단 40,000여종을 보유하고 있으며 의류 제조
          전문 기업입니다.{" "}
        </span>
      </div>
    </div>
  );
};

const assetDataDetails = {
  층수: "지상 20층/지하 3층",
  용도지역: "업무 시설",
  대지면적: "7,912.0m^2",
  연면적: "56,857.0m^2",
  건폐율: "44.9%",
  용적률: "476.4%",
  준공일: "2022.10.1",
};

export default RecruitPage;
