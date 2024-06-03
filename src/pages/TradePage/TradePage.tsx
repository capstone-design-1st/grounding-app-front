import React, { useState } from "react";
import { Header, SearchBar, SalesListItem, Navbar } from "../../components";
import arrow from "../../assets/icons/arrow.svg";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { useQuery, QueryFunctionContext } from "react-query";
import { getPropertiesList } from "../../apis/Trading";
import { FetchPropertiesParams, ApiResponse } from "../../types";

// useQuery의 파라미터 타입 정의
type QueryKey = [string, FetchPropertiesParams];

const TradePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  // useQuery를 사용하여 데이터를 fetch함
  const { data: apiResponse } = useQuery<
    ApiResponse,
    Error,
    ApiResponse,
    QueryKey
  >(
    ["propertiesList", { keyword: searchKeyword.trim(), page: 0, size: 10 }],
    ({ queryKey }: QueryFunctionContext<QueryKey>) => {
      const [, { keyword, page, size }] = queryKey;
      return getPropertiesList({ keyword, page, size });
    },
    {
      keepPreviousData: true,
      staleTime: 100000,
    }
  );

  const saleLists = apiResponse?.content || [];

  return (
    <div>
      <Header
        leftContent={
          <img src={arrow} alt="Arrow Icon" onClick={() => navigate(-1)} />
        }
      />
      <div className="wrap">
        <p className="tradeTitle">거래 중인 건물과 토지를 검색해 보세요</p>
        <SearchBar
          placeholder="성수, 코오롱 타워"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <div className="salesList">
          {saleLists.map((saleList) => (
            <SalesListItem
              key={saleList.property_id}
              type={saleList.type}
              location={saleList.city + " " + saleList.gu}
              name={saleList.name}
              info={saleList.one_line}
              profit={saleList.fluctuation_rate ?? 0} // null인 경우 0으로 설정
              onClick={() =>
                saleList.property_id &&
                navigate(`/trade/${saleList.property_id}`)
              }
            />
          ))}
        </div>
      </div>
      <Navbar selected="store" />
    </div>
  );
};

export default TradePage;
