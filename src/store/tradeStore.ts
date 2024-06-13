import { create } from "zustand";

interface PropertyStoreState {
  propertyId: string | null;
  uploaderWalletKey: string | null;
  setPropertyId: (id: string | null) => void;
  setUploaderWalletKey: (key: string | null) => void;
}

export const usePropertyStore = create<PropertyStoreState>((set) => ({
  propertyId: null,
  uploaderWalletKey: null,
  setPropertyId: (id) => set({ propertyId: id }),
  setUploaderWalletKey: (key) => set({ uploaderWalletKey: key }),
}));

type ModalStoreState = {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
};

export const useModalStore = create<ModalStoreState>((set) => ({
  showModal: false,
  setShowModal: (show: boolean) => set({ showModal: show }),
}));

type QuantityPriceStoreState = {
  quantity: number;
  setQuantity: (quantity: number) => void;
  price: number;
  setPrice: (price: number) => void;
};

export const useQuantityPriceStore = create<QuantityPriceStoreState>((set) => ({
  quantity: 0,
  setQuantity: (quantity: number) => set({ quantity }),
  price: 0,
  setPrice: (price: number) => set({ price }),
}));

interface TradeStoreState {
  currentPrice: number;
  fluctuationRate: number;
  setCurrentPrice: (price: number) => void;
  setFluctuationRate: (rate: number) => void;
}

export const usePriceStore = create<TradeStoreState>((set) => ({
  currentPrice: 0,
  fluctuationRate: 0,
  setCurrentPrice: (price) => set({ currentPrice: price }),
  setFluctuationRate: (rate) => set({ fluctuationRate: rate }),
}));
