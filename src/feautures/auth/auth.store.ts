import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Authstore {
    accessToken: string |null;
    refreshToken: string |null;
    setTokens: (accessToken :string | null, refreshToken :string | null )=>void;
    logout:() => void;
}

export const useAuthStore = create<Authstore>()(
persist((set) => ({
   accessToken: null,
   refreshToken: null,
   setTokens: (accessToken, refreshToken) => set({ accessToken: accessToken, refreshToken:refreshToken }),
   logout: () => set({accessToken:null, refreshToken:null})
}),{
    name: 'refreshToken',
    partialize: (state) => ({ refreshToken: state.refreshToken })
   }
 )
);