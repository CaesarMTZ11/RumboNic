import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

import {
    FavoritePlaceFilter,
    FavoritesTab,
} from "@/src/features/favorites/types/favoriteTypes";
import { GeneratedRoute } from "@/src/features/route-planner/types/generatedRouteTypes";
import {
    formatCurrency,
    formatDistance,
    formatDuration,
} from "@/src/features/route-planner/utils/routeFormatters";
import { useFavoritesStore } from "@/src/store/useFavoritesStore";
import { useSavedRoutesStore } from "@/src/store/useSavedRoutesStore";
import {
    colors,
    radius,
    spacing,
    typography,
} from "@/src/theme";

type FavoritesTabSelectorProps = {
    value: FavoritesTab;
    placeCount: number;
    routeCount: number;
    onChange: (
        value: FavoritesTab,
    ) => void;
};

export function FavoritesTabSelector({
    value,
    placeCount,
    routeCount,
    onChange,
}: FavoritesTabSelectorProps) {
    return (
        <View style={styles.tabs}>
            <FavoriteTabButton
                icon="heart-outline"
                label="Lugares"
                count={placeCount}
                selected={value === "places"}
                onPress={() =>
                    onChange("places")
                }
            />

            <FavoriteTabButton
                icon="map-outline"
                label="Rutas"
                count={routeCount}
                selected={value === "routes"}
                onPress={() =>
                    onChange("routes")
                }
            />
        </View>
    );
}

type FavoriteTabButtonProps = {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    count: number;
    selected: boolean;
    onPress: () => void;
};

function FavoriteTabButton({
    icon,
    label,
    count,
    selected,
    onPress,
}: FavoriteTabButtonProps) {
    return (
        <Pressable
            accessibilityRole="tab"
            accessibilityState={{
                selected,
            }}
            onPress={onPress}
            style={({ pressed }) => [
                styles.tabButton,
                selected &&
                styles.tabButtonSelected,
                pressed && styles.pressed,
            ]}
        >
            <Ionicons
                name={icon}
                size={19}
                color={
                    selected
                        ? colors.text.inverse
                        : colors.text.secondary
                }
            />

            <Text
                style={[
                    styles.tabText,
                    selected &&
                    styles.tabTextSelected,
                ]}
            >
                {label}
            </Text>

            <View
                style={[
                    styles.tabCount,
                    selected &&
                    styles.tabCountSelected,
                ]}
            >
                <Text
                    style={[
                        styles.tabCountText,
                        selected &&
                        styles.tabCountTextSelected,
                    ]}
                >
                    {count}
                </Text>
            </View>
        </Pressable>
    );
}

type FavoriteFilterChipProps = {
    value: FavoritePlaceFilter;
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    selected: boolean;
    onPress: () => void;
};

export function FavoriteFilterChip({
    label,
    icon,
    selected,
    onPress,
}: FavoriteFilterChipProps) {
    return (
        <Pressable
            accessibilityRole="button"
            accessibilityState={{
                selected,
            }}
            onPress={onPress}
            style={({ pressed }) => [
                styles.filterChip,
                selected &&
                styles.filterChipSelected,
                pressed && styles.pressed,
            ]}
        >
            <Ionicons
                name={icon}
                size={17}
                color={
                    selected
                        ? colors.text.inverse
                        : colors.primary.forest
                }
            />

            <Text
                style={[
                    styles.filterText,
                    selected &&
                    styles.filterTextSelected,
                ]}
            >
                {label}
            </Text>
        </Pressable>
    );
}

type FavoritesSummaryProps = {
    placeCount: number;
    localBusinessCount: number;
    routeCount: number;
};

export function FavoritesSummary({
    placeCount,
    localBusinessCount,
    routeCount,
}: FavoritesSummaryProps) {
    return (
        <View style={styles.summaryCard}>
            <SummaryMetric
                icon="location-outline"
                value={placeCount}
                label="Lugares"
            />

            <View style={styles.summaryDivider} />

            <SummaryMetric
                icon="storefront-outline"
                value={localBusinessCount}
                label="Negocios"
            />

            <View style={styles.summaryDivider} />

            <SummaryMetric
                icon="map-outline"
                value={routeCount}
                label="Rutas"
            />
        </View>
    );
}

type SummaryMetricProps = {
    icon: keyof typeof Ionicons.glyphMap;
    value: number;
    label: string;
};

function SummaryMetric({
    icon,
    value,
    label,
}: SummaryMetricProps) {
    return (
        <View style={styles.summaryMetric}>
            <Ionicons
                name={icon}
                size={21}
                color={colors.primary.forest}
            />

            <Text style={styles.summaryValue}>
                {value}
            </Text>

            <Text style={styles.summaryLabel}>
                {label}
            </Text>
        </View>
    );
}

type SavedRouteCardProps = {
    route: GeneratedRoute;
    onPress: () => void;
    onRemove: () => void;
};

export function SavedRouteCard({
    route,
    onPress,
    onRemove,
}: SavedRouteCardProps) {
    const coverImage =
        route.stops[0]?.imageUrl;

    return (
        <Pressable
            accessibilityRole="button"
            onPress={onPress}
            style={({ pressed }) => [
                styles.routeCard,
                pressed && styles.pressed,
            ]}
        >
            <View style={styles.routeImageContainer}>
                {coverImage ? (
                    <Image
                        source={{
                            uri: coverImage,
                        }}
                        contentFit="cover"
                        transition={250}
                        style={styles.routeImage}
                    />
                ) : (
                    <View
                        style={styles.routeImageFallback}
                    >
                        <Ionicons
                            name="map"
                            size={40}
                            color={colors.primary.forest}
                        />
                    </View>
                )}

                <View style={styles.aiBadge}>
                    <Ionicons
                        name="sparkles"
                        size={14}
                        color={colors.warning}
                    />

                    <Text style={styles.aiBadgeText}>
                        RUTA IA
                    </Text>
                </View>

                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Eliminar ruta guardada"
                    hitSlop={8}
                    onPress={(event) => {
                        event.stopPropagation();
                        onRemove();
                    }}
                    style={styles.removeRouteButton}
                >
                    <Ionicons
                        name="bookmark"
                        size={21}
                        color={colors.warning}
                    />
                </Pressable>
            </View>

            <View style={styles.routeContent}>
                <Text
                    numberOfLines={2}
                    style={styles.routeTitle}
                >
                    {route.title}
                </Text>

                <Text
                    numberOfLines={2}
                    style={styles.routeSummary}
                >
                    {route.summary}
                </Text>

                <View style={styles.routeMetrics}>
                    <RouteMetric
                        icon="cash-outline"
                        value={formatCurrency(
                            route.estimatedCost,
                        )}
                    />

                    <RouteMetric
                        icon="time-outline"
                        value={formatDuration(
                            route.totalDurationMinutes,
                        )}
                    />

                    <RouteMetric
                        icon="navigate-outline"
                        value={formatDistance(
                            route.distanceKm,
                        )}
                    />
                </View>

                <View style={styles.routeFooter}>
                    <View style={styles.routeStops}>
                        <Ionicons
                            name="location-outline"
                            size={16}
                            color={colors.primary.forest}
                        />

                        <Text style={styles.routeStopsText}>
                            {route.stops.length}{" "}
                            {route.stops.length === 1
                                ? "parada"
                                : "paradas"}
                        </Text>
                    </View>

                    <View
                        style={styles.sustainabilityBadge}
                    >
                        <Ionicons
                            name="leaf-outline"
                            size={15}
                            color={colors.primary.forest}
                        />

                        <Text
                            style={
                                styles.sustainabilityText
                            }
                        >
                            {route.sustainabilityScore}/100
                        </Text>
                    </View>
                </View>
            </View>
        </Pressable>
    );
}

type RouteMetricProps = {
    icon: keyof typeof Ionicons.glyphMap;
    value: string;
};

function RouteMetric({
    icon,
    value,
}: RouteMetricProps) {
    return (
        <View style={styles.routeMetric}>
            <Ionicons
                name={icon}
                size={15}
                color={colors.text.secondary}
            />

            <Text
                numberOfLines={1}
                style={styles.routeMetricText}
            >
                {value}
            </Text>
        </View>
    );
}

type FavoritesShortcutProps = {
    title?: string;
    description?: string;
};

export function FavoritesShortcut({
    title = "Mis favoritos",
    description = "Consulta tus lugares y rutas guardadas.",
}: FavoritesShortcutProps) {
    const placeCount = useFavoritesStore(
        (state) =>
            state.favoriteIds.length,
    );

    const routeCount =
        useSavedRoutesStore(
            (state) =>
                state.savedRoutes.length,
        );

    return (
        <Pressable
            accessibilityRole="button"
            onPress={() =>
                router.push("/favorites")
            }
            style={({ pressed }) => [
                styles.shortcut,
                pressed && styles.pressed,
            ]}
        >
            <View style={styles.shortcutIcon}>
                <Ionicons
                    name="heart"
                    size={22}
                    color={colors.error}
                />
            </View>

            <View style={styles.shortcutContent}>
                <Text style={styles.shortcutTitle}>
                    {title}
                </Text>

                <Text
                    style={styles.shortcutDescription}
                >
                    {description}
                </Text>

                <Text style={styles.shortcutCount}>
                    {placeCount} lugares ·{" "}
                    {routeCount} rutas
                </Text>
            </View>

            <Ionicons
                name="chevron-forward"
                size={21}
                color={colors.text.secondary}
            />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.83,
    },

    tabs: {
        flexDirection: "row",
        gap: spacing.xs,
        padding: spacing.xs,
        borderRadius: radius.full,
        backgroundColor: colors.sand,
    },

    tabButton: {
        minHeight: 46,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: spacing.xs,
        paddingHorizontal: spacing.sm,
        borderRadius: radius.full,
    },

    tabButtonSelected: {
        backgroundColor:
            colors.primary.forest,
    },

    tabText: {
        ...typography.bodySmall,
        fontFamily:
            typography.cardTitle.fontFamily,
        color: colors.text.secondary,
    },

    tabTextSelected: {
        color: colors.text.inverse,
    },

    tabCount: {
        minWidth: 22,
        height: 22,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: spacing.xs,
        borderRadius: radius.full,
        backgroundColor: colors.surface,
    },

    tabCountSelected: {
        backgroundColor:
            "rgba(255,255,255,0.18)",
    },

    tabCountText: {
        ...typography.label,
        color: colors.primary.forest,
    },

    tabCountTextSelected: {
        color: colors.text.inverse,
    },

    filterChip: {
        minHeight: 42,
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
        marginRight: spacing.sm,
        paddingHorizontal: spacing.md,
        borderWidth: 1,
        borderColor: colors.outline,
        borderRadius: radius.full,
        backgroundColor: colors.surface,
    },

    filterChipSelected: {
        borderColor:
            colors.primary.forest,
        backgroundColor:
            colors.primary.forest,
    },

    filterText: {
        ...typography.bodySmall,
        fontFamily:
            typography.cardTitle.fontFamily,
        color: colors.text.primary,
    },

    filterTextSelected: {
        color: colors.text.inverse,
    },

    summaryCard: {
        minHeight: 105,
        flexDirection: "row",
        alignItems: "center",
        marginTop: spacing.lg,
        padding: spacing.md,
        borderWidth: 1,
        borderColor: colors.outline,
        borderRadius: radius.large,
        backgroundColor: colors.surface,
    },

    summaryMetric: {
        flex: 1,
        alignItems: "center",
    },

    summaryValue: {
        ...typography.h2,
        marginTop: spacing.xs,
        color: colors.text.primary,
    },

    summaryLabel: {
        ...typography.bodySmall,
        marginTop: 2,
        color: colors.text.secondary,
    },

    summaryDivider: {
        width: 1,
        height: 58,
        backgroundColor: colors.divider,
    },

    routeCard: {
        overflow: "hidden",
        marginBottom: spacing.lg,
        borderWidth: 1,
        borderColor: colors.outline,
        borderRadius: radius.large,
        backgroundColor: colors.surface,
    },

    routeImageContainer: {
        height: 180,
    },

    routeImage: {
        width: "100%",
        height: "100%",
    },

    routeImageFallback: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#EDF6F0",
    },

    aiBadge: {
        position: "absolute",
        top: spacing.sm,
        left: spacing.sm,
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: radius.full,
        backgroundColor:
            "rgba(27,94,58,0.92)",
    },

    aiBadgeText: {
        ...typography.label,
        color: colors.text.inverse,
    },

    removeRouteButton: {
        position: "absolute",
        top: spacing.sm,
        right: spacing.sm,
        width: 42,
        height: 42,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radius.full,
        backgroundColor:
            "rgba(255,255,255,0.94)",
    },

    routeContent: {
        padding: spacing.lg,
    },

    routeTitle: {
        ...typography.h2,
        color: colors.text.primary,
    },

    routeSummary: {
        ...typography.bodySmall,
        marginTop: spacing.sm,
        color: colors.text.secondary,
    },

    routeMetrics: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: spacing.md,
        marginTop: spacing.lg,
    },

    routeMetric: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
    },

    routeMetricText: {
        ...typography.bodySmall,
        color: colors.text.secondary,
    },

    routeFooter: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: spacing.md,
        marginTop: spacing.lg,
        paddingTop: spacing.md,
        borderTopWidth: 1,
        borderTopColor: colors.divider,
    },

    routeStops: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
    },

    routeStopsText: {
        ...typography.bodySmall,
        color: colors.primary.forest,
    },

    sustainabilityBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: radius.full,
        backgroundColor: "#EDF6F0",
    },

    sustainabilityText: {
        ...typography.label,
        color: colors.primary.forest,
    },

    shortcut: {
        minHeight: 96,
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.md,
        padding: spacing.lg,
        borderWidth: 1,
        borderColor: colors.outline,
        borderRadius: radius.large,
        backgroundColor: colors.surface,
    },

    shortcutIcon: {
        width: 48,
        height: 48,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radius.medium,
        backgroundColor: "#FDEDEC",
    },

    shortcutContent: {
        flex: 1,
    },

    shortcutTitle: {
        ...typography.cardTitle,
        color: colors.text.primary,
    },

    shortcutDescription: {
        ...typography.bodySmall,
        marginTop: spacing.xs,
        color: colors.text.secondary,
    },

    shortcutCount: {
        ...typography.label,
        marginTop: spacing.sm,
        color: colors.primary.forest,
    },
});