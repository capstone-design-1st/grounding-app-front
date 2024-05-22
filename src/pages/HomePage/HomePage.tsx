import { useEffect } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "./styles.css";
import "../../style/slick.css";
import "../../style/slick-theme.css";
// import {
//   fetchListings,
//   fetchListingsCount,
//   fetchListingsByVolume,
//   fetchAssetHome,
// } from "../../apis/Home";
import { getLikeList } from "../../apis/Likes";
import {
  Header,
  Navbar,
  AssetListItem,
  AssetRankingItem,
  SkeletonLoader,
} from "../../components";
import mainImg from "../../assets/imgs/main.png";
import dotsIcon from "../../assets/icons/dots.svg";
import banner1 from "../../assets/imgs/banner1.png";
import banner2 from "../../assets/imgs/banner2.png";
import logo from "../../assets/imgs/header-logo.png";

const HomePage = () => {
  const navigate = useNavigate();
  //모집 중 매물 리스트 조회
  // const { data: listings } = useQuery(["listings", 0, 5, "ongoing"], () =>
  //   fetchListings(0, 5, "ongoing")
  // );

  const userId = "2222c0f7-0c97-4bd7-a200-0de1392f1df0";

  const listings = {
    content: [
      {
        listing_id: "string",
        thumbnail_url: mainImg,
        name: "string",
        summary: "string",
        created_at: "2024-03-25T06:52:38.200Z",
        updated_at: "2024-03-25T06:52:38.200Z",
      },
      {
        listing_id: "string",
        thumbnail_url: mainImg,
        name: "string",
        summary: "string",
        created_at: "2024-03-25T06:52:38.200Z",
        updated_at: "2024-03-25T06:52:38.200Z",
      },
    ],
  };

  //모집 중 매물 갯수 조회
  //const { data: listingsCount } = useQuery("listingsCount", fetchListingsCount);

  const listingsCount = {
    listing_count: 5,
  };

  //거래량이 많은 매물 리스트 조회
  // const { data: listingsVolume } = useQuery(["listingsVolume", 0, 5], () =>
  //   fetchListingsByVolume(0, 5)
  // );
  const listingsVolume = {
    content: [
      {
        listing_id: "string",
        name: "string",
        type: "building",
        value: 123456,
        earning_ratio: 25.5,
        earning_price: 12345,
        created_at: "2024-03-25T06:52:38.200Z",
        updated_at: "2024-03-25T06:52:38.200Z",
      },
    ],
  };

  //보유 자산 조회
  // const { data: assetHome } = useQuery("assetHome", () => fetchAssetHome("1"));

  const assetHome = {
    total_earning_ratio: 20.5,
    having_listing: [
      {
        listing_id: "string",
        type: "land",
        name: "string",
        counts: 10,
        buying_price: 5321,
        total: 53210,
        earning_ratio: 20.5,
        earning_price: 12345,
      },
      {
        listing_id: "string",
        type: "building",
        name: "string",
        counts: 10,
        buying_price: 5321,
        total: 53210,
        earning_ratio: 20.5,
        earning_price: 12345,
      },
    ],
  };

  const { data: likesList } = useQuery("likesList", () => getLikeList(userId));

  /*슬라이더 세팅 */
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const bannerSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // 자동 슬라이드
    autoplaySpeed: 3000, // 1초마다 슬라이드 넘김
    pauseOnHover: true, // 마우스 호버시 자동 슬라이드 멈춤
  };

  return (
    <div>
      <Header
        rightContent={
          <img
            src={dotsIcon}
            alt="dots"
            style={{ width: "18px", height: "18px" }}
          />
        }
        leftContent={
          <img
            src={logo}
            alt="logo"
            style={{ width: "57px", height: "22px" }}
          />
        }
      />

      <Slider {...bannerSettings}>
        <div>
          <img src={banner1} alt="Banner 1" style={{ width: "100%" }} />
        </div>
        <div>
          <img src={banner2} alt="Banner 2" style={{ width: "100%" }} />
        </div>
      </Slider>

      <div className="titleWrapper">
        {listings && listingsCount ? (
          <div>
            <div className="title">모집 중인 매물</div>
            <div className="subTitle">
              {listingsCount.listing_count}개의 매물이 투자를 받고 있어요.
            </div>
          </div>
        ) : (
          <div className="title" style={{ marginBottom: "10px" }}>
            <SkeletonLoader width="100%" height="20px" />
          </div>
        )}
      </div>
      <div>
        {listings ? (
          <Slider {...settings}>
            {listings.content.map((listing, index) => (
              <div
                className="slider"
                key={listing.listing_id}
                onClick={() => navigate(`/recruit/${listing.name}`)}
              >
                <img src={listing.thumbnail_url} alt={`main ${index}`} />
                <div className="sliderTitle">{listing.name}</div>
                <div className="sliderSubTitle">{listing.summary}</div>
              </div>
            ))}
          </Slider>
        ) : (
          <div
            className="subTitle"
            style={{
              width: "100%",
              padding: "0 20px",
              boxSizing: "border-box",
            }}
          >
            <SkeletonLoader width="100%" height="280px" />
          </div>
        )}
      </div>

      {assetHome && <div className="divideBox"></div>}

      <div>
        {assetHome ? (
          <div>
            <div className="home assetHeader">
              <div className="assetTitle">내 자산</div>
              {assetHome.total_earning_ratio > 0 ? (
                <div className="overallChange" style={{ color: "var(--red)" }}>
                  +{assetHome.total_earning_ratio}%
                </div>
              ) : (
                <div className="overallChange" style={{ color: "var(--blue)" }}>
                  {assetHome.total_earning_ratio}%
                </div>
              )}
              <div className="viewMore" onClick={() => navigate("/mypage")}>
                자세히 보기
              </div>
            </div>
            {assetHome.having_listing ? (
              assetHome.having_listing.map((asset: any, index: number) => (
                <div onClick={() => navigate(`/trade/${asset.name}`)}>
                  <AssetListItem
                    key={index}
                    isMyAsset={true}
                    assetType={asset.type}
                    assetName={asset.name}
                    value={asset.total}
                    count={asset.counts}
                    unitPrice={asset.buying_price}
                    changeRatio={asset.earning_ratio}
                    changePrice={asset.earning_price}
                  />
                </div>
              ))
            ) : (
              <div>보유한 자산이 없습니다.</div>
            )}
          </div>
        ) : (
          <div
            style={{
              width: "100%",
              padding: "0 20px",
              boxSizing: "border-box",
            }}
          >
            <div className="assetTitle" style={{ marginTop: "10px" }}>
              <SkeletonLoader width="100%" height="20px" />
            </div>
            <div style={{ width: "100%", marginTop: "10px" }}>
              <SkeletonLoader width="100%" height="80px" />
            </div>
          </div>
        )}
      </div>

      {listings && <div className="divideBox"></div>}

      {likesList?.content ? (
        <div>
          <div className="titleWrapper">
            <div className="title">내가 찜한 매물</div>
          </div>
          {likesList?.content?.map((asset: any) => (
            <AssetListItem
              key={asset.id}
              isMyAsset={false}
              assetType={asset.type}
              assetName={asset.name}
              value={asset.present_price}
              changeRatio={asset.fluctuation_rate}
              changePrice={asset.price_difference}
            />
          ))}
        </div>
      ) : (
        <div className="titleWrapper">
          <div className="title" style={{ marginBottom: "10px" }}>
            <SkeletonLoader width="100%" height="20px" />
          </div>
          <div style={{ width: "100%", marginTop: "10px" }}>
            <SkeletonLoader width="100%" height="80px" />
          </div>
        </div>
      )}

      {listingsVolume && <div className="divideBox"></div>}

      <div className="titleWrapper">
        {listingsVolume ? (
          <div>
            <div className="title">거래량이 많은 매물</div>
            {listingsVolume.content.map((listing: any, index: number) => (
              <div onClick={() => navigate(`/trade/${listing.name}`)}>
                <AssetRankingItem
                  key={index}
                  rank={index + 1}
                  assetType={listing.type}
                  assetName={listing.name}
                  value={listing.value}
                  changeRatio={listing.earning_ratio}
                  changePrice={listing.earning_price}
                />
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div className="title" style={{ marginBottom: "10px" }}>
              <SkeletonLoader width="100%" height="20px" />
            </div>
            <div style={{ width: "100%", marginTop: "10px" }}>
              <SkeletonLoader width="100%" height="80px" />
            </div>
          </div>
        )}
      </div>

      <div className="divideBox"></div>

      <Navbar selected="home" />
    </div>
  );
};

export default HomePage;
