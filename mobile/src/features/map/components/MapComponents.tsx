import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { MapFilterOption } from "@/src/features/map/data/mapFilters";
import { MapPlace } from "@/src/features/map/types/mapTypes";
import {
    colors,
    radius,
    spacing,
    typography,
} from "@/src/theme";

type MapFilterChipProps = {
    option: MapFilterOption;
    selected: boolean;
    onPress: () => void;
};

export function MapFilterChip({
    option,
    selected,
    onPress,
}: MapFilterChipProps) {
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
                name={option.icon}
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
                {option.label}
            </Text>
        </Pressable>
    );
}

type MapMarkerPinProps = {
    selected: boolean;
    localBusiness: boolean;
};

export function MapMarkerPin({
    selected,
    localBusiness,
}: MapMarkerPinProps) {
    return (
        <View
            style={[
                styles.marker,
                localBusiness &&
                styles.markerLocal,
                selected &&
                styles.markerSelected,
            ]}
        >
            <Ionicons
                name={
                    localBusiness
                        ? "storefront"
                        : "location"
                }
                size={selected ? 21 : 18}
                color={colors.text.inverse}
            />
        </View>
    );
}

type MapPlacePreviewProps = {
    place: MapPlace;
    isFavorite: boolean;
    onClose: () => void;
    onDetailsPress: () => void;
    onFavoritePress: () => void;
    onCreateRoutePress: () => void;
};

export function MapPlacePreview({
    place,
    isFavorite,
    onClose,
    onDetailsPress,
    onFavoritePress,
    onCreateRoutePress,
}: MapPlacePreviewProps) {
    return (
        <View style={styles.previewCard}>
            <View style={styles.previewHandle} />

            <View style={styles.previewTop}>
                <Image
                    source={{
                        uri: place.imageUrl,
                    }}
                    contentFit="cover"
                    transition={200}
                    style={styles.previewImage}
                />

                <View style={styles.previewContent}>
                    <View style={styles.previewTitleRow}>
                        <Text
                            numberOfLines={2}
                            style={styles.previewTitle}
                        >
                            {place.name}
                        </Text>

                        {place.isVerified ? (
                            <Ionicons
                                name="shield-checkmark"
                                size={17}
                                color={colors.primary.forest}
                            />
                        ) : null}
                    </View>

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

                    <View style={styles.ratingRow}>
                        <Ionicons
                            name="star"
                            size={15}
                            color={colors.warning}
                        />

                        <Text style={styles.rating}>
                            {place.rating.toFixed(1)}
                        </Text>

                        <Text style={styles.reviews}>
                            · {place.reviewCount} experiencias
                        </Text>
                    </View>
                </View>

                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Cerrar"
                    onPress={onClose}
                    style={styles.closeButton}
                >
                    <Ionicons
                        name="close"
                        size={20}
                        color={colors.text.secondary}
                    />
                </Pressable>
            </View>

            <View style={styles.attributes}>
                {place.isLocalBusiness ? (
                    <View style={styles.localBadge}>
                        <Ionicons
                            name="storefront-outline"
                            size={14}
                            color={colors.earth}
                        />

                        <Text style={styles.localText}>
                            Negocio local
                        </Text>
                    </View>
                ) : null}

                {place.isSustainable ? (
                    <View style={styles.sustainableBadge}>
                        <Ionicons
                            name="leaf-outline"
                            size={14}
                            color={colors.primary.forest}
                        />

                        <Text style={styles.sustainableText}>
                            Sostenible
                        </Text>
                    </View>
                ) : null}

                <View style={styles.distanceBadge}>
                    <Ionicons
                        name="navigate-outline"
                        size={14}
                        color={colors.info}
                    />

                    <Text style={styles.distanceText}>
                        {place.distanceKm.toFixed(1)} km
                    </Text>
                </View>
            </View>

            <View style={styles.previewActions}>
                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={
                        isFavorite
                            ? "Eliminar de favoritos"
                            : "Guardar en favoritos"
                    }
                    onPress={onFavoritePress}
                    style={styles.favoriteAction}
                >
                    <Ionicons
                        name={
                            isFavorite
                                ? "heart"
                                : "heart-outline"
                        }
                        size={21}
                        color={
                            isFavorite
                                ? colors.error
                                : colors.primary.forest
                        }
                    />
                </Pressable>

                <Pressable
                    accessibilityRole="button"
                    onPress={onDetailsPress}
                    style={styles.secondaryAction}
                >
                    <Text style={styles.secondaryActionText}>
                        Ver detalle
                    </Text>
                </Pressable>

                <Pressable
                    accessibilityRole="button"
                    onPress={onCreateRoutePress}
                    style={styles.primaryAction}
                >
                    <Ionicons
                        name="sparkles"
                        size={17}
                        color={colors.warning}
                    />

                    <Text style={styles.primaryActionText}>
                        Crear ruta
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.82,
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
        backgroundColor: "rgba(255,255,255,0.96)",
    },

    filterChipSelected: {
        borderColor: colors.primary.forest,
        backgroundColor: colors.primary.forest,
    },

    filterText: {
        ...typography.bodySmall,
        fontFamily: typography.cardTitle.fontFamily,
        color: colors.text.primary,
    },

    filterTextSelected: {
        color: colors.text.inverse,
    },

    marker: {
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 3,
        borderColor: colors.surface,
        borderRadius: radius.full,
        backgroundColor: colors.primary.forest,
    },

    markerLocal: {
        backgroundColor: colors.earth,
    },

    markerSelected: {
        width: 48,
        height: 48,
        borderWidth: 4,
    },

    previewCard: {
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.sm,
        paddingBottom: spacing.lg,
        borderTopLeftRadius: radius.extraLarge,
        borderTopRightRadius: radius.extraLarge,
        backgroundColor: colors.surface,
    },

    previewHandle: {
        width: 44,
        height: 5,
        alignSelf: "center",
        marginBottom: spacing.md,
        borderRadius: radius.full,
        backgroundColor: colors.outline,
    },

    previewTop: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: spacing.md,
    },

    previewImage: {
        width: 92,
        height: 92,
        borderRadius: radius.large,
    },

    previewContent: {
        flex: 1,
    },

    previewTitleRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: spacing.xs,
    },

    previewTitle: {
        ...typography.h2,
        flexShrink: 1,
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

    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: spacing.sm,
    },

    rating: {
        ...typography.cardTitle,
        marginLeft: spacing.xs,
        color: colors.text.primary,
    },

    reviews: {
        ...typography.bodySmall,
        color: colors.text.secondary,
    },

    closeButton: {
        width: 34,
        height: 34,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radius.full,
    },

    attributes: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: spacing.sm,
        marginTop: spacing.md,
    },

    localBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: radius.full,
        backgroundColor: "#F3E8DD",
    },

    localText: {
        ...typography.label,
        color: colors.earth,
    },

    sustainableBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: radius.full,
        backgroundColor: "#EDF6F0",
    },

    sustainableText: {
        ...typography.label,
        color: colors.primary.forest,
    },

    distanceBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: radius.full,
        backgroundColor: "#EAF5FB",
    },

    distanceText: {
        ...typography.label,
        color: colors.info,
    },

    previewActions: {
        flexDirection: "row",
        gap: spacing.sm,
        marginTop: spacing.lg,
    },

    favoriteAction: {
        width: 48,
        height: 48,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: colors.outline,
        borderRadius: radius.full,
    },

    secondaryAction: {
        minHeight: 48,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: colors.primary.forest,
        borderRadius: radius.full,
    },

    secondaryActionText: {
        ...typography.cardTitle,
        color: colors.primary.forest,
    },

    primaryAction: {
        minHeight: 48,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: spacing.xs,
        borderRadius: radius.full,
        backgroundColor: colors.primary.forest,
    },

    primaryActionText: {
        ...typography.cardTitle,
        color: colors.text.inverse,
    },
});