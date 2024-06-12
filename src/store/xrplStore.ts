import { Client } from 'xrpl';
import { create } from 'zustand';

interface XrplClientStoreState {
  xrplClient: Client | null;
  setXrplClient: (client: Client) => void;
}

export const useXrplClientStore = create<XrplClientStoreState>((set) => ({
  xrplClient: null,
  setXrplClient: (client) => set({ xrplClient: client }),
}));
