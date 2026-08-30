import { create } from "zustand";

import { GeneratedRoute } from "@/src/features/route-planner/types/generatedRouteTypes";

type SavedRoutesState = {
    savedRoutes: GeneratedRoute[];

    saveRoute: (
        route: GeneratedRoute,
    ) => void;

    removeRoute: (
        routeId: string,
    ) => void;

    toggleSavedRoute: (
        route: GeneratedRoute,
    ) => void;

    clearSavedRoutes: () => void;
};

export const useSavedRoutesStore =
    create<SavedRoutesState>((set) => ({
        savedRoutes: [],

        saveRoute: (route) => {
            set((state) => {
                const alreadySaved =
                    state.savedRoutes.some(
                        (savedRoute) =>
                            savedRoute.id === route.id,
                    );

                if (alreadySaved) {
                    return state;
                }

                return {
                    savedRoutes: [
                        route,
                        ...state.savedRoutes,
                    ],
                };
            });
        },

        removeRoute: (routeId) => {
            set((state) => ({
                savedRoutes:
                    state.savedRoutes.filter(
                        (route) =>
                            route.id !== routeId,
                    ),
            }));
        },

        toggleSavedRoute: (route) => {
            set((state) => {
                const alreadySaved =
                    state.savedRoutes.some(
                        (savedRoute) =>
                            savedRoute.id === route.id,
                    );

                return {
                    savedRoutes: alreadySaved
                        ? state.savedRoutes.filter(
                            (savedRoute) =>
                                savedRoute.id !==
                                route.id,
                        )
                        : [
                            route,
                            ...state.savedRoutes,
                        ],
                };
            });
        },

        clearSavedRoutes: () => {
            set({
                savedRoutes: [],
            });
        },
    }));