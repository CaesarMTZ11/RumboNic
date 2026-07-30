import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
    StyleSheet,
    Text,
    View,
} from "react-native";

import {
    AppButton,
    ScreenContainer,
} from "@/src/components/common";
import { useRoutePlannerStore } from "@/src/features/route-planner/store/useRoutePlannerStore";
import {
    colors,
    radius,
    spacing,
    typography,
} from "@/src/theme";

const durationLabels = {
    "half-day": "Medio día",
    "one-day": "Un día",
    weekend: "Fin de semana",
    "several-days": "Varios días",
};

const companionLabels = {
    solo: "Solo",
    couple: "Pareja",
    family: "Familia",
    friends: "Amigos",
};

export default function RouteResultScreen() {
    const preferences = useRoutePlannerStore(
        (state) => state.preferences,
    );

    if (!preferences) {
        return (
            <ScreenContainer
                contentContainerStyle={styles.emptyContainer}
            >
                <Ionicons
                    name="map-outline"
                    size={54}
                    color={colors.primary.forest}
                />

                <Text style={styles.title}>
                    Aún no has generado una ruta
                </Text>

                <AppButton
                    label="Crear una ruta"
                    onPress={() =>
                        router.replace("/route-generator")
                    }
                />
            </ScreenContainer>
        );
    }

    return (
        <ScreenContainer
            contentContainerStyle={styles.container}
        >
            <View style={styles.successIcon}>
                <Ionicons
                    name="sparkles"
                    size={28}
                    color={colors.warning}
                />
            </View>

            <Text style={styles.eyebrow}>
                RUTA CREADA CON IA
            </Text>

            <Text style={styles.title}>
                Tu aventura está casi lista
            </Text>

            <Text style={styles.description}>
                Esta pantalla provisional confirma que las
                preferencias se guardaron correctamente.
            </Text>

            <View style={styles.summaryCard}>
                <SummaryRow
                    icon="location-outline"
                    label="Origen"
                    value={preferences.originLabel}
                />

                <SummaryRow
                    icon="time-outline"
                    label="Duración"
                    value={durationLabels[preferences.duration]}
                />

                <SummaryRow
                    icon="cash-outline"
                    label="Presupuesto"
                    value={`C$ ${preferences.budget.toLocaleString(
                        "es-NI",
                    )}`}
                />

                <SummaryRow
                    icon="people-outline"
                    label="Viajeros"
                    value={`${preferences.people} · ${companionLabels[preferences.companion]
                        }`}
                />

                <SummaryRow
                    icon="heart-outline"
                    label="Intereses"
                    value={preferences.interests.join(", ")}
                    showDivider={false}
                />
            </View>

            <AppButton
                label="Editar preferencias"
                variant="outlined"
                onPress={() => router.back()}
            />

            <AppButton
                label="Volver al inicio"
                variant="text"
                onPress={() => router.replace("/home")}
            />
        </ScreenContainer>
    );
}

type SummaryRowProps = {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    value: string;
    showDivider?: boolean;
};

function SummaryRow({
    icon,
    label,
    value,
    showDivider = true,
}: SummaryRowProps) {
    return (
        <View
            style={[
                styles.summaryRow,
                showDivider && styles.summaryDivider,
            ]}
        >
            <View style={styles.summaryIcon}>
                <Ionicons
                    name={icon}
                    size={19}
                    color={colors.primary.forest}
                />
            </View>

            <View style={styles.summaryContent}>
                <Text style={styles.summaryLabel}>{label}</Text>
                <Text style={styles.summaryValue}>{value}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "stretch",
        gap: spacing.lg,
    },

    emptyContainer: {
        alignItems: "center",
        justifyContent: "center",
        gap: spacing.xl,
    },

    successIcon: {
        width: 58,
        height: 58,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radius.full,
        backgroundColor: colors.primary.forest,
    },

    eyebrow: {
        ...typography.label,
        color: colors.primary.forest,
        textAlign: "center",
    },

    title: {
        ...typography.h1,
        color: colors.text.primary,
        textAlign: "center",
    },

    description: {
        ...typography.body,
        color: colors.text.secondary,
        textAlign: "center",
    },

    summaryCard: {
        paddingHorizontal: spacing.lg,
        borderWidth: 1,
        borderColor: colors.outline,
        borderRadius: radius.large,
        backgroundColor: colors.surface,
    },

    summaryRow: {
        flexDirection: "row",
        gap: spacing.md,
        paddingVertical: spacing.lg,
    },

    summaryDivider: {
        borderBottomWidth: 1,
        borderBottomColor: colors.divider,
    },

    summaryIcon: {
        width: 38,
        height: 38,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radius.medium,
        backgroundColor: colors.sand,
    },

    summaryContent: {
        flex: 1,
    },

    summaryLabel: {
        ...typography.bodySmall,
        color: colors.text.secondary,
    },

    summaryValue: {
        ...typography.cardTitle,
        marginTop: spacing.xs,
        color: colors.text.primary,
    },
});