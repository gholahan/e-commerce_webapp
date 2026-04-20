import { toast } from 'react-toastify';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type FavoritesStore = {
  favorites: number[];
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
};

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],

     addFavorite:(id) => (set((state)=>{
      toast.info('Added product to favorite')
      return {favorites: [...state.favorites, id ]}
    })),

     removeFavorite: (id) => set((state)=>{
      toast.info('Product removed from favourites')
       return {favorites: state.favorites.filter(ids => ids !== id)}
      }),

      isFavorite: (id) =>
        get().favorites.includes(id),
    }),
    {
      name: 'favorites-storage', // 👈 localStorage key
    }
  )
);
