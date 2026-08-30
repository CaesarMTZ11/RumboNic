export type UserProfile = {
  fullName: string;
  email: string;
  avatarUri: string | null;
  municipality: string;
  department: string;
  memberSince: string;
};

export type ProfilePreferences = {
  notificationsEnabled: boolean;
  routeRemindersEnabled: boolean;
  sustainableSuggestionsEnabled: boolean;
  locationSuggestionsEnabled: boolean;
};