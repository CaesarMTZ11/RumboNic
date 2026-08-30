import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Pressable,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";

import {
  AppButton,
  ScreenContainer,
} from "@/src/components/common";
import { ProfilePreferences } from "@/src/features/profile/types/profileTypes";
import { useProfileStore } from "@/src/store/useProfileStore";
import {
  colors,
  radius,
  spacing,
  typography,
} from "@/src/theme";

export default function ProfileSettingsScreen() {
  const preferences = useProfileStore(
    (state) => state.preferences,
  );

  const setPreference = useProfileStore(
    (state) => state.setPreference,
  );

  function changePreference<
    Key extends keyof ProfilePreferences,
  >(
    key: Key,
    value: ProfilePreferences[Key],
  ) {
    setPreference(key, value);
  }

  return (
    <ScreenContainer
      contentContainerStyle={styles.container}
    >
      <View style={styles.topBar}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Volver"
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={colors.text.primary}
          />
        </Pressable>

        <View style={styles.topBarContent}>
          <Text style={styles.title}>
            Preferencias
          </Text>

          <Text style={styles.subtitle}>
            Personaliza tu experiencia
          </Text>
        </View>
      </View>

      <View style={styles.hero}>
        <View style={styles.heroIcon}>
          <Ionicons
            name="options"
            size={28}
            color={colors.primary.forest}
          />
        </View>

        <Text style={styles.heroTitle}>
          RumboNic a tu manera
        </Text>

        <Text style={styles.heroDescription}>
          Decide qué recomendaciones y avisos
          deseas recibir durante tus viajes.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Notificaciones
        </Text>

        <View style={styles.preferences}>
          <PreferenceRow
            icon="notifications-outline"
            title="Notificaciones"
            description="Permitir avisos generales de RumboNic."
            value={
              preferences.notificationsEnabled
            }
            onValueChange={(value) =>
              changePreference(
                "notificationsEnabled",
                value,
              )
            }
          />

          <PreferenceRow
            icon="alarm-outline"
            title="Recordatorios de rutas"
            description="Recibir avisos antes de iniciar una ruta guardada."
            value={
              preferences.routeRemindersEnabled
            }
            disabled={
              !preferences.notificationsEnabled
            }
            onValueChange={(value) =>
              changePreference(
                "routeRemindersEnabled",
                value,
              )
            }
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Recomendaciones
        </Text>

        <View style={styles.preferences}>
          <PreferenceRow
            icon="leaf-outline"
            title="Opciones sostenibles"
            description="Priorizar lugares y rutas con impacto positivo."
            value={
              preferences
                .sustainableSuggestionsEnabled
            }
            onValueChange={(value) =>
              changePreference(
                "sustainableSuggestionsEnabled",
                value,
              )
            }
          />

          <PreferenceRow
            icon="navigate-outline"
            title="Sugerencias cercanas"
            description="Utilizar tu ubicación para mostrar lugares próximos."
            value={
              preferences
                .locationSuggestionsEnabled
            }
            onValueChange={(value) =>
              changePreference(
                "locationSuggestionsEnabled",
                value,
              )
            }
          />
        </View>
      </View>

      <View style={styles.privacyNotice}>
        <Ionicons
          name="shield-checkmark-outline"
          size={22}
          color={colors.primary.forest}
        />

        <Text style={styles.privacyText}>
          Estas preferencias solo controlan la
          experiencia dentro de RumboNic. La
          ubicación no se publica en tu perfil.
        </Text>
      </View>

      <AppButton
        label="Guardar y volver"
        onPress={() => router.back()}
      />
    </ScreenContainer>
  );
}

type PreferenceRowProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  value: boolean;
  disabled?: boolean;
  onValueChange: (
    value: boolean,
  ) => void;
};

function PreferenceRow({
  icon,
  title,
  description,
  value,
  disabled = false,
  onValueChange,
}: PreferenceRowProps) {
  return (
    <View
      style={[
        styles.preferenceRow,
        disabled && styles.disabled,
      ]}
    >
      <View style={styles.preferenceIcon}>
        <Ionicons
          name={icon}
          size={21}
          color={colors.primary.forest}
        />
      </View>

      <View style={styles.preferenceContent}>
        <Text style={styles.preferenceTitle}>
          {title}
        </Text>

        <Text
          style={styles.preferenceDescription}
        >
          {description}
        </Text>
      </View>

      <Switch
        value={value}
        disabled={disabled}
        onValueChange={onValueChange}
        trackColor={{
          false: colors.outline,
          true: colors.primary.light,
        }}
        thumbColor={
          value
            ? colors.primary.forest
            : colors.surface
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: spacing.xxl,
  },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
  },

  backButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
  },

  topBarContent: {
    flex: 1,
    marginLeft: spacing.sm,
  },

  title: {
    ...typography.h2,
    color: colors.text.primary,
  },

  subtitle: {
    ...typography.bodySmall,
    marginTop: spacing.xs,
    color: colors.text.secondary,
  },

  hero: {
    alignItems: "center",
    marginTop: spacing.lg,
    padding: spacing.xl,
    borderRadius: radius.extraLarge,
    backgroundColor: colors.sand,
  },

  heroIcon: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    backgroundColor: colors.surface,
  },

  heroTitle: {
    ...typography.h1,
    marginTop: spacing.md,
    color: colors.text.primary,
    textAlign: "center",
  },

  heroDescription: {
    ...typography.body,
    maxWidth: 310,
    marginTop: spacing.sm,
    color: colors.text.secondary,
    textAlign: "center",
  },

  section: {
    marginTop: spacing.xl,
  },

  sectionTitle: {
    ...typography.h2,
    marginBottom: spacing.md,
    color: colors.text.primary,
  },

  preferences: {
    gap: spacing.sm,
  },

  preferenceRow: {
    minHeight: 88,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.outline,
    borderRadius: radius.large,
    backgroundColor: colors.surface,
  },

  disabled: {
    opacity: 0.5,
  },

  preferenceIcon: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.medium,
    backgroundColor: colors.sand,
  },

  preferenceContent: {
    flex: 1,
  },

  preferenceTitle: {
    ...typography.cardTitle,
    color: colors.text.primary,
  },

  preferenceDescription: {
    ...typography.bodySmall,
    marginTop: spacing.xs,
    color: colors.text.secondary,
  },

  privacyNotice: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm,
    marginVertical: spacing.xl,
    padding: spacing.md,
    borderRadius: radius.large,
    backgroundColor: "#EDF6F0",
  },

  privacyText: {
    ...typography.bodySmall,
    flex: 1,
    color: colors.text.primary,
  },
});