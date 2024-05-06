import React from "react";
import { useNavigate } from "react-router-dom";
import homeIcon from "../../../assets/icons/home.svg";
import homeIconActive from "../../../assets/icons/active-home.svg";
import storeIcon from "../../../assets/icons/market.svg";
import storeIconActive from "../../../assets/icons/active-market.svg";
import mypageIcon from "../../../assets/icons/mypage.svg";
import mypageIconActive from "../../../assets/icons/active-mypage.svg";
import moreIcon from "../../../assets/icons/plus.svg";
import moreIconActive from "../../../assets/icons/active-plus.svg";
import "./styles.css";

interface NavbarProps {
  selected: "home" | "store" | "mypage" | "more";
}

const Navbar: React.FC<NavbarProps> = ({ selected }) => {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div
        className={`nav-item ${selected === "home" ? "active" : ""}`}
        onClick={() => navigate("/")}
      >
        <img
          src={selected === "home" ? homeIconActive : homeIcon}
          alt="home"
          className="nav-icon"
        />
        <div className={`nav-text ${selected === "home" ? "active" : ""}`}>
          홈
        </div>
      </div>
      <div
        className={`nav-item ${selected === "store" ? "active" : ""}`}
        onClick={() => navigate("/trade")}
      >
        <img
          src={selected === "store" ? storeIconActive : storeIcon}
          alt="store"
          className="nav-icon"
        />
        <div className={`nav-text ${selected === "store" ? "active" : ""}`}>
          거래
        </div>
      </div>
      <div
        className={`nav-item ${selected === "mypage" ? "active" : ""}`}
        onClick={() => navigate("/mypage")}
      >
        <img
          src={selected === "mypage" ? mypageIconActive : mypageIcon}
          alt="mypage"
          className="nav-icon"
        />
        <div className={`nav-text ${selected === "mypage" ? "active" : ""}`}>
          마이페이지
        </div>
      </div>
      <div
        className={`nav-item ${selected === "more" ? "active" : ""}`}
        onClick={() => navigate("/more")}
      >
        <img
          src={selected === "more" ? moreIconActive : moreIcon}
          alt="more"
          className="nav-icon"
        />
        <div className={`nav-text ${selected === "more" ? "active" : ""}`}>
          더보기
        </div>
      </div>
    </div>
  );
};

export default Navbar;
