import { create } from "zustand";

interface PropertyStoreState {
  propertyId: string | null;
  setPropertyId: (id: string | null) => void;
}

export const usePropertyStore = create<PropertyStoreState>((set) => ({
  propertyId: null,
  setPropertyId: (id) => set({ propertyId: id }),
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
