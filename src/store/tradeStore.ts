import { create } from "zustand";

interface PropertyStoreState {
  propertyId: string | null;
  setPropertyId: (id: string | null) => void;
}

const usePropertyStore = create<PropertyStoreState>((set) => ({
  propertyId: null,
  setPropertyId: (id) => set({ propertyId: id }),
}));

export default usePropertyStore;
