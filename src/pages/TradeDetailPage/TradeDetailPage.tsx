import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import arrow from "../../assets/icons/arrow.svg";
import heart from "../../assets/icons/heart.svg";
import smallArrow from "../../assets/icons/small-arrow.svg";
import { Header, Tab, CandleChart, Button, Accordion } from "../../components";
import locationIcon from "../../assets/icons/location.svg";
import "./styles.css";
import { AccordionItem } from "../../types";

const TradeDetailPage = () => {
  const { name } = useParams();
  const navigate = useNavigate();

  const items: AccordionItem[] = [
    {
      title: "조각투자사 소유, 8호 부동산 '신도림 핀포인트타워 2호' 완판",
      content: "신도림 핀포인트 타워가 완판됐다...200자 요약 gpt",
    },
    {
      title: "조각투자사 소유, 8호 부동산 '신도림 핀포인트타워 2호' 완판",
      content: "신도림 핀포인트 타워가 완판됐다...200자 요약 gpt",
    },
    {
      title: "조각투자사 소유, 8호 부동산 '신도림 핀포인트타워 2호' 완판",
      content: "신도림 핀포인트 타워가 완판됐다...200자 요약 gpt",
    },
  ];

  const tabs = [
    {
      label: "차트",
      content: (
        <div>
          <div className="chartWrapper">
            <CandleChart />
            <div className="goToSpan">
              일별 · 당일 시세 보기
              <img src={smallArrow} alt="smallArrow" />{" "}
            </div>
          </div>
          <div className="divideBox"></div>
          <div className="reputation">
            <div className="title">종목 평판</div>
            <Accordion items={items} />
          </div>
          <Button
            text="거래하기"
            color="white"
            background={"var(--main)"}
            padding="15px 0px"
            onClick={() => navigate("/trade")}
          />
        </div>
      ),
    },
    {
      label: "종목 정보",
      content: (
        <div>
          <h1>종목 정보</h1>
          <p>종목에 대한 세부 정보를 보여줍니다.</p>
        </div>
      ),
    },
    {
      label: "호가",
      content: (
        <div>
          <h1>호가 정보</h1>
          <p>현재 호가 정보를 상세하게 보여줍니다.</p>
        </div>
      ),
    },
    {
      label: "공시",
      content: (
        <div>
          <h1>공시 정보</h1>
          <p>최근 공시된 정보를 표시합니다.</p>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Header
        leftContent={
          <img src={arrow} alt="Arrow Icon" onClick={() => navigate(-1)} />
        }
        rightContent={<img src={heart} alt="Heart Icon" />}
      />
      <div className="salesInfo">
        <div className="col">
          <div className="row">
            <div className="title">{name} </div>
          </div>
          <div className="row info">서울 더블 역세권 + 6% 고정 배당</div>
        </div>
        <div className="col col2">
          <div className="row">4,705원</div>
          <div className="row">▴10 + 2.7%</div>
        </div>
      </div>
      <div className="location_wrap">
        <img src={locationIcon} alt="Location Icon" />
        <p>서울 구로구 경인로 661</p>
      </div>
      <Tab tabs={tabs} />
    </div>
  );
};

export default TradeDetailPage;
