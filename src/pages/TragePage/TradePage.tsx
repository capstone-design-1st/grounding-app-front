import React from "react";
import { Header } from "../../components";
import arrow from "../../assets/icons/arrow.svg";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/trade/SearchBar/SearchBar";

const TradePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Header
        leftContent={
          <img src={arrow} alt="Arrow Icon" onClick={() => navigate(-1)} />
        }
      ></Header>
      <h3>거래 중인 건물과 토지를 검색해 보세요</h3>
      <SearchBar placeholder="성수, 코오롱 타워 " />
    </div>
  );
};

export default TradePage;
