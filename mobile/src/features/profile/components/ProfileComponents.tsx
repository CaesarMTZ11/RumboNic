import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { UserProfile } from "@/src/features/profile/types/profileTypes";
import {
  colors,
  radius,
  spacing,
  typography,
} from "@/src/theme";

type ProfileHeroProps = {
  profile: UserProfile;
  onEditPress: () => void;
};

export function ProfileHero({
  profile,
  onEditPress,
}: ProfileHeroProps) {
  return (
    <View style={styles.hero}>
      <View style={styles.heroDecorationOne} />
      <View style={styles.heroDecorationTwo} />

      <View style={styles.avatarWrapper}>
        {profile.avatarUri ? (
          <Image
            source={{
              uri: profile.avatarUri,
            }}
            contentFit="cover"
            transition={200}
            style={styles.avatar}
          />
        ) : (
          <View style={styles.avatarFallback}>
            <Text style={styles.avatarLetter}>
              {profile.fullName
                .charAt(0)
                .toUpperCase()}
            </Text>
          </View>
        )}

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Editar perfil"
          onPress={onEditPress}
          style={({ pressed }) => [
            styles.editAvatarButton,
            pressed && styles.pressed,
          ]}
        >
          <Ionicons
            name="pencil"
            size={17}
            color={colors.primary.forest}
          />
        </Pressable>
      </View>

      <Text style={styles.heroName}>
        {profile.fullName}
      </Text>

      <Text style={styles.heroEmail}>
        {profile.email}
      </Text>

      <View style={styles.locationBadge}>
        <Ionicons
          name="location-outline"
          size={15}
          color={colors.text.inverse}
        />

        <Text style={styles.locationText}>
          {profile.municipality},{" "}
          {profile.department}
        </Text>
      </View>
    </View>
  );
}

type ProfileStatsProps = {
  visitedPlaces: number;
  experienceCount: number;
  favoriteCount: number;
  routeCount: number;
};

export function ProfileStats({
  visitedPlaces,
  experienceCount,
  favoriteCount,
  routeCount,
}: ProfileStatsProps) {
  return (
    <View style={styles.statsCard}>
      <ProfileStat
        value={visitedPlaces}
        label="Visitados"
      />

      <View style={styles.statsDivider} />

      <ProfileStat
        value={experienceCount}
        label="Experiencias"
      />

      <View style={styles.statsDivider} />

      <ProfileStat
        value={favoriteCount}
        label="Favoritos"
      />

      <View style={styles.statsDivider} />

      <ProfileStat
        value={routeCount}
        label="Rutas"
      />
    </View>
  );
}

function ProfileStat({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>
        {value}
      </Text>

      <Text style={styles.statLabel}>
        {label}
      </Text>
    </View>
  );
}

type SustainableImpactCardProps = {
  score: number;
  sustainableRoutes: number;
  localBusinesses: number;
};

export function SustainableImpactCard({
  score,
  sustainableRoutes,
  localBusinesses,
}: SustainableImpactCardProps) {
  return (
    <View style={styles.impactCard}>
      <View style={styles.impactHeader}>
        <View style={styles.impactIcon}>
          <Ionicons
            name="leaf"
            size={24}
            color={colors.primary.forest}
          />
        </View>

        <View style={styles.impactHeaderContent}>
          <Text style={styles.impactEyebrow}>
            IMPACTO RUMBONIC
          </Text>

          <Text style={styles.impactTitle}>
            Tu aporte sostenible
          </Text>
        </View>

        <View style={styles.score}>
          <Text style={styles.scoreValue}>
            {score}
          </Text>

          <Text style={styles.scoreMaximum}>
            /100
          </Text>
        </View>
      </View>

      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressValue,
            {
              width: `${score}%`,
            },
          ]}
        />
      </View>

      <View style={styles.impactMetrics}>
        <View style={styles.impactMetric}>
          <Ionicons
            name="map-outline"
            size={18}
            color={colors.primary.forest}
          />

          <Text style={styles.impactMetricValue}>
            {sustainableRoutes}
          </Text>

          <Text style={styles.impactMetricLabel}>
            rutas sostenibles
          </Text>
        </View>

        <View style={styles.impactMetric}>
          <Ionicons
            name="storefront-outline"
            size={18}
            color={colors.earth}
          />

          <Text style={styles.impactMetricValue}>
            {localBusinesses}
          </Text>

          <Text style={styles.impactMetricLabel}>
            negocios apoyados
          </Text>
        </View>
      </View>
    </View>
  );
}

type ProfileMenuItemProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description?: string;
  badge?: number;
  danger?: boolean;
  onPress: () => void;
};

export function ProfileMenuItem({
  icon,
  title,
  description,
  badge,
  danger = false,
  onPress,
}: ProfileMenuItemProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.menuItem,
        pressed && styles.pressed,
      ]}
    >
      <View
        style={[
          styles.menuIcon,
          danger && styles.menuIconDanger,
        ]}
      >
        <Ionicons
          name={icon}
          size={21}
          color={
            danger
              ? colors.error
              : colors.primary.forest
          }
        />
      </View>

      <View style={styles.menuContent}>
        <Text
          style={[
            styles.menuTitle,
            danger && styles.menuTitleDanger,
          ]}
        >
          {title}
        </Text>

        {description ? (
          <Text style={styles.menuDescription}>
            {description}
          </Text>
        ) : null}
      </View>

      {typeof badge === "number" &&
      badge > 0 ? (
        <View style={styles.menuBadge}>
          <Text style={styles.menuBadgeText}>
            {badge}
          </Text>
        </View>
      ) : null}

      <Ionicons
        name="chevron-forward"
        size={20}
        color={colors.text.secondary}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.82,
  },

  hero: {
    overflow: "hidden",
    alignItems: "center",
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxl,
    borderRadius: radius.extraLarge,
    backgroundColor: colors.primary.forest,
  },

  heroDecorationOne: {
    position: "absolute",
    top: -55,
    right: -45,
    width: 150,
    height: 150,
    borderRadius: radius.full,
    backgroundColor:
      "rgba(255,255,255,0.07)",
  },

  heroDecorationTwo: {
    position: "absolute",
    bottom: -70,
    left: -60,
    width: 180,
    height: 180,
    borderRadius: radius.full,
    backgroundColor:
      "rgba(127,183,126,0.15)",
  },

  avatarWrapper: {
    position: "relative",
  },

  avatar: {
    width: 108,
    height: 108,
    borderWidth: 4,
    borderColor: colors.surface,
    borderRadius: radius.full,
  },

  avatarFallback: {
    width: 108,
    height: 108,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: colors.surface,
    borderRadius: radius.full,
    backgroundColor: colors.primary.medium,
  },

  avatarLetter: {
    fontFamily: typography.h1.fontFamily,
    fontSize: 42,
    color: colors.text.inverse,
  },

  editAvatarButton: {
    position: "absolute",
    right: -2,
    bottom: 2,
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.primary.forest,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
  },

  heroName: {
    ...typography.h1,
    marginTop: spacing.md,
    color: colors.text.inverse,
    textAlign: "center",
  },

  heroEmail: {
    ...typography.bodySmall,
    marginTop: spacing.xs,
    color: colors.text.inverse,
    opacity: 0.82,
  },

  locationBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    marginTop: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
    backgroundColor:
      "rgba(255,255,255,0.14)",
  },

  locationText: {
    ...typography.label,
    color: colors.text.inverse,
  },

  statsCard: {
    minHeight: 94,
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.lg,
    paddingHorizontal: spacing.sm,
    borderWidth: 1,
    borderColor: colors.outline,
    borderRadius: radius.large,
    backgroundColor: colors.surface,
  },

  stat: {
    flex: 1,
    alignItems: "center",
    paddingVertical: spacing.md,
  },

  statValue: {
    ...typography.h2,
    color: colors.primary.forest,
  },

  statLabel: {
    ...typography.bodySmall,
    marginTop: spacing.xs,
    color: colors.text.secondary,
    textAlign: "center",
  },

  statsDivider: {
    width: 1,
    height: 48,
    backgroundColor: colors.divider,
  },

  impactCard: {
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.primary.light,
    borderRadius: radius.large,
    backgroundColor: "#EDF6F0",
  },

  impactHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },

  impactIcon: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.medium,
    backgroundColor: colors.surface,
  },

  impactHeaderContent: {
    flex: 1,
  },

  impactEyebrow: {
    ...typography.label,
    color: colors.primary.forest,
  },

  impactTitle: {
    ...typography.cardTitle,
    marginTop: spacing.xs,
    color: colors.text.primary,
  },

  score: {
    flexDirection: "row",
    alignItems: "baseline",
  },

  scoreValue: {
    ...typography.h1,
    color: colors.primary.forest,
  },

  scoreMaximum: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },

  progressTrack: {
    height: 9,
    overflow: "hidden",
    marginVertical: spacing.lg,
    borderRadius: radius.full,
    backgroundColor: colors.outline,
  },

  progressValue: {
    height: "100%",
    borderRadius: radius.full,
    backgroundColor: colors.primary.medium,
  },

  impactMetrics: {
    flexDirection: "row",
    gap: spacing.md,
  },

  impactMetric: {
    flex: 1,
    alignItems: "center",
    padding: spacing.md,
    borderRadius: radius.medium,
    backgroundColor: colors.surface,
  },

  impactMetricValue: {
    ...typography.h2,
    marginTop: spacing.xs,
    color: colors.text.primary,
  },

  impactMetricLabel: {
    ...typography.bodySmall,
    marginTop: spacing.xs,
    color: colors.text.secondary,
    textAlign: "center",
  },

  menuItem: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.outline,
    borderRadius: radius.medium,
    backgroundColor: colors.surface,
  },

  menuIcon: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.medium,
    backgroundColor: colors.sand,
  },

  menuIconDanger: {
    backgroundColor: "#FDEDEC",
  },

  menuContent: {
    flex: 1,
  },

  menuTitle: {
    ...typography.cardTitle,
    color: colors.text.primary,
  },

  menuTitleDanger: {
    color: colors.error,
  },

  menuDescription: {
    ...typography.bodySmall,
    marginTop: spacing.xs,
    color: colors.text.secondary,
  },

  menuBadge: {
    minWidth: 26,
    height: 26,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xs,
    borderRadius: radius.full,
    backgroundColor: colors.primary.forest,
  },

  menuBadgeText: {
    ...typography.label,
    color: colors.text.inverse,
  },
});