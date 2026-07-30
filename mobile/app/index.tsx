import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing, typography } from "@/src/theme";

export default function WelcomeScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.brand}>RumboNic</Text>

            <Text style={styles.title}>Turismo inteligente para Nicaragua</Text>

            <Text style={styles.description}>
                Descubre destinos, genera rutas personalizadas y comparte experiencias
                auténticas.
            </Text>

            <Pressable
                accessibilityRole="button"
                style={({ pressed }) => [
                    styles.button,
                    pressed && styles.buttonPressed,
                ]}
            onPress={() => router.push("/login")}
            >
                <Text style={styles.buttonText}>Comenzar</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: spacing.lg,
        backgroundColor: colors.background,
    },

    brand: {
        ...typography.display,
        color: colors.primary.forest,
        marginBottom: spacing.md,
    },

    title: {
        ...typography.h1,
        color: colors.text.primary,
        marginBottom: spacing.md,
    },

    description: {
        ...typography.body,
        color: colors.text.secondary,
        marginBottom: spacing.xl,
    },

    button: {
        minHeight: 48,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: spacing.xl,
        borderRadius: radius.full,
        backgroundColor: colors.primary.forest,
    },

    buttonPressed: {
        opacity: 0.85,
    },

    buttonText: {
        ...typography.cardTitle,
        color: colors.text.inverse,
    },
});
