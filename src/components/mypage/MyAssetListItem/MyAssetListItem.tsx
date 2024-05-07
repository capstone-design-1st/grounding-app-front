import TwoTwoRow from "../../common/TwoTwoRow/TwoTwoRow";
import AssetHeader from "../AssetHeader/AssetHeader";
import building from "../../../assets/icons/building.png";
import "./styles.css";

const MyAssetListItem = () => {
  const details = {
    보유수량: "10주",
    매수평균가: "5123원",
    평가금액: "60000원",
    매수금액: "50000원",
  };

  return (
    <div className="myAssetListItem">
      <AssetHeader
        icon={building}
        name="신도림 핀포인트타워 2호"
        profit="+45,255(25.5%)"
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
