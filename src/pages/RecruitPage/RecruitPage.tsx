import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./styles.css";
import { useQuery } from "react-query";
import { fetchProperty } from "../../apis/PropertyDetails";
import { formatDate, calculateDaysLeft } from "../../util/formatDate";
import { formatNumberWithCommas } from "../../util/formatNumber";
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

const RecruitPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0); //스크롤 감지

  const propertyId = id as string;

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

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const points = propertyDetails?.investment_point_dto;

  if (!points) {
    return <div>로딩중...</div>;
  }

  if (isError || !propertyDetails) {
    return <div>에러!</div>;
  }

  const assetDataDetails = {
    층수: propertyDetails.property_detail_dto.floor_count,
    용도지역: propertyDetails.property_detail_dto.main_use,
    대지면적: `${formatNumberWithCommas(
      propertyDetails.property_detail_dto.land_area
    )}m²`,
    연면적: `${formatNumberWithCommas(
      propertyDetails.property_detail_dto.total_floor_area
    )}m²`,
    준공일: propertyDetails.property_detail_dto.completion_date.replace(
      /-/g,
      "."
    ),
  };

  const publishDataDetails = {
    공모자산: `${formatNumberWithCommas(
      propertyDetails.fundraise_dto.total_fund
    )}원`,
    증권종류: "수익증권",
    발행인: propertyDetails.fundraise_dto.security_type,
    발행증권수: `${formatNumberWithCommas(
      propertyDetails.fundraise_dto.security_count
    )}주`,
    발행가액: `${formatNumberWithCommas(
      propertyDetails.fundraise_dto.issue_price
    )}원`,
    총모집액: `${formatNumberWithCommas(
      propertyDetails.fundraise_dto.total_fund
    )}원`,
    모집기간: `${formatDate(
      propertyDetails.fundraise_dto.subscription_start_date
    )} ~${formatDate(propertyDetails.fundraise_dto.subscription_end_date)}`,
  };

  return (
    <div className="recruit">
      <Header
        leftContent={
          <img src={arrow} alt="Arrow Icon" onClick={() => navigate("/home")} />
        }
        centerContent={
          scrollY !== 0 ? (
            <strong>{propertyDetails.property_dto.name}</strong>
          ) : (
            ""
          )
        }
      />
      <div className="recruitInfo">
        <div className="title">{propertyDetails.property_dto.name}</div>
        <div className="flexWrap">
          <div className="row recruitDesc">
            {propertyDetails?.property_dto.oneline}
          </div>
          <div className="row recruitDate">
            {formatDate(propertyDetails.fundraise_dto.subscription_start_date)}{" "}
            ~ {formatDate(propertyDetails.fundraise_dto.subscription_end_date)}{" "}
          </div>
        </div>
      </div>

      <img
        src={`https://${propertyDetails.thumbnail_url_dto.cloudfront_url}`}
        alt="Main"
        className="mainImg"
      />

      <div className="recruitButtonWrap">
        <div className="recruitText flexWrap">
          <div className="mainColor">
            <span>{propertyDetails.fundraise_dto.investor_count}</span>명 참여
            <Badge
              color="var(--main)"
              background="#E7F9F9"
              text={`${calculateDaysLeft(
                propertyDetails.fundraise_dto.subscription_end_date
              )}일 남음`}
            />
          </div>
          <div>
            <span>
              {formatNumberWithCommas(
                propertyDetails.fundraise_dto.progress_amount
              )}
            </span>
            원 달성
            <Badge
              color="var(--grey5)"
              background="var(--grey2)"
              text={`${propertyDetails.fundraise_dto.progress_rate.toFixed(
                2
              )}% 달성`}
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
            navigate(`/recruit/${propertyId}/invest`, {
              state: {
                name: propertyDetails.property_dto.name,
                uploaderWalletKey: propertyDetails.uploader_wallet_address,
              },
            });
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
        <TimeLine
          startDate={propertyDetails.fundraise_dto.subscription_start_date}
          endDate={propertyDetails.fundraise_dto.subscription_end_date}
          tradeDate={propertyDetails.property_detail_dto.lease_start_date}
        />
      </div>

      <div className="divideBox"></div>

      <div className="locationWrap">
        <div className="title">건물 정보</div>
        <div>
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
      <Map
        address={
          propertyDetails?.location_dto?.city +
          propertyDetails?.location_dto?.gu +
          propertyDetails?.location_dto?.dong +
          propertyDetails?.location_dto?.detail
        }
      />
      <div className="wrap">
        <AssetTable data={assetDataDetails} />
      </div>
      <div className="divideBox"></div>

      <div className="wrap">
        <div className="publishInfo">발행 정보</div>
        <AssetTable data={publishDataDetails} />
      </div>

      <div className="divideBox"></div>

      <div className="wrap">
        <div className="title">공간 운영사 정보</div>
        <div>{propertyDetails.fundraise_dto.operator_name}</div>
        <p>회사 소개</p>
        <span className="companyDescription">
          {propertyDetails.fundraise_dto.operator_introduction}
        </span>
      </div>
    </div>
  );
};

export default RecruitPage;
