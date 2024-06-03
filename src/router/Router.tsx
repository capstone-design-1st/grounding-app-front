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
import SignUp from "../pages/SignUp/SignUp";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/recruit/:id" element={<RecruitPage />} />
      <Route path="/trade" element={<TradePage />} />
      <Route path="/trade/:id" element={<TradeDetailPage />} />
      <Route path="/trade/:id/quote" element={<QuotePage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/mypage/deposit" element={<DepositPage />} />
      <Route path="/mypage/withdraw" element={<WithdrawPage />} />
      <Route path="/more" element={<MorePage />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default Router;
