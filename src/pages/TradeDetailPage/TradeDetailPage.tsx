import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AccordionItem, OrderBookEntry } from "../../types";
import "./styles.css";
import { fetchProperty, fetchPropertyLike } from "../../apis/PropertyDetails";
import { addLike, deleteLike } from "../../apis/Likes";
import { formatDate } from "../../util/formatDate";
import { formatNumberWithCommas } from "../../util/formatNumber";
import { useQuery, useMutation, useQueryClient } from "react-query";

import {
  Header,
  Tab,
  CandleChart,
  Button,
  Accordion,
  AssetIntro,
  AssetTable,
  Map,
  OrderBook,
  OrderModal,
  NewsListItem,
  DocumentListItem,
  TwoRow,
  // InvestPoint,
} from "../../components";
import arrow from "../../assets/icons/arrow.svg";
import heart from "../../assets/icons/heart.png";
import heartFill from "../../assets/icons/heart-fill.png";
import smallArrow from "../../assets/icons/small-arrow.svg";
import defaultImg from "../../assets/imgs/main.png";
import locationIcon from "../../assets/icons/location.png";
import newsImg1 from "../../assets/imgs/news1.png";
import newsImg2 from "../../assets/imgs/news2.png";

const TradeDetailPage = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); // 모달 표시 상태
  const [scrollY, setScrollY] = useState(0); //스크롤 감지
  const [property, setProperty] = useState({});

  //const userId = "2222c0f7-0c97-4bd7-a200-0de1392f1df0";
  const propertyId = "1111c0f7-0c97-4bd7-a200-0de1392f1df0";

  const { data: propertyDetails, isError } = useQuery(
    ["propertyDetails", propertyId],
    () => fetchProperty(propertyId),
    {
      enabled: !!propertyId,
      refetchOnWindowFocus: false,
      onError: (error) =>
        console.error("Error fetching property details:", error),
    }
  );

  const { data: isLike } = useQuery(
    ["isLike", propertyId],
    () => fetchPropertyLike(propertyId),
    {
      enabled: !!propertyId,
    }
  );

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (isLike) {
      setLiked(isLike.is_like);
    }
  }, [isLike]);

  const queryClient = useQueryClient();

  // addLike 기능을 위한 Mutation
  const addLikeMutation = useMutation(() => addLike(propertyId), {
    onSuccess: () => {
      // 성공 시 수행할 작업, 예를 들어 캐시된 쿼리 데이터 갱신
      queryClient.invalidateQueries("likeList");
    },
    onError: (error) => {
      console.error("Error adding like:", error);
    },
  });

  // deleteLike 기능을 위한 Mutation
  const deleteLikeMutation = useMutation(() => deleteLike(propertyId), {
    onSuccess: () => {
      // 성공 시 수행할 작업
      queryClient.invalidateQueries("likeList");
    },
    onError: (error) => {
      console.error("Error deleting like:", error);
    },
  });

  const handleClickHeart = async () => {
    if (liked) {
      deleteLikeMutation.mutate();
    } else {
      addLikeMutation.mutate();
    }
    setLiked(!liked);
  };

  useEffect(() => {
    if (propertyDetails) {
      setProperty({
        투자대상: propertyDetails.property_dto.name,
        위치: `${propertyDetails.location_dto.city} ${propertyDetails.location_dto.gu} ${propertyDetails.location_dto.dong} ${propertyDetails.location_dto.detail}`,
        용도지역: "일반상업지역",
        주용도: propertyDetails.property_detail_dto.main_use,
        연면적: `본건: ${formatNumberWithCommas(
          propertyDetails.property_detail_dto.land_area
        )}m² (전유면적: ${formatNumberWithCommas(
          propertyDetails.property_detail_dto.total_floor_area
        )}m²)`,
        대지면적: `본건: ${formatNumberWithCommas(
          propertyDetails.property_detail_dto.land_area
        )}m²`,
        건물규모: propertyDetails.property_detail_dto.floor_count,
        준공일: propertyDetails.property_detail_dto.completion_date.replace(
          /-/g,
          "."
        ),
        공시지가: `${formatNumberWithCommas(
          parseInt(propertyDetails.property_detail_dto.official_land_price) /
            propertyDetails.property_detail_dto.total_floor_area
        )}원/m²(2022년 1월 기준)`,
        임차인: propertyDetails.property_detail_dto.leaser,
        임대기간: `${formatDate(
          propertyDetails.property_detail_dto.lease_start_date
        )} ~ ${formatDate(propertyDetails.property_detail_dto.lease_end_date)}`,
      });
    }
  }, [propertyDetails]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  const orderBookData: OrderBookEntry[] = [
    // 추가 데이터..
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

  const documents = [
    { title: "공모 청약 안내문", url: "https://example.com/document1.pdf" },
    { title: "증권신고서", url: "https://example.com/document2.pdf" },
    { title: "투자설명서", url: "https://example.com/document3.pdf" },
    {
      title: "부동산관리처분신탁계약서",
      url: "https://example.com/document4.pdf",
    },
    { title: "감정평가보고서(대한)", url: "https://example.com/document5.pdf" },
    {
      title: "감정평가보고서(태평양)",
      url: "https://example.com/document6.pdf",
    },
  ];

  const disclosure = [
    {
      lable: "24.04.04",
      value: "신도림 핀포인트타워 2호 배당금 지급 안내",
    },
    {
      lable: "24.04.04",
      value: "신도림 핀포인트타워 2호 배당금 지급 안내",
    },
    {
      lable: "24.04.04",
      value: "신도림 핀포인트타워 2호 배당금 지급 안내",
    },
    {
      lable: "24.04.04",
      value: "신도림 핀포인트타워 2호 배당금 지급 안내",
    },
    {
      lable: "24.04.04",
      value: "신도림 핀포인트타워 2호 배당금 지급 안내",
    },
    {
      lable: "24.04.04",
      value: "신도림 핀포인트타워 2호 배당금 지급 안내",
    },
    {
      lable: "24.04.04",
      value: "신도림 핀포인트타워 2호 배당금 지급 안내",
    },
    {
      lable: "24.04.04",
      value: "신도림 핀포인트타워 2호 배당금 지급 안내",
    },
    {
      lable: "24.04.04",
      value: "신도림 핀포인트타워 2호 배당금 지급 안내",
    },
    {
      lable: "24.04.04",
      value: "신도림 핀포인트타워 2호 배당금 지급 안내",
    },
    {
      lable: "24.04.04",
      value: "신도림 핀포인트타워 2호 배당금 지급 안내",
    },
    {
      lable: "24.04.04",
      value: "신도림 핀포인트타워 2호 배당금 지급 안내",
    },
  ];

  const newsItems = [
    {
      title: "조각투자사 소유, 8호 부동산 '신도림 핀포인트타워 2호' 완판",
      date: "24.04.04",
      source: "뉴스투데이",
      image: newsImg1,
      url: "https://www.naver.com",
    },
    {
      title: "루센트블록 소유, 부동산 상품 ‘신도림 핀포인트타워 2호’ 공모 시작",
      date: "24.04.04",
      source: "뉴스투데이",
      image: newsImg2,
      url: "https://www.naver.com",
    },
    {
      title: "루센트블록 소유, 부동산 상품 ‘신도림 핀포인트타워 2호’ 공모 시작",
      date: "24.04.04",
      source: "뉴스투데이",
      image: newsImg2,
      url: "https://www.naver.com",
    },
  ];

  const items: AccordionItem[] = [
    {
      title: "8호 부동산 '신도림 핀포인트타워 2호' 완판",
      content: "신도림 핀포인트 타워가 완판됐다...200자 요약 gpt",
    },
    {
      title: "8호 부동산 '신도림 핀포인트타워 2호' 완판",
      content: "신도림 핀포인트 타워가 완판됐다...200자 요약 gpt",
    },
    {
      title: "8호 부동산 '신도림 핀포인트타워 2호' 완판",
      content: "신도림 핀포인트 타워가 완판됐다...200자 요약 gpt",
    },
  ];

  if (isError || !propertyDetails) {
    return <div>에러!</div>;
  }

  const tabs = [
    {
      label: "차트",
      content: (
        <div>
          <div className="chartWrapper">
            <CandleChart />
            <div
              className="goToSpan"
              onClick={() => {
                navigate(`/trade/${name}/quote`);
              }}
            >
              일별 · 당일 시세 보기
              <img src={smallArrow} alt="smallArrow" />
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
            <AssetTable data={property} />
          </div>

          <div className="divideBox"></div>

          <div className="tradeWrap displayFlex">
            <div className="info title">위치 정보</div>
            <div className="locationWrap">
              <img src={locationIcon} alt="Location Icon" />
              <p>
                {propertyDetails?.location_dto?.city +
                  " " +
                  propertyDetails?.location_dto?.gu +
                  " " +
                  propertyDetails?.location_dto?.dong +
                  " " +
                  propertyDetails?.location_dto?.detail}
              </p>
            </div>
          </div>
          <div>
            <Map
              address={
                propertyDetails?.location_dto?.city +
                propertyDetails?.location_dto?.gu +
                propertyDetails?.location_dto?.dong +
                propertyDetails?.location_dto?.detail
              }
            />
          </div>

          <div className="divideBox"></div>

          <div className="sidePadding">
            <div className="title">투자 포인트</div>
            {/* <InvestPoint points={investPoint} /> */}
          </div>

          <div className="divideBox"></div>

          <div className="wrap">
            <div className="info title">뉴스</div>
            <NewsListItem items={newsItems} />
          </div>

          <div className="greyBackground">
            <div className="info title">투자 관련 문서</div>
            <DocumentListItem documents={documents} />
          </div>
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
        <div className="disclosureWrap">
          {disclosure.map((item) => (
            <div className="rowWrap">
              <TwoRow
                label={item.lable}
                value={item.value}
                color="#000"
                weight="600"
              />
            </div>
          ))}
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
        centerContent={scrollY !== 0 ? <strong>{name}</strong> : ""}
        rightContent={
          <img
            src={liked ? heartFill : heart}
            alt="Heart Icon"
            onClick={() => handleClickHeart()}
            style={{ width: "24px", height: "24px" }}
          />
        }
      />
      <div className="tradeWrap">
        <div className="salesInfo">
          <div className="col">
            <div className="row">
              <div className="title">{name} </div>
            </div>
            <div className="row info">
              {propertyDetails.property_dto.oneline}
            </div>
          </div>
          <div className="col col2">
            <div className="row">
              {formatNumberWithCommas(
                propertyDetails.property_dto.present_price
              )}
            </div>
            <div className="row">
              {propertyDetails.property_dto.price_difference === 0 ? (
                <span style={{ color: "#000" }}>
                  {formatNumberWithCommas(
                    propertyDetails.property_dto.price_difference
                  )}
                  원 ({propertyDetails.property_dto.price_difference.toFixed(2)}
                  %)
                </span>
              ) : propertyDetails.property_dto.price_difference > 0 ? (
                <span style={{ color: "var(--red)" }}>
                  ▲
                  {formatNumberWithCommas(
                    propertyDetails.property_dto.price_difference
                  )}
                  원 ({propertyDetails.property_dto.price_difference.toFixed(2)}
                  %)
                </span>
              ) : (
                <span style={{ color: "var(--blue)" }}>
                  ▼
                  {formatNumberWithCommas(
                    propertyDetails.property_dto.price_difference
                  )}
                  원 ({propertyDetails.property_dto.price_difference.toFixed(2)}
                  %)
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="locationWrap">
          <img src={locationIcon} alt="Location Icon" />
          <p>
            {propertyDetails.location_dto?.city +
              " " +
              propertyDetails.location_dto?.gu +
              " " +
              propertyDetails.location_dto?.dong +
              " " +
              propertyDetails.location_dto?.detail}
          </p>
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
