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
                tabBarActiveTintColor: colors.primary.forest,
                tabBarInactiveTintColor: colors.text.secondary,
                tabBarStyle: {
                    height: 68,
                    paddingTop: 8,
                    paddingBottom: 8,
                    borderTopColor: colors.divider,
                    backgroundColor: colors.surface,
                },
                tabBarLabelStyle: {
                    fontFamily: typography.label.fontFamily,
                    fontSize: 11,
                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: "Inicio",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="home-outline"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="explore"
                options={{
                    title: "Explorar",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="compass-outline"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="experiences"
                options={{
                    title: "Experiencias",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="images-outline"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: "Perfil",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="person-outline"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}