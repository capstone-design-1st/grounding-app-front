import TwoTwoRow from "../../common/TwoTwoRow/TwoTwoRow";
import AssetHeader from "../AssetHeader/AssetHeader";
import building from "../../../assets/icons/building.png";
import land from "../../../assets/icons/farm.png";
import "./styles.css";

interface AssetListProps {
  property_id: string;
  property_name: string;
  type: "land" | "building";
  quantity: number;
  average_buying_price: number;
  evaluation_price: number;
  difference_amount: number;
  fluctuation_rate: string;
  total_buying_price: number;
}

const MyAssetListItem: React.FC<AssetListProps> = ({
  property_name,
  type,
  quantity,
  average_buying_price,
  evaluation_price,
  difference_amount,
  fluctuation_rate,
  total_buying_price,
}) => {
  const details = {
    보유수량: `${quantity}주`,
    매수평균가: `${average_buying_price}원`,
    평가금액: `${evaluation_price}원`,
    매수금액: `${total_buying_price}원`,
  };

  return (
    <div className="myAssetListItem">
      <AssetHeader
        icon={type === "building" ? building : land}
        name={property_name}
        profit={`${difference_amount}(${fluctuation_rate})`}
      />
      <div className="detailsGrid">
        {Object.entries(details).map(([label, value], index) => (
          <TwoTwoRow
            key={index}
            color={"var(--grey4)"}
            weight="300"
            label={label}
            value={value}
          />
        ))}
      </div>
    </div>
  );
};

export default MyAssetListItem;
