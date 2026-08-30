import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

import {
    ExploreCategory,
    ExplorePlace,
} from "@/src/features/explore/types/exploreTypes";
import {
    colors,
    radius,
    spacing,
    typography,
} from "@/src/theme";

type ExploreCategoryChipProps = {
    category: ExploreCategory;
    selected: boolean;
    onPress: () => void;
};

export function ExploreCategoryChip({
    category,
    selected,
    onPress,
}: ExploreCategoryChipProps) {
    return (
        <Pressable
            accessibilityRole="button"
            accessibilityState={{
                selected,
            }}
            onPress={onPress}
            style={({ pressed }) => [
                styles.categoryChip,
                selected && styles.categoryChipSelected,
                pressed && styles.pressed,
            ]}
        >
            <Ionicons
                name={category.icon}
                size={18}
                color={
                    selected
                        ? colors.text.inverse
                        : colors.primary.forest
                }
            />

            <Text
                style={[
                    styles.categoryText,
                    selected && styles.categoryTextSelected,
                ]}
            >
                {category.name}
            </Text>
        </Pressable>
    );
}

type ExplorePlaceCardProps = {
    place: ExplorePlace;
    isFavorite: boolean;
    onPress: () => void;
    onFavoritePress: () => void;
};

export function ExplorePlaceCard({
    place,
    isFavorite,
    onPress,
    onFavoritePress,
}: ExplorePlaceCardProps) {
    return (
        <Pressable
            accessibilityRole="button"
            onPress={onPress}
            style={({ pressed }) => [
                styles.placeCard,
                pressed && styles.pressed,
            ]}
        >
            <View style={styles.imageContainer}>
                <Image
                    source={{
                        uri: place.imageUrl,
                    }}
                    contentFit="cover"
                    transition={250}
                    style={styles.placeImage}
                />

                <View style={styles.topBadges}>
                    {place.isVerified ? (
                        <View style={styles.verifiedBadge}>
                            <Ionicons
                                name="shield-checkmark"
                                size={14}
                                color={colors.primary.forest}
                            />

                            <Text style={styles.verifiedText}>
                                Verificado
                            </Text>
                        </View>
                    ) : (
                        <View style={styles.pendingBadge}>
                            <Ionicons
                                name="time-outline"
                                size={14}
                                color={colors.earth}
                            />

                            <Text style={styles.pendingText}>
                                En revisión
                            </Text>
                        </View>
                    )}

                    {place.isLocalBusiness ? (
                        <View style={styles.localBadge}>
                            <Ionicons
                                name="storefront"
                                size={13}
                                color={colors.text.inverse}
                            />

                            <Text style={styles.localBadgeText}>
                                LOCAL
                            </Text>
                        </View>
                    ) : null}
                </View>

                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={
                        isFavorite
                            ? "Eliminar de favoritos"
                            : "Guardar en favoritos"
                    }
                    hitSlop={8}
                    onPress={(event) => {
                        event.stopPropagation();
                        onFavoritePress();
                    }}
                    style={styles.favoriteButton}
                >
                    <Ionicons
                        name={
                            isFavorite
                                ? "heart"
                                : "heart-outline"
                        }
                        size={22}
                        color={
                            isFavorite
                                ? colors.error
                                : colors.text.primary
                        }
                    />
                </Pressable>
            </View>

            <View style={styles.placeContent}>
                <View style={styles.placeHeader}>
                    <View style={styles.placeTitleContainer}>
                        <Text
                            numberOfLines={1}
                            style={styles.placeName}
                        >
                            {place.name}
                        </Text>

                        <View style={styles.locationRow}>
                            <Ionicons
                                name="location-outline"
                                size={15}
                                color={colors.text.secondary}
                            />

                            <Text
                                numberOfLines={1}
                                style={styles.locationText}
                            >
                                {place.municipality},{" "}
                                {place.department}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.rating}>
                        <Ionicons
                            name="star"
                            size={16}
                            color={colors.warning}
                        />

                        <Text style={styles.ratingValue}>
                            {place.rating.toFixed(1)}
                        </Text>
                    </View>
                </View>

                <Text
                    numberOfLines={2}
                    style={styles.description}
                >
                    {place.description}
                </Text>

                <View style={styles.categories}>
                    {place.categoryNames
                        .slice(0, 2)
                        .map((category) => (
                            <View
                                key={category}
                                style={styles.categoryBadge}
                            >
                                <Text style={styles.categoryBadgeText}>
                                    {category}
                                </Text>
                            </View>
                        ))}
                </View>

                <View style={styles.footer}>
                    <View style={styles.footerItem}>
                        <Ionicons
                            name="navigate-outline"
                            size={16}
                            color={colors.primary.forest}
                        />

                        <Text style={styles.footerText}>
                            {place.distanceKm.toFixed(1)} km
                        </Text>
                    </View>

                    <Text style={styles.reviewText}>
                        {place.reviewCount} experiencias
                    </Text>
                </View>
            </View>
        </Pressable>
    );
}

type FilterChoiceProps = {
    label: string;
    selected: boolean;
    onPress: () => void;
};

export function FilterChoice({
    label,
    selected,
    onPress,
}: FilterChoiceProps) {
    return (
        <Pressable
            accessibilityRole="checkbox"
            accessibilityState={{
                checked: selected,
            }}
            onPress={onPress}
            style={({ pressed }) => [
                styles.filterChoice,
                selected && styles.filterChoiceSelected,
                pressed && styles.pressed,
            ]}
        >
            {selected ? (
                <Ionicons
                    name="checkmark"
                    size={17}
                    color={colors.text.inverse}
                />
            ) : null}

            <Text
                style={[
                    styles.filterChoiceText,
                    selected &&
                    styles.filterChoiceTextSelected,
                ]}
            >
                {label}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.84,
    },

    categoryChip: {
        minHeight: 44,
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
        marginRight: spacing.sm,
        paddingHorizontal: spacing.md,
        borderWidth: 1,
        borderColor: colors.outline,
        borderRadius: radius.full,
        backgroundColor: colors.surface,
    },

    categoryChipSelected: {
        borderColor: colors.primary.forest,
        backgroundColor: colors.primary.forest,
    },

    categoryText: {
        ...typography.bodySmall,
        fontFamily: typography.cardTitle.fontFamily,
        color: colors.text.primary,
    },

    categoryTextSelected: {
        color: colors.text.inverse,
    },

    placeCard: {
        overflow: "hidden",
        marginBottom: spacing.lg,
        borderWidth: 1,
        borderColor: colors.outline,
        borderRadius: radius.large,
        backgroundColor: colors.surface,
    },

    imageContainer: {
        height: 190,
    },

    placeImage: {
        width: "100%",
        height: "100%",
    },

    topBadges: {
        position: "absolute",
        top: spacing.sm,
        left: spacing.sm,
        flexDirection: "row",
        flexWrap: "wrap",
        gap: spacing.xs,
    },

    verifiedBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: radius.full,
        backgroundColor: "rgba(255,255,255,0.93)",
    },

    verifiedText: {
        ...typography.label,
        color: colors.primary.forest,
    },

    pendingBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: radius.full,
        backgroundColor: "rgba(255,255,255,0.93)",
    },

    pendingText: {
        ...typography.label,
        color: colors.earth,
    },

    localBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: radius.full,
        backgroundColor: "rgba(139,94,60,0.92)",
    },

    localBadgeText: {
        ...typography.label,
        color: colors.text.inverse,
    },

    favoriteButton: {
        position: "absolute",
        top: spacing.sm,
        right: spacing.sm,
        width: 42,
        height: 42,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radius.full,
        backgroundColor: "rgba(255,255,255,0.93)",
    },

    placeContent: {
        padding: spacing.lg,
    },

    placeHeader: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: spacing.md,
    },

    placeTitleContainer: {
        flex: 1,
    },

    placeName: {
        ...typography.h2,
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
        flex: 1,
        color: colors.text.secondary,
    },

    rating: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
    },

    ratingValue: {
        ...typography.cardTitle,
        color: colors.text.primary,
    },

    description: {
        ...typography.bodySmall,
        marginTop: spacing.md,
        color: colors.text.secondary,
    },

    categories: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: spacing.xs,
        marginTop: spacing.md,
    },

    categoryBadge: {
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: radius.full,
        backgroundColor: colors.sand,
    },

    categoryBadgeText: {
        ...typography.label,
        color: colors.primary.forest,
    },

    footer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
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
        color: colors.primary.forest,
    },

    reviewText: {
        ...typography.bodySmall,
        color: colors.text.secondary,
    },

    filterChoice: {
        minHeight: 42,
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
        paddingHorizontal: spacing.md,
        borderWidth: 1,
        borderColor: colors.outline,
        borderRadius: radius.full,
        backgroundColor: colors.surface,
    },

    filterChoiceSelected: {
        borderColor: colors.primary.forest,
        backgroundColor: colors.primary.forest,
    },

    filterChoiceText: {
        ...typography.bodySmall,
        fontFamily: typography.cardTitle.fontFamily,
        color: colors.text.primary,
    },

    filterChoiceTextSelected: {
        color: colors.text.inverse,
    },
});