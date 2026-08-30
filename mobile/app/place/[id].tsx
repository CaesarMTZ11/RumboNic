import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import {
    router,
    useLocalSearchParams,
} from "expo-router";
import {
    Linking,
    Pressable,
    ScrollView,
    Share,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from "react-native";
import {
    useMemo,
    useState,
} from "react";

import {
    AppButton,
    ScreenContainer,
} from "@/src/components/common";
import {
    ContactAction,
    DetailSection,
    ExperienceCard,
    FeatureItem,
    PlaceMetric,
    PlaceScheduleCard,
} from "@/src/features/places/components";
import { getPlaceDetailById } from "@/src/features/places/data/placeData";
import { getPlaceOpenStatus } from "@/src/features/places/utils/placeUtils";
import { useFavoritesStore } from "@/src/store/useFavoritesStore";
import {
    colors,
    radius,
    spacing,
    typography,
} from "@/src/theme";

export default function PlaceDetailScreen() {
    const params = useLocalSearchParams<{
        id?: string | string[];
    }>();

    const { width } = useWindowDimensions();

    const placeId = Array.isArray(params.id)
        ? params.id[0]
        : params.id;

    const place = useMemo(
        () =>
            placeId
                ? getPlaceDetailById(placeId)
                : null,
        [placeId],
    );

    const [currentImageIndex, setCurrentImageIndex] =
        useState(0);

    const favoriteIds = useFavoritesStore(
        (state) => state.favoriteIds,
    );

    const toggleFavorite = useFavoritesStore(
        (state) => state.toggleFavorite,
    );

    if (!place) {
        return (
            <ScreenContainer
                contentContainerStyle={
                    styles.emptyContainer
                }
            >
                <View style={styles.emptyIcon}>
                    <Ionicons
                        name="location-outline"
                        size={42}
                        color={colors.primary.forest}
                    />
                </View>

                <Text style={styles.emptyTitle}>
                    Lugar no encontrado
                </Text>

                <Text style={styles.emptyDescription}>
                    Este lugar no existe o aún no está disponible.
                </Text>

                <AppButton
                    label="Volver a Explorar"
                    onPress={() =>
                        router.replace("/explore")
                    }
                />
            </ScreenContainer>
        );
    }

    const currentPlace = place;

    const isFavorite =
        favoriteIds.includes(place.id);

    const openStatus = getPlaceOpenStatus(
        place.schedules,
    );

    const currentDay = new Date().getDay();
    const currentDayNumber =
        currentDay === 0 ? 7 : currentDay;

    async function handleShare() {
        try {
            await Share.share({
                title: currentPlace.name,
                message: [
                    `📍 ${currentPlace.name}`,
                    `${currentPlace.municipality}, ${currentPlace.department}`,
                    "",
                    currentPlace.description,
                    "",
                    `⭐ ${currentPlace.rating.toFixed(1)}`,
                    "Descubierto con RumboNic.",
                ].join("\n"),
            });
        } catch {
            // El usuario puede cerrar el menú de compartir.
        }
    }

    function handleCreateRoute() {
        router.push({
            pathname: "/route-generator",
            params: {
                preferredPlaceId: currentPlace.id,
                preferredPlaceName: currentPlace.name,
            },
        });
    }

    function openMap() {
        const url =
            "https://www.google.com/maps/search/" +
            `?api=1&query=${currentPlace.latitude},${currentPlace.longitude}`;

        Linking.openURL(url);
    }

    return (
        <ScreenContainer
            contentContainerStyle={styles.container}
        >
            <View style={styles.gallery}>
                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={(event) => {
                        const index = Math.round(
                            event.nativeEvent.contentOffset.x /
                            width,
                        );

                        setCurrentImageIndex(index);
                    }}
                >
                    {place.imageUrls.map(
                        (imageUrl, index) => (
                            <Image
                                key={`${imageUrl}-${index}`}
                                source={{ uri: imageUrl }}
                                contentFit="cover"
                                transition={250}
                                style={{
                                    width,
                                    height: 330,
                                }}
                            />
                        ),
                    )}
                </ScrollView>

                <View style={styles.galleryTopBar}>
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="Volver"
                        hitSlop={10}
                        onPress={() => router.back()}
                        style={styles.galleryButton}
                    >
                        <Ionicons
                            name="arrow-back"
                            size={23}
                            color={colors.text.primary}
                        />
                    </Pressable>

                    <View style={styles.galleryActions}>
                        <Pressable
                            accessibilityRole="button"
                            accessibilityLabel="Compartir lugar"
                            onPress={handleShare}
                            style={styles.galleryButton}
                        >
                            <Ionicons
                                name="share-social-outline"
                                size={22}
                                color={colors.text.primary}
                            />
                        </Pressable>

                        <Pressable
                            accessibilityRole="button"
                            accessibilityLabel={
                                isFavorite
                                    ? "Eliminar de favoritos"
                                    : "Guardar en favoritos"
                            }
                            onPress={() =>
                                toggleFavorite(place.id)
                            }
                            style={styles.galleryButton}
                        >
                            <Ionicons
                                name={
                                    isFavorite
                                        ? "heart"
                                        : "heart-outline"
                                }
                                size={23}
                                color={
                                    isFavorite
                                        ? colors.error
                                        : colors.text.primary
                                }
                            />
                        </Pressable>
                    </View>
                </View>

                <View style={styles.imageCounter}>
                    <Ionicons
                        name="images-outline"
                        size={15}
                        color={colors.text.inverse}
                    />

                    <Text style={styles.imageCounterText}>
                        {currentImageIndex + 1}/
                        {place.imageUrls.length}
                    </Text>
                </View>

                {place.imageUrls.length > 1 ? (
                    <View style={styles.pagination}>
                        {place.imageUrls.map(
                            (_, index) => (
                                <View
                                    key={index}
                                    style={[
                                        styles.paginationDot,
                                        currentImageIndex ===
                                        index &&
                                        styles.paginationDotActive,
                                    ]}
                                />
                            ),
                        )}
                    </View>
                ) : null}
            </View>

            <View style={styles.content}>
                <View style={styles.badges}>
                    {place.isVerified ? (
                        <View style={styles.verifiedBadge}>
                            <Ionicons
                                name="shield-checkmark"
                                size={15}
                                color={colors.primary.forest}
                            />

                            <Text style={styles.verifiedText}>
                                Lugar verificado
                            </Text>
                        </View>
                    ) : (
                        <View style={styles.pendingBadge}>
                            <Ionicons
                                name="time-outline"
                                size={15}
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
                                name="leaf"
                                size={14}
                                color={colors.primary.forest}
                            />

                            <Text
                                style={styles.sustainableText}
                            >
                                Sostenible
                            </Text>
                        </View>
                    ) : null}
                </View>

                <Text style={styles.title}>
                    {place.name}
                </Text>

                <View style={styles.locationRow}>
                    <Ionicons
                        name="location-outline"
                        size={18}
                        color={colors.text.secondary}
                    />

                    <Text style={styles.locationText}>
                        {place.municipality},{" "}
                        {place.department}
                    </Text>
                </View>

                <View style={styles.openStatusRow}>
                    <View
                        style={[
                            styles.statusDot,
                            openStatus.isOpen
                                ? styles.statusDotOpen
                                : styles.statusDotClosed,
                        ]}
                    />

                    <Text
                        style={[
                            styles.openStatusText,
                            openStatus.isOpen
                                ? styles.openText
                                : styles.closedStatusText,
                        ]}
                    >
                        {openStatus.label}
                    </Text>
                </View>

                <View style={styles.metrics}>
                    <PlaceMetric
                        icon="star"
                        value={place.rating.toFixed(1)}
                        label={`${place.reviewCount} experiencias`}
                    />

                    <PlaceMetric
                        icon="navigate-outline"
                        value={`${place.distanceKm.toFixed(1)} km`}
                        label="Desde tu ubicación"
                    />

                    <PlaceMetric
                        icon="cash-outline"
                        value={place.priceRange}
                        label="Precio estimado"
                    />
                </View>

                <View style={styles.categories}>
                    {place.categoryNames.map(
                        (category) => (
                            <View
                                key={category}
                                style={styles.categoryChip}
                            >
                                <Text
                                    style={styles.categoryText}
                                >
                                    {category}
                                </Text>
                            </View>
                        ),
                    )}
                </View>

                <DetailSection title="Acerca del lugar">
                    <Text style={styles.description}>
                        {place.longDescription}
                    </Text>
                </DetailSection>

                <DetailSection
                    title="Principales atractivos"
                    subtitle="Actividades y experiencias destacadas."
                >
                    <View style={styles.featureList}>
                        {place.highlights.map(
                            (highlight) => (
                                <FeatureItem
                                    key={highlight}
                                    icon="sparkles-outline"
                                    text={highlight}
                                />
                            ),
                        )}
                    </View>
                </DetailSection>

                <DetailSection title="Servicios disponibles">
                    <View style={styles.featureList}>
                        {place.services.map((service) => (
                            <FeatureItem
                                key={service}
                                icon="checkmark-circle-outline"
                                text={service}
                            />
                        ))}
                    </View>
                </DetailSection>

                <DetailSection
                    title="Ubicación"
                    subtitle={place.address}
                >
                    <Pressable
                        accessibilityRole="button"
                        onPress={openMap}
                        style={({ pressed }) => [
                            styles.mapPreview,
                            pressed && styles.pressed,
                        ]}
                    >
                        <View style={styles.mapBackground}>
                            <Ionicons
                                name="map"
                                size={46}
                                color={colors.primary.forest}
                            />

                            <Text style={styles.mapTitle}>
                                Ver ubicación en el mapa
                            </Text>

                            <Text style={styles.coordinates}>
                                {place.latitude.toFixed(5)},{" "}
                                {place.longitude.toFixed(5)}
                            </Text>
                        </View>

                        <View style={styles.mapAction}>
                            <Text style={styles.mapActionText}>
                                Abrir mapa
                            </Text>

                            <Ionicons
                                name="open-outline"
                                size={18}
                                color={colors.text.inverse}
                            />
                        </View>
                    </Pressable>
                </DetailSection>

                <DetailSection title="Horarios">
                    <PlaceScheduleCard
                        schedules={place.schedules}
                        currentDayNumber={
                            currentDayNumber
                        }
                    />
                </DetailSection>

                <DetailSection title="Contacto">
                    <View style={styles.contactList}>
                        {place.phone ? (
                            <ContactAction
                                icon="call-outline"
                                label="Teléfono"
                                value={place.phone}
                                onPress={() =>
                                    Linking.openURL(
                                        `tel:${place.phone}`,
                                    )
                                }
                            />
                        ) : null}

                        {place.email ? (
                            <ContactAction
                                icon="mail-outline"
                                label="Correo electrónico"
                                value={place.email}
                                onPress={() =>
                                    Linking.openURL(
                                        `mailto:${place.email}`,
                                    )
                                }
                            />
                        ) : null}

                        {place.website ? (
                            <ContactAction
                                icon="globe-outline"
                                label="Sitio web"
                                value={place.website}
                                onPress={() =>
                                    Linking.openURL(
                                        place.website!,
                                    )
                                }
                            />
                        ) : null}
                    </View>
                </DetailSection>

                <DetailSection
                    title="Recomendaciones"
                    subtitle="Consejos para disfrutar mejor tu visita."
                >
                    <View style={styles.recommendationCard}>
                        {place.recommendations.map(
                            (recommendation) => (
                                <View
                                    key={recommendation}
                                    style={
                                        styles.recommendationRow
                                    }
                                >
                                    <Ionicons
                                        name="bulb-outline"
                                        size={19}
                                        color={colors.warning}
                                    />

                                    <Text
                                        style={
                                            styles.recommendationText
                                        }
                                    >
                                        {recommendation}
                                    </Text>
                                </View>
                            ),
                        )}
                    </View>
                </DetailSection>

                <DetailSection
                    title="Experiencias de viajeros"
                    subtitle={`${place.reviewCount} experiencias publicadas`}
                >
                    <View style={styles.experienceList}>
                        {place.experiences.map(
                            (experience) => (
                                <ExperienceCard
                                    key={experience.id}
                                    experience={experience}
                                />
                            ),
                        )}
                    </View>

                    <AppButton
                        label="Compartir mi experiencia"
                        variant="outlined"
                        onPress={() =>
                            router.push({
                                pathname:
                                    "/share-experience",
                                params: {
                                    placeId: place.id,
                                    placeName: place.name,
                                },
                            })
                        }
                    />
                </DetailSection>

                <View style={styles.routeCard}>
                    <View style={styles.routeIcon}>
                        <Ionicons
                            name="sparkles"
                            size={25}
                            color={colors.warning}
                        />
                    </View>

                    <View style={styles.routeContent}>
                        <Text style={styles.routeEyebrow}>
                            RUMBONIC IA
                        </Text>

                        <Text style={styles.routeTitle}>
                            Crea una ruta desde este lugar
                        </Text>

                        <Text style={styles.routeDescription}>
                            Genera un itinerario personalizado que
                            tome este destino como referencia.
                        </Text>
                    </View>

                    <AppButton
                        label="Crear ruta inteligente"
                        onPress={handleCreateRoute}
                    />
                </View>

                <View style={styles.bottomActions}>
                    <AppButton
                        label={
                            isFavorite
                                ? "Eliminar de favoritos"
                                : "Guardar en favoritos"
                        }
                        variant="outlined"
                        onPress={() =>
                            toggleFavorite(place.id)
                        }
                    />

                    <AppButton
                        label="Volver a Explorar"
                        variant="text"
                        onPress={() =>
                            router.replace("/explore")
                        }
                    />
                </View>
            </View>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 0,
        paddingTop: 0,
        paddingBottom: 0,
    },

    pressed: {
        opacity: 0.84,
    },

    emptyContainer: {
        alignItems: "center",
        justifyContent: "center",
        gap: spacing.lg,
    },

    emptyIcon: {
        width: 80,
        height: 80,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radius.full,
        backgroundColor: colors.sand,
    },

    emptyTitle: {
        ...typography.h1,
        color: colors.text.primary,
    },

    emptyDescription: {
        ...typography.body,
        color: colors.text.secondary,
        textAlign: "center",
    },

    gallery: {
        height: 330,
        backgroundColor: colors.primary.forest,
    },

    galleryTopBar: {
        position: "absolute",
        top: spacing.lg,
        left: spacing.lg,
        right: spacing.lg,
        flexDirection: "row",
        justifyContent: "space-between",
    },

    galleryActions: {
        flexDirection: "row",
        gap: spacing.sm,
    },

    galleryButton: {
        width: 44,
        height: 44,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radius.full,
        backgroundColor: "rgba(255,255,255,0.94)",
    },

    imageCounter: {
        position: "absolute",
        right: spacing.lg,
        bottom: spacing.lg,
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: radius.full,
        backgroundColor: "rgba(0,0,0,0.62)",
    },

    imageCounterText: {
        ...typography.label,
        color: colors.text.inverse,
    },

    pagination: {
        position: "absolute",
        bottom: spacing.lg,
        left: spacing.lg,
        flexDirection: "row",
        gap: spacing.xs,
    },

    paginationDot: {
        width: 7,
        height: 7,
        borderRadius: radius.full,
        backgroundColor: "rgba(255,255,255,0.55)",
    },

    paginationDotActive: {
        width: 20,
        backgroundColor: colors.surface,
    },

    content: {
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.xl,
        paddingBottom: spacing.xxl,
    },

    badges: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: spacing.sm,
    },

    verifiedBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: radius.full,
        backgroundColor: "#EDF6F0",
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
        backgroundColor: colors.sand,
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

    title: {
        ...typography.h1,
        marginTop: spacing.md,
        color: colors.text.primary,
    },

    locationRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
        marginTop: spacing.sm,
    },

    locationText: {
        ...typography.body,
        color: colors.text.secondary,
    },

    openStatusRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
        marginTop: spacing.sm,
    },

    statusDot: {
        width: 9,
        height: 9,
        borderRadius: radius.full,
    },

    statusDotOpen: {
        backgroundColor: colors.primary.medium,
    },

    statusDotClosed: {
        backgroundColor: colors.error,
    },

    openStatusText: {
        ...typography.bodySmall,
    },

    openText: {
        color: colors.primary.forest,
    },

    closedStatusText: {
        color: colors.error,
    },

    metrics: {
        flexDirection: "row",
        gap: spacing.sm,
        marginTop: spacing.xl,
    },

    categories: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: spacing.sm,
        marginTop: spacing.lg,
    },

    categoryChip: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: radius.full,
        backgroundColor: colors.sand,
    },

    categoryText: {
        ...typography.label,
        color: colors.primary.forest,
    },

    description: {
        ...typography.body,
        color: colors.text.secondary,
    },

    featureList: {
        gap: spacing.sm,
    },

    mapPreview: {
        overflow: "hidden",
        borderWidth: 1,
        borderColor: colors.outline,
        borderRadius: radius.large,
        backgroundColor: "#EDF6F0",
    },

    mapBackground: {
        minHeight: 190,
        alignItems: "center",
        justifyContent: "center",
        padding: spacing.xl,
    },

    mapTitle: {
        ...typography.cardTitle,
        marginTop: spacing.md,
        color: colors.text.primary,
    },

    coordinates: {
        ...typography.bodySmall,
        marginTop: spacing.xs,
        color: colors.text.secondary,
    },

    mapAction: {
        minHeight: 48,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: spacing.sm,
        backgroundColor: colors.primary.forest,
    },

    mapActionText: {
        ...typography.cardTitle,
        color: colors.text.inverse,
    },

    contactList: {
        gap: spacing.sm,
    },

    recommendationCard: {
        gap: spacing.md,
        padding: spacing.lg,
        borderRadius: radius.large,
        backgroundColor: colors.sand,
    },

    recommendationRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: spacing.sm,
    },

    recommendationText: {
        ...typography.bodySmall,
        flex: 1,
        color: colors.text.primary,
    },

    experienceList: {
        gap: spacing.md,
        marginBottom: spacing.lg,
    },

    routeCard: {
        gap: spacing.md,
        marginTop: spacing.xxl,
        padding: spacing.xl,
        borderRadius: radius.extraLarge,
        backgroundColor: colors.primary.forest,
    },

    routeIcon: {
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radius.full,
        backgroundColor: "rgba(255,255,255,0.14)",
    },

    routeContent: {
        marginBottom: spacing.sm,
    },

    routeEyebrow: {
        ...typography.label,
        color: colors.warning,
    },

    routeTitle: {
        ...typography.h2,
        marginTop: spacing.sm,
        color: colors.text.inverse,
    },

    routeDescription: {
        ...typography.body,
        marginTop: spacing.sm,
        color: colors.text.inverse,
        opacity: 0.9,
    },

    bottomActions: {
        gap: spacing.sm,
        marginTop: spacing.xl,
    },
});