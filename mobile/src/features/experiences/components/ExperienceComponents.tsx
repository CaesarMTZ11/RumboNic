import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { ExplorePlace } from "@/src/features/explore/types/exploreTypes";
import { ExperiencePlaceMode } from "@/src/features/experiences/types/experienceTypes";
import {
    colors,
    radius,
    spacing,
    typography,
} from "@/src/theme";

type PlaceModeSelectorProps = {
    value: ExperiencePlaceMode;
    onChange: (
        value: ExperiencePlaceMode,
    ) => void;
};

export function PlaceModeSelector({
    value,
    onChange,
}: PlaceModeSelectorProps) {
    return (
        <View style={styles.modeContainer}>
            <ModeOption
                icon="location-outline"
                label="Lugar existente"
                description="Selecciona un lugar registrado."
                selected={value === "existing"}
                onPress={() =>
                    onChange("existing")
                }
            />

            <ModeOption
                icon="add-circle-outline"
                label="Lugar nuevo"
                description="Sugiere un sitio que aún no aparece."
                selected={value === "new"}
                onPress={() => onChange("new")}
            />
        </View>
    );
}

type ModeOptionProps = {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    description: string;
    selected: boolean;
    onPress: () => void;
};

function ModeOption({
    icon,
    label,
    description,
    selected,
    onPress,
}: ModeOptionProps) {
    return (
        <Pressable
            accessibilityRole="radio"
            accessibilityState={{
                checked: selected,
            }}
            onPress={onPress}
            style={({ pressed }) => [
                styles.modeOption,
                selected && styles.modeOptionSelected,
                pressed && styles.pressed,
            ]}
        >
            <View
                style={[
                    styles.modeIcon,
                    selected &&
                    styles.modeIconSelected,
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

            <View style={styles.modeContent}>
                <Text
                    style={[
                        styles.modeLabel,
                        selected &&
                        styles.modeLabelSelected,
                    ]}
                >
                    {label}
                </Text>

                <Text style={styles.modeDescription}>
                    {description}
                </Text>
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

type ExistingPlaceOptionProps = {
    place: ExplorePlace;
    selected: boolean;
    onPress: () => void;
};

export function ExistingPlaceOption({
    place,
    selected,
    onPress,
}: ExistingPlaceOptionProps) {
    return (
        <Pressable
            accessibilityRole="radio"
            accessibilityState={{
                checked: selected,
            }}
            onPress={onPress}
            style={({ pressed }) => [
                styles.placeOption,
                selected &&
                styles.placeOptionSelected,
                pressed && styles.pressed,
            ]}
        >
            <Image
                source={{ uri: place.imageUrl }}
                contentFit="cover"
                transition={200}
                style={styles.placeImage}
            />

            <View style={styles.placeContent}>
                <View style={styles.placeNameRow}>
                    <Text
                        numberOfLines={1}
                        style={styles.placeName}
                    >
                        {place.name}
                    </Text>

                    {place.isVerified ? (
                        <Ionicons
                            name="shield-checkmark"
                            size={16}
                            color={colors.primary.forest}
                        />
                    ) : null}
                </View>

                <Text
                    numberOfLines={1}
                    style={styles.placeLocation}
                >
                    {place.municipality},{" "}
                    {place.department}
                </Text>
            </View>

            <Ionicons
                name={
                    selected
                        ? "checkmark-circle"
                        : "ellipse-outline"
                }
                size={23}
                color={
                    selected
                        ? colors.primary.forest
                        : colors.outline
                }
            />
        </Pressable>
    );
}

type StarRatingProps = {
    value: number;
    onChange: (rating: number) => void;
    error?: string;
};

export function StarRating({
    value,
    onChange,
    error,
}: StarRatingProps) {
    const labels = [
        "",
        "Muy mala",
        "Regular",
        "Buena",
        "Muy buena",
        "Excelente",
    ];

    return (
        <View>
            <View style={styles.stars}>
                {[1, 2, 3, 4, 5].map(
                    (rating) => (
                        <Pressable
                            key={rating}
                            accessibilityRole="button"
                            accessibilityLabel={`${rating} estrellas`}
                            hitSlop={6}
                            onPress={() =>
                                onChange(rating)
                            }
                            style={({ pressed }) => [
                                styles.starButton,
                                pressed && styles.pressed,
                            ]}
                        >
                            <Ionicons
                                name={
                                    rating <= value
                                        ? "star"
                                        : "star-outline"
                                }
                                size={36}
                                color={
                                    rating <= value
                                        ? colors.warning
                                        : colors.outline
                                }
                            />
                        </Pressable>
                    ),
                )}
            </View>

            {value > 0 ? (
                <Text style={styles.ratingLabel}>
                    {labels[value]}
                </Text>
            ) : null}

            {error ? (
                <Text style={styles.errorText}>
                    {error}
                </Text>
            ) : null}
        </View>
    );
}

type ExperiencePhotoGridProps = {
    photoUris: string[];
    maximumPhotos?: number;
    error?: string;
    onPickFromLibrary: () => void;
    onTakePhoto: () => void;
    onRemove: (uri: string) => void;
};

export function ExperiencePhotoGrid({
    photoUris,
    maximumPhotos = 5,
    error,
    onPickFromLibrary,
    onTakePhoto,
    onRemove,
}: ExperiencePhotoGridProps) {
    return (
        <View>
            {photoUris.length > 0 ? (
                <View style={styles.photoGrid}>
                    {photoUris.map(
                        (uri, index) => (
                            <View
                                key={`${uri}-${index}`}
                                style={styles.photoContainer}
                            >
                                <Image
                                    source={{ uri }}
                                    contentFit="cover"
                                    transition={200}
                                    style={styles.photo}
                                />

                                <Pressable
                                    accessibilityRole="button"
                                    accessibilityLabel={`Eliminar fotografía ${index + 1
                                        }`}
                                    onPress={() =>
                                        onRemove(uri)
                                    }
                                    style={styles.removePhotoButton}
                                >
                                    <Ionicons
                                        name="close"
                                        size={17}
                                        color={colors.text.inverse}
                                    />
                                </Pressable>

                                {index === 0 ? (
                                    <View style={styles.coverBadge}>
                                        <Text
                                            style={styles.coverBadgeText}
                                        >
                                            PORTADA
                                        </Text>
                                    </View>
                                ) : null}
                            </View>
                        ),
                    )}
                </View>
            ) : (
                <View style={styles.emptyPhotos}>
                    <View style={styles.cameraIcon}>
                        <Ionicons
                            name="images-outline"
                            size={34}
                            color={colors.primary.forest}
                        />
                    </View>

                    <Text style={styles.emptyPhotoTitle}>
                        Agrega fotografías
                    </Text>

                    <Text
                        style={
                            styles.emptyPhotoDescription
                        }
                    >
                        Comparte imágenes auténticas de tu
                        visita.
                    </Text>
                </View>
            )}

            <View style={styles.photoActions}>
                <Pressable
                    accessibilityRole="button"
                    disabled={
                        photoUris.length >= maximumPhotos
                    }
                    onPress={onPickFromLibrary}
                    style={({ pressed }) => [
                        styles.photoAction,
                        pressed && styles.pressed,
                        photoUris.length >= maximumPhotos &&
                        styles.disabled,
                    ]}
                >
                    <Ionicons
                        name="images-outline"
                        size={20}
                        color={colors.primary.forest}
                    />

                    <Text style={styles.photoActionText}>
                        Galería
                    </Text>
                </Pressable>

                <Pressable
                    accessibilityRole="button"
                    disabled={
                        photoUris.length >= maximumPhotos
                    }
                    onPress={onTakePhoto}
                    style={({ pressed }) => [
                        styles.photoAction,
                        pressed && styles.pressed,
                        photoUris.length >= maximumPhotos &&
                        styles.disabled,
                    ]}
                >
                    <Ionicons
                        name="camera-outline"
                        size={20}
                        color={colors.primary.forest}
                    />

                    <Text style={styles.photoActionText}>
                        Cámara
                    </Text>
                </Pressable>
            </View>

            <Text style={styles.photoCounter}>
                {photoUris.length}/{maximumPhotos}{" "}
                fotografías
            </Text>

            {error ? (
                <Text style={styles.errorText}>
                    {error}
                </Text>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.82,
    },

    disabled: {
        opacity: 0.45,
    },

    errorText: {
        ...typography.bodySmall,
        marginTop: spacing.xs,
        color: colors.error,
    },

    modeContainer: {
        gap: spacing.sm,
    },

    modeOption: {
        minHeight: 78,
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.md,
        padding: spacing.md,
        borderWidth: 1,
        borderColor: colors.outline,
        borderRadius: radius.large,
        backgroundColor: colors.surface,
    },

    modeOptionSelected: {
        borderColor: colors.primary.forest,
        backgroundColor: "#EDF6F0",
    },

    modeIcon: {
        width: 44,
        height: 44,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radius.medium,
        backgroundColor: colors.sand,
    },

    modeIconSelected: {
        backgroundColor: colors.primary.forest,
    },

    modeContent: {
        flex: 1,
    },

    modeLabel: {
        ...typography.cardTitle,
        color: colors.text.primary,
    },

    modeLabelSelected: {
        color: colors.primary.forest,
    },

    modeDescription: {
        ...typography.bodySmall,
        marginTop: spacing.xs,
        color: colors.text.secondary,
    },

    placeOption: {
        minHeight: 72,
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.md,
        padding: spacing.sm,
        borderWidth: 1,
        borderColor: colors.outline,
        borderRadius: radius.medium,
        backgroundColor: colors.surface,
    },

    placeOptionSelected: {
        borderColor: colors.primary.forest,
        backgroundColor: "#EDF6F0",
    },

    placeImage: {
        width: 58,
        height: 58,
        borderRadius: radius.medium,
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
        marginTop: spacing.xs,
        color: colors.text.secondary,
    },

    stars: {
        flexDirection: "row",
        justifyContent: "center",
        gap: spacing.sm,
    },

    starButton: {
        width: 48,
        height: 48,
        alignItems: "center",
        justifyContent: "center",
    },

    ratingLabel: {
        ...typography.cardTitle,
        marginTop: spacing.sm,
        color: colors.primary.forest,
        textAlign: "center",
    },

    photoGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: spacing.sm,
    },

    photoContainer: {
        width: 104,
        height: 104,
        overflow: "hidden",
        borderRadius: radius.medium,
        backgroundColor: colors.outline,
    },

    photo: {
        width: "100%",
        height: "100%",
    },

    removePhotoButton: {
        position: "absolute",
        top: spacing.xs,
        right: spacing.xs,
        width: 28,
        height: 28,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radius.full,
        backgroundColor: "rgba(0,0,0,0.68)",
    },

    coverBadge: {
        position: "absolute",
        left: spacing.xs,
        bottom: spacing.xs,
        paddingHorizontal: spacing.xs,
        paddingVertical: 2,
        borderRadius: radius.full,
        backgroundColor: "rgba(27,94,58,0.90)",
    },

    coverBadgeText: {
        ...typography.label,
        fontSize: 9,
        color: colors.text.inverse,
    },

    emptyPhotos: {
        alignItems: "center",
        justifyContent: "center",
        minHeight: 190,
        padding: spacing.xl,
        borderWidth: 1,
        borderStyle: "dashed",
        borderColor: colors.primary.light,
        borderRadius: radius.large,
        backgroundColor: "#EDF6F0",
    },

    cameraIcon: {
        width: 66,
        height: 66,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radius.full,
        backgroundColor: colors.surface,
    },

    emptyPhotoTitle: {
        ...typography.cardTitle,
        marginTop: spacing.md,
        color: colors.text.primary,
    },

    emptyPhotoDescription: {
        ...typography.bodySmall,
        marginTop: spacing.xs,
        color: colors.text.secondary,
        textAlign: "center",
    },

    photoActions: {
        flexDirection: "row",
        gap: spacing.sm,
        marginTop: spacing.md,
    },

    photoAction: {
        minHeight: 48,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: spacing.sm,
        borderWidth: 1,
        borderColor: colors.primary.forest,
        borderRadius: radius.full,
        backgroundColor: colors.surface,
    },

    photoActionText: {
        ...typography.cardTitle,
        color: colors.primary.forest,
    },

    photoCounter: {
        ...typography.bodySmall,
        marginTop: spacing.sm,
        color: colors.text.secondary,
        textAlign: "right",
    },
});