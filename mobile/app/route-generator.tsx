import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";

import { ScreenContainer } from "@/src/components/common";
import {
    colors,
    radius,
    spacing,
    typography,
} from "@/src/theme";

export default function RouteGeneratorScreen() {
    return (
        <ScreenContainer>
            <Pressable
                onPress={() => router.back()}
                style={styles.backButton}
            >
                <Ionicons
                    name="arrow-back"
                    size={24}
                    color={colors.text.primary}
                />
            </Pressable>

            <Text style={styles.title}>
                Generador inteligente de rutas
            </Text>

            <Text style={styles.description}>
                Esta será la siguiente función principal que
                implementaremos.
            </Text>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    backButton: {
        width: 44,
        height: 44,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: spacing.lg,
        borderRadius: radius.full,
    },

    title: {
        ...typography.h1,
        color: colors.text.primary,
    },

    description: {
        ...typography.body,
        marginTop: spacing.sm,
        color: colors.text.secondary,
    },
});