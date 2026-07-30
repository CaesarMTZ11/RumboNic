import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";

import {
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    useFonts as usePoppinsFonts,
} from "@expo-google-fonts/poppins";

import {
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    useFonts as useInterFonts,
} from "@expo-google-fonts/inter";

import { AppProviders } from "@/src/providers/AppProviders";
import { colors } from "@/src/theme";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [poppinsLoaded, poppinsError] = usePoppinsFonts({
        Poppins_400Regular,
        Poppins_600SemiBold,
        Poppins_700Bold,
        Poppins_800ExtraBold,
    });

    const [interLoaded, interError] = useInterFonts({
        Inter_400Regular,
        Inter_500Medium,
        Inter_600SemiBold,
    });

    const fontsLoaded = poppinsLoaded && interLoaded;
    const fontError = poppinsError || interError;

    useEffect(() => {
        if (fontsLoaded || fontError) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <AppProviders>
            <StatusBar style="dark" />

            <Stack
                screenOptions={{
                    headerShown: false,
                    contentStyle: {
                        backgroundColor: colors.background,
                    },
                }}
            />
        </AppProviders>
    );
}