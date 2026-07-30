import { router } from "expo-router";
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

export default function RegisterScreen() {
    return (
        <ScreenContainer
            contentContainerStyle={styles.container}
        >
            <Text style={styles.title}>Crear cuenta</Text>

            <Text style={styles.description}>
                La pantalla completa de registro será el siguiente
                módulo que implementaremos.
            </Text>

            <AppButton
                label="Volver al inicio de sesión"
                variant="outlined"
                onPress={() => router.back()}
            />
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        gap: spacing.xl,
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