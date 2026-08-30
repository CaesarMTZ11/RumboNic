import { create } from "zustand";

import {
  ProfilePreferences,
  UserProfile,
} from "@/src/features/profile/types/profileTypes";

const initialProfile: UserProfile = {
  fullName: "Mario Martínez",
  email: "mario.demo@rumbonic.com",
  avatarUri: null,
  municipality: "Managua",
  department: "Managua",
  memberSince: "2026-07-01T00:00:00.000Z",
};

const initialPreferences: ProfilePreferences = {
  notificationsEnabled: true,
  routeRemindersEnabled: true,
  sustainableSuggestionsEnabled: true,
  locationSuggestionsEnabled: true,
};

type ProfileState = {
  profile: UserProfile;
  preferences: ProfilePreferences;

  updateProfile: (
    changes: Partial<UserProfile>,
  ) => void;

  setPreference: <
    Key extends keyof ProfilePreferences,
  >(
    key: Key,
    value: ProfilePreferences[Key],
  ) => void;

  resetProfile: () => void;
};

export const useProfileStore =
  create<ProfileState>((set) => ({
    profile: initialProfile,
    preferences: initialPreferences,

    updateProfile: (changes) => {
      set((state) => ({
        profile: {
          ...state.profile,
          ...changes,
        },
      }));
    },

    setPreference: (key, value) => {
      set((state) => ({
        preferences: {
          ...state.preferences,
          [key]: value,
        },
      }));
    },

    resetProfile: () => {
      set({
        profile: initialProfile,
        preferences: initialPreferences,
      });
    },
  }));