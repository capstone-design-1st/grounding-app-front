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
import OnRecruitPage from "../pages/OnRecruitPage/OnRecruitPage";
import RecruitCompletePage from "../pages/RecruitCompletePage/RecruitCompletePage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/recruit/:id" element={<RecruitPage />} />
      <Route path="/recruit/:id/invest" element={<OnRecruitPage />} />
      <Route path="/recruit-complete" element={<RecruitCompletePage />} />
      <Route path="/trade" element={<TradePage />} />
      <Route path="/trade/:id" element={<TradeDetailPage />} />
      <Route path="/trade/:name/quote" element={<QuotePage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/mypage/deposit" element={<DepositPage />} />
      <Route path="/mypage/withdraw" element={<WithdrawPage />} />
      <Route path="/more" element={<MorePage />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default Router;
