/**
 * !Caution: Data in this store is persisted in localStorage
 * !Do NOT use this store for temporary data
 */

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AuthState = {
  token?: string;
};

type PersistState = {
  lang: string;
  auth: AuthState;
  setLang: (newLang: string) => void;
  setAuthToken: (data: Partial<AuthState>) => void;
  reset: () => void;
};

export const usePersistStore = create<PersistState>()(
  persist(
    (set, _get) => ({
      lang: "id",
      auth: { token: undefined },

      setLang: (newLang) => set({ lang: newLang }),

      setAuthToken: (data) =>
        set((state) => ({
          auth: {
            ...state.auth,
            data,
          },
        })),

      reset: () =>
        set({
          lang: "id",
          auth: { token: undefined },
        }),
    }),
    {
      name: "persist-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
