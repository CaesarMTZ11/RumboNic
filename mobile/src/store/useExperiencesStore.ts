import { create } from "zustand";

import { SharedExperience } from "@/src/features/experiences/types/experienceTypes";

type ExperiencesState = {
  experiences: SharedExperience[];

  addExperience: (
    experience: SharedExperience,
  ) => void;

  clearExperiences: () => void;
};

export const useExperiencesStore =
  create<ExperiencesState>((set) => ({
    experiences: [],

    addExperience: (experience) => {
      set((state) => ({
        experiences: [
          experience,
          ...state.experiences,
        ],
      }));
    },

    clearExperiences: () => {
      set({
        experiences: [],
      });
    },
  }));