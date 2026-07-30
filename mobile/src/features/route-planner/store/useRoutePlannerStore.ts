import { create } from "zustand";

import { RoutePreferences } from "@/src/features/route-planner/types/routePlannerTypes";

type RoutePlannerState = {
    preferences: RoutePreferences | null;
    setPreferences: (preferences: RoutePreferences) => void;
    clearPreferences: () => void;
};

export const useRoutePlannerStore = create<RoutePlannerState>(
    (set) => ({
        preferences: null,

        setPreferences: (preferences) => {
            set({ preferences });
        },

        clearPreferences: () => {
            set({ preferences: null });
        },
    }),
);