import { Header, SearchBar, SalesListItem, Navbar } from "../../components";
import arrow from "../../assets/icons/arrow.svg";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const TradePage = () => {
  const navigate = useNavigate();

  const saleLists = [
    {
      location: "서울 성동구",
      name: "신도림 핀포인트타워",
      info: "서울 더블 역세권",
      profit: 3.5,
    },
    {
      location: "서울 성동구",
      name: "성수 코오롱 타워",
      info: "서울 더블 역세권",
      profit: -3.5,
    },
    {
      location: "서울 성동구",
      name: "성수 코오롱 타워",
      info: "서울 더블 역세권",
      profit: 3.5,
    },
    {
      location: "서울 성동구",
      name: "성수 코오롱 타워",
      info: "서울 더블 역세권",
      profit: -3.5,
    },
  ];

  return (
    <div>
      <Header
        leftContent={
          <img src={arrow} alt="Arrow Icon" onClick={() => navigate(-1)} />
        }
      ></Header>
      <div className="wrap">
        <h3>거래 중인 건물과 토지를 검색해 보세요</h3>
        <SearchBar placeholder="성수, 코오롱 타워 " />

        <div className="salesList">
          {saleLists.map((saleList, index) => (
            <SalesListItem
              key={index}
              location={saleList.location}
              name={saleList.name}
              info={saleList.info}
              profit={saleList.profit}
              onClick={() => navigate(`/trade/${saleList.name}`)}
            />
          ))}
        </div>
      </div>

      <Navbar selected="store" />
    </div>
  );
};

export default TradePage;