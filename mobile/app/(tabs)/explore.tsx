import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useFavoritesStore } from "@/src/store/useFavoritesStore";
import {
    FlatList,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { useMemo, useState } from "react";

import {
    AppButton,
    ScreenContainer,
} from "@/src/components/common";
import {
    ExploreCategoryChip,
    ExplorePlaceCard,
    FilterChoice,
} from "@/src/features/explore/components";
import {
    exploreCategories,
    exploreDepartments,
    explorePlaces,
} from "@/src/features/explore/data/exploreData";
import {
    ExploreFilters,
    ExplorePlace,
} from "@/src/features/explore/types/exploreTypes";
import { normalizeSearchText } from "@/src/features/explore/utils/searchUtils";
import {
    colors,
    radius,
    spacing,
    typography,
} from "@/src/theme";

const initialFilters: ExploreFilters = {
    department: null,
    minimumRating: 0,
    onlyVerified: false,
    onlyLocalBusinesses: false,
    onlySustainable: false,
};

export default function ExploreScreen() {
    const [query, setQuery] = useState("");
    const [selectedCategory, setSelectedCategory] =
        useState("all");

    const [filters, setFilters] =
        useState<ExploreFilters>(initialFilters);

    const [filterModalVisible, setFilterModalVisible] =
        useState(false);

    const favoriteIds = useFavoritesStore(
        (state) => state.favoriteIds,
    );

    const toggleFavorite = useFavoritesStore(
        (state) => state.toggleFavorite,
    );

    const filteredPlaces = useMemo(() => {
        const normalizedQuery =
            normalizeSearchText(query);

        return explorePlaces.filter((place) => {
            const searchableText = normalizeSearchText(
                [
                    place.name,
                    place.municipality,
                    place.department,
                    place.description,
                    ...place.categoryNames,
                ].join(" "),
            );

            const matchesSearch =
                normalizedQuery.length === 0 ||
                searchableText.includes(normalizedQuery);

            const matchesCategory =
                selectedCategory === "all" ||
                place.categoryIds.includes(
                    selectedCategory,
                );

            const matchesDepartment =
                filters.department === null ||
                place.department === filters.department;

            const matchesRating =
                place.rating >= filters.minimumRating;

            const matchesVerified =
                !filters.onlyVerified ||
                place.isVerified;

            const matchesLocalBusiness =
                !filters.onlyLocalBusinesses ||
                place.isLocalBusiness;

            const matchesSustainable =
                !filters.onlySustainable ||
                place.isSustainable;

            return (
                matchesSearch &&
                matchesCategory &&
                matchesDepartment &&
                matchesRating &&
                matchesVerified &&
                matchesLocalBusiness &&
                matchesSustainable
            );
        });
    }, [
        query,
        selectedCategory,
        filters,
    ]);

    const activeFilterCount = [
        filters.department !== null,
        filters.minimumRating > 0,
        filters.onlyVerified,
        filters.onlyLocalBusinesses,
        filters.onlySustainable,
    ].filter(Boolean).length;

    function openPlace(place: ExplorePlace) {
        router.push({
            pathname: "/place/[id]",
            params: {
                id: place.id,
            },
        });
    }

    function resetFilters() {
        setFilters(initialFilters);
    }

    return (
        <ScreenContainer scrollable={false}>
            <FlatList
                data={filteredPlaces}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <ExplorePlaceCard
                        place={item}
                        isFavorite={favoriteIds.includes(
                            item.id,
                        )}
                        onPress={() => openPlace(item)}
                        onFavoritePress={() =>
                            toggleFavorite(item.id)
                        }
                    />
                )}
                ListHeaderComponent={
                    <View>
                        <View style={styles.header}>
                            <View style={styles.headerText}>
                                <Text style={styles.eyebrow}>
                                    DESCUBRE NICARAGUA
                                </Text>

                                <Text style={styles.title}>
                                    Explorar
                                </Text>

                                <Text style={styles.subtitle}>
                                    Encuentra destinos, experiencias y
                                    negocios locales.
                                </Text>
                            </View>

                            <Pressable
                                accessibilityRole="button"
                                accessibilityLabel="Abrir mapa"
                                onPress={() =>
                                    router.push("/map")
                                }
                                style={styles.mapButton}
                            >
                                <Ionicons
                                    name="map-outline"
                                    size={23}
                                    color={colors.primary.forest}
                                />
                            </Pressable>
                        </View>

                        <View style={styles.searchContainer}>
                            <Ionicons
                                name="search-outline"
                                size={21}
                                color={colors.text.secondary}
                            />

                            <TextInput
                                value={query}
                                onChangeText={setQuery}
                                placeholder="Buscar destinos o actividades"
                                placeholderTextColor={
                                    colors.text.secondary
                                }
                                autoCapitalize="none"
                                autoCorrect={false}
                                returnKeyType="search"
                                style={styles.searchInput}
                            />

                            {query.length > 0 ? (
                                <Pressable
                                    accessibilityRole="button"
                                    accessibilityLabel="Limpiar búsqueda"
                                    hitSlop={8}
                                    onPress={() => setQuery("")}
                                >
                                    <Ionicons
                                        name="close-circle"
                                        size={21}
                                        color={colors.text.secondary}
                                    />
                                </Pressable>
                            ) : null}
                        </View>

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={
                                styles.categories
                            }
                        >
                            {exploreCategories.map(
                                (category) => (
                                    <ExploreCategoryChip
                                        key={category.id}
                                        category={category}
                                        selected={
                                            selectedCategory ===
                                            category.id
                                        }
                                        onPress={() =>
                                            setSelectedCategory(
                                                category.id,
                                            )
                                        }
                                    />
                                ),
                            )}
                        </ScrollView>

                        <View style={styles.controls}>
                            <Pressable
                                accessibilityRole="button"
                                onPress={() =>
                                    setFilterModalVisible(true)
                                }
                                style={styles.filterButton}
                            >
                                <Ionicons
                                    name="options-outline"
                                    size={19}
                                    color={colors.primary.forest}
                                />

                                <Text style={styles.filterButtonText}>
                                    Filtros
                                </Text>

                                {activeFilterCount > 0 ? (
                                    <View style={styles.filterCount}>
                                        <Text
                                            style={styles.filterCountText}
                                        >
                                            {activeFilterCount}
                                        </Text>
                                    </View>
                                ) : null}
                            </Pressable>

                            <Text style={styles.resultsText}>
                                {filteredPlaces.length}{" "}
                                {filteredPlaces.length === 1
                                    ? "resultado"
                                    : "resultados"}
                            </Text>
                        </View>
                    </View>
                }
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <View style={styles.emptyIcon}>
                            <Ionicons
                                name="search-outline"
                                size={34}
                                color={colors.primary.forest}
                            />
                        </View>

                        <Text style={styles.emptyTitle}>
                            No encontramos resultados
                        </Text>

                        <Text style={styles.emptyDescription}>
                            Prueba con otra búsqueda o elimina algunos
                            filtros.
                        </Text>

                        <AppButton
                            label="Limpiar filtros"
                            variant="outlined"
                            onPress={() => {
                                setQuery("");
                                setSelectedCategory("all");
                                resetFilters();
                            }}
                        />
                    </View>
                }
            />

            <Modal
                visible={filterModalVisible}
                transparent
                animationType="slide"
                statusBarTranslucent
                onRequestClose={() =>
                    setFilterModalVisible(false)
                }
            >
                <Pressable
                    style={styles.modalOverlay}
                    onPress={() =>
                        setFilterModalVisible(false)
                    }
                >
                    <Pressable
                        onPress={(event) =>
                            event.stopPropagation()
                        }
                        style={styles.filterSheet}
                    >
                        <View style={styles.sheetHandle} />

                        <View style={styles.sheetHeader}>
                            <View>
                                <Text style={styles.sheetTitle}>
                                    Filtrar lugares
                                </Text>

                                <Text style={styles.sheetSubtitle}>
                                    Personaliza tus resultados.
                                </Text>
                            </View>

                            <Pressable
                                accessibilityRole="button"
                                accessibilityLabel="Cerrar filtros"
                                onPress={() =>
                                    setFilterModalVisible(false)
                                }
                                style={styles.closeButton}
                            >
                                <Ionicons
                                    name="close"
                                    size={23}
                                    color={colors.text.primary}
                                />
                            </Pressable>
                        </View>

                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={
                                styles.sheetContent
                            }
                        >
                            <FilterSection title="Departamento">
                                <View style={styles.filterChoices}>
                                    <FilterChoice
                                        label="Todos"
                                        selected={
                                            filters.department === null
                                        }
                                        onPress={() =>
                                            setFilters((current) => ({
                                                ...current,
                                                department: null,
                                            }))
                                        }
                                    />

                                    {exploreDepartments.map(
                                        (department) => (
                                            <FilterChoice
                                                key={department}
                                                label={department}
                                                selected={
                                                    filters.department ===
                                                    department
                                                }
                                                onPress={() =>
                                                    setFilters(
                                                        (current) => ({
                                                            ...current,
                                                            department,
                                                        }),
                                                    )
                                                }
                                            />
                                        ),
                                    )}
                                </View>
                            </FilterSection>

                            <FilterSection title="Calificación mínima">
                                <View style={styles.filterChoices}>
                                    {[0, 4, 4.5, 4.8].map(
                                        (rating) => (
                                            <FilterChoice
                                                key={rating}
                                                label={
                                                    rating === 0
                                                        ? "Todas"
                                                        : `${rating}+ estrellas`
                                                }
                                                selected={
                                                    filters.minimumRating ===
                                                    rating
                                                }
                                                onPress={() =>
                                                    setFilters(
                                                        (current) => ({
                                                            ...current,
                                                            minimumRating:
                                                                rating,
                                                        }),
                                                    )
                                                }
                                            />
                                        ),
                                    )}
                                </View>
                            </FilterSection>

                            <FilterSection title="Características">
                                <View style={styles.filterChoices}>
                                    <FilterChoice
                                        label="Solo verificados"
                                        selected={
                                            filters.onlyVerified
                                        }
                                        onPress={() =>
                                            setFilters((current) => ({
                                                ...current,
                                                onlyVerified:
                                                    !current.onlyVerified,
                                            }))
                                        }
                                    />

                                    <FilterChoice
                                        label="Negocios locales"
                                        selected={
                                            filters.onlyLocalBusinesses
                                        }
                                        onPress={() =>
                                            setFilters((current) => ({
                                                ...current,
                                                onlyLocalBusinesses:
                                                    !current.onlyLocalBusinesses,
                                            }))
                                        }
                                    />

                                    <FilterChoice
                                        label="Turismo sostenible"
                                        selected={
                                            filters.onlySustainable
                                        }
                                        onPress={() =>
                                            setFilters((current) => ({
                                                ...current,
                                                onlySustainable:
                                                    !current.onlySustainable,
                                            }))
                                        }
                                    />
                                </View>
                            </FilterSection>
                        </ScrollView>

                        <View style={styles.sheetActions}>
                            <AppButton
                                label="Restablecer"
                                variant="outlined"
                                onPress={resetFilters}
                            />

                            <AppButton
                                label={`Ver ${filteredPlaces.length} resultados`}
                                onPress={() =>
                                    setFilterModalVisible(false)
                                }
                            />
                        </View>
                    </Pressable>
                </Pressable>
            </Modal>
        </ScreenContainer>
    );
}

type FilterSectionProps = {
    title: string;
    children: React.ReactNode;
};

function FilterSection({
    title,
    children,
}: FilterSectionProps) {
    return (
        <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>
                {title}
            </Text>

            {children}
        </View>
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
        gap: spacing.md,
    },

    headerText: {
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

    mapButton: {
        width: 46,
        height: 46,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: colors.outline,
        borderRadius: radius.full,
        backgroundColor: colors.surface,
    },

    searchContainer: {
        minHeight: 52,
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
        marginTop: spacing.lg,
        paddingHorizontal: spacing.lg,
        borderWidth: 1,
        borderColor: colors.outline,
        borderRadius: radius.full,
        backgroundColor: colors.surface,
    },

    searchInput: {
        ...typography.body,
        flex: 1,
        minHeight: 50,
        paddingVertical: 0,
        color: colors.text.primary,
    },

    categories: {
        paddingTop: spacing.lg,
        paddingBottom: spacing.sm,
    },

    controls: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: spacing.md,
        marginBottom: spacing.lg,
    },

    filterButton: {
        minHeight: 44,
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
        paddingHorizontal: spacing.md,
        borderWidth: 1,
        borderColor: colors.primary.forest,
        borderRadius: radius.full,
        backgroundColor: colors.surface,
    },

    filterButtonText: {
        ...typography.cardTitle,
        color: colors.primary.forest,
    },

    filterCount: {
        minWidth: 22,
        height: 22,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: spacing.xs,
        borderRadius: radius.full,
        backgroundColor: colors.primary.forest,
    },

    filterCountText: {
        ...typography.label,
        color: colors.text.inverse,
    },

    resultsText: {
        ...typography.bodySmall,
        color: colors.text.secondary,
    },

    emptyContainer: {
        alignItems: "center",
        justifyContent: "center",
        gap: spacing.md,
        paddingVertical: spacing.massive,
    },

    emptyIcon: {
        width: 70,
        height: 70,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radius.full,
        backgroundColor: colors.sand,
    },

    emptyTitle: {
        ...typography.h2,
        color: colors.text.primary,
    },

    emptyDescription: {
        ...typography.body,
        maxWidth: 300,
        color: colors.text.secondary,
        textAlign: "center",
    },

    modalOverlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: colors.overlay,
    },

    filterSheet: {
        maxHeight: "88%",
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.sm,
        paddingBottom: spacing.xl,
        borderTopLeftRadius: radius.extraLarge,
        borderTopRightRadius: radius.extraLarge,
        backgroundColor: colors.background,
    },

    sheetHandle: {
        width: 44,
        height: 5,
        alignSelf: "center",
        marginBottom: spacing.lg,
        borderRadius: radius.full,
        backgroundColor: colors.outline,
    },

    sheetHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: spacing.md,
    },

    sheetTitle: {
        ...typography.h2,
        color: colors.text.primary,
    },

    sheetSubtitle: {
        ...typography.bodySmall,
        marginTop: spacing.xs,
        color: colors.text.secondary,
    },

    closeButton: {
        width: 44,
        height: 44,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radius.full,
    },

    sheetContent: {
        paddingBottom: spacing.lg,
    },

    filterSection: {
        marginTop: spacing.xl,
    },

    filterSectionTitle: {
        ...typography.cardTitle,
        marginBottom: spacing.md,
        color: colors.text.primary,
    },

    filterChoices: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: spacing.sm,
    },

    sheetActions: {
        gap: spacing.sm,
        paddingTop: spacing.md,
        borderTopWidth: 1,
        borderTopColor: colors.divider,
    },
});