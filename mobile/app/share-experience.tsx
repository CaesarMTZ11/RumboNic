import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import {
  router,
  useLocalSearchParams,
} from "expo-router";
import {
  Controller,
  useForm,
} from "react-hook-form";
import {
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  useMemo,
  useState,
} from "react";

import {
  AppButton,
  AppInput,
  ScreenContainer,
} from "@/src/components/common";
import { explorePlaces } from "@/src/features/explore/data/exploreData";
import {
  ExistingPlaceOption,
  ExperiencePhotoGrid,
  PlaceModeSelector,
  StarRating,
} from "@/src/features/experiences/components";
import {
  ShareExperienceFormData,
  shareExperienceSchema,
} from "@/src/features/experiences/schemas/shareExperienceSchema";
import { useExperiencesStore } from "@/src/store/useExperiencesStore";
import {
  colors,
  radius,
  spacing,
  typography,
} from "@/src/theme";

function formatDateValue(date: Date) {
  const year = date.getFullYear();

  const month = String(
    date.getMonth() + 1,
  ).padStart(2, "0");

  const day = String(
    date.getDate(),
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function normalizeParameter(
  value?: string | string[],
) {
  return Array.isArray(value)
    ? value[0]
    : value;
}

export default function ShareExperienceScreen() {
  const params = useLocalSearchParams<{
    placeId?: string | string[];
    placeName?: string | string[];
  }>();

  const initialPlaceId =
    normalizeParameter(params.placeId) ??
    null;

  const initialPlaceName =
    normalizeParameter(params.placeName) ??
    "";

  const initialVisitDate = new Date();

  const [placeSearch, setPlaceSearch] =
    useState(initialPlaceName);

  const [
    showDatePicker,
    setShowDatePicker,
  ] = useState(false);

  const [visitDate, setVisitDate] =
    useState(initialVisitDate);

  const addExperience =
    useExperiencesStore(
      (state) => state.addExperience,
    );

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<ShareExperienceFormData>({
    resolver: zodResolver(
      shareExperienceSchema,
    ),

    defaultValues: {
      placeMode: "existing",
      placeId: initialPlaceId,

      newPlaceName: "",
      newPlaceAddress: "",
      newPlaceLatitude: null,
      newPlaceLongitude: null,

      rating: 0,
      description: "",
      visitDate: formatDateValue(
        initialVisitDate,
      ),
      photoUris: [],
    },

    mode: "onTouched",
  });

  const placeMode = watch("placeMode");
  const selectedPlaceId = watch("placeId");
  const selectedRating = watch("rating");
  const photoUris = watch("photoUris");

  const newPlaceLatitude = watch(
    "newPlaceLatitude",
  );

  const newPlaceLongitude = watch(
    "newPlaceLongitude",
  );

  const filteredPlaces = useMemo(() => {
    const normalizedSearch =
      placeSearch
        .trim()
        .toLocaleLowerCase("es");

    if (!normalizedSearch) {
      return explorePlaces.slice(0, 5);
    }

    return explorePlaces
      .filter((place) => {
        const searchable = [
          place.name,
          place.municipality,
          place.department,
        ]
          .join(" ")
          .toLocaleLowerCase("es");

        return searchable.includes(
          normalizedSearch,
        );
      })
      .slice(0, 5);
  }, [placeSearch]);

  function changePlaceMode(
    mode: "existing" | "new",
  ) {
    setValue("placeMode", mode, {
      shouldValidate: true,
      shouldDirty: true,
    });

    if (mode === "existing") {
      setValue(
        "newPlaceName",
        "",
      );

      setValue(
        "newPlaceAddress",
        "",
      );

      setValue(
        "newPlaceLatitude",
        null,
      );

      setValue(
        "newPlaceLongitude",
        null,
      );
    } else {
      setValue("placeId", null);
      setPlaceSearch("");
    }

    clearErrors([
      "placeId",
      "newPlaceName",
      "newPlaceAddress",
      "newPlaceLatitude",
    ]);
  }

  async function pickPhotos() {
    const remainingSlots =
      5 - photoUris.length;

    if (remainingSlots <= 0) {
      Alert.alert(
        "Máximo alcanzado",
        "Puedes seleccionar hasta cinco fotografías.",
      );

      return;
    }

    const permission =
      await ImagePicker
        .requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permiso necesario",
        "RumboNic necesita acceso a tus fotografías para compartir la experiencia.",
      );

      return;
    }

    const result =
      await ImagePicker
        .launchImageLibraryAsync({
          mediaTypes: ["images"],
          allowsMultipleSelection: true,
          selectionLimit: remainingSlots,
          quality: 0.8,
        });

    if (result.canceled) {
      return;
    }

    const selectedUris =
      result.assets.map(
        (asset) => asset.uri,
      );

    setValue(
      "photoUris",
      [
        ...photoUris,
        ...selectedUris,
      ].slice(0, 5),
      {
        shouldValidate: true,
        shouldDirty: true,
      },
    );
  }

  async function takePhoto() {
    if (photoUris.length >= 5) {
      return;
    }

    const permission =
      await ImagePicker
        .requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permiso necesario",
        "RumboNic necesita acceso a la cámara para tomar una fotografía.",
      );

      return;
    }

    const result =
      await ImagePicker
        .launchCameraAsync({
          mediaTypes: ["images"],
          allowsEditing: false,
          quality: 0.8,
        });

    if (result.canceled) {
      return;
    }

    const imageUri =
      result.assets[0]?.uri;

    if (!imageUri) {
      return;
    }

    setValue(
      "photoUris",
      [
        ...photoUris,
        imageUri,
      ].slice(0, 5),
      {
        shouldValidate: true,
        shouldDirty: true,
      },
    );
  }

  function removePhoto(uri: string) {
    setValue(
      "photoUris",
      photoUris.filter(
        (photoUri) =>
          photoUri !== uri,
      ),
      {
        shouldValidate: true,
        shouldDirty: true,
      },
    );
  }

  async function captureNewPlaceLocation() {
    try {
      const permission =
        await Location
          .requestForegroundPermissionsAsync();

      if (
        permission.status !== "granted"
      ) {
        Alert.alert(
          "Permiso de ubicación",
          "Necesitamos la ubicación para registrar correctamente el nuevo lugar.",
        );

        return;
      }

      const currentLocation =
        await Location
          .getCurrentPositionAsync({
            accuracy:
              Location.Accuracy.High,
          });

      const latitude =
        currentLocation.coords.latitude;

      const longitude =
        currentLocation.coords.longitude;

      setValue(
        "newPlaceLatitude",
        latitude,
        {
          shouldValidate: true,
          shouldDirty: true,
        },
      );

      setValue(
        "newPlaceLongitude",
        longitude,
        {
          shouldValidate: true,
          shouldDirty: true,
        },
      );

      try {
        const addresses =
          await Location
            .reverseGeocodeAsync({
              latitude,
              longitude,
            });

        const address = addresses[0];

        if (address) {
          const addressParts = [
            address.street,
            address.district,
            address.city,
            address.region,
          ].filter(Boolean);

          if (addressParts.length > 0) {
            setValue(
              "newPlaceAddress",
              addressParts.join(", "),
              {
                shouldValidate: true,
                shouldDirty: true,
              },
            );
          }
        }
      } catch {
        // Las coordenadas siguen siendo válidas.
      }
    } catch {
      Alert.alert(
        "Ubicación no disponible",
        "No pudimos obtener la ubicación actual. Inténtalo nuevamente desde el lugar.",
      );
    }
  }

  function handleDateChange(
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ) {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }

    if (
      event.type === "dismissed" ||
      !selectedDate
    ) {
      return;
    }

    setVisitDate(selectedDate);

    setValue(
      "visitDate",
      formatDateValue(selectedDate),
      {
        shouldValidate: true,
        shouldDirty: true,
      },
    );
  }

  async function onSubmit(
    data: ShareExperienceFormData,
  ) {
    const selectedPlace =
      data.placeMode === "existing"
        ? explorePlaces.find(
            (place) =>
              place.id === data.placeId,
          )
        : null;

    if (
      data.placeMode === "existing" &&
      !selectedPlace
    ) {
      Alert.alert(
        "Lugar no disponible",
        "Selecciona nuevamente el lugar visitado.",
      );

      return;
    }

    await new Promise((resolve) =>
      setTimeout(resolve, 900),
    );

    const generatedId =
      Date.now().toString();

    const placeId =
      data.placeMode === "existing"
        ? selectedPlace!.id
        : `pending-place-${generatedId}`;

    const placeName =
      data.placeMode === "existing"
        ? selectedPlace!.name
        : data.newPlaceName.trim();

    addExperience({
      id: `experience-${generatedId}`,

      placeId,
      placeName,

      placeStatus:
        data.placeMode === "existing"
          ? "VERIFIED"
          : "PENDING",

      rating: data.rating,
      description:
        data.description.trim(),

      visitDate: data.visitDate,
      photoUris: data.photoUris,

      publicationStatus:
        data.placeMode === "existing"
          ? "PUBLISHED"
          : "IN_REVIEW",

      createdAt:
        new Date().toISOString(),

      newPlaceSuggestion:
        data.placeMode === "new"
          ? {
              name:
                data.newPlaceName.trim(),

              address:
                data.newPlaceAddress.trim(),

              latitude:
                data.newPlaceLatitude!,

              longitude:
                data.newPlaceLongitude!,
            }
          : undefined,
    });

    Alert.alert(
      data.placeMode === "existing"
        ? "Experiencia publicada"
        : "Experiencia enviada",

      data.placeMode === "existing"
        ? "Tu experiencia ya forma parte de RumboNic."
        : "El nuevo lugar y tu experiencia quedaron en revisión antes de mostrarse públicamente.",

      [
        {
          text: "Continuar",
          onPress: () =>
            router.replace(
              "/experiences",
            ),
        },
      ],
    );
  }

  return (
    <ScreenContainer
      contentContainerStyle={
        styles.container
      }
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
          <Text style={styles.topBarTitle}>
            Compartir experiencia
          </Text>

          <Text
            style={styles.topBarSubtitle}
          >
            Inspira a otros viajeros
          </Text>
        </View>
      </View>

      <View style={styles.hero}>
        <View style={styles.heroIcon}>
          <Ionicons
            name="camera"
            size={27}
            color={colors.warning}
          />
        </View>

        <Text style={styles.heroTitle}>
          Cuéntanos cómo fue tu visita
        </Text>

        <Text
          style={styles.heroDescription}
        >
          Tus fotografías y recomendaciones
          ayudan a descubrir experiencias
          auténticas de Nicaragua.
        </Text>
      </View>

      <FormSection
        number={1}
        title="¿Dónde fue?"
        description="Selecciona un lugar registrado o sugiere uno nuevo."
      >
        <PlaceModeSelector
          value={placeMode}
          onChange={changePlaceMode}
        />

        {placeMode === "existing" ? (
          <View style={styles.placeSelector}>
            <View
              style={styles.searchContainer}
            >
              <Ionicons
                name="search-outline"
                size={20}
                color={
                  colors.text.secondary
                }
              />

              <TextInput
                value={placeSearch}
                onChangeText={
                  setPlaceSearch
                }
                placeholder="Buscar un lugar"
                placeholderTextColor={
                  colors.text.secondary
                }
                autoCapitalize="words"
                style={styles.searchInput}
              />

              {placeSearch.length > 0 ? (
                <Pressable
                  hitSlop={8}
                  onPress={() =>
                    setPlaceSearch("")
                  }
                >
                  <Ionicons
                    name="close-circle"
                    size={20}
                    color={
                      colors.text.secondary
                    }
                  />
                </Pressable>
              ) : null}
            </View>

            <View style={styles.placeList}>
              {filteredPlaces.map(
                (place) => (
                  <ExistingPlaceOption
                    key={place.id}
                    place={place}
                    selected={
                      selectedPlaceId ===
                      place.id
                    }
                    onPress={() => {
                      setValue(
                        "placeId",
                        place.id,
                        {
                          shouldValidate:
                            true,
                          shouldDirty:
                            true,
                        },
                      );

                      setPlaceSearch(
                        place.name,
                      );
                    }}
                  />
                ),
              )}
            </View>

            {filteredPlaces.length ===
            0 ? (
              <View
                style={styles.noPlacesCard}
              >
                <Text
                  style={
                    styles.noPlacesTitle
                  }
                >
                  No encontramos el lugar
                </Text>

                <Text
                  style={
                    styles.noPlacesDescription
                  }
                >
                  Puedes registrarlo como un
                  lugar nuevo.
                </Text>

                <AppButton
                  label="Sugerir lugar nuevo"
                  variant="outlined"
                  onPress={() =>
                    changePlaceMode("new")
                  }
                />
              </View>
            ) : null}

            {errors.placeId?.message ? (
              <Text
                style={styles.errorText}
              >
                {errors.placeId.message}
              </Text>
            ) : null}
          </View>
        ) : (
          <View
            style={styles.newPlaceForm}
          >
            <Controller
              control={control}
              name="newPlaceName"
              render={({ field }) => (
                <AppInput
                  label="Nombre del lugar"
                  placeholder="Ej. Mirador El Paraíso"
                  leftIcon="location-outline"
                  autoCapitalize="words"
                  value={field.value}
                  onChangeText={
                    field.onChange
                  }
                  onBlur={field.onBlur}
                  error={
                    errors.newPlaceName
                      ?.message
                  }
                />
              )}
            />

            <Controller
              control={control}
              name="newPlaceAddress"
              render={({ field }) => (
                <AppInput
                  label="Dirección o referencia"
                  placeholder="Describe cómo llegar"
                  leftIcon="map-outline"
                  autoCapitalize="sentences"
                  value={field.value}
                  onChangeText={
                    field.onChange
                  }
                  onBlur={field.onBlur}
                  error={
                    errors.newPlaceAddress
                      ?.message
                  }
                />
              )}
            />

            <Pressable
              accessibilityRole="button"
              onPress={
                captureNewPlaceLocation
              }
              style={({ pressed }) => [
                styles.locationButton,
                pressed &&
                  styles.pressed,
              ]}
            >
              <Ionicons
                name="navigate-outline"
                size={20}
                color={
                  colors.primary.forest
                }
              />

              <Text
                style={
                  styles.locationButtonText
                }
              >
                Registrar ubicación actual
              </Text>
            </Pressable>

            {newPlaceLatitude !== null &&
            newPlaceLongitude !== null ? (
              <View
                style={
                  styles.coordinatesCard
                }
              >
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={
                    colors.primary.medium
                  }
                />

                <View style={{ flex: 1 }}>
                  <Text
                    style={
                      styles.coordinatesTitle
                    }
                  >
                    Ubicación registrada
                  </Text>

                  <Text
                    style={
                      styles.coordinatesText
                    }
                  >
                    {newPlaceLatitude.toFixed(
                      5,
                    )}
                    ,{" "}
                    {newPlaceLongitude.toFixed(
                      5,
                    )}
                  </Text>
                </View>
              </View>
            ) : null}

            {errors.newPlaceLatitude
              ?.message ? (
              <Text
                style={styles.errorText}
              >
                {
                  errors.newPlaceLatitude
                    .message
                }
              </Text>
            ) : null}

            <View style={styles.reviewNotice}>
              <Ionicons
                name="shield-checkmark-outline"
                size={21}
                color={
                  colors.primary.forest
                }
              />

              <Text
                style={
                  styles.reviewNoticeText
                }
              >
                El lugar será registrado como
                pendiente y revisado antes de
                entrar en las rutas generadas
                por IA.
              </Text>
            </View>
          </View>
        )}
      </FormSection>

      <FormSection
        number={2}
        title="Agrega fotografías"
        description="Selecciona hasta cinco imágenes auténticas."
      >
        <ExperiencePhotoGrid
          photoUris={photoUris}
          onPickFromLibrary={pickPhotos}
          onTakePhoto={takePhoto}
          onRemove={removePhoto}
          error={
            errors.photoUris?.message
          }
        />
      </FormSection>

      <FormSection
        number={3}
        title="¿Cómo calificarías tu visita?"
      >
        <StarRating
          value={selectedRating}
          onChange={(rating) =>
            setValue(
              "rating",
              rating,
              {
                shouldValidate: true,
                shouldDirty: true,
              },
            )
          }
          error={
            errors.rating?.message
          }
        />
      </FormSection>

      <FormSection
        number={4}
        title="Cuéntanos tu experiencia"
        description="Comparte detalles útiles para otros viajeros."
      >
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <AppInput
              label="Descripción"
              placeholder="¿Qué fue lo que más te gustó? ¿Qué recomendarías?"
              leftIcon="chatbox-outline"
              multiline
              numberOfLines={6}
              maxLength={1500}
              textAlignVertical="top"
              style={
                styles.descriptionInput
              }
              value={field.value}
              onChangeText={
                field.onChange
              }
              onBlur={field.onBlur}
              error={
                errors.description
                  ?.message
              }
            />
          )}
        />

        <Text
          style={
            styles.characterCounter
          }
        >
          {watch(
            "description",
          ).length}
          /1500
        </Text>
      </FormSection>

      <FormSection
        number={5}
        title="¿Cuándo realizaste la visita?"
      >
        <Pressable
          accessibilityRole="button"
          onPress={() =>
            setShowDatePicker(true)
          }
          style={({ pressed }) => [
            styles.dateButton,
            pressed && styles.pressed,
            errors.visitDate &&
              styles.dateButtonError,
          ]}
        >
          <View style={styles.dateIcon}>
            <Ionicons
              name="calendar-outline"
              size={21}
              color={
                colors.primary.forest
              }
            />
          </View>

          <View style={styles.dateContent}>
            <Text style={styles.dateLabel}>
              Fecha de visita
            </Text>

            <Text style={styles.dateValue}>
              {new Intl.DateTimeFormat(
                "es-NI",
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                },
              ).format(visitDate)}
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={19}
            color={
              colors.text.secondary
            }
          />
        </Pressable>

        {showDatePicker ? (
          <DateTimePicker
            value={visitDate}
            mode="date"
            display={
              Platform.OS === "ios"
                ? "spinner"
                : "default"
            }
            maximumDate={new Date()}
            onChange={
              handleDateChange
            }
          />
        ) : null}

        {errors.visitDate?.message ? (
          <Text
            style={styles.errorText}
          >
            {errors.visitDate.message}
          </Text>
        ) : null}
      </FormSection>

      <View style={styles.privacyNotice}>
        <Ionicons
          name="information-circle-outline"
          size={22}
          color={colors.info}
        />

        <Text
          style={
            styles.privacyNoticeText
          }
        >
          Las fotografías y la descripción
          serán visibles para otros usuarios.
          Tu ubicación personal no se
          publicará; solo se utiliza para
          identificar el lugar.
        </Text>
      </View>

      <AppButton
        label={
          placeMode === "existing"
            ? "Publicar experiencia"
            : "Enviar para revisión"
        }
        loading={isSubmitting}
        onPress={handleSubmit(onSubmit)}
      />
    </ScreenContainer>
  );
}

type FormSectionProps = {
  number: number;
  title: string;
  description?: string;
  children: React.ReactNode;
};

function FormSection({
  number,
  title,
  description,
  children,
}: FormSectionProps) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionNumber}>
          <Text
            style={
              styles.sectionNumberText
            }
          >
            {number}
          </Text>
        </View>

        <View style={styles.sectionText}>
          <Text style={styles.sectionTitle}>
            {title}
          </Text>

          {description ? (
            <Text
              style={
                styles.sectionDescription
              }
            >
              {description}
            </Text>
          ) : null}
        </View>
      </View>

      <View style={styles.sectionContent}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: spacing.xxl,
  },

  pressed: {
    opacity: 0.82,
  },

  errorText: {
    ...typography.bodySmall,
    marginTop: spacing.xs,
    color: colors.error,
  },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.lg,
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

  topBarTitle: {
    ...typography.h2,
    color: colors.text.primary,
  },

  topBarSubtitle: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },

  hero: {
    alignItems: "center",
    padding: spacing.xl,
    borderRadius: radius.extraLarge,
    backgroundColor: colors.primary.forest,
  },

  heroIcon: {
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    backgroundColor:
      "rgba(255,255,255,0.14)",
  },

  heroTitle: {
    ...typography.h1,
    marginTop: spacing.md,
    color: colors.text.inverse,
    textAlign: "center",
  },

  heroDescription: {
    ...typography.body,
    marginTop: spacing.sm,
    color: colors.text.inverse,
    textAlign: "center",
    opacity: 0.9,
  },

  section: {
    marginTop: spacing.xxl,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md,
    marginBottom: spacing.md,
  },

  sectionNumber: {
    width: 31,
    height: 31,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    backgroundColor:
      colors.primary.forest,
  },

  sectionNumberText: {
    ...typography.label,
    color: colors.text.inverse,
  },

  sectionText: {
    flex: 1,
  },

  sectionTitle: {
    ...typography.h2,
    color: colors.text.primary,
  },

  sectionDescription: {
    ...typography.bodySmall,
    marginTop: spacing.xs,
    color: colors.text.secondary,
  },

  sectionContent: {
    marginLeft: 43,
  },

  placeSelector: {
    gap: spacing.md,
  },

  searchContainer: {
    minHeight: 50,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.outline,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
  },

  searchInput: {
    ...typography.body,
    flex: 1,
    minHeight: 48,
    color: colors.text.primary,
  },

  placeList: {
    gap: spacing.sm,
  },

  noPlacesCard: {
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.large,
    backgroundColor: colors.sand,
  },

  noPlacesTitle: {
    ...typography.cardTitle,
    color: colors.text.primary,
  },

  noPlacesDescription: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    textAlign: "center",
  },

  newPlaceForm: {
    gap: spacing.lg,
  },

  locationButton: {
    minHeight: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: colors.sand,
  },

  locationButtonText: {
    ...typography.cardTitle,
    color: colors.primary.forest,
  },

  coordinatesCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.medium,
    backgroundColor: "#EDF6F0",
  },

  coordinatesTitle: {
    ...typography.cardTitle,
    color: colors.primary.forest,
  },

  coordinatesText: {
    ...typography.bodySmall,
    marginTop: spacing.xs,
    color: colors.text.secondary,
  },

  reviewNotice: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.medium,
    backgroundColor: colors.sand,
  },

  reviewNoticeText: {
    ...typography.bodySmall,
    flex: 1,
    color: colors.text.primary,
  },

  descriptionInput: {
    minHeight: 130,
    paddingTop: spacing.md,
  },

  characterCounter: {
    ...typography.bodySmall,
    marginTop: spacing.xs,
    color: colors.text.secondary,
    textAlign: "right",
  },

  dateButton: {
    minHeight: 68,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.outline,
    borderRadius: radius.large,
    backgroundColor: colors.surface,
  },

  dateButtonError: {
    borderColor: colors.error,
  },

  dateIcon: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.medium,
    backgroundColor: colors.sand,
  },

  dateContent: {
    flex: 1,
  },

  dateLabel: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },

  dateValue: {
    ...typography.cardTitle,
    marginTop: spacing.xs,
    color: colors.text.primary,
  },

  privacyNotice: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm,
    marginVertical: spacing.xl,
    padding: spacing.md,
    borderRadius: radius.large,
    backgroundColor: "#EAF5FB",
  },

  privacyNoticeText: {
    ...typography.bodySmall,
    flex: 1,
    color: colors.text.primary,
  },
});