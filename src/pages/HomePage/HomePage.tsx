import Slider from "react-slick";
import mainImg from "../../assets/imgs/main.png";
import "../../style/slick.css";
import "../../style/slick-theme.css";
import { AssetListItem, Header, Navbar } from "../../components";
import dotsIcon from "../../assets/icons/dots.svg";
import banner from "../../assets/imgs/banner.png";
import "./styles.css";

const HomePage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
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
      />
      <img className="banner" src={banner} alt="banner" />

      <div className="titleWrapper">
        <div className="title">모집 중인 매물</div>
        <div className="subTitle">n개의 매물이 투자를 받고 있어요</div>
      </div>

      <Slider {...settings}>
        <div className="slider">
          <img src={mainImg} alt="main 1" />
          <div className="sliderTitle">성수 코오롱 타워</div>
          <div className="sliderSubTitle">공실률 0% 성수동 오피스 투자</div>
        </div>
        <div className="slider">
          <img src={mainImg} alt="main 2" />
          <div className="sliderTitle">성수 코오롱 타워</div>
          <div className="sliderSubTitle">공실률 0% 성수동 오피스 투자</div>
        </div>
        <div className="slider">
          <img src={mainImg} alt="main 3" />
          <div className="sliderTitle">성수 코오롱 타워</div>
          <div className="sliderSubTitle">공실률 0% 성수동 오피스 투자</div>
        </div>
      </Slider>

      <div className="divideBox"></div>
      <AssetListItem
        isMyAsset={true}
        isBuilding={true}
        assetName="신도림 핀포인트타워 2호"
        value="123,456원"
        count="10"
        unitPrice="5821"
        totalChange="+25.5%"
        change="+45,255 (25.5%)"
      />

      <div className="divideBox"></div>

      <AssetListItem
        isMyAsset={false}
        isBuilding={true}
        assetName="신도림 핀포인트타워 2호"
        value="123,456원"
        change="+45,255 (25.5%)"
      />

      <div className="divideBox"></div>

      <div className="titleWrapper">
        <div className="title">거래량이 많은 매물</div>
        <div className="subTitle">n개의 매물이 투자를 받고 있어요</div>
      </div>

      <Navbar selected="store" />
    </div>
  );
};

export default HomePage;
