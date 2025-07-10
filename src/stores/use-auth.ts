import { create } from "zustand";

type LoginType = "email" | "phone";

interface AuthState {
  loginIdentifier: string;
  loginType: LoginType;
  setLoginIdentifier: (loginIdentifier: string) => void;
  setLoginType: (loginType: LoginType) => void;
}

export const useAuth = create<AuthState>()((set, _get) => ({
  loginIdentifier: "",
  loginType: "email",
  setLoginIdentifier: (loginIdentifier) => set({ loginIdentifier }),
  setLoginType: (loginType) => set({ loginType }),
}));
