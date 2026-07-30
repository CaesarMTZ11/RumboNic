import { LinearGradient } from "expo-linear-gradient";
import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

import {
    colors,
    radius,
    spacing,
    typography,
} from "@/src/theme";

type AppButtonProps = {
    label: string;
    onPress: () => void;
    loading?: boolean;
    disabled?: boolean;
    variant?: "primary" | "outlined" | "text";
};

export function AppButton({
    label,
    onPress,
    loading = false,
    disabled = false,
    variant = "primary",
}: AppButtonProps) {
    const isDisabled = disabled || loading;

    if (variant === "text") {
        return (
            <Pressable
                accessibilityRole="button"
                disabled={isDisabled}
                onPress={onPress}
                style={({ pressed }) => [
                    styles.textButton,
                    pressed && styles.pressed,
                    isDisabled && styles.disabled,
                ]}
            >
                <Text style={styles.textButtonLabel}>{label}</Text>
            </Pressable>
        );
    }

    if (variant === "outlined") {
        return (
            <Pressable
                accessibilityRole="button"
                disabled={isDisabled}
                onPress={onPress}
                style={({ pressed }) => [
                    styles.outlinedButton,
                    pressed && styles.pressed,
                    isDisabled && styles.disabled,
                ]}
            >
                {loading ? (
                    <ActivityIndicator color={colors.primary.forest} />
                ) : (
                    <Text style={styles.outlinedLabel}>{label}</Text>
                )}
            </Pressable>
        );
    }

    return (
        <Pressable
            accessibilityRole="button"
            disabled={isDisabled}
            onPress={onPress}
            style={({ pressed }) => [
                styles.primaryWrapper,
                pressed && styles.pressed,
                isDisabled && styles.disabled,
            ]}
        >
            <LinearGradient
                colors={[
                    colors.primary.forest,
                    colors.primary.medium,
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.primaryButton}
            >
                {loading ? (
                    <ActivityIndicator color={colors.text.inverse} />
                ) : (
                    <View style={styles.labelContainer}>
                        <Text style={styles.primaryLabel}>{label}</Text>
                    </View>
                )}
            </LinearGradient>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    primaryWrapper: {
        width: "100%",
        borderRadius: radius.full,
    },

    primaryButton: {
        minHeight: 52,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: spacing.xl,
        borderRadius: radius.full,
    },

    labelContainer: {
        alignItems: "center",
        justifyContent: "center",
    },

    primaryLabel: {
        ...typography.cardTitle,
        color: colors.text.inverse,
    },

    outlinedButton: {
        width: "100%",
        minHeight: 52,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: spacing.xl,
        borderWidth: 1,
        borderColor: colors.primary.forest,
        borderRadius: radius.full,
        backgroundColor: colors.surface,
    },

    outlinedLabel: {
        ...typography.cardTitle,
        color: colors.primary.forest,
    },

    textButton: {
        minHeight: 44,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: spacing.md,
    },

    textButtonLabel: {
        ...typography.cardTitle,
        color: colors.primary.forest,
    },

    pressed: {
        opacity: 0.82,
    },

    disabled: {
        opacity: 0.5,
    },
});