import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Alert,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { ScreenContainer } from "@/src/components/common";
import {
  ProfileHero,
  ProfileMenuItem,
  ProfileStats,
  SustainableImpactCard,
} from "@/src/features/profile/components";
import { useRoutePlannerStore } from "@/src/features/route-planner/store/useRoutePlannerStore";
import { useExperiencesStore } from "@/src/store/useExperiencesStore";
import { useFavoritesStore } from "@/src/store/useFavoritesStore";
import { useProfileStore } from "@/src/store/useProfileStore";
import { useSavedRoutesStore } from "@/src/store/useSavedRoutesStore";
import {
  colors,
  spacing,
  typography,
} from "@/src/theme";

export default function ProfileScreen() {
  const profile = useProfileStore(
    (state) => state.profile,
  );

  const resetProfile = useProfileStore(
    (state) => state.resetProfile,
  );

  const experiences = useExperiencesStore(
    (state) => state.experiences,
  );

  const clearExperiences =
    useExperiencesStore(
      (state) => state.clearExperiences,
    );

  const favoriteIds = useFavoritesStore(
    (state) => state.favoriteIds,
  );

  const clearFavorites =
    useFavoritesStore(
      (state) => state.clearFavorites,
    );

  const savedRoutes =
    useSavedRoutesStore(
      (state) => state.savedRoutes,
    );

  const clearSavedRoutes =
    useSavedRoutesStore(
      (state) => state.clearSavedRoutes,
    );

  const clearRoutePlanner =
    useRoutePlannerStore(
      (state) => state.clearRoutePlanner,
    );

  const visitedPlaceIds = new Set(
    experiences.map(
      (experience) => experience.placeId,
    ),
  );

  const localBusinessesSupported =
    favoriteIds.filter((placeId) =>
      [
        "cafe-catarina",
        "cafe-matagalpa",
      ].includes(placeId),
    ).length;

  const sustainableRoutes =
    savedRoutes.filter(
      (route) =>
        route.sustainabilityScore >= 75,
    ).length;

  const impactScore = Math.min(
    100,
    40 +
      sustainableRoutes * 12 +
      localBusinessesSupported * 8 +
      experiences.length * 5,
  );

  function openFavorites(
    tab: "places" | "routes",
  ) {
    router.push({
      pathname: "/favorites",
      params: {
        tab,
      },
    });
  }

  function openMyExperiences() {
    router.push({
      pathname: "/experiences",
      params: {
        tab: "mine",
      },
    });
  }

  function handleLogout() {
    Alert.alert(
      "Cerrar sesión",
      "¿Deseas cerrar tu sesión en RumboNic?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Cerrar sesión",
          style: "destructive",
          onPress: () => {
            clearExperiences();
            clearFavorites();
            clearSavedRoutes();
            clearRoutePlanner();
            resetProfile();

            router.replace("/login");
          },
        },
      ],
    );
  }

  return (
    <ScreenContainer
      contentContainerStyle={styles.container}
    >
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.eyebrow}>
            TU CUENTA
          </Text>

          <Text style={styles.title}>
            Perfil
          </Text>
        </View>

        <View style={styles.headerIcon}>
          <Ionicons
            name="person-outline"
            size={23}
            color={colors.primary.forest}
          />
        </View>
      </View>

      <ProfileHero
        profile={profile}
        onEditPress={() =>
          router.push("/edit-profile")
        }
      />

      <ProfileStats
        visitedPlaces={visitedPlaceIds.size}
        experienceCount={experiences.length}
        favoriteCount={favoriteIds.length}
        routeCount={savedRoutes.length}
      />

      <View style={styles.section}>
        <SustainableImpactCard
          score={impactScore}
          sustainableRoutes={
            sustainableRoutes
          }
          localBusinesses={
            localBusinessesSupported
          }
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Mi actividad
        </Text>

        <View style={styles.menu}>
          <ProfileMenuItem
            icon="heart-outline"
            title="Lugares favoritos"
            description="Destinos y negocios que guardaste."
            badge={favoriteIds.length}
            onPress={() =>
              openFavorites("places")
            }
          />

          <ProfileMenuItem
            icon="map-outline"
            title="Rutas guardadas"
            description="Consulta nuevamente tus itinerarios."
            badge={savedRoutes.length}
            onPress={() =>
              openFavorites("routes")
            }
          />

          <ProfileMenuItem
            icon="camera-outline"
            title="Mis experiencias"
            description="Publicaciones y lugares en revisión."
            badge={experiences.length}
            onPress={openMyExperiences}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Cuenta y preferencias
        </Text>

        <View style={styles.menu}>
          <ProfileMenuItem
            icon="person-circle-outline"
            title="Editar perfil"
            description="Actualiza tus datos personales."
            onPress={() =>
              router.push("/edit-profile")
            }
          />

          <ProfileMenuItem
            icon="options-outline"
            title="Preferencias"
            description="Notificaciones y recomendaciones."
            onPress={() =>
              router.push(
                "/profile-settings",
              )
            }
          />

          <ProfileMenuItem
            icon="information-circle-outline"
            title="Acerca de RumboNic"
            description="Versión MVP para el Hackathon."
            onPress={() =>
              Alert.alert(
                "RumboNic",
                "Plataforma inteligente para descubrir Nicaragua, generar rutas y apoyar el turismo local.",
              )
            }
          />
        </View>
      </View>

      <View style={styles.section}>
        <ProfileMenuItem
          icon="log-out-outline"
          title="Cerrar sesión"
          description="Salir de esta cuenta."
          danger
          onPress={handleLogout}
        />
      </View>

      <Text style={styles.version}>
        RumboNic MVP · Versión 1.0.0
      </Text>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: spacing.xxl,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.lg,
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

  headerIcon: {
    width: 46,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 23,
    backgroundColor: colors.sand,
  },

  section: {
    marginTop: spacing.xl,
  },

  sectionTitle: {
    ...typography.h2,
    marginBottom: spacing.md,
    color: colors.text.primary,
  },

  menu: {
    gap: spacing.sm,
  },

  version: {
    ...typography.bodySmall,
    marginTop: spacing.xxl,
    color: colors.text.secondary,
    textAlign: "center",
  },
});