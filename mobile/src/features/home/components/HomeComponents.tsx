import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

import {
    Destination,
    LocalBusiness,
    TourismCategory,
} from "@/src/features/home/types/homeTypes";
import {
    colors,
    radius,
    spacing,
    typography,
} from "@/src/theme";

type SectionHeaderProps = {
    title: string;
    actionLabel?: string;
    onActionPress?: () => void;
};

export function SectionHeader({
    title,
    actionLabel,
    onActionPress,
}: SectionHeaderProps) {
    return (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{title}</Text>

            {actionLabel && onActionPress ? (
                <Pressable
                    accessibilityRole="button"
                    onPress={onActionPress}
                    hitSlop={8}
                >
                    <Text style={styles.sectionAction}>
                        {actionLabel}
                    </Text>
                </Pressable>
            ) : null}
        </View>
    );
}

type AIHeroCardProps = {
    onPress: () => void;
};

export function AIHeroCard({
    onPress,
}: AIHeroCardProps) {
    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel="Crear ruta inteligente"
            onPress={onPress}
            style={({ pressed }) => [
                styles.aiHeroWrapper,
                pressed && styles.pressed,
            ]}
        >
            <LinearGradient
                colors={[
                    colors.primary.forest,
                    colors.primary.medium,
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.aiHero}
            >
                <View style={styles.aiIconContainer}>
                    <Ionicons
                        name="sparkles"
                        size={25}
                        color={colors.warning}
                    />
                </View>

                <Text style={styles.aiEyebrow}>
                    ASISTENTE INTELIGENTE
                </Text>

                <Text style={styles.aiTitle}>
                    Planifica tu próximo viaje con IA
                </Text>

                <Text style={styles.aiDescription}>
                    Crea una ruta personalizada según tu ubicación,
                    tiempo, presupuesto e intereses.
                </Text>

                <View style={styles.aiButton}>
                    <Ionicons
                        name="sparkles"
                        size={18}
                        color={colors.primary.forest}
                    />

                    <Text style={styles.aiButtonText}>
                        Crear ruta inteligente
                    </Text>
                </View>
            </LinearGradient>
        </Pressable>
    );
}

type CategoryChipProps = {
    category: TourismCategory;
    onPress: () => void;
};

export function CategoryChip({
    category,
    onPress,
}: CategoryChipProps) {
    return (
        <Pressable
            accessibilityRole="button"
            onPress={onPress}
            style={({ pressed }) => [
                styles.categoryChip,
                pressed && styles.pressed,
            ]}
        >
            <View style={styles.categoryIcon}>
                <Ionicons
                    name={category.icon}
                    size={23}
                    color={colors.primary.forest}
                />
            </View>

            <Text
                numberOfLines={1}
                style={styles.categoryText}
            >
                {category.name}
            </Text>
        </Pressable>
    );
}

type DailyRouteCardProps = {
    onPress: () => void;
};

export function DailyRouteCard({
    onPress,
}: DailyRouteCardProps) {
    return (
        <Pressable
            accessibilityRole="button"
            onPress={onPress}
            style={({ pressed }) => [
                styles.dailyRoute,
                pressed && styles.pressed,
            ]}
        >
            <View style={styles.dailyRouteHeader}>
                <View style={styles.recommendedBadge}>
                    <Ionicons
                        name="sunny"
                        size={16}
                        color={colors.warning}
                    />

                    <Text style={styles.recommendedText}>
                        RUTA RECOMENDADA
                    </Text>
                </View>

                <Ionicons
                    name="arrow-forward-circle"
                    size={28}
                    color={colors.primary.forest}
                />
            </View>

            <Text style={styles.dailyRouteTitle}>
                Granada y Laguna de Apoyo
            </Text>

            <Text style={styles.dailyRouteDescription}>
                Cultura colonial, gastronomía local y naturaleza en
                una aventura de un día.
            </Text>

            <View style={styles.routeMetrics}>
                <View style={styles.routeMetric}>
                    <Ionicons
                        name="location-outline"
                        size={17}
                        color={colors.primary.forest}
                    />
                    <Text style={styles.metricText}>4 lugares</Text>
                </View>

                <View style={styles.routeMetric}>
                    <Ionicons
                        name="time-outline"
                        size={17}
                        color={colors.primary.forest}
                    />
                    <Text style={styles.metricText}>7 horas</Text>
                </View>

                <View style={styles.routeMetric}>
                    <Ionicons
                        name="cash-outline"
                        size={17}
                        color={colors.primary.forest}
                    />
                    <Text style={styles.metricText}>C$ 1,250</Text>
                </View>
            </View>
        </Pressable>
    );
}

type DestinationCardProps = {
    destination: Destination;
    onPress: () => void;
    onFavoritePress: () => void;
};

export function DestinationCard({
    destination,
    onPress,
    onFavoritePress,
}: DestinationCardProps) {
    return (
        <Pressable
            accessibilityRole="button"
            onPress={onPress}
            style={({ pressed }) => [
                styles.destinationCard,
                pressed && styles.pressed,
            ]}
        >
            <View style={styles.destinationImageContainer}>
                <Image
                    source={{ uri: destination.imageUrl }}
                    contentFit="cover"
                    transition={250}
                    style={styles.destinationImage}
                />

                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={
                        destination.isFavorite
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
                            destination.isFavorite
                                ? "heart"
                                : "heart-outline"
                        }
                        size={21}
                        color={
                            destination.isFavorite
                                ? colors.error
                                : colors.text.primary
                        }
                    />
                </Pressable>

                <View style={styles.categoryBadge}>
                    <Text style={styles.categoryBadgeText}>
                        {destination.category}
                    </Text>
                </View>
            </View>

            <View style={styles.destinationContent}>
                <Text
                    numberOfLines={1}
                    style={styles.destinationTitle}
                >
                    {destination.name}
                </Text>

                <View style={styles.destinationMeta}>
                    <Ionicons
                        name="location-outline"
                        size={15}
                        color={colors.text.secondary}
                    />

                    <Text style={styles.destinationLocation}>
                        {destination.department}
                    </Text>

                    <Ionicons
                        name="star"
                        size={15}
                        color={colors.warning}
                    />

                    <Text style={styles.destinationRating}>
                        {destination.rating.toFixed(1)}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
}

type LocalBusinessCardProps = {
    business: LocalBusiness;
    onPress: () => void;
};

export function LocalBusinessCard({
    business,
    onPress,
}: LocalBusinessCardProps) {
    return (
        <Pressable
            accessibilityRole="button"
            onPress={onPress}
            style={({ pressed }) => [
                styles.businessCard,
                pressed && styles.pressed,
            ]}
        >
            <Image
                source={{ uri: business.imageUrl }}
                contentFit="cover"
                transition={250}
                style={styles.businessImage}
            />

            <View style={styles.businessContent}>
                <View style={styles.localBadge}>
                    <Ionicons
                        name="storefront-outline"
                        size={14}
                        color={colors.earth}
                    />
                    <Text style={styles.localBadgeText}>LOCAL</Text>
                </View>

                <Text
                    numberOfLines={1}
                    style={styles.businessName}
                >
                    {business.name}
                </Text>

                <Text
                    numberOfLines={1}
                    style={styles.businessCategory}
                >
                    {business.category}
                </Text>

                <View style={styles.businessMeta}>
                    <Ionicons
                        name="location-outline"
                        size={14}
                        color={colors.text.secondary}
                    />

                    <Text
                        numberOfLines={1}
                        style={styles.businessLocation}
                    >
                        {business.location}
                    </Text>

                    <Ionicons
                        name="star"
                        size={14}
                        color={colors.warning}
                    />

                    <Text style={styles.businessRating}>
                        {business.rating.toFixed(1)}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.86,
    },

    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: spacing.md,
    },

    sectionTitle: {
        ...typography.h2,
        color: colors.text.primary,
    },

    sectionAction: {
        ...typography.bodySmall,
        fontFamily: typography.cardTitle.fontFamily,
        color: colors.primary.forest,
    },

    aiHeroWrapper: {
        borderRadius: radius.extraLarge,
    },

    aiHero: {
        padding: spacing.xl,
        borderRadius: radius.extraLarge,
    },

    aiIconContainer: {
        width: 46,
        height: 46,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: spacing.md,
        borderRadius: radius.full,
        backgroundColor: "rgba(255,255,255,0.14)",
    },

    aiEyebrow: {
        ...typography.label,
        color: colors.warning,
    },

    aiTitle: {
        ...typography.h1,
        marginTop: spacing.sm,
        color: colors.text.inverse,
    },

    aiDescription: {
        ...typography.body,
        marginTop: spacing.sm,
        color: colors.text.inverse,
        opacity: 0.9,
    },

    aiButton: {
        minHeight: 46,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: spacing.sm,
        marginTop: spacing.xl,
        paddingHorizontal: spacing.lg,
        borderRadius: radius.full,
        backgroundColor: colors.surface,
    },

    aiButtonText: {
        ...typography.cardTitle,
        color: colors.primary.forest,
    },

    categoryChip: {
        width: 88,
        alignItems: "center",
        marginRight: spacing.md,
    },

    categoryIcon: {
        width: 58,
        height: 58,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: spacing.sm,
        borderRadius: radius.large,
        backgroundColor: colors.sand,
    },

    categoryText: {
        ...typography.bodySmall,
        color: colors.text.primary,
        textAlign: "center",
    },

    dailyRoute: {
        padding: spacing.lg,
        borderWidth: 1,
        borderColor: colors.outline,
        borderRadius: radius.large,
        backgroundColor: colors.surface,
    },

    dailyRouteHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    recommendedBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
    },

    recommendedText: {
        ...typography.label,
        color: colors.primary.forest,
    },

    dailyRouteTitle: {
        ...typography.h2,
        marginTop: spacing.md,
        color: colors.text.primary,
    },

    dailyRouteDescription: {
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

    metricText: {
        ...typography.bodySmall,
        color: colors.text.primary,
    },

    destinationCard: {
        width: 240,
        marginRight: spacing.lg,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: colors.outline,
        borderRadius: radius.large,
        backgroundColor: colors.surface,
    },

    destinationImageContainer: {
        height: 150,
    },

    destinationImage: {
        width: "100%",
        height: "100%",
    },

    favoriteButton: {
        position: "absolute",
        top: spacing.sm,
        right: spacing.sm,
        width: 38,
        height: 38,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radius.full,
        backgroundColor: "rgba(255,255,255,0.92)",
    },

    categoryBadge: {
        position: "absolute",
        bottom: spacing.sm,
        left: spacing.sm,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: radius.full,
        backgroundColor: "rgba(27,94,58,0.90)",
    },

    categoryBadgeText: {
        ...typography.label,
        color: colors.text.inverse,
    },

    destinationContent: {
        padding: spacing.md,
    },

    destinationTitle: {
        ...typography.cardTitle,
        color: colors.text.primary,
    },

    destinationMeta: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
        marginTop: spacing.sm,
    },

    destinationLocation: {
        ...typography.bodySmall,
        flex: 1,
        color: colors.text.secondary,
    },

    destinationRating: {
        ...typography.bodySmall,
        color: colors.text.primary,
    },

    businessCard: {
        width: 280,
        flexDirection: "row",
        marginRight: spacing.lg,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: colors.outline,
        borderRadius: radius.large,
        backgroundColor: colors.surface,
    },

    businessImage: {
        width: 96,
        height: 112,
    },

    businessContent: {
        flex: 1,
        justifyContent: "center",
        padding: spacing.md,
    },

    localBadge: {
        alignSelf: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
        marginBottom: spacing.xs,
    },

    localBadgeText: {
        ...typography.label,
        color: colors.earth,
    },

    businessName: {
        ...typography.cardTitle,
        color: colors.text.primary,
    },

    businessCategory: {
        ...typography.bodySmall,
        marginTop: spacing.xs,
        color: colors.text.secondary,
    },

    businessMeta: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
        marginTop: spacing.sm,
    },

    businessLocation: {
        ...typography.bodySmall,
        flex: 1,
        color: colors.text.secondary,
    },

    businessRating: {
        ...typography.bodySmall,
        color: colors.text.primary,
    },
});