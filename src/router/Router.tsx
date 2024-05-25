import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import MyPage from "../pages/MyPage/MyPage";
import TradePage from "../pages/TradePage/TradePage";
import TradeDetailPage from "../pages/TradeDetailPage/TradeDetailPage";
import QuotePage from "../pages/QuotePage/QuotePage";
import DepositPage from "../pages/DepositPage/DepositPage";
import WithdrawPage from "../pages/WithdrawPage/WithdrawPage";
import MorePage from "../pages/MorePage/MorePage";
import RecruitPage from "../pages/RecruitPage/RecruitPage";
import Login from "../pages/Login/Login";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/recruit/:name" element={<RecruitPage />} />
      <Route path="/trade" element={<TradePage />} />
      <Route path="/trade/:name" element={<TradeDetailPage />} />
      <Route path="/trade/:name/quote" element={<QuotePage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/mypage/deposit" element={<DepositPage />} />
      <Route path="/mypage/withdraw" element={<WithdrawPage />} />
      <Route path="/more" element={<MorePage />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default Router;
