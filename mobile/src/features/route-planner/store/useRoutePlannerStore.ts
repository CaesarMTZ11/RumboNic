import { create } from "zustand";

import { GeneratedRoute } from "@/src/features/route-planner/types/generatedRouteTypes";
import { RoutePreferences } from "@/src/features/route-planner/types/routePlannerTypes";

type RoutePlannerState = {
    preferences: RoutePreferences | null;
    generatedRoute: GeneratedRoute | null;
    isRouteSaved: boolean;

    setPreferences: (
        preferences: RoutePreferences,
    ) => void;

    setGeneratedRoute: (
        route: GeneratedRoute,
    ) => void;

    toggleRouteSaved: () => void;
    clearRoutePlanner: () => void;
};

export const useRoutePlannerStore =
    create<RoutePlannerState>((set) => ({
        preferences: null,
        generatedRoute: null,
        isRouteSaved: false,

        setPreferences: (preferences) => {
            set({ preferences });
        },

        setGeneratedRoute: (generatedRoute) => {
            set({
                generatedRoute,
                isRouteSaved: false,
            });
        },

        toggleRouteSaved: () => {
            set((state) => ({
                isRouteSaved: !state.isRouteSaved,
            }));
        },

        clearRoutePlanner: () => {
            set({
                preferences: null,
                generatedRoute: null,
                isRouteSaved: false,
            });
        },
    }));