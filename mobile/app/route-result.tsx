import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useSavedRoutesStore } from "@/src/store/useSavedRoutesStore";
import { router } from "expo-router";
import {
  Alert,
  Pressable,
  Share,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  AppButton,
  ScreenContainer,
} from "@/src/components/common";
import {
  AITipCard,
  ItineraryStopCard,
  RouteMetricCard,
  RouteOverview,
  SustainabilityCard,
} from "@/src/features/route-planner/components";
import { useRoutePlannerStore } from "@/src/features/route-planner/store/useRoutePlannerStore";
import {
  formatCurrency,
  formatDistance,
  formatDuration,
  formatGeneratedDate,
} from "@/src/features/route-planner/utils/routeFormatters";
import {
  colors,
  radius,
  spacing,
  typography,
} from "@/src/theme";

export default function RouteResultScreen() {
  const generatedRoute = useRoutePlannerStore(
    (state) => state.generatedRoute,
  );

  const savedRoutes = useSavedRoutesStore(
    (state) => state.savedRoutes,
  );

  const toggleSavedRoute =
    useSavedRoutesStore(
      (state) =>
        state.toggleSavedRoute,
    );

  if (!generatedRoute) {
    return (
      <ScreenContainer
        contentContainerStyle={styles.emptyContainer}
      >
        <View style={styles.emptyIcon}>
          <Ionicons
            name="map-outline"
            size={42}
            color={colors.primary.forest}
          />
        </View>

        <Text style={styles.emptyTitle}>
          Aún no has generado una ruta
        </Text>

        <Text style={styles.emptyDescription}>
          Indica tus preferencias para que RumboNic
          prepare una aventura personalizada.
        </Text>

        <AppButton
          label="Crear una ruta"
          onPress={() =>
            router.replace("/route-generator")
          }
        />
      </ScreenContainer>
    );
  }

  const currentRoute = generatedRoute;

  const isRouteSaved =
    savedRoutes.some(
      (route) =>
        route.id === currentRoute.id,
    );

  async function handleShare() {
    if (!generatedRoute) {
      Alert.alert(
        "Ruta no disponible",
        "Primero debes generar una ruta para poder compartirla.",
      );

      return;
    }

    const stops = generatedRoute.stops
      .map(
        (stop) =>
          `${stop.order}. ${stop.name} — ${stop.startTime}`,
      )
      .join("\n");

    const message = [
      `🧭 ${generatedRoute.title}`,
      "",
      generatedRoute.summary,
      "",
      stops,
      "",
      `💰 ${formatCurrency(
        generatedRoute.estimatedCost,
      )}`,
      `⏱️ ${formatDuration(
        generatedRoute.totalDurationMinutes,
      )}`,
      `📍 ${formatDistance(
        generatedRoute.distanceKm,
      )}`,
      "",
      "Ruta creada con RumboNic.",
    ].join("\n");

    try {
      await Share.share({
        title: generatedRoute.title,
        message,
      });
    } catch {
      Alert.alert(
        "No se pudo compartir",
        "Inténtalo nuevamente.",
      );
    }
  }

  function handleSave() {
    const nextSavedState =
      !isRouteSaved;

    toggleSavedRoute(currentRoute);

    Alert.alert(
      nextSavedState
        ? "Ruta guardada"
        : "Ruta eliminada",
      nextSavedState
        ? "La ruta se agregó a tus rutas guardadas."
        : "La ruta fue eliminada de tus guardados.",
    );
  }

  return (
    <ScreenContainer
      contentContainerStyle={styles.container}
    >
      <View style={styles.topBar}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Volver"
          hitSlop={10}
          onPress={() => router.back()}
          style={styles.iconButton}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={colors.text.primary}
          />
        </Pressable>

        <View style={styles.topBarCenter}>
          <Text style={styles.topBarTitle}>
            Tu ruta
          </Text>

          <Text style={styles.topBarSubtitle}>
            Generada con inteligencia artificial
          </Text>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Compartir ruta"
          hitSlop={10}
          onPress={handleShare}
          style={styles.iconButton}
        >
          <Ionicons
            name="share-social-outline"
            size={23}
            color={colors.text.primary}
          />
        </Pressable>
      </View>

      <View style={styles.hero}>
        <Image
          source={{
            uri: generatedRoute.stops[0]?.imageUrl,
          }}
          contentFit="cover"
          transition={250}
          style={StyleSheet.absoluteFillObject}
        />

        <LinearGradient
          colors={[
            "rgba(13, 52, 32, 0.35)",
            "rgba(13, 52, 32, 0.95)",
          ]}
          style={StyleSheet.absoluteFillObject}
        />

        <View style={styles.heroContent}>
          <View style={styles.heroBadges}>
            <View style={styles.aiBadge}>
              <Ionicons
                name="sparkles"
                size={15}
                color={colors.warning}
              />

              <Text style={styles.aiBadgeText}>
                GENERADA CON IA
              </Text>
            </View>

            <View style={styles.demoBadge}>
              <Text style={styles.demoBadgeText}>
                DEMO MVP
              </Text>
            </View>
          </View>

          <Text style={styles.heroTitle}>
            {generatedRoute.title}
          </Text>

          <Text style={styles.heroSummary}>
            {generatedRoute.summary}
          </Text>

          <View style={styles.heroFooter}>
            <Text style={styles.heroDate}>
              Creada el{" "}
              {formatGeneratedDate(
                generatedRoute.generatedAt,
              )}
            </Text>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel={
                isRouteSaved
                  ? "Eliminar ruta guardada"
                  : "Guardar ruta"
              }
              onPress={handleSave}
              style={styles.saveIconButton}
            >
              <Ionicons
                name={
                  isRouteSaved
                    ? "bookmark"
                    : "bookmark-outline"
                }
                size={22}
                color={
                  isRouteSaved
                    ? colors.warning
                    : colors.text.inverse
                }
              />
            </Pressable>
          </View>
        </View>
      </View>

      <View style={styles.metrics}>
        <RouteMetricCard
          icon="cash-outline"
          label="Costo estimado"
          value={formatCurrency(
            generatedRoute.estimatedCost,
          )}
        />

        <RouteMetricCard
          icon="time-outline"
          label="Duración"
          value={formatDuration(
            generatedRoute.totalDurationMinutes,
          )}
        />

        <RouteMetricCard
          icon="navigate-outline"
          label="Distancia"
          value={formatDistance(
            generatedRoute.distanceKm,
          )}
        />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>
              Resumen del recorrido
            </Text>

            <Text style={styles.sectionSubtitle}>
              {generatedRoute.stops.length} paradas desde{" "}
              {generatedRoute.originLabel}
            </Text>
          </View>

          <View style={styles.verifiedBadge}>
            <Ionicons
              name="shield-checkmark"
              size={15}
              color={colors.primary.forest}
            />

            <Text style={styles.verifiedText}>
              Verificados
            </Text>
          </View>
        </View>

        <RouteOverview
          origin={generatedRoute.originLabel}
          stops={generatedRoute.stops}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Tu itinerario
        </Text>

        <Text style={styles.sectionSubtitle}>
          Cada parada fue elegida según tus
          preferencias.
        </Text>

        <View style={styles.itinerary}>
          {generatedRoute.stops.map(
            (stop, index) => (
              <ItineraryStopCard
                key={stop.id}
                stop={stop}
                isLast={
                  index ===
                  generatedRoute.stops.length - 1
                }
                onPress={() =>
                  router.push({
                    pathname: "/place/[id]",
                    params: {
                      id: stop.placeId,
                    },
                  })
                }
              />
            ),
          )}
        </View>
      </View>

      <AITipCard tip={generatedRoute.aiTip} />

      <View style={styles.section}>
        <SustainabilityCard
          score={
            generatedRoute.sustainabilityScore
          }
        />
      </View>

      <View style={styles.actions}>
        <AppButton
          label={
            isRouteSaved
              ? "Ruta guardada"
              : "Guardar esta ruta"
          }
          onPress={handleSave}
        />

        <AppButton
          label="Editar preferencias"
          variant="outlined"
          onPress={() => router.back()}
        />

        <AppButton
          label="Volver al inicio"
          variant="text"
          onPress={() => router.replace("/home")}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.md,
    paddingBottom: spacing.xxl,
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
    textAlign: "center",
  },

  emptyDescription: {
    ...typography.body,
    maxWidth: 310,
    color: colors.text.secondary,
    textAlign: "center",
  },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.lg,
  },

  iconButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
  },

  topBarCenter: {
    flex: 1,
    alignItems: "center",
  },

  topBarTitle: {
    ...typography.cardTitle,
    color: colors.text.primary,
  },

  topBarSubtitle: {
    ...typography.bodySmall,
    marginTop: 2,
    color: colors.text.secondary,
  },

  hero: {
    minHeight: 340,
    overflow: "hidden",
    borderRadius: radius.extraLarge,
    backgroundColor: colors.primary.forest,
  },

  heroContent: {
    flex: 1,
    justifyContent: "flex-end",
    padding: spacing.xl,
  },

  heroBadges: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },

  aiBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
    backgroundColor: "rgba(27,94,58,0.88)",
  },

  aiBadgeText: {
    ...typography.label,
    color: colors.text.inverse,
  },

  demoBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
    backgroundColor: "rgba(245,179,1,0.92)",
  },

  demoBadgeText: {
    ...typography.label,
    color: colors.text.primary,
  },

  heroTitle: {
    ...typography.h1,
    color: colors.text.inverse,
  },

  heroSummary: {
    ...typography.body,
    marginTop: spacing.sm,
    color: colors.text.inverse,
    opacity: 0.92,
  },

  heroFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: spacing.lg,
  },

  heroDate: {
    ...typography.bodySmall,
    flex: 1,
    color: colors.text.inverse,
    opacity: 0.8,
  },

  saveIconButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    backgroundColor: "rgba(255,255,255,0.15)",
  },

  metrics: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.lg,
  },

  section: {
    marginTop: spacing.xl,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: spacing.md,
    marginBottom: spacing.md,
  },

  sectionTitle: {
    ...typography.h2,
    color: colors.text.primary,
  },

  sectionSubtitle: {
    ...typography.bodySmall,
    marginTop: spacing.xs,
    color: colors.text.secondary,
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

  itinerary: {
    marginTop: spacing.lg,
  },

  actions: {
    gap: spacing.md,
    marginTop: spacing.xl,
  },
});