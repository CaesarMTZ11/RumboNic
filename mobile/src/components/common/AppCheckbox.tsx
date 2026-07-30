import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import {
    colors,
    radius,
    spacing,
    typography,
} from "@/src/theme";

type AppCheckboxProps = {
    checked: boolean;
    label: string;
    error?: string;
    onChange: (checked: boolean) => void;
    onPressLink?: () => void;
    linkLabel?: string;
};

export function AppCheckbox({
    checked,
    label,
    error,
    onChange,
    onPressLink,
    linkLabel,
}: AppCheckboxProps) {
    return (
        <View style={styles.container}>
            <Pressable
                accessibilityRole="checkbox"
                accessibilityState={{ checked }}
                accessibilityLabel={label}
                hitSlop={8}
                onPress={() => onChange(!checked)}
                style={styles.row}
            >
                <View
                    style={[
                        styles.checkbox,
                        checked && styles.checkboxChecked,
                        error && styles.checkboxError,
                    ]}
                >
                    {checked ? (
                        <Ionicons
                            name="checkmark"
                            size={16}
                            color={colors.text.inverse}
                        />
                    ) : null}
                </View>

                <Text style={styles.label}>
                    {label}{" "}
                    {linkLabel ? (
                        <Text
                            accessibilityRole="link"
                            onPress={onPressLink}
                            style={styles.link}
                        >
                            {linkLabel}
                        </Text>
                    ) : null}
                </Text>
            </Pressable>

            {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },

    row: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: spacing.sm,
    },

    checkbox: {
        width: 22,
        height: 22,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1.5,
        borderColor: colors.outline,
        borderRadius: radius.small,
        backgroundColor: colors.surface,
    },

    checkboxChecked: {
        borderColor: colors.primary.forest,
        backgroundColor: colors.primary.forest,
    },

    checkboxError: {
        borderColor: colors.error,
    },

    label: {
        ...typography.bodySmall,
        flex: 1,
        color: colors.text.secondary,
    },

    link: {
        color: colors.primary.forest,
        fontFamily: typography.cardTitle.fontFamily,
    },

    error: {
        ...typography.bodySmall,
        marginTop: spacing.xs,
        marginLeft: 30,
        color: colors.error,
    },
});