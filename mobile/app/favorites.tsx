import { Ionicons } from "@expo/vector-icons";
import {
    router,
    useLocalSearchParams,
} from "expo-router";
import {
    Alert,
    FlatList,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    AppButton,
    ScreenContainer,
} from "@/src/components/common";
import { ExplorePlaceCard } from "@/src/features/explore/components";
import { explorePlaces } from "@/src/features/explore/data/exploreData";
import {
    FavoriteFilterChip,
    FavoritesSummary,
    FavoritesTabSelector,
    SavedRouteCard,
} from "@/src/features/favorites/components";
import {
    FavoritePlaceFilter,
    FavoritesTab,
} from "@/src/features/favorites/types/favoriteTypes";
import { useRoutePlannerStore } from "@/src/features/route-planner/store/useRoutePlannerStore";
import { GeneratedRoute } from "@/src/features/route-planner/types/generatedRouteTypes";
import { useFavoritesStore } from "@/src/store/useFavoritesStore";
import { useSavedRoutesStore } from "@/src/store/useSavedRoutesStore";
import {
    colors,
    radius,
    spacing,
    typography,
} from "@/src/theme";

const placeFilterOptions: {
    value: FavoritePlaceFilter;
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
}[] = [
        {
            value: "all",
            label: "Todos",
            icon: "apps-outline",
        },
        {
            value: "destinations",
            label: "Destinos",
            icon: "location-outline",
        },
        {
            value: "local",
            label: "Negocios locales",
            icon: "storefront-outline",
        },
        {
            value: "sustainable",
            label: "Sostenibles",
            icon: "leaf-outline",
        },
    ];

export default function FavoritesScreen() {
    const params = useLocalSearchParams<{
        tab?: string | string[];
    }>();

    const requestedTab = Array.isArray(
        params.tab,
    )
        ? params.tab[0]
        : params.tab;

    useEffect(() => {
        if (
            requestedTab === "places" ||
            requestedTab === "routes"
        ) {
            setActiveTab(requestedTab);
        }
    }, [requestedTab]);

    const [activeTab, setActiveTab] =
        useState<FavoritesTab>("places");

    const [
        selectedPlaceFilter,
        setSelectedPlaceFilter,
    ] = useState<FavoritePlaceFilter>(
        "all",
    );

    const favoriteIds =
        useFavoritesStore(
            (state) =>
                state.favoriteIds,
        );

    const toggleFavorite =
        useFavoritesStore(
            (state) =>
                state.toggleFavorite,
        );

    const savedRoutes =
        useSavedRoutesStore(
            (state) =>
                state.savedRoutes,
        );

    const removeRoute =
        useSavedRoutesStore(
            (state) =>
                state.removeRoute,
        );

    const setGeneratedRoute =
        useRoutePlannerStore(
            (state) =>
                state.setGeneratedRoute,
        );

    const favoritePlaces = useMemo(
        () =>
            explorePlaces.filter((place) =>
                favoriteIds.includes(place.id),
            ),
        [favoriteIds],
    );

    const visiblePlaces = useMemo(() => {
        switch (selectedPlaceFilter) {
            case "destinations":
                return favoritePlaces.filter(
                    (place) =>
                        !place.isLocalBusiness,
                );

            case "local":
                return favoritePlaces.filter(
                    (place) =>
                        place.isLocalBusiness,
                );

            case "sustainable":
                return favoritePlaces.filter(
                    (place) =>
                        place.isSustainable,
                );

            case "all":
            default:
                return favoritePlaces;
        }
    }, [
        favoritePlaces,
        selectedPlaceFilter,
    ]);

    const localBusinessCount =
        favoritePlaces.filter(
            (place) =>
                place.isLocalBusiness,
        ).length;

    function openPlace(placeId: string) {
        router.push({
            pathname: "/place/[id]",
            params: {
                id: placeId,
            },
        });
    }

    function openSavedRoute(
        route: GeneratedRoute,
    ) {
        setGeneratedRoute(route);

        router.push("/route-result");
    }

    function confirmRemoveRoute(
        route: GeneratedRoute,
    ) {
        Alert.alert(
            "Eliminar ruta",
            `¿Deseas eliminar “${route.title}” de tus rutas guardadas?`,
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: () =>
                        removeRoute(route.id),
                },
            ],
        );
    }

    function renderHeader() {
        return (
            <View>
                <View style={styles.header}>
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="Volver"
                        onPress={() =>
                            router.back()
                        }
                        style={styles.backButton}
                    >
                        <Ionicons
                            name="arrow-back"
                            size={24}
                            color={colors.text.primary}
                        />
                    </Pressable>

                    <View style={styles.headerContent}>
                        <Text style={styles.eyebrow}>
                            TU COLECCIÓN
                        </Text>

                        <Text style={styles.title}>
                            Favoritos
                        </Text>

                        <Text style={styles.subtitle}>
                            Conserva lugares y rutas para
                            consultarlos más tarde.
                        </Text>
                    </View>
                </View>

                <FavoritesSummary
                    placeCount={
                        favoritePlaces.length
                    }
                    localBusinessCount={
                        localBusinessCount
                    }
                    routeCount={
                        savedRoutes.length
                    }
                />

                <View style={styles.tabs}>
                    <FavoritesTabSelector
                        value={activeTab}
                        placeCount={
                            favoritePlaces.length
                        }
                        routeCount={
                            savedRoutes.length
                        }
                        onChange={(tab) => {
                            setActiveTab(tab);
                            setSelectedPlaceFilter(
                                "all",
                            );
                        }}
                    />
                </View>

                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>
                        {activeTab === "places"
                            ? "Lugares guardados"
                            : "Rutas guardadas"}
                    </Text>

                    <Text style={styles.resultCount}>
                        {activeTab === "places"
                            ? visiblePlaces.length
                            : savedRoutes.length}
                    </Text>
                </View>

                {activeTab === "places" ? (
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={
                            false
                        }
                        contentContainerStyle={
                            styles.filters
                        }
                    >
                        {placeFilterOptions.map(
                            (option) => (
                                <FavoriteFilterChip
                                    key={option.value}
                                    value={option.value}
                                    label={option.label}
                                    icon={option.icon}
                                    selected={
                                        selectedPlaceFilter ===
                                        option.value
                                    }
                                    onPress={() =>
                                        setSelectedPlaceFilter(
                                            option.value,
                                        )
                                    }
                                />
                            ),
                        )}
                    </ScrollView>
                ) : (
                    <Text
                        style={
                            styles.routeExplanation
                        }
                    >
                        Abre una ruta para consultar
                        nuevamente su itinerario completo.
                    </Text>
                )}
            </View>
        );
    }

    function renderPlacesEmptyState() {
        const hasFavorites =
            favoritePlaces.length > 0;

        return (
            <View style={styles.emptyContainer}>
                <View style={styles.emptyIcon}>
                    <Ionicons
                        name={
                            hasFavorites
                                ? "filter-outline"
                                : "heart-outline"
                        }
                        size={38}
                        color={colors.primary.forest}
                    />
                </View>

                <Text style={styles.emptyTitle}>
                    {hasFavorites
                        ? "No hay lugares con este filtro"
                        : "Aún no tienes lugares favoritos"}
                </Text>

                <Text
                    style={styles.emptyDescription}
                >
                    {hasFavorites
                        ? "Selecciona otro filtro para consultar tus lugares guardados."
                        : "Explora destinos y toca el corazón para guardarlos aquí."}
                </Text>

                {hasFavorites ? (
                    <AppButton
                        label="Mostrar todos"
                        variant="outlined"
                        onPress={() =>
                            setSelectedPlaceFilter(
                                "all",
                            )
                        }
                    />
                ) : (
                    <AppButton
                        label="Explorar lugares"
                        onPress={() =>
                            router.push("/explore")
                        }
                    />
                )}
            </View>
        );
    }

    function renderRoutesEmptyState() {
        return (
            <View style={styles.emptyContainer}>
                <View style={styles.emptyIcon}>
                    <Ionicons
                        name="map-outline"
                        size={38}
                        color={colors.primary.forest}
                    />
                </View>

                <Text style={styles.emptyTitle}>
                    Aún no tienes rutas guardadas
                </Text>

                <Text
                    style={styles.emptyDescription}
                >
                    Genera una ruta inteligente y pulsa
                    “Guardar esta ruta” para conservarla.
                </Text>

                <AppButton
                    label="Crear ruta inteligente"
                    onPress={() =>
                        router.push(
                            "/route-generator",
                        )
                    }
                />
            </View>
        );
    }

    return (
        <ScreenContainer scrollable={false}>
            {activeTab === "places" ? (
                <FlatList
                    data={visiblePlaces}
                    keyExtractor={(item) =>
                        item.id
                    }
                    showsVerticalScrollIndicator={
                        false
                    }
                    contentContainerStyle={
                        styles.listContent
                    }
                    ListHeaderComponent={
                        renderHeader
                    }
                    renderItem={({ item }) => (
                        <ExplorePlaceCard
                            place={item}
                            isFavorite
                            onPress={() =>
                                openPlace(item.id)
                            }
                            onFavoritePress={() =>
                                toggleFavorite(item.id)
                            }
                        />
                    )}
                    ListEmptyComponent={
                        renderPlacesEmptyState
                    }
                />
            ) : (
                <FlatList
                    data={savedRoutes}
                    keyExtractor={(item) =>
                        item.id
                    }
                    showsVerticalScrollIndicator={
                        false
                    }
                    contentContainerStyle={
                        styles.listContent
                    }
                    ListHeaderComponent={
                        renderHeader
                    }
                    renderItem={({ item }) => (
                        <SavedRouteCard
                            route={item}
                            onPress={() =>
                                openSavedRoute(item)
                            }
                            onRemove={() =>
                                confirmRemoveRoute(item)
                            }
                        />
                    )}
                    ListEmptyComponent={
                        renderRoutesEmptyState
                    }
                />
            )}
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    listContent: {
        flexGrow: 1,
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.lg,
        paddingBottom: spacing.xxl,
    },

    header: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: spacing.sm,
    },

    backButton: {
        width: 44,
        height: 44,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radius.full,
    },

    headerContent: {
        flex: 1,
    },

    eyebrow: {
        ...typography.label,
        color: colors.primary.forest,
    },

    title: {
        ...typography.h1,
        marginTop: spacing.xs,
        color: colors.text.primary,
    },

    subtitle: {
        ...typography.body,
        marginTop: spacing.xs,
        color: colors.text.secondary,
    },

    tabs: {
        marginTop: spacing.lg,
    },

    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: spacing.xl,
    },

    sectionTitle: {
        ...typography.h2,
        color: colors.text.primary,
    },

    resultCount: {
        ...typography.cardTitle,
        color: colors.primary.forest,
    },

    filters: {
        paddingTop: spacing.md,
        paddingBottom: spacing.lg,
    },

    routeExplanation: {
        ...typography.bodySmall,
        marginTop: spacing.sm,
        marginBottom: spacing.lg,
        color: colors.text.secondary,
    },

    emptyContainer: {
        alignItems: "center",
        justifyContent: "center",
        gap: spacing.md,
        paddingVertical: spacing.xxl,
    },

    emptyIcon: {
        width: 76,
        height: 76,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radius.full,
        backgroundColor: colors.sand,
    },

    emptyTitle: {
        ...typography.h2,
        color: colors.text.primary,
        textAlign: "center",
    },

    emptyDescription: {
        ...typography.body,
        maxWidth: 310,
        color: colors.text.secondary,
        textAlign: "center",
    },
});