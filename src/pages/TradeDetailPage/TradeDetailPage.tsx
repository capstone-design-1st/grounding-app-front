import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import arrow from "../../assets/icons/arrow.svg";
import heart from "../../assets/icons/heart.svg";
import smallArrow from "../../assets/icons/small-arrow.svg";
import defaultImg from "../../assets/imgs/main.png";
import {
  Header,
  Tab,
  CandleChart,
  Button,
  Accordion,
  AssetIntro,
  AssetTable,
  Map,
} from "../../components";
import locationIcon from "../../assets/icons/location.svg";
import "./styles.css";
import { AccordionItem, OrderBookEntry } from "../../types";
import OrderBook from "../../components/trade/OrderBook/OrderBook";
import OrderModal from "../../components/trade/OrderModal/OrderModal";

const TradeDetailPage = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); // 모달 표시 상태
  const closeModal = () => setShowModal(false);

  const orderBookData: OrderBookEntry[] = [
    // 추가 데이터...

    { price: 1124, amount: 6, type: "sell" },
    { price: 1123, amount: 50, type: "sell" },
    { price: 1122, amount: 10, type: "sell" },
    { price: 1121, amount: 6, type: "sell" },
    { price: 1120, amount: 20, type: "sell" },
    { price: 1119, amount: 10, type: "sell" },
    { price: 1118, amount: 10, type: "sell" },
    { price: 1117, amount: 10, type: "buy" },
    { price: 1116, amount: 6, type: "buy" },
    { price: 1115, amount: 10, type: "buy" },
    { price: 1114, amount: 6, type: "buy" },
    { price: 1113, amount: 36, type: "buy" },
    { price: 1112, amount: 60, type: "buy" },
    { price: 1111, amount: 80, type: "buy" },
  ];

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

  const assetDataDetails = {
    투자대상: "신도림 핀포인트 타워 2호",
    위치: "서울특별시 구로구 경인로 661",
    용도지역: "일반상업지역",
    주용도: "숙박시설",
    연면적: "본건 : 240.3m² (전유면적 : 1,000.3m²)",
    대지면적: "본건 : 170.3m²",
    건물규모: "지하 5층 / 지상 101층",
    준공일: "2019.11.29",
    공시지가: "13,770,000원/m²(2022년 1월 기준)",
    임차인: "주식회사 유진글로벌",
    임대기간: "2022.10.1 ~ 2025.11.30",
  };

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
          <div className="reputation wrap">
            <div className="title">종목 평판</div>
            <Accordion items={items} />
            <Button
              text="거래하기"
              color="white"
              background={"var(--main)"}
              padding="15px 0px"
              onClick={() => navigate("/trade")}
            />
          </div>
        </div>
      ),
    },
    {
      label: "종목 정보",
      content: (
        <div>
          <AssetIntro
            image={defaultImg}
            details={{
              발행가: "5,000원 / DAS",
              발행수량: "570,000 DAS",
              DAS상장일: "22.12.22",
              배당주기: "1개월",
            }}
          />
          <div className="divideBox"></div>
          <div className="wrap">
            <div className="info title">투자 정보</div>
            <AssetTable data={assetDataDetails} />
          </div>

          <div className="divideBox"></div>

          <div className="tradeWrap displayFlex">
            <div className="info title">위치 정보</div>
            <div className="locationWrap">
              <img src={locationIcon} alt="Location Icon" />
              <p>서울 구로구 경인로 661</p>
            </div>
          </div>
          <div>
            <Map address="서울 구로구 경인로 661" />
          </div>

          <div className="divideBox"></div>
        </div>
      ),
    },
    {
      label: "호가",
      content: (
        <div className="sidePadding">
          <OrderBook entries={orderBookData} />
          <Button
            text="거래하기"
            color="var(--main)"
            background={"var(--white)"}
            padding="10px 0px"
            border="1px solid var(--main)"
            onClick={() => setShowModal(true)}
          />
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
      <div className="tradeWrap">
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
        <div className="locationWrap">
          <img src={locationIcon} alt="Location Icon" />
          <p>서울 구로구 경인로 661</p>
        </div>
      </div>
      <Tab tabs={tabs} />
      {showModal && (
        <OrderModal onClose={() => setShowModal(false)} /> // 모달 닫기 함수 전달
      )}
    </div>
  );
};

export default TradeDetailPage;
