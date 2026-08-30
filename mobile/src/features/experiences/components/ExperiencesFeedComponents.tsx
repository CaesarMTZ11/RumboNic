import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

import {
    ExperienceFeedFilter,
    ExperienceFeedItem,
    ExperienceFeedTab,
} from "@/src/features/experiences/types/experienceFeedTypes";
import {
    formatExperienceFeedDate,
    formatVisitDate,
} from "@/src/features/experiences/utils/experienceFeedUtils";
import {
    colors,
    radius,
    spacing,
    typography,
} from "@/src/theme";

type ExperienceTabSelectorProps = {
    value: ExperienceFeedTab;
    onChange: (
        value: ExperienceFeedTab,
    ) => void;
    mineCount: number;
};

export function ExperienceTabSelector({
    value,
    onChange,
    mineCount,
}: ExperienceTabSelectorProps) {
    return (
        <View style={styles.tabContainer}>
            <TabButton
                label="Descubrir"
                icon="compass-outline"
                selected={value === "discover"}
                onPress={() =>
                    onChange("discover")
                }
            />

            <TabButton
                label="Mis experiencias"
                icon="person-outline"
                count={mineCount}
                selected={value === "mine"}
                onPress={() => onChange("mine")}
            />
        </View>
    );
}

type TabButtonProps = {
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    selected: boolean;
    count?: number;
    onPress: () => void;
};

function TabButton({
    label,
    icon,
    selected,
    count,
    onPress,
}: TabButtonProps) {
    return (
        <Pressable
            accessibilityRole="tab"
            accessibilityState={{
                selected,
            }}
            onPress={onPress}
            style={({ pressed }) => [
                styles.tabButton,
                selected && styles.tabButtonSelected,
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
                    styles.tabLabel,
                    selected &&
                    styles.tabLabelSelected,
                ]}
            >
                {label}
            </Text>

            {typeof count === "number" &&
                count > 0 ? (
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
            ) : null}
        </Pressable>
    );
}

type ExperienceFilterChipProps = {
    filter: ExperienceFeedFilter;
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    selected: boolean;
    onPress: () => void;
};

export function ExperienceFilterChip({
    label,
    icon,
    selected,
    onPress,
}: ExperienceFilterChipProps) {
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

type MyExperiencesSummaryProps = {
    publishedCount: number;
    pendingCount: number;
    photoCount: number;
};

export function MyExperiencesSummary({
    publishedCount,
    pendingCount,
    photoCount,
}: MyExperiencesSummaryProps) {
    return (
        <View style={styles.summaryCard}>
            <SummaryMetric
                icon="checkmark-circle-outline"
                value={publishedCount}
                label="Publicadas"
            />

            <View style={styles.summaryDivider} />

            <SummaryMetric
                icon="time-outline"
                value={pendingCount}
                label="En revisión"
            />

            <View style={styles.summaryDivider} />

            <SummaryMetric
                icon="images-outline"
                value={photoCount}
                label="Fotografías"
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
                size={20}
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

type ExperienceFeedCardProps = {
    experience: ExperienceFeedItem;
    onPlacePress?: () => void;
};

export function ExperienceFeedCard({
    experience,
    onPlacePress,
}: ExperienceFeedCardProps) {
    const mainPhoto =
        experience.photoUris[0];

    const isPending =
        experience.publicationStatus ===
        "IN_REVIEW" ||
        experience.placeStatus === "PENDING";

    return (
        <View style={styles.experienceCard}>
            {mainPhoto ? (
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: mainPhoto }}
                        contentFit="cover"
                        transition={250}
                        style={styles.mainImage}
                    />

                    <View style={styles.imageBadges}>
                        {isPending ? (
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
                        ) : (
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
                        )}

                        {experience.isLocalBusiness ? (
                            <View style={styles.localBadge}>
                                <Ionicons
                                    name="storefront"
                                    size={13}
                                    color={colors.text.inverse}
                                />

                                <Text style={styles.localText}>
                                    LOCAL
                                </Text>
                            </View>
                        ) : null}
                    </View>

                    {experience.photoUris.length > 1 ? (
                        <View style={styles.photoCount}>
                            <Ionicons
                                name="images-outline"
                                size={14}
                                color={colors.text.inverse}
                            />

                            <Text style={styles.photoCountText}>
                                {experience.photoUris.length}
                            </Text>
                        </View>
                    ) : null}
                </View>
            ) : null}

            <View style={styles.cardContent}>
                <View style={styles.authorRow}>
                    <View style={styles.avatar}>
                        {experience.userAvatarUrl ? (
                            <Image
                                source={{
                                    uri: experience.userAvatarUrl,
                                }}
                                contentFit="cover"
                                style={styles.avatarImage}
                            />
                        ) : (
                            <Text style={styles.avatarText}>
                                {experience.userName
                                    .charAt(0)
                                    .toUpperCase()}
                            </Text>
                        )}
                    </View>

                    <View style={styles.authorContent}>
                        <Text style={styles.authorName}>
                            {experience.userName}
                        </Text>

                        <Text style={styles.publishedDate}>
                            {formatExperienceFeedDate(
                                experience.publishedAt,
                            )}
                        </Text>
                    </View>

                    <View style={styles.ratingContainer}>
                        <Ionicons
                            name="star"
                            size={17}
                            color={colors.warning}
                        />

                        <Text style={styles.ratingValue}>
                            {experience.rating}
                        </Text>
                    </View>
                </View>

                <Pressable
                    accessibilityRole="button"
                    disabled={!onPlacePress}
                    onPress={onPlacePress}
                    style={({ pressed }) => [
                        styles.placeButton,
                        pressed && styles.pressed,
                    ]}
                >
                    <View style={styles.placeIcon}>
                        <Ionicons
                            name="location-outline"
                            size={19}
                            color={colors.primary.forest}
                        />
                    </View>

                    <View style={styles.placeContent}>
                        <View style={styles.placeNameRow}>
                            <Text
                                numberOfLines={1}
                                style={styles.placeName}
                            >
                                {experience.placeName}
                            </Text>

                            {experience.placeStatus ===
                                "VERIFIED" ? (
                                <Ionicons
                                    name="shield-checkmark"
                                    size={15}
                                    color={colors.primary.forest}
                                />
                            ) : null}
                        </View>

                        <Text
                            numberOfLines={1}
                            style={styles.placeLocation}
                        >
                            {experience.municipality},{" "}
                            {experience.department}
                        </Text>
                    </View>

                    {onPlacePress ? (
                        <Ionicons
                            name="chevron-forward"
                            size={19}
                            color={colors.text.secondary}
                        />
                    ) : null}
                </Pressable>

                <Text style={styles.description}>
                    {experience.description}
                </Text>

                <View style={styles.metaRow}>
                    <View style={styles.metaItem}>
                        <Ionicons
                            name="calendar-outline"
                            size={15}
                            color={colors.text.secondary}
                        />

                        <Text style={styles.metaText}>
                            Visitado el{" "}
                            {formatVisitDate(
                                experience.visitDate,
                            )}
                        </Text>
                    </View>
                </View>

                <View style={styles.attributes}>
                    {experience.isSustainable ? (
                        <View style={styles.attributeBadge}>
                            <Ionicons
                                name="leaf-outline"
                                size={14}
                                color={colors.primary.forest}
                            />

                            <Text
                                style={styles.attributeText}
                            >
                                Turismo sostenible
                            </Text>
                        </View>
                    ) : null}

                    {experience.isMine ? (
                        <View style={styles.mineBadge}>
                            <Ionicons
                                name="person-outline"
                                size={14}
                                color={colors.info}
                            />

                            <Text style={styles.mineText}>
                                Mi experiencia
                            </Text>
                        </View>
                    ) : null}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.83,
    },

    tabContainer: {
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
        backgroundColor: colors.primary.forest,
    },

    tabLabel: {
        ...typography.bodySmall,
        fontFamily: typography.cardTitle.fontFamily,
        color: colors.text.secondary,
    },

    tabLabelSelected: {
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
        textAlign: "center",
    },

    summaryDivider: {
        width: 1,
        height: 58,
        backgroundColor: colors.divider,
    },

    experienceCard: {
        overflow: "hidden",
        marginBottom: spacing.lg,
        borderWidth: 1,
        borderColor: colors.outline,
        borderRadius: radius.large,
        backgroundColor: colors.surface,
    },

    imageContainer: {
        height: 220,
    },

    mainImage: {
        width: "100%",
        height: "100%",
    },

    imageBadges: {
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
        backgroundColor:
            "rgba(255,255,255,0.94)",
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
        backgroundColor:
            "rgba(255,255,255,0.94)",
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
        backgroundColor:
            "rgba(139,94,60,0.92)",
    },

    localText: {
        ...typography.label,
        color: colors.text.inverse,
    },

    photoCount: {
        position: "absolute",
        right: spacing.sm,
        bottom: spacing.sm,
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: radius.full,
        backgroundColor: "rgba(0,0,0,0.65)",
    },

    photoCountText: {
        ...typography.label,
        color: colors.text.inverse,
    },

    cardContent: {
        padding: spacing.lg,
    },

    authorRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.md,
    },

    avatar: {
        width: 44,
        height: 44,
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radius.full,
        backgroundColor: colors.primary.forest,
    },

    avatarImage: {
        width: "100%",
        height: "100%",
    },

    avatarText: {
        ...typography.h2,
        color: colors.text.inverse,
    },

    authorContent: {
        flex: 1,
    },

    authorName: {
        ...typography.cardTitle,
        color: colors.text.primary,
    },

    publishedDate: {
        ...typography.bodySmall,
        marginTop: 2,
        color: colors.text.secondary,
    },

    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
    },

    ratingValue: {
        ...typography.cardTitle,
        color: colors.text.primary,
    },

    placeButton: {
        minHeight: 64,
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.md,
        marginTop: spacing.lg,
        padding: spacing.md,
        borderRadius: radius.medium,
        backgroundColor: "#EDF6F0",
    },

    placeIcon: {
        width: 38,
        height: 38,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radius.medium,
        backgroundColor: colors.surface,
    },

    placeContent: {
        flex: 1,
    },

    placeNameRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
    },

    placeName: {
        ...typography.cardTitle,
        flexShrink: 1,
        color: colors.text.primary,
    },

    placeLocation: {
        ...typography.bodySmall,
        marginTop: 2,
        color: colors.text.secondary,
    },

    description: {
        ...typography.body,
        marginTop: spacing.lg,
        color: colors.text.primary,
    },

    metaRow: {
        marginTop: spacing.md,
    },

    metaItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
    },

    metaText: {
        ...typography.bodySmall,
        color: colors.text.secondary,
    },

    attributes: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: spacing.sm,
        marginTop: spacing.lg,
        paddingTop: spacing.md,
        borderTopWidth: 1,
        borderTopColor: colors.divider,
    },

    attributeBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: radius.full,
        backgroundColor: "#EDF6F0",
    },

    attributeText: {
        ...typography.label,
        color: colors.primary.forest,
    },

    mineBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: radius.full,
        backgroundColor: "#EAF5FB",
    },

    mineText: {
        ...typography.label,
        color: colors.info,
    },
});