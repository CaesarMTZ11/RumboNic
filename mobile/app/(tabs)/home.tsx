import { StyleSheet, Text, View } from "react-native";

import { ScreenContainer } from "@/src/components/common";
import {
    colors,
    radius,
    spacing,
    typography,
} from "@/src/theme";

export default function HomeScreen() {
    return (
        <ScreenContainer>
            <Text style={styles.greeting}>Hola, Mario 👋</Text>

            <Text style={styles.title}>
                ¿Qué aventura quieres vivir hoy?
            </Text>

            <View style={styles.aiCard}>
                <Text style={styles.aiLabel}>
                    RUTA INTELIGENTE
                </Text>

                <Text style={styles.aiTitle}>
                    Planifica tu próximo viaje con IA
                </Text>

                <Text style={styles.aiDescription}>
                    Genera un itinerario personalizado según tu
                    presupuesto, ubicación e intereses.
                </Text>
            </View>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    greeting: {
        ...typography.body,
        color: colors.text.secondary,
    },

    title: {
        ...typography.h1,
        marginTop: spacing.xs,
        marginBottom: spacing.xl,
        color: colors.text.primary,
    },

    aiCard: {
        padding: spacing.xl,
        borderRadius: radius.large,
        backgroundColor: colors.primary.forest,
    },

    aiLabel: {
        ...typography.label,
        color: colors.warning,
    },

    aiTitle: {
        ...typography.h2,
        marginTop: spacing.sm,
        color: colors.text.inverse,
    },

    aiDescription: {
        ...typography.body,
        marginTop: spacing.sm,
        color: colors.text.inverse,
    },
});