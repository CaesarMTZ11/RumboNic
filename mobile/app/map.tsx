import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { router } from "expo-router";
import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import {
    Alert,
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from "react-native";
import MapView, {
    Marker,
    PROVIDER_GOOGLE,
    Region,
} from "react-native-maps";

import {
    MapFilterChip,
    MapMarkerPin,
    MapPlacePreview,
} from "@/src/features/map/components";
import { filterMapPlaces } from "@/src/features/map/data/filterMapPlaces";
import { mapFilterOptions } from "@/src/features/map/data/mapFilters";
import { mapPlaces } from "@/src/features/map/data/mapPlaces";
import {
    MapCategoryFilter,
    MapPlace,
    UserMapLocation,
} from "@/src/features/map/types/mapTypes";
import { useFavoritesStore } from "@/src/store/useFavoritesStore";
import {
    colors,
    radius,
    spacing,
    typography,
} from "@/src/theme";

const NICARAGUA_REGION: Region = {
    latitude: 12.4,
    longitude: -85.3,
    latitudeDelta: 4.5,
    longitudeDelta: 4.5,
};

export default function MapScreen() {
    const mapRef = useRef<MapView | null>(
        null,
    );

    const [
        selectedFilter,
        setSelectedFilter,
    ] = useState<MapCategoryFilter>(
        "all",
    );

    const [
        selectedPlace,
        setSelectedPlace,
    ] = useState<MapPlace | null>(
        null,
    );

    const [
        userLocation,
        setUserLocation,
    ] = useState<UserMapLocation | null>(
        null,
    );

    const [
        isLocating,
        setIsLocating,
    ] = useState(false);

    const favoriteIds = useFavoritesStore(
        (state) => state.favoriteIds,
    );

    const toggleFavorite = useFavoritesStore(
        (state) => state.toggleFavorite,
    );

    const visiblePlaces = useMemo(
        () =>
            filterMapPlaces(
                mapPlaces,
                selectedFilter,
            ),
        [selectedFilter],
    );

    const locateUser = useCallback(
        async (
            animate = true,
            showError = true,
        ) => {
            try {
                setIsLocating(true);

                const permission =
                    await Location
                        .requestForegroundPermissionsAsync();

                if (
                    permission.status !== "granted"
                ) {
                    if (showError) {
                        Alert.alert(
                            "Permiso de ubicación",
                            "RumboNic necesita tu ubicación para mostrar destinos cercanos.",
                        );
                    }

                    return;
                }

                const location =
                    await Location
                        .getCurrentPositionAsync({
                            accuracy:
                                Location.Accuracy.Balanced,
                        });

                const coordinates = {
                    latitude:
                        location.coords.latitude,
                    longitude:
                        location.coords.longitude,
                };

                setUserLocation(coordinates);

                if (animate) {
                    mapRef.current?.animateToRegion(
                        {
                            ...coordinates,
                            latitudeDelta: 0.35,
                            longitudeDelta: 0.35,
                        },
                        600,
                    );
                }
            } catch {
                if (showError) {
                    Alert.alert(
                        "Ubicación no disponible",
                        "No pudimos obtener tu ubicación actual.",
                    );
                }
            } finally {
                setIsLocating(false);
            }
        },
        [],
    );

    useEffect(() => {
        locateUser(false, false);
    }, [locateUser]);

    useEffect(() => {
        if (
            selectedPlace &&
            !visiblePlaces.some(
                (place) =>
                    place.id === selectedPlace.id,
            )
        ) {
            setSelectedPlace(null);
        }
    }, [
        selectedFilter,
        selectedPlace,
        visiblePlaces,
    ]);

    function selectPlace(
        place: MapPlace,
    ) {
        setSelectedPlace(place);

        mapRef.current?.animateToRegion(
            {
                latitude: place.latitude,
                longitude: place.longitude,
                latitudeDelta: 0.12,
                longitudeDelta: 0.12,
            },
            450,
        );
    }

    function changeFilter(
        filter: MapCategoryFilter,
    ) {
        setSelectedFilter(filter);
        setSelectedPlace(null);
    }

    function showAllNicaragua() {
        setSelectedPlace(null);

        mapRef.current?.animateToRegion(
            NICARAGUA_REGION,
            650,
        );
    }

    function openPlace() {
        if (!selectedPlace) {
            return;
        }

        const place = selectedPlace;

        router.push({
            pathname: "/place/[id]",
            params: {
                id: place.id,
            },
        });
    }

    function createRouteFromPlace() {
        if (!selectedPlace) {
            return;
        }

        const place = selectedPlace;

        router.push({
            pathname: "/route-generator",
            params: {
                preferredPlaceId: place.id,
                preferredPlaceName:
                    place.name,
            },
        });
    }

    const topOffset =
        (StatusBar.currentHeight ?? 0) +
        spacing.sm;

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                translucent
                backgroundColor="transparent"
            />

            <MapView
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                style={StyleSheet.absoluteFill}
                initialRegion={NICARAGUA_REGION}
                showsUserLocation={
                    userLocation !== null
                }
                showsMyLocationButton={false}
                showsCompass={false}
                showsScale={false}
                toolbarEnabled={false}
                onPress={() =>
                    setSelectedPlace(null)
                }
            >
                {visiblePlaces.map((place) => (
                    <Marker
                        key={place.id}
                        coordinate={{
                            latitude: place.latitude,
                            longitude: place.longitude,
                        }}
                        tracksViewChanges
                        onPress={(event) => {
                            event.stopPropagation();
                            selectPlace(place);
                        }}
                    >
                        <MapMarkerPin
                            selected={
                                selectedPlace?.id ===
                                place.id
                            }
                            localBusiness={
                                place.isLocalBusiness
                            }
                        />
                    </Marker>
                ))}
            </MapView>

            <View
                style={[
                    styles.topControls,
                    {
                        top: topOffset,
                    },
                ]}
            >
                <View style={styles.topBar}>
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="Volver"
                        onPress={() => router.back()}
                        style={styles.roundButton}
                    >
                        <Ionicons
                            name="arrow-back"
                            size={23}
                            color={colors.text.primary}
                        />
                    </Pressable>

                    <View style={styles.searchDisplay}>
                        <Ionicons
                            name="search-outline"
                            size={20}
                            color={
                                colors.text.secondary
                            }
                        />

                        <Pressable
                            accessibilityRole="button"
                            onPress={() => router.back()}
                            style={
                                styles.searchDisplayContent
                            }
                        >
                            <Text
                                numberOfLines={1}
                                style={styles.searchText}
                            >
                                Explorar Nicaragua
                            </Text>

                            <Text
                                numberOfLines={1}
                                style={styles.searchSubtitle}
                            >
                                {visiblePlaces.length} lugares
                                en el mapa
                            </Text>
                        </Pressable>
                    </View>

                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="Ver todos Nicaragua"
                        onPress={showAllNicaragua}
                        style={styles.roundButton}
                    >
                        <Ionicons
                            name="expand-outline"
                            size={22}
                            color={colors.primary.forest}
                        />
                    </Pressable>
                </View>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={
                        false
                    }
                    contentContainerStyle={
                        styles.filters
                    }
                >
                    {mapFilterOptions.map(
                        (option) => (
                            <MapFilterChip
                                key={option.value}
                                option={option}
                                selected={
                                    selectedFilter ===
                                    option.value
                                }
                                onPress={() =>
                                    changeFilter(
                                        option.value,
                                    )
                                }
                            />
                        ),
                    )}
                </ScrollView>
            </View>

            <View
                style={[
                    styles.mapActions,
                    selectedPlace &&
                    styles.mapActionsWithPreview,
                ]}
            >
                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Mi ubicación"
                    disabled={isLocating}
                    onPress={() =>
                        locateUser(true, true)
                    }
                    style={({ pressed }) => [
                        styles.locationButton,
                        pressed && styles.pressed,
                        isLocating &&
                        styles.disabled,
                    ]}
                >
                    <Ionicons
                        name={
                            isLocating
                                ? "hourglass-outline"
                                : "navigate"
                        }
                        size={22}
                        color={colors.primary.forest}
                    />
                </Pressable>

                <Pressable
                    accessibilityRole="button"
                    onPress={() =>
                        router.push(
                            "/route-generator",
                        )
                    }
                    style={({ pressed }) => [
                        styles.aiRouteButton,
                        pressed && styles.pressed,
                    ]}
                >
                    <View style={styles.aiRouteIcon}>
                        <Ionicons
                            name="sparkles"
                            size={19}
                            color={colors.warning}
                        />
                    </View>

                    <Text style={styles.aiRouteText}>
                        Crear ruta con IA
                    </Text>
                </Pressable>
            </View>

            {selectedPlace ? (
                <View style={styles.preview}>
                    <MapPlacePreview
                        place={selectedPlace}
                        isFavorite={favoriteIds.includes(
                            selectedPlace.id,
                        )}
                        onClose={() =>
                            setSelectedPlace(null)
                        }
                        onFavoritePress={() =>
                            toggleFavorite(
                                selectedPlace.id,
                            )
                        }
                        onDetailsPress={openPlace}
                        onCreateRoutePress={
                            createRouteFromPlace
                        }
                    />
                </View>
            ) : (
                <View style={styles.mapLegend}>
                    <View style={styles.legendItem}>
                        <View
                            style={
                                styles.destinationLegendDot
                            }
                        />

                        <Text style={styles.legendText}>
                            Destinos
                        </Text>
                    </View>

                    <View style={styles.legendItem}>
                        <View
                            style={styles.localLegendDot}
                        />

                        <Text style={styles.legendText}>
                            Negocios locales
                        </Text>
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    pressed: {
        opacity: 0.82,
    },

    disabled: {
        opacity: 0.55,
    },

    topControls: {
        position: "absolute",
        left: 0,
        right: 0,
    },

    topBar: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
        paddingHorizontal: spacing.md,
    },

    roundButton: {
        width: 46,
        height: 46,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radius.full,
        backgroundColor:
            "rgba(255,255,255,0.97)",
    },

    searchDisplay: {
        minHeight: 52,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
        paddingHorizontal: spacing.md,
        borderRadius: radius.full,
        backgroundColor:
            "rgba(255,255,255,0.97)",
    },

    searchDisplayContent: {
        flex: 1,
    },

    searchText: {
        ...typography.cardTitle,
        color: colors.text.primary,
    },

    searchSubtitle: {
        ...typography.bodySmall,
        marginTop: 1,
        color: colors.text.secondary,
    },

    filters: {
        paddingHorizontal: spacing.md,
        paddingTop: spacing.sm,
        paddingBottom: spacing.sm,
    },

    mapActions: {
        position: "absolute",
        right: spacing.md,
        bottom: spacing.xl,
        alignItems: "flex-end",
        gap: spacing.sm,
    },

    mapActionsWithPreview: {
        bottom: 285,
    },

    locationButton: {
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radius.full,
        backgroundColor: colors.surface,
    },

    aiRouteButton: {
        minHeight: 50,
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
        paddingHorizontal: spacing.md,
        borderRadius: radius.full,
        backgroundColor: colors.primary.forest,
    },

    aiRouteIcon: {
        width: 30,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radius.full,
        backgroundColor:
            "rgba(255,255,255,0.14)",
    },

    aiRouteText: {
        ...typography.cardTitle,
        color: colors.text.inverse,
    },

    preview: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
    },

    mapLegend: {
        position: "absolute",
        left: spacing.md,
        bottom: spacing.xl,
        flexDirection: "row",
        gap: spacing.md,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: radius.full,
        backgroundColor:
            "rgba(255,255,255,0.95)",
    },

    legendItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
    },

    destinationLegendDot: {
        width: 10,
        height: 10,
        borderRadius: radius.full,
        backgroundColor:
            colors.primary.forest,
    },

    localLegendDot: {
        width: 10,
        height: 10,
        borderRadius: radius.full,
        backgroundColor: colors.earth,
    },

    legendText: {
        ...typography.bodySmall,
        color: colors.text.secondary,
    },
});