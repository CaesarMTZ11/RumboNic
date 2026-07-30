import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import {
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

type IoniconName = ComponentProps<typeof Ionicons>["name"];

type SelectionChipProps = {
    label: string;
    icon?: IoniconName;
    selected: boolean;
    onPress: () => void;
};

export function SelectionChip({
    label,
    icon,
    selected,
    onPress,
}: SelectionChipProps) {
    return (
        <Pressable
            accessibilityRole="checkbox"
            accessibilityState={{ checked: selected }}
            onPress={onPress}
            style={({ pressed }) => [
                styles.chip,
                selected && styles.chipSelected,
                pressed && styles.pressed,
            ]}
        >
            {icon ? (
                <Ionicons
                    name={icon}
                    size={18}
                    color={
                        selected
                            ? colors.text.inverse
                            : colors.primary.forest
                    }
                />
            ) : null}

            <Text
                style={[
                    styles.chipText,
                    selected && styles.chipTextSelected,
                ]}
            >
                {label}
            </Text>
        </Pressable>
    );
}

type OptionCardProps = {
    label: string;
    description?: string;
    icon: IoniconName;
    selected: boolean;
    onPress: () => void;
};

export function OptionCard({
    label,
    description,
    icon,
    selected,
    onPress,
}: OptionCardProps) {
    return (
        <Pressable
            accessibilityRole="radio"
            accessibilityState={{ checked: selected }}
            onPress={onPress}
            style={({ pressed }) => [
                styles.optionCard,
                selected && styles.optionCardSelected,
                pressed && styles.pressed,
            ]}
        >
            <View
                style={[
                    styles.optionIcon,
                    selected && styles.optionIconSelected,
                ]}
            >
                <Ionicons
                    name={icon}
                    size={22}
                    color={
                        selected
                            ? colors.text.inverse
                            : colors.primary.forest
                    }
                />
            </View>

            <View style={styles.optionContent}>
                <Text
                    style={[
                        styles.optionLabel,
                        selected && styles.optionLabelSelected,
                    ]}
                >
                    {label}
                </Text>

                {description ? (
                    <Text
                        style={[
                            styles.optionDescription,
                            selected && styles.optionDescriptionSelected,
                        ]}
                    >
                        {description}
                    </Text>
                ) : null}
            </View>

            <Ionicons
                name={
                    selected
                        ? "radio-button-on"
                        : "radio-button-off"
                }
                size={21}
                color={
                    selected
                        ? colors.primary.forest
                        : colors.text.secondary
                }
            />
        </Pressable>
    );
}

type PeopleStepperProps = {
    value: number;
    onChange: (value: number) => void;
};

export function PeopleStepper({
    value,
    onChange,
}: PeopleStepperProps) {
    return (
        <View style={styles.stepper}>
            <Pressable
                accessibilityRole="button"
                accessibilityLabel="Reducir cantidad de personas"
                disabled={value <= 1}
                onPress={() => onChange(Math.max(1, value - 1))}
                style={({ pressed }) => [
                    styles.stepperButton,
                    value <= 1 && styles.disabled,
                    pressed && styles.pressed,
                ]}
            >
                <Ionicons
                    name="remove"
                    size={22}
                    color={colors.primary.forest}
                />
            </Pressable>

            <View style={styles.stepperValueContainer}>
                <Text style={styles.stepperValue}>{value}</Text>

                <Text style={styles.stepperLabel}>
                    {value === 1 ? "persona" : "personas"}
                </Text>
            </View>

            <Pressable
                accessibilityRole="button"
                accessibilityLabel="Aumentar cantidad de personas"
                disabled={value >= 10}
                onPress={() => onChange(Math.min(10, value + 1))}
                style={({ pressed }) => [
                    styles.stepperButton,
                    value >= 10 && styles.disabled,
                    pressed && styles.pressed,
                ]}
            >
                <Ionicons
                    name="add"
                    size={22}
                    color={colors.primary.forest}
                />
            </Pressable>
        </View>
    );
}

type FormSectionProps = {
    number: number;
    title: string;
    description?: string;
    children: React.ReactNode;
};

export function FormSection({
    number,
    title,
    description,
    children,
}: FormSectionProps) {
    return (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <View style={styles.sectionNumber}>
                    <Text style={styles.sectionNumberText}>
                        {number}
                    </Text>
                </View>

                <View style={styles.sectionTitleContainer}>
                    <Text style={styles.sectionTitle}>{title}</Text>

                    {description ? (
                        <Text style={styles.sectionDescription}>
                            {description}
                        </Text>
                    ) : null}
                </View>
            </View>

            <View style={styles.sectionContent}>
                {children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.82,
    },

    disabled: {
        opacity: 0.4,
    },

    chip: {
        minHeight: 44,
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderWidth: 1,
        borderColor: colors.outline,
        borderRadius: radius.full,
        backgroundColor: colors.surface,
    },

    chipSelected: {
        borderColor: colors.primary.forest,
        backgroundColor: colors.primary.forest,
    },

    chipText: {
        ...typography.bodySmall,
        fontFamily: typography.cardTitle.fontFamily,
        color: colors.text.primary,
    },

    chipTextSelected: {
        color: colors.text.inverse,
    },

    optionCard: {
        minHeight: 76,
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.md,
        padding: spacing.md,
        borderWidth: 1,
        borderColor: colors.outline,
        borderRadius: radius.large,
        backgroundColor: colors.surface,
    },

    optionCardSelected: {
        borderColor: colors.primary.forest,
        backgroundColor: "#EDF6F0",
    },

    optionIcon: {
        width: 44,
        height: 44,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radius.medium,
        backgroundColor: colors.sand,
    },

    optionIconSelected: {
        backgroundColor: colors.primary.forest,
    },

    optionContent: {
        flex: 1,
    },

    optionLabel: {
        ...typography.cardTitle,
        color: colors.text.primary,
    },

    optionLabelSelected: {
        color: colors.primary.forest,
    },

    optionDescription: {
        ...typography.bodySmall,
        marginTop: spacing.xs,
        color: colors.text.secondary,
    },

    optionDescriptionSelected: {
        color: colors.primary.forest,
    },

    stepper: {
        minHeight: 64,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: spacing.sm,
        borderWidth: 1,
        borderColor: colors.outline,
        borderRadius: radius.large,
        backgroundColor: colors.surface,
    },

    stepperButton: {
        width: 44,
        height: 44,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radius.full,
        backgroundColor: colors.sand,
    },

    stepperValueContainer: {
        alignItems: "center",
    },

    stepperValue: {
        ...typography.h2,
        color: colors.text.primary,
    },

    stepperLabel: {
        ...typography.bodySmall,
        color: colors.text.secondary,
    },

    section: {
        marginBottom: spacing.xl,
    },

    sectionHeader: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: spacing.md,
        marginBottom: spacing.md,
    },

    sectionNumber: {
        width: 30,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radius.full,
        backgroundColor: colors.primary.forest,
    },

    sectionNumberText: {
        ...typography.label,
        color: colors.text.inverse,
    },

    sectionTitleContainer: {
        flex: 1,
    },

    sectionTitle: {
        ...typography.h2,
        color: colors.text.primary,
    },

    sectionDescription: {
        ...typography.bodySmall,
        marginTop: spacing.xs,
        color: colors.text.secondary,
    },

    sectionContent: {
        marginLeft: 42,
    },
});