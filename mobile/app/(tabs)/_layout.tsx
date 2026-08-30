import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

import {
  colors,
  typography,
} from "@/src/theme";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor:
          colors.primary.forest,

        tabBarInactiveTintColor:
          colors.text.secondary,

        tabBarHideOnKeyboard: true,

        tabBarStyle: {
          height: 72,
          paddingTop: 8,
          paddingBottom: 10,

          backgroundColor:
            colors.surface,

          borderTopWidth: 1,
          borderTopColor:
            colors.divider,
        },

        tabBarLabelStyle: {
          fontFamily:
            typography.label.fontFamily,
          fontSize: 11,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Inicio",

          tabBarIcon: ({
            color,
            size,
            focused,
          }) => (
            <Ionicons
              name={
                focused
                  ? "home"
                  : "home-outline"
              }
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: "Explorar",

          tabBarIcon: ({
            color,
            size,
            focused,
          }) => (
            <Ionicons
              name={
                focused
                  ? "compass"
                  : "compass-outline"
              }
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="experiences"
        options={{
          title: "Experiencias",

          tabBarIcon: ({
            color,
            size,
            focused,
          }) => (
            <Ionicons
              name={
                focused
                  ? "images"
                  : "images-outline"
              }
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",

          tabBarIcon: ({
            color,
            size,
            focused,
          }) => (
            <Ionicons
              name={
                focused
                  ? "person"
                  : "person-outline"
              }
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}