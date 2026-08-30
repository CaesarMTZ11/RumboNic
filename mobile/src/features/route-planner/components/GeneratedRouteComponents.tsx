import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { ComponentProps } from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { GeneratedRouteStop } from "@/src/features/route-planner/types/generatedRouteTypes";
import {
    formatCurrency,
    formatDuration,
} from "@/src/features/route-planner/utils/routeFormatters";
import {
    colors,
    radius,
    spacing,
    typography,
} from "@/src/theme";

type IoniconName =
    ComponentProps<typeof Ionicons>["name"];

type RouteMetricCardProps = {
    icon: IoniconName;
    label: string;
    value: string;
};

export function RouteMetricCard({
    icon,
    label,
    value,
}: RouteMetricCardProps) {
    return (
        <View style={styles.metricCard}>
            <View style={styles.metricIcon}>
                <Ionicons
                    name={icon}
                    size={20}
                    color={colors.primary.forest}
                />
            </View>

            <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                style={styles.metricValue}
            >
                {value}
            </Text>

            <Text style={styles.metricLabel}>
                {label}
            </Text>
        </View>
    );
}

type RouteOverviewProps = {
    origin: string;
    stops: GeneratedRouteStop[];
};

export function RouteOverview({
    origin,
    stops,
}: RouteOverviewProps) {
    return (
        <View style={styles.overviewCard}>
            <View style={styles.overviewRow}>
                <View style={styles.originDot}>
                    <Ionicons
                        name="navigate"
                        size={14}
                        color={colors.text.inverse}
                    />
                </View>

                <View style={styles.overviewContent}>
                    <Text style={styles.overviewLabel}>
                        Punto de partida
                    </Text>

                    <Text style={styles.overviewValue}>
                        {origin}
                    </Text>
                </View>
            </View>

            <View style={styles.overviewLine} />

            {stops.map((stop, index) => {
                const isLast = index === stops.length - 1;

                return (
                    <View key={stop.id}>
                        <View style={styles.overviewRow}>
                            <View style={styles.stopNumber}>
                                <Text style={styles.stopNumberText}>
                                    {stop.order}
                                </Text>
                            </View>

                            <View style={styles.overviewContent}>
                                <Text style={styles.overviewLabel}>
                                    {stop.startTime} ·{" "}
                                    {formatDuration(
                                        stop.durationMinutes,
                                    )}
                                </Text>

                                <Text style={styles.overviewValue}>
                                    {stop.name}
                                </Text>
                            </View>
                        </View>

                        {!isLast ? (
                            <View style={styles.overviewLine} />
                        ) : null}
                    </View>
                );
            })}
        </View>
    );
}

type ItineraryStopCardProps = {
    stop: GeneratedRouteStop;
    isLast: boolean;
    onPress: () => void;
};

export function ItineraryStopCard({
    stop,
    isLast,
    onPress,
}: ItineraryStopCardProps) {
    return (
        <View style={styles.timelineRow}>
            <View style={styles.timelineColumn}>
                <View style={styles.timelineNumber}>
                    <Text style={styles.timelineNumberText}>
                        {stop.order}
                    </Text>
                </View>

                {!isLast ? (
                    <View style={styles.timelineLine} />
                ) : null}
            </View>

            <Pressable
                accessibilityRole="button"
                onPress={onPress}
                style={({ pressed }) => [
                    styles.stopCard,
                    pressed && styles.pressed,
                ]}
            >
                <Image
                    source={{ uri: stop.imageUrl }}
                    contentFit="cover"
                    transition={250}
                    style={styles.stopImage}
                />

                <View style={styles.stopContent}>
                    <View style={styles.stopHeader}>
                        <View style={styles.timeBadge}>
                            <Ionicons
                                name="time-outline"
                                size={14}
                                color={colors.primary.forest}
                            />

                            <Text style={styles.timeBadgeText}>
                                {stop.startTime}
                            </Text>
                        </View>

                        <View style={styles.ratingContainer}>
                            <Ionicons
                                name="star"
                                size={14}
                                color={colors.warning}
                            />

                            <Text style={styles.ratingText}>
                                {stop.rating.toFixed(1)}
                            </Text>
                        </View>
                    </View>

                    <Text style={styles.stopName}>
                        {stop.name}
                    </Text>

                    <View style={styles.locationRow}>
                        <Ionicons
                            name="location-outline"
                            size={15}
                            color={colors.text.secondary}
                        />

                        <Text style={styles.locationText}>
                            {stop.municipality},{" "}
                            {stop.department}
                        </Text>
                    </View>

                    <Text style={styles.stopReason}>
                        {stop.reason}
                    </Text>

                    <View style={styles.activities}>
                        {stop.activities.map((activity) => (
                            <View
                                key={activity}
                                style={styles.activityChip}
                            >
                                <Text style={styles.activityText}>
                                    {activity}
                                </Text>
                            </View>
                        ))}
                    </View>

                    <View style={styles.stopFooter}>
                        <View style={styles.footerItem}>
                            <Ionicons
                                name="hourglass-outline"
                                size={15}
                                color={colors.text.secondary}
                            />

                            <Text style={styles.footerText}>
                                {formatDuration(
                                    stop.durationMinutes,
                                )}
                            </Text>
                        </View>

                        <View style={styles.footerItem}>
                            <Ionicons
                                name="cash-outline"
                                size={15}
                                color={colors.text.secondary}
                            />

                            <Text style={styles.footerText}>
                                {formatCurrency(
                                    stop.estimatedCost,
                                )}
                            </Text>
                        </View>

                        <View style={styles.footerItem}>
                            <Ionicons
                                name="navigate-outline"
                                size={15}
                                color={colors.text.secondary}
                            />

                            <Text style={styles.footerText}>
                                {stop.distanceFromPreviousKm.toFixed(
                                    1,
                                )}{" "}
                                km
                            </Text>
                        </View>
                    </View>
                </View>
            </Pressable>
        </View>
    );
}

type AITipCardProps = {
    tip: string;
};

export function AITipCard({
    tip,
}: AITipCardProps) {
    return (
        <View style={styles.aiTipCard}>
            <View style={styles.aiTipIcon}>
                <Ionicons
                    name="sparkles"
                    size={22}
                    color={colors.warning}
                />
            </View>

            <View style={styles.aiTipContent}>
                <Text style={styles.aiTipLabel}>
                    CONSEJO DE RUMBONIC IA
                </Text>

                <Text style={styles.aiTipText}>
                    {tip}
                </Text>
            </View>
        </View>
    );
}

type SustainabilityCardProps = {
    score: number;
};

export function SustainabilityCard({
    score,
}: SustainabilityCardProps) {
    return (
        <View style={styles.sustainabilityCard}>
            <View style={styles.sustainabilityHeader}>
                <View style={styles.sustainabilityTitleRow}>
                    <View style={styles.leafIcon}>
                        <Ionicons
                            name="leaf"
                            size={22}
                            color={colors.primary.forest}
                        />
                    </View>

                    <View>
                        <Text style={styles.sustainabilityTitle}>
                            Impacto sostenible
                        </Text>

                        <Text style={styles.sustainabilitySubtitle}>
                            Evaluación estimada de la ruta
                        </Text>
                    </View>
                </View>

                <View style={styles.scoreContainer}>
                    <Text style={styles.scoreValue}>
                        {score}
                    </Text>

                    <Text style={styles.scoreMaximum}>
                        /100
                    </Text>
                </View>
            </View>

            <View style={styles.progressTrack}>
                <View
                    style={[
                        styles.progressValue,
                        {
                            width: `${score}%`,
                        },
                    ]}
                />
            </View>

            <SustainabilityItem
                text="Incluye un negocio local."
            />

            <SustainabilityItem
                text="Prioriza lugares verificados."
            />

            <SustainabilityItem
                text="Combina atractivos cercanos para reducir traslados."
            />
        </View>
    );
}

function SustainabilityItem({
    text,
}: {
    text: string;
}) {
    return (
        <View style={styles.sustainabilityItem}>
            <Ionicons
                name="checkmark-circle"
                size={18}
                color={colors.primary.medium}
            />

            <Text style={styles.sustainabilityItemText}>
                {text}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.86,
    },

    metricCard: {
        flex: 1,
        minHeight: 112,
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

    overviewCard: {
        padding: spacing.lg,
        borderWidth: 1,
        borderColor: colors.outline,
        borderRadius: radius.large,
        backgroundColor: colors.surface,
    },

    overviewRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.md,
    },

    originDot: {
        width: 30,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radius.full,
        backgroundColor: colors.primary.medium,
    },

    stopNumber: {
        width: 30,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: colors.primary.forest,
        borderRadius: radius.full,
        backgroundColor: colors.surface,
    },

    stopNumberText: {
        ...typography.label,
        color: colors.primary.forest,
    },

    overviewContent: {
        flex: 1,
    },

    overviewLabel: {
        ...typography.bodySmall,
        color: colors.text.secondary,
    },

    overviewValue: {
        ...typography.cardTitle,
        marginTop: 2,
        color: colors.text.primary,
    },

    overviewLine: {
        width: 2,
        height: 26,
        marginLeft: 14,
        backgroundColor: colors.outline,
    },

    timelineRow: {
        flexDirection: "row",
        alignItems: "stretch",
    },

    timelineColumn: {
        width: 38,
        alignItems: "center",
    },

    timelineNumber: {
        width: 32,
        height: 32,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1,
        borderRadius: radius.full,
        backgroundColor: colors.primary.forest,
    },

    timelineNumberText: {
        ...typography.label,
        color: colors.text.inverse,
    },

    timelineLine: {
        flex: 1,
        width: 2,
        minHeight: 28,
        backgroundColor: colors.primary.light,
    },

    stopCard: {
        flex: 1,
        overflow: "hidden",
        marginBottom: spacing.lg,
        borderWidth: 1,
        borderColor: colors.outline,
        borderRadius: radius.large,
        backgroundColor: colors.surface,
    },

    stopImage: {
        width: "100%",
        height: 150,
    },

    stopContent: {
        padding: spacing.md,
    },

    stopHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    timeBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: radius.full,
        backgroundColor: colors.sand,
    },

    timeBadgeText: {
        ...typography.label,
        color: colors.primary.forest,
    },

    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
    },

    ratingText: {
        ...typography.bodySmall,
        color: colors.text.primary,
    },

    stopName: {
        ...typography.h2,
        marginTop: spacing.md,
        color: colors.text.primary,
    },

    locationRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
        marginTop: spacing.xs,
    },

    locationText: {
        ...typography.bodySmall,
        color: colors.text.secondary,
    },

    stopReason: {
        ...typography.bodySmall,
        marginTop: spacing.md,
        color: colors.text.secondary,
    },

    activities: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: spacing.xs,
        marginTop: spacing.md,
    },

    activityChip: {
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: radius.full,
        backgroundColor: "#EDF6F0",
    },

    activityText: {
        ...typography.label,
        color: colors.primary.forest,
    },

    stopFooter: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: spacing.md,
        marginTop: spacing.lg,
        paddingTop: spacing.md,
        borderTopWidth: 1,
        borderTopColor: colors.divider,
    },

    footerItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
    },

    footerText: {
        ...typography.bodySmall,
        color: colors.text.secondary,
    },

    aiTipCard: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: spacing.md,
        padding: spacing.lg,
        borderRadius: radius.large,
        backgroundColor: colors.primary.forest,
    },

    aiTipIcon: {
        width: 42,
        height: 42,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radius.full,
        backgroundColor: "rgba(255,255,255,0.14)",
    },

    aiTipContent: {
        flex: 1,
    },

    aiTipLabel: {
        ...typography.label,
        color: colors.warning,
    },

    aiTipText: {
        ...typography.body,
        marginTop: spacing.sm,
        color: colors.text.inverse,
    },

    sustainabilityCard: {
        padding: spacing.lg,
        borderWidth: 1,
        borderColor: colors.primary.light,
        borderRadius: radius.large,
        backgroundColor: "#EDF6F0",
    },

    sustainabilityHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: spacing.md,
    },

    sustainabilityTitleRow: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.md,
    },

    leafIcon: {
        width: 44,
        height: 44,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radius.medium,
        backgroundColor: colors.surface,
    },

    sustainabilityTitle: {
        ...typography.cardTitle,
        color: colors.text.primary,
    },

    sustainabilitySubtitle: {
        ...typography.bodySmall,
        marginTop: spacing.xs,
        color: colors.text.secondary,
    },

    scoreContainer: {
        flexDirection: "row",
        alignItems: "baseline",
    },

    scoreValue: {
        ...typography.h1,
        color: colors.primary.forest,
    },

    scoreMaximum: {
        ...typography.bodySmall,
        color: colors.text.secondary,
    },

    progressTrack: {
        height: 9,
        overflow: "hidden",
        marginVertical: spacing.lg,
        borderRadius: radius.full,
        backgroundColor: colors.outline,
    },

    progressValue: {
        height: "100%",
        borderRadius: radius.full,
        backgroundColor: colors.primary.medium,
    },

    sustainabilityItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: spacing.sm,
        marginTop: spacing.sm,
    },

    sustainabilityItemText: {
        ...typography.bodySmall,
        flex: 1,
        color: colors.text.primary,
    },
});