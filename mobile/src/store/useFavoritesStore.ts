import { create } from "zustand";

type FavoritesState = {
    favoriteIds: string[];

    toggleFavorite: (
        placeId: string,
    ) => void;

    clearFavorites: () => void;
};

export const useFavoritesStore =
    create<FavoritesState>((set) => ({
        favoriteIds: ["laguna-apoyo"],

        toggleFavorite: (placeId) => {
            set((state) => {
                const exists =
                    state.favoriteIds.includes(placeId);

                return {
                    favoriteIds: exists
                        ? state.favoriteIds.filter(
                            (id) => id !== placeId,
                        )
                        : [
                            ...state.favoriteIds,
                            placeId,
                        ],
                };
            });
        },

        clearFavorites: () => {
            set({
                favoriteIds: [],
            });
        },
    }));