import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text } from "react-native";

import {
    AppButton,
    ScreenContainer,
} from "@/src/components/common";
import {
    colors,
    spacing,
    typography,
} from "@/src/theme";

export default function PlaceDetailScreen() {
    const { id } = useLocalSearchParams<{
        id: string;
    }>();

    return (
        <ScreenContainer
            contentContainerStyle={styles.container}
        >
            <Text style={styles.title}>
                Detalle del lugar
            </Text>

            <Text style={styles.description}>
                Identificador seleccionado: {id}
            </Text>

            <AppButton
                label="Volver"
                variant="outlined"
                onPress={() => router.back()}
            />
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: spacing.lg,
    },

    title: {
        ...typography.h1,
        color: colors.text.primary,
    },

    description: {
        ...typography.body,
        color: colors.text.secondary,
    },
});