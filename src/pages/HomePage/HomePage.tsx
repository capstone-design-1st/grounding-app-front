import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import './styles.css';
import '../../style/slick.css';
import '../../style/slick-theme.css';
import { fetchListingsByVolume, getOnGoingList } from '../../apis/Home';
import { getMyAccountInventory } from '../../apis/Mypage';
import { getLikeList } from '../../apis/Likes';
import { Header, Navbar, AssetListItem, AssetRankingItem, SkeletonLoader } from '../../components';
import { calculateTotalReturn } from '../../util/calculateTotal';
import mainImg from '../../assets/imgs/main.png';
import dotsIcon from '../../assets/icons/dots.svg';
import banner1 from '../../assets/imgs/banner1.png';
import banner2 from '../../assets/imgs/banner2.png';
import logo from '../../assets/imgs/header-logo.png';
import { formatNumberWithCommas } from '../../util/formatNumber';
import { getToken } from '../../util/token';
import { createClient } from '../../util/xrpl/wallet';
import { useXrplClientStore } from '../../store/xrplStore';
import { useEffect } from 'react';

const HomePage = () => {
  const navigate = useNavigate();

  const { setXrplClient } = useXrplClientStore();

  //모집 중 매물 리스트 조회
  const { data: listings } = useQuery('listings', () => getOnGoingList());

  const listingsCount = listings?.content.length;

  //거래량이 많은 매물 리스트 조회
  const { data: listingsVolume } = useQuery('listingsVolume', () => fetchListingsByVolume());

  //보유 자산 조회
  const { data: assetHome } = useQuery('assetHome', () => getMyAccountInventory());

  const { data: likesList } = useQuery('likesList', () => getLikeList());

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

  // xrpl 클라이언트 생성
  useEffect(() => {
    (async () => {
      const client = await createClient();
      setXrplClient(client);

      console.log('client', client);
    })();
  });

  return (
    <div>
      <Header
        rightContent={<img src={dotsIcon} alt="dots" style={{ width: '18px', height: '18px' }} />}
        leftContent={<img src={logo} alt="logo" style={{ width: '57px', height: '22px' }} />}
      />
      <Slider {...bannerSettings}>
        <div>
          <img src={banner1} alt="Banner 1" style={{ width: '100%' }} />
        </div>
        <div>
          <img src={banner2} alt="Banner 2" style={{ width: '100%' }} />
        </div>
      </Slider>
      <div className="titleWrapper">
        {listings && listingsCount ? (
          <div>
            <div className="title">모집 중인 매물</div>
            <div className="subTitle">{listingsCount}개의 매물이 투자를 받고 있어요.</div>
          </div>
        ) : (
          <div className="title" style={{ marginBottom: '10px' }}>
            <SkeletonLoader width="100%" height="20px" />
          </div>
        )}
      </div>
      <div>
        {listings ? (
          listings.content.length > 1 ? (
            <Slider {...settings}>
              {listings.content.map((listing, index) => (
                <div
                  className="slider"
                  key={listing.property_id}
                  onClick={() => navigate(`/recruit/${listing.property_id}`)}
                >
                  <img src={listing.thumbnail_url === null ? mainImg : listing.thumbnail_url} alt={`main ${index}`} />
                  <div className="sliderTitle">{listing.name}</div>
                  <div className="sliderSubTitle">{listing.oneline}</div>
                </div>
              ))}
            </Slider>
          ) : (
            listings.content.map((listing, index) => (
              <div
                className="slider"
                key={listing.property_id}
                onClick={() => navigate(`/recruit/${listing.property_id}`)}
              >
                <img src={listing.thumbnail_url === null ? mainImg : listing.thumbnail_url} alt={`main ${index}`} />
                <div className="sliderTitle">{listing.name}</div>
                <div className="sliderSubTitle">{listing.oneline}</div>
              </div>
            ))
          )
        ) : (
          <div
            className="subTitle"
            style={{
              width: '100%',
              padding: '0 20px',
              boxSizing: 'border-box',
            }}
          >
            <SkeletonLoader width="100%" height="280px" />
          </div>
        )}
      </div>

      {assetHome && <div className="divideBox"></div>}
      <div>
        {assetHome ? (
          assetHome.length > 0 ? (
            (() => {
              const totalEarningRatio = calculateTotalReturn(assetHome);
              return (
                <div>
                  <div className="home assetHeader">
                    <div className="assetTitle">내 자산</div>
                    {totalEarningRatio >= 0 ? (
                      <div className="overallChange" style={{ color: 'var(--red)' }}>
                        +{totalEarningRatio.toFixed(2)}%
                      </div>
                    ) : (
                      <div className="overallChange" style={{ color: 'var(--blue)' }}>
                        {totalEarningRatio.toFixed(2)}%
                      </div>
                    )}
                    <div className="viewMore" onClick={() => navigate('/mypage')}>
                      자세히 보기
                    </div>
                  </div>
                  {assetHome?.map((asset: any) => (
                    <div key={asset.property_id} onClick={() => navigate(`/trade/${asset.property_id}`)}>
                      <AssetListItem
                        isMyAsset={true}
                        assetType={asset.type}
                        assetName={asset.property_name}
                        value={formatNumberWithCommas(asset.present_price)}
                        count={asset.quantity}
                        unitPrice={asset.average_buying_price}
                        changeRatio={asset.fluctuation_rate}
                        changePrice={asset.difference_amount}
                      />
                    </div>
                  ))}
                </div>
              );
            })()
          ) : (
            <div>
              <div className="home assetHeader">
                <div className="assetTitle">내 자산</div>
              </div>
              <div className="assetTitle" style={{ padding: '10px 20px', textAlign: 'center' }}>
                {getToken() ? (
                  <div>보유하고 있는 자산이 없습니다.</div>
                ) : (
                  <div>
                    <div>로그인 후 자산을 확인해보세요!</div>
                  </div>
                )}
              </div>
            </div>
          )
        ) : (
          <div
            style={{
              width: '100%',
              padding: '0 20px',
              marginTop: '10px',
              boxSizing: 'border-box',
            }}
          >
            <div className="assetTitle" style={{ marginTop: '10px' }}>
              <SkeletonLoader width="100%" height="20px" />
            </div>
            <div style={{ width: '100%', marginTop: '10px' }}>
              <SkeletonLoader width="100%" height="80px" />
            </div>
          </div>
        )}
      </div>
      {listings && <div className="divideBox"></div>}
      {!likesList?.content || likesList.content.length !== 0 ? (
        <div>
          <div className="titleWrapper">
            <div className="title">내가 찜한 매물</div>
          </div>
          {likesList?.content?.map((asset: any) => (
            <div key={asset.id} onClick={() => navigate(`/trade/${asset.id}`)}>
              <AssetListItem
                isMyAsset={false}
                assetType={asset.type}
                assetName={asset.name}
                value={formatNumberWithCommas(asset.present_price)}
                changeRatio={asset.fluctuation_rate}
                changePrice={asset.price_difference}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="titleWrapper">
          <div className="title">내가 찜한 매물</div>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            {getToken() ? (
              <div>보유하고 있는 자산이 없습니다.</div>
            ) : (
              <div>
                <div>로그인 후 관심있는 매물에 찜을 해보세요!</div>
              </div>
            )}
          </div>
        </div>
      )}
      {listingsVolume && <div className="divideBox"></div>}
      <div className="titleWrapper">
        {listingsVolume ? (
          <div>
            <div className="title">거래량이 많은 매물</div>
            {listingsVolume?.content?.map((listing: any, index: number) => (
              <div key={listing.id} onClick={() => navigate(`/trade/${listing.id}`)}>
                <AssetRankingItem
                  rank={index + 1}
                  assetType={listing.type}
                  assetName={listing.name}
                  value={formatNumberWithCommas(listing.present_price)}
                  changeRatio={listing.fluctuation_rate}
                  changePrice={listing.price_difference}
                />
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div className="title" style={{ marginBottom: '10px' }}>
              <SkeletonLoader width="100%" height="20px" />
            </div>
            <div style={{ width: '100%', marginTop: '10px' }}>
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
