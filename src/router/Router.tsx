import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import MyPage from "../pages/MyPage/MyPage";
import TradePage from "../pages/TradePage/TradePage";
import TradeDetailPage from "../pages/TradeDetailPage/TradeDetailPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/trade" element={<TradePage />} />
      <Route path="/trade/:name" element={<TradeDetailPage />} />
      <Route path="/mypage" element={<MyPage />} />
    </Routes>
  );
};

export default Router;
