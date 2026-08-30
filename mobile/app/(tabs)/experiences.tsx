import { Ionicons } from "@expo/vector-icons";
import {
  router,
  useLocalSearchParams,
} from "expo-router";
import {
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
import {
  ExperienceFeedCard,
  ExperienceFilterChip,
  ExperienceTabSelector,
  MyExperiencesSummary,
} from "@/src/features/experiences/components";
import { publicExperiences } from "@/src/features/experiences/data/experienceFeedData";
import {
  ExperienceFeedFilter,
  ExperienceFeedItem,
  ExperienceFeedTab,
} from "@/src/features/experiences/types/experienceFeedTypes";
import {
  filterExperiences,
  mapSharedExperienceToFeedItem,
} from "@/src/features/experiences/utils/experienceFeedUtils";
import { useExperiencesStore } from "@/src/store/useExperiencesStore";
import {
  colors,
  radius,
  spacing,
  typography,
} from "@/src/theme";

const filterOptions: {
  value: ExperienceFeedFilter;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}[] = [
    {
      value: "all",
      label: "Todas",
      icon: "apps-outline",
    },
    {
      value: "five-stars",
      label: "5 estrellas",
      icon: "star-outline",
    },
    {
      value: "verified",
      label: "Verificados",
      icon: "shield-checkmark-outline",
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

export default function ExperiencesScreen() {
  const params = useLocalSearchParams<{
    tab?: string | string[];
  }>();

  const requestedTab = Array.isArray(
    params.tab,
  )
    ? params.tab[0]
    : params.tab;

  const [activeTab, setActiveTab] =
    useState<ExperienceFeedTab>(
      "discover",
    );

  useEffect(() => {
    if (
      requestedTab === "discover" ||
      requestedTab === "mine"
    ) {
      setActiveTab(requestedTab);
      setSelectedFilter("all");
    }
  }, [requestedTab]);

  const [
    selectedFilter,
    setSelectedFilter,
  ] = useState<ExperienceFeedFilter>(
    "all",
  );

  const storedExperiences =
    useExperiencesStore(
      (state) => state.experiences,
    );

  const myExperiences = useMemo(
    () =>
      storedExperiences.map(
        mapSharedExperienceToFeedItem,
      ),
    [storedExperiences],
  );

  const discoverExperiences = useMemo(
    () => {
      const myPublishedExperiences =
        myExperiences.filter(
          (experience) =>
            experience.publicationStatus ===
            "PUBLISHED" &&
            experience.placeStatus ===
            "VERIFIED",
        );

      return [
        ...myPublishedExperiences,
        ...publicExperiences,
      ];
    },
    [myExperiences],
  );

  const sourceExperiences =
    activeTab === "discover"
      ? discoverExperiences
      : myExperiences;

  const visibleExperiences = useMemo(
    () =>
      filterExperiences(
        sourceExperiences,
        selectedFilter,
      ),
    [
      sourceExperiences,
      selectedFilter,
    ],
  );

  const publishedCount =
    myExperiences.filter(
      (experience) =>
        experience.publicationStatus ===
        "PUBLISHED",
    ).length;

  const pendingCount =
    myExperiences.filter(
      (experience) =>
        experience.publicationStatus ===
        "IN_REVIEW" ||
        experience.placeStatus ===
        "PENDING",
    ).length;

  const photoCount =
    myExperiences.reduce(
      (total, experience) =>
        total +
        experience.photoUris.length,
      0,
    );

  function changeTab(
    tab: ExperienceFeedTab,
  ) {
    setActiveTab(tab);
    setSelectedFilter("all");
  }

  function openPlace(
    experience: ExperienceFeedItem,
  ) {
    if (
      experience.placeStatus !==
      "VERIFIED" ||
      experience.placeId.startsWith(
        "pending-place-",
      )
    ) {
      return;
    }

    router.push({
      pathname: "/place/[id]",
      params: {
        id: experience.placeId,
      },
    });
  }

  return (
    <ScreenContainer scrollable={false}>
      <FlatList
        data={visibleExperiences}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.listContent
        }
        renderItem={({ item }) => (
          <ExperienceFeedCard
            experience={item}
            onPlacePress={
              item.placeStatus ===
                "VERIFIED" &&
                !item.placeId.startsWith(
                  "pending-place-",
                )
                ? () => openPlace(item)
                : undefined
            }
          />
        )}
        ListHeaderComponent={
          <View>
            <View style={styles.header}>
              <View style={styles.headerContent}>
                <Text style={styles.eyebrow}>
                  VIAJES REALES
                </Text>

                <Text style={styles.title}>
                  Experiencias
                </Text>

                <Text style={styles.subtitle}>
                  Descubre recomendaciones y
                  relatos compartidos por
                  viajeros.
                </Text>
              </View>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Compartir experiencia"
                onPress={() =>
                  router.push(
                    "/share-experience",
                  )
                }
                style={({ pressed }) => [
                  styles.addButton,
                  pressed && styles.pressed,
                ]}
              >
                <Ionicons
                  name="add"
                  size={25}
                  color={colors.text.inverse}
                />
              </Pressable>
            </View>

            <View style={styles.heroCard}>
              <View style={styles.heroIcon}>
                <Ionicons
                  name="images"
                  size={25}
                  color={colors.warning}
                />
              </View>

              <View style={styles.heroContent}>
                <Text style={styles.heroTitle}>
                  Comparte lo que descubriste
                </Text>

                <Text
                  style={styles.heroDescription}
                >
                  Tus fotografías y consejos
                  ayudan a otros viajeros y
                  enriquecen el turismo local.
                </Text>
              </View>

              <Pressable
                accessibilityRole="button"
                onPress={() =>
                  router.push(
                    "/share-experience",
                  )
                }
                style={styles.heroAction}
              >
                <Text
                  style={
                    styles.heroActionText
                  }
                >
                  Publicar
                </Text>

                <Ionicons
                  name="arrow-forward"
                  size={17}
                  color={
                    colors.primary.forest
                  }
                />
              </Pressable>
            </View>

            <View style={styles.tabs}>
              <ExperienceTabSelector
                value={activeTab}
                mineCount={
                  myExperiences.length
                }
                onChange={changeTab}
              />
            </View>

            {activeTab === "mine" ? (
              <MyExperiencesSummary
                publishedCount={
                  publishedCount
                }
                pendingCount={pendingCount}
                photoCount={photoCount}
              />
            ) : null}

            <View style={styles.filterHeader}>
              <Text
                style={styles.filterTitle}
              >
                {activeTab === "discover"
                  ? "Explora experiencias"
                  : "Filtrar mis publicaciones"}
              </Text>

              <Text
                style={styles.resultCount}
              >
                {visibleExperiences.length}{" "}
                {visibleExperiences.length ===
                  1
                  ? "experiencia"
                  : "experiencias"}
              </Text>
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
              {filterOptions.map(
                (option) => (
                  <ExperienceFilterChip
                    key={option.value}
                    filter={option.value}
                    label={option.label}
                    icon={option.icon}
                    selected={
                      selectedFilter ===
                      option.value
                    }
                    onPress={() =>
                      setSelectedFilter(
                        option.value,
                      )
                    }
                  />
                ),
              )}
            </ScrollView>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIcon}>
              <Ionicons
                name={
                  activeTab === "mine"
                    ? "camera-outline"
                    : "search-outline"
                }
                size={38}
                color={colors.primary.forest}
              />
            </View>

            <Text style={styles.emptyTitle}>
              {activeTab === "mine" &&
                myExperiences.length === 0
                ? "Aún no has compartido experiencias"
                : "No hay resultados para este filtro"}
            </Text>

            <Text
              style={
                styles.emptyDescription
              }
            >
              {activeTab === "mine" &&
                myExperiences.length === 0
                ? "Publica fotografías, una calificación y recomendaciones de tu próxima visita."
                : "Selecciona otra categoría para encontrar más experiencias."}
            </Text>

            {activeTab === "mine" &&
              myExperiences.length === 0 ? (
              <AppButton
                label="Compartir experiencia"
                onPress={() =>
                  router.push(
                    "/share-experience",
                  )
                }
              />
            ) : (
              <AppButton
                label="Mostrar todas"
                variant="outlined"
                onPress={() =>
                  setSelectedFilter("all")
                }
              />
            )}
          </View>
        }
      />
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

  pressed: {
    opacity: 0.83,
  },

  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md,
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

  addButton: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    backgroundColor: colors.primary.forest,
  },

  heroCard: {
    marginTop: spacing.lg,
    padding: spacing.lg,
    borderRadius: radius.extraLarge,
    backgroundColor: colors.primary.forest,
  },

  heroIcon: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    backgroundColor:
      "rgba(255,255,255,0.14)",
  },

  heroContent: {
    marginTop: spacing.md,
  },

  heroTitle: {
    ...typography.h2,
    color: colors.text.inverse,
  },

  heroDescription: {
    ...typography.body,
    marginTop: spacing.sm,
    color: colors.text.inverse,
    opacity: 0.9,
  },

  heroAction: {
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    marginTop: spacing.lg,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
  },

  heroActionText: {
    ...typography.cardTitle,
    color: colors.primary.forest,
  },

  tabs: {
    marginTop: spacing.lg,
  },

  filterHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
    marginTop: spacing.xl,
  },

  filterTitle: {
    ...typography.h2,
    flex: 1,
    color: colors.text.primary,
  },

  resultCount: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },

  filters: {
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.md,
    paddingVertical: spacing.massive,
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