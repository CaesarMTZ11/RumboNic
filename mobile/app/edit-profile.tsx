import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import { router } from "expo-router";
import {
  Controller,
  useForm,
} from "react-hook-form";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  AppButton,
  AppInput,
  ScreenContainer,
} from "@/src/components/common";
import {
  EditProfileFormData,
  editProfileSchema,
} from "@/src/features/profile/schemas/editProfileSchema";
import { useProfileStore } from "@/src/store/useProfileStore";
import {
  colors,
  radius,
  spacing,
  typography,
} from "@/src/theme";

export default function EditProfileScreen() {
  const profile = useProfileStore(
    (state) => state.profile,
  );

  const updateProfile = useProfileStore(
    (state) => state.updateProfile,
  );

  const {
    control,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<EditProfileFormData>({
    resolver: zodResolver(
      editProfileSchema,
    ),

    defaultValues: {
      fullName: profile.fullName,
      email: profile.email,
      municipality:
        profile.municipality,
      department: profile.department,
    },

    mode: "onTouched",
  });

  async function selectAvatar() {
    const permission =
      await ImagePicker
        .requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permiso necesario",
        "RumboNic necesita acceso a tus fotografías para cambiar la imagen de perfil.",
      );

      return;
    }

    const result =
      await ImagePicker
        .launchImageLibraryAsync({
          mediaTypes: ["images"],
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.8,
        });

    if (result.canceled) {
      return;
    }

    const selectedUri =
      result.assets[0]?.uri;

    if (!selectedUri) {
      return;
    }

    updateProfile({
      avatarUri: selectedUri,
    });
  }

  function removeAvatar() {
    Alert.alert(
      "Eliminar fotografía",
      "¿Deseas eliminar tu fotografía de perfil?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () =>
            updateProfile({
              avatarUri: null,
            }),
        },
      ],
    );
  }

  async function onSubmit(
    data: EditProfileFormData,
  ) {
    await new Promise((resolve) =>
      setTimeout(resolve, 600),
    );

    updateProfile({
      fullName: data.fullName.trim(),
      email: data.email.trim(),
      municipality:
        data.municipality.trim(),
      department:
        data.department.trim(),
    });

    Alert.alert(
      "Perfil actualizado",
      "Tus datos se guardaron correctamente.",
      [
        {
          text: "Continuar",
          onPress: () => router.back(),
        },
      ],
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
            Editar perfil
          </Text>

          <Text style={styles.subtitle}>
            Actualiza tu información personal
          </Text>
        </View>
      </View>

      <View style={styles.avatarSection}>
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
              <Text
                style={styles.avatarLetter}
              >
                {profile.fullName
                  .charAt(0)
                  .toUpperCase()}
              </Text>
            </View>
          )}
        </View>

        <Text style={styles.avatarTitle}>
          Fotografía de perfil
        </Text>

        <Text style={styles.avatarDescription}>
          Elige una fotografía clara para que
          otros viajeros puedan reconocerte.
        </Text>

        <View style={styles.avatarActions}>
          <AppButton
            label="Seleccionar foto"
            variant="outlined"
            onPress={selectAvatar}
          />

          {profile.avatarUri ? (
            <AppButton
              label="Eliminar foto"
              variant="text"
              onPress={removeAvatar}
            />
          ) : null}
        </View>
      </View>

      <View style={styles.form}>
        <Controller
          control={control}
          name="fullName"
          render={({ field }) => (
            <AppInput
              label="Nombre completo"
              placeholder="Tu nombre"
              leftIcon="person-outline"
              autoCapitalize="words"
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              error={
                errors.fullName?.message
              }
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <AppInput
              label="Correo electrónico"
              placeholder="nombre@correo.com"
              leftIcon="mail-outline"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              error={
                errors.email?.message
              }
            />
          )}
        />

        <Controller
          control={control}
          name="municipality"
          render={({ field }) => (
            <AppInput
              label="Municipio"
              placeholder="Ej. Managua"
              leftIcon="location-outline"
              autoCapitalize="words"
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              error={
                errors.municipality
                  ?.message
              }
            />
          )}
        />

        <Controller
          control={control}
          name="department"
          render={({ field }) => (
            <AppInput
              label="Departamento"
              placeholder="Ej. Managua"
              leftIcon="map-outline"
              autoCapitalize="words"
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              error={
                errors.department?.message
              }
            />
          )}
        />
      </View>

      <View style={styles.notice}>
        <Ionicons
          name="information-circle-outline"
          size={21}
          color={colors.info}
        />

        <Text style={styles.noticeText}>
          En la versión final, cambiar el correo
          electrónico requerirá una verificación
          de seguridad.
        </Text>
      </View>

      <AppButton
        label="Guardar cambios"
        loading={isSubmitting}
        onPress={handleSubmit(onSubmit)}
      />
    </ScreenContainer>
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

  avatarSection: {
    alignItems: "center",
    marginTop: spacing.xl,
    padding: spacing.xl,
    borderRadius: radius.extraLarge,
    backgroundColor: "#EDF6F0",
  },

  avatarWrapper: {
    borderWidth: 4,
    borderColor: colors.surface,
    borderRadius: radius.full,
  },

  avatar: {
    width: 112,
    height: 112,
    borderRadius: radius.full,
  },

  avatarFallback: {
    width: 112,
    height: 112,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    backgroundColor: colors.primary.forest,
  },

  avatarLetter: {
    fontFamily: typography.h1.fontFamily,
    fontSize: 44,
    color: colors.text.inverse,
  },

  avatarTitle: {
    ...typography.h2,
    marginTop: spacing.md,
    color: colors.text.primary,
  },

  avatarDescription: {
    ...typography.bodySmall,
    maxWidth: 290,
    marginTop: spacing.sm,
    color: colors.text.secondary,
    textAlign: "center",
  },

  avatarActions: {
    width: "100%",
    gap: spacing.sm,
    marginTop: spacing.lg,
  },

  form: {
    gap: spacing.lg,
    marginTop: spacing.xl,
  },

  notice: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm,
    marginVertical: spacing.xl,
    padding: spacing.md,
    borderRadius: radius.large,
    backgroundColor: "#EAF5FB",
  },

  noticeText: {
    ...typography.bodySmall,
    flex: 1,
    color: colors.text.primary,
  },
});