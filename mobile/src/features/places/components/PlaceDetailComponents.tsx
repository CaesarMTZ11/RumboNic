import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { ReactNode } from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

import {
    PlaceExperiencePreview,
    PlaceSchedule,
} from "@/src/features/places/types/placeTypes";
import { formatExperienceDate } from "@/src/features/places/utils/placeUtils";
import {
    colors,
    radius,
    spacing,
    typography,
} from "@/src/theme";

type DetailSectionProps = {
    title: string;
    subtitle?: string;
    children: ReactNode;
};

export function DetailSection({
    title,
    subtitle,
    children,
}: DetailSectionProps) {
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>
                {title}
            </Text>

            {subtitle ? (
                <Text style={styles.sectionSubtitle}>
                    {subtitle}
                </Text>
            ) : null}

            <View style={styles.sectionContent}>
                {children}
            </View>
        </View>
    );
}

type PlaceMetricProps = {
    icon: keyof typeof Ionicons.glyphMap;
    value: string;
    label: string;
};

export function PlaceMetric({
    icon,
    value,
    label,
}: PlaceMetricProps) {
    return (
        <View style={styles.metric}>
            <View style={styles.metricIcon}>
                <Ionicons
                    name={icon}
                    size={20}
                    color={colors.primary.forest}
                />
            </View>

            <Text style={styles.metricValue}>
                {value}
            </Text>

            <Text style={styles.metricLabel}>
                {label}
            </Text>
        </View>
    );
}

type FeatureItemProps = {
    icon: keyof typeof Ionicons.glyphMap;
    text: string;
};

export function FeatureItem({
    icon,
    text,
}: FeatureItemProps) {
    return (
        <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
                <Ionicons
                    name={icon}
                    size={18}
                    color={colors.primary.forest}
                />
            </View>

            <Text style={styles.featureText}>
                {text}
            </Text>
        </View>
    );
}

type PlaceScheduleCardProps = {
    schedules: PlaceSchedule[];
    currentDayNumber: number;
};

export function PlaceScheduleCard({
    schedules,
    currentDayNumber,
}: PlaceScheduleCardProps) {
    return (
        <View style={styles.scheduleCard}>
            {schedules.map((schedule, index) => {
                const isToday =
                    schedule.dayNumber ===
                    currentDayNumber;

                let scheduleText = "Cerrado";

                if (schedule.isOpen24Hours) {
                    scheduleText = "Abierto 24 horas";
                } else if (
                    !schedule.isClosed &&
                    schedule.opensAt &&
                    schedule.closesAt
                ) {
                    scheduleText =
                        `${schedule.opensAt} – ` +
                        `${schedule.closesAt}`;
                }

                return (
                    <View
                        key={schedule.dayNumber}
                        style={[
                            styles.scheduleRow,
                            index <
                            schedules.length - 1 &&
                            styles.scheduleDivider,
                            isToday &&
                            styles.scheduleRowToday,
                        ]}
                    >
                        <View style={styles.scheduleDay}>
                            <Text
                                style={[
                                    styles.scheduleDayText,
                                    isToday &&
                                    styles.scheduleTodayText,
                                ]}
                            >
                                {schedule.dayName}
                            </Text>

                            {isToday ? (
                                <View style={styles.todayBadge}>
                                    <Text
                                        style={styles.todayBadgeText}
                                    >
                                        Hoy
                                    </Text>
                                </View>
                            ) : null}
                        </View>

                        <Text
                            style={[
                                styles.scheduleHours,
                                schedule.isClosed &&
                                styles.closedText,
                            ]}
                        >
                            {scheduleText}
                        </Text>
                    </View>
                );
            })}
        </View>
    );
}

type ContactActionProps = {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    value: string;
    onPress: () => void;
};

export function ContactAction({
    icon,
    label,
    value,
    onPress,
}: ContactActionProps) {
    return (
        <Pressable
            accessibilityRole="button"
            onPress={onPress}
            style={({ pressed }) => [
                styles.contactAction,
                pressed && styles.pressed,
            ]}
        >
            <View style={styles.contactIcon}>
                <Ionicons
                    name={icon}
                    size={20}
                    color={colors.primary.forest}
                />
            </View>

            <View style={styles.contactContent}>
                <Text style={styles.contactLabel}>
                    {label}
                </Text>

                <Text
                    numberOfLines={1}
                    style={styles.contactValue}
                >
                    {value}
                </Text>
            </View>

            <Ionicons
                name="chevron-forward"
                size={19}
                color={colors.text.secondary}
            />
        </Pressable>
    );
}

type ExperienceCardProps = {
    experience: PlaceExperiencePreview;
};

export function ExperienceCard({
    experience,
}: ExperienceCardProps) {
    return (
        <View style={styles.experienceCard}>
            <View style={styles.experienceHeader}>
                {experience.userAvatarUrl ? (
                    <Image
                        source={{
                            uri: experience.userAvatarUrl,
                        }}
                        contentFit="cover"
                        style={styles.avatar}
                    />
                ) : (
                    <View style={styles.avatarFallback}>
                        <Text style={styles.avatarLetter}>
                            {experience.userName
                                .charAt(0)
                                .toUpperCase()}
                        </Text>
                    </View>
                )}

                <View style={styles.experienceUser}>
                    <Text style={styles.userName}>
                        {experience.userName}
                    </Text>

                    <Text style={styles.experienceDate}>
                        {formatExperienceDate(
                            experience.publishedAt,
                        )}
                    </Text>
                </View>

                <View style={styles.ratingContainer}>
                    <Ionicons
                        name="star"
                        size={16}
                        color={colors.warning}
                    />

                    <Text style={styles.ratingText}>
                        {experience.rating}
                    </Text>
                </View>
            </View>

            <Text style={styles.experienceDescription}>
                {experience.description}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.82,
    },

    section: {
        marginTop: spacing.xl,
    },

    sectionTitle: {
        ...typography.h2,
        color: colors.text.primary,
    },

    sectionSubtitle: {
        ...typography.bodySmall,
        marginTop: spacing.xs,
        color: colors.text.secondary,
    },

    sectionContent: {
        marginTop: spacing.md,
    },

    metric: {
        flex: 1,
        minHeight: 108,
        alignItems: "center",
        justifyContent: "center",
        padding: spacing.sm,
        borderWidth: 1,
        borderColor: colors.outline,
        borderRadius: radius.large,
        backgroundColor: colors.surface,
    },

    metricIcon: {
        width: 38,
        height: 38,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: spacing.sm,
        borderRadius: radius.medium,
        backgroundColor: colors.sand,
    },

    metricValue: {
        ...typography.cardTitle,
        color: colors.text.primary,
        textAlign: "center",
    },

    metricLabel: {
        ...typography.bodySmall,
        marginTop: spacing.xs,
        color: colors.text.secondary,
        textAlign: "center",
    },

    featureItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.md,
        padding: spacing.md,
        borderWidth: 1,
        borderColor: colors.outline,
        borderRadius: radius.medium,
        backgroundColor: colors.surface,
    },

    featureIcon: {
        width: 38,
        height: 38,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radius.medium,
        backgroundColor: colors.sand,
    },

    featureText: {
        ...typography.body,
        flex: 1,
        color: colors.text.primary,
    },

    scheduleCard: {
        overflow: "hidden",
        borderWidth: 1,
        borderColor: colors.outline,
        borderRadius: radius.large,
        backgroundColor: colors.surface,
    },

    scheduleRow: {
        minHeight: 52,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: spacing.md,
        paddingHorizontal: spacing.lg,
    },

    scheduleDivider: {
        borderBottomWidth: 1,
        borderBottomColor: colors.divider,
    },

    scheduleRowToday: {
        backgroundColor: "#EDF6F0",
    },

    scheduleDay: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
    },

    scheduleDayText: {
        ...typography.body,
        color: colors.text.primary,
    },

    scheduleTodayText: {
        fontFamily: typography.cardTitle.fontFamily,
        color: colors.primary.forest,
    },

    todayBadge: {
        paddingHorizontal: spacing.sm,
        paddingVertical: 2,
        borderRadius: radius.full,
        backgroundColor: colors.primary.forest,
    },

    todayBadgeText: {
        ...typography.label,
        color: colors.text.inverse,
    },

    scheduleHours: {
        ...typography.bodySmall,
        color: colors.text.secondary,
    },

    closedText: {
        color: colors.error,
    },

    contactAction: {
        minHeight: 64,
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.md,
        paddingHorizontal: spacing.md,
        borderWidth: 1,
        borderColor: colors.outline,
        borderRadius: radius.medium,
        backgroundColor: colors.surface,
    },

    contactIcon: {
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radius.medium,
        backgroundColor: colors.sand,
    },

    contactContent: {
        flex: 1,
    },

    contactLabel: {
        ...typography.bodySmall,
        color: colors.text.secondary,
    },

    contactValue: {
        ...typography.cardTitle,
        marginTop: 2,
        color: colors.text.primary,
    },

    experienceCard: {
        padding: spacing.lg,
        borderWidth: 1,
        borderColor: colors.outline,
        borderRadius: radius.large,
        backgroundColor: colors.surface,
    },

    experienceHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.md,
    },

    avatar: {
        width: 44,
        height: 44,
        borderRadius: radius.full,
    },

    avatarFallback: {
        width: 44,
        height: 44,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radius.full,
        backgroundColor: colors.primary.forest,
    },

    avatarLetter: {
        ...typography.h2,
        color: colors.text.inverse,
    },

    experienceUser: {
        flex: 1,
    },

    userName: {
        ...typography.cardTitle,
        color: colors.text.primary,
    },

    experienceDate: {
        ...typography.bodySmall,
        marginTop: 2,
        color: colors.text.secondary,
    },

    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
    },

    ratingText: {
        ...typography.cardTitle,
        color: colors.text.primary,
    },

    experienceDescription: {
        ...typography.body,
        marginTop: spacing.md,
        color: colors.text.secondary,
    },
});