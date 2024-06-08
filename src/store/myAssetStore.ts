import { create } from "zustand";

interface AssetStoreState {
  cashBalance: number;
  updateCashBalance: (amount: number) => void;
  depositCash: (amount: number) => void;
  withdrawCash: (amount: number) => void;
}

const useAssetStore = create<AssetStoreState>((set) => ({
  cashBalance: 0,
  updateCashBalance: (amount: number) => set({ cashBalance: amount }),
  depositCash: (amount: number) =>
    set((state) => ({ cashBalance: state.cashBalance + amount })),
  withdrawCash: (amount: number) =>
    set((state) => ({ cashBalance: state.cashBalance - amount })),
}));

export default useAssetStore;
