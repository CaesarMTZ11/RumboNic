import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Location from "expo-location";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
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
    FormSection,
    OptionCard,
    PeopleStepper,
    SelectionChip,
} from "@/src/features/route-planner/components";
import {
    companionOptions,
    durationOptions,
    interestOptions,
} from "@/src/features/route-planner/data/routePlannerData";
import {
    RoutePreferencesFormData,
    routePreferencesSchema,
} from "@/src/features/route-planner/schemas/routePreferencesSchema";
import { useRoutePlannerStore } from "@/src/features/route-planner/store/useRoutePlannerStore";
import {
    colors,
    radius,
    spacing,
    typography,
} from "@/src/theme";

export default function RouteGeneratorScreen() {
    const setPreferences = useRoutePlannerStore(
        (state) => state.setPreferences,
    );

    const {
        control,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm<RoutePreferencesFormData>({
        resolver: zodResolver(routePreferencesSchema),
        defaultValues: {
            originLabel: "",
            latitude: null,
            longitude: null,
            duration: "one-day",
            budget: 1500,
            people: 2,
            companion: "couple",
            interests: [],
        },
        mode: "onTouched",
    });

    const selectedInterests = watch("interests");
    const currentBudget = watch("budget");

    async function useCurrentLocation() {
        try {
            const permission =
                await Location.requestForegroundPermissionsAsync();

            if (permission.status !== "granted") {
                Alert.alert(
                    "Permiso de ubicación",
                    "Necesitamos acceso a tu ubicación para crear rutas cercanas.",
                );

                return;
            }

            const location =
                await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.Balanced,
                });

            setValue(
                "latitude",
                location.coords.latitude,
            );

            setValue(
                "longitude",
                location.coords.longitude,
            );

            let locationLabel = "Mi ubicación actual";

            try {
                const addresses =
                    await Location.reverseGeocodeAsync({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    });

                const address = addresses[0];

                if (address) {
                    const city =
                        address.city ??
                        address.subregion ??
                        address.district;

                    const region = address.region;

                    const parts = [city, region].filter(Boolean);

                    if (parts.length > 0) {
                        locationLabel = parts.join(", ");
                    }
                }
            } catch {
                // Las coordenadas siguen siendo válidas aunque
                // no se obtenga el nombre de la ubicación.
            }

            setValue("originLabel", locationLabel, {
                shouldValidate: true,
                shouldDirty: true,
            });
        } catch {
            Alert.alert(
                "Ubicación no disponible",
                "No pudimos obtener tu ubicación. Puedes escribirla manualmente.",
            );
        }
    }

    function toggleInterest(
        currentValues: string[],
        interest: string,
    ) {
        if (currentValues.includes(interest)) {
            return currentValues.filter(
                (value) => value !== interest,
            );
        }

        if (currentValues.length >= 5) {
            Alert.alert(
                "Máximo de intereses",
                "Puedes seleccionar hasta cinco intereses.",
            );

            return currentValues;
        }

        return [...currentValues, interest];
    }

    async function onSubmit(
        data: RoutePreferencesFormData,
    ) {
        setPreferences(data);

        // Simulación temporal de procesamiento con IA.
        await new Promise((resolve) =>
            setTimeout(resolve, 900),
        );

        router.push("/route-result");
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

                <View style={styles.topBarText}>
                    <Text style={styles.topBarTitle}>
                        Generar ruta
                    </Text>

                    <Text style={styles.topBarSubtitle}>
                        Personalizada con IA
                    </Text>
                </View>

                <View style={styles.aiBadge}>
                    <Ionicons
                        name="sparkles"
                        size={20}
                        color={colors.warning}
                    />
                </View>
            </View>

            <View style={styles.hero}>
                <View style={styles.heroIcon}>
                    <Ionicons
                        name="sparkles"
                        size={27}
                        color={colors.warning}
                    />
                </View>

                <Text style={styles.heroTitle}>
                    Diseñemos tu próxima aventura
                </Text>

                <Text style={styles.heroDescription}>
                    Cuéntanos qué buscas y RumboNic preparará un
                    itinerario adaptado a ti.
                </Text>
            </View>

            <FormSection
                number={1}
                title="¿Dónde te encuentras?"
                description="Usaremos tu ubicación como punto de partida."
            >
                <Controller
                    control={control}
                    name="originLabel"
                    render={({ field }) => (
                        <AppInput
                            label="Ubicación de origen"
                            placeholder="Ej. Managua, Masaya o Granada"
                            leftIcon="location-outline"
                            autoCapitalize="words"
                            value={field.value}
                            onChangeText={(value) => {
                                field.onChange(value);

                                setValue("latitude", null);
                                setValue("longitude", null);
                            }}
                            onBlur={field.onBlur}
                            error={errors.originLabel?.message}
                        />
                    )}
                />

                <Pressable
                    accessibilityRole="button"
                    onPress={useCurrentLocation}
                    style={({ pressed }) => [
                        styles.locationButton,
                        pressed && styles.pressed,
                    ]}
                >
                    <Ionicons
                        name="navigate-outline"
                        size={19}
                        color={colors.primary.forest}
                    />

                    <Text style={styles.locationButtonText}>
                        Usar mi ubicación actual
                    </Text>
                </Pressable>
            </FormSection>

            <FormSection
                number={2}
                title="¿Cuánto tiempo tienes?"
                description="Selecciona la duración aproximada."
            >
                <Controller
                    control={control}
                    name="duration"
                    render={({ field }) => (
                        <View style={styles.optionsList}>
                            {durationOptions.map((option) => (
                                <OptionCard
                                    key={option.value}
                                    label={option.label}
                                    description={option.description}
                                    icon={option.icon}
                                    selected={
                                        field.value === option.value
                                    }
                                    onPress={() =>
                                        field.onChange(option.value)
                                    }
                                />
                            ))}
                        </View>
                    )}
                />
            </FormSection>

            <FormSection
                number={3}
                title="¿Cuál es tu presupuesto?"
                description="Presupuesto total estimado en córdobas."
            >
                <View style={styles.budgetCard}>
                    <Text style={styles.budgetLabel}>
                        Presupuesto disponible
                    </Text>

                    <Text style={styles.budgetValue}>
                        C$ {currentBudget.toLocaleString("es-NI")}
                    </Text>

                    <Controller
                        control={control}
                        name="budget"
                        render={({ field }) => (
                            <Slider
                                minimumValue={300}
                                maximumValue={10000}
                                step={100}
                                value={field.value}
                                onValueChange={field.onChange}
                                minimumTrackTintColor={
                                    colors.primary.forest
                                }
                                maximumTrackTintColor={colors.outline}
                                thumbTintColor={colors.primary.medium}
                            />
                        )}
                    />

                    <View style={styles.budgetRange}>
                        <Text style={styles.rangeText}>C$ 300</Text>
                        <Text style={styles.rangeText}>
                            C$ 10,000
                        </Text>
                    </View>
                </View>
            </FormSection>

            <FormSection
                number={4}
                title="¿Cuántas personas viajan?"
            >
                <Controller
                    control={control}
                    name="people"
                    render={({ field }) => (
                        <PeopleStepper
                            value={field.value}
                            onChange={field.onChange}
                        />
                    )}
                />
            </FormSection>

            <FormSection
                number={5}
                title="¿Con quién viajas?"
            >
                <Controller
                    control={control}
                    name="companion"
                    render={({ field }) => (
                        <View style={styles.chipsContainer}>
                            {companionOptions.map((option) => (
                                <SelectionChip
                                    key={option.value}
                                    label={option.label}
                                    icon={option.icon}
                                    selected={
                                        field.value === option.value
                                    }
                                    onPress={() =>
                                        field.onChange(option.value)
                                    }
                                />
                            ))}
                        </View>
                    )}
                />
            </FormSection>

            <FormSection
                number={6}
                title="¿Qué te interesa?"
                description="Selecciona entre uno y cinco intereses."
            >
                <Controller
                    control={control}
                    name="interests"
                    render={({ field }) => (
                        <>
                            <View style={styles.chipsContainer}>
                                {interestOptions.map((interest) => (
                                    <SelectionChip
                                        key={interest.value}
                                        label={interest.label}
                                        icon={interest.icon}
                                        selected={field.value.includes(
                                            interest.value,
                                        )}
                                        onPress={() =>
                                            field.onChange(
                                                toggleInterest(
                                                    field.value,
                                                    interest.value,
                                                ),
                                            )
                                        }
                                    />
                                ))}
                            </View>

                            <Text style={styles.interestCounter}>
                                {selectedInterests.length}/5 seleccionados
                            </Text>

                            {errors.interests?.message ? (
                                <Text style={styles.errorText}>
                                    {errors.interests.message}
                                </Text>
                            ) : null}
                        </>
                    )}
                />
            </FormSection>

            <View style={styles.aiNotice}>
                <Ionicons
                    name="shield-checkmark-outline"
                    size={21}
                    color={colors.primary.forest}
                />

                <Text style={styles.aiNoticeText}>
                    La IA utilizará lugares registrados y verificados
                    por RumboNic para evitar recomendaciones inexistentes.
                </Text>
            </View>

            <AppButton
                label="Generar ruta con IA"
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

    pressed: {
        opacity: 0.82,
    },

    topBar: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: spacing.xl,
    },

    iconButton: {
        width: 44,
        height: 44,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radius.full,
    },

    topBarText: {
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

    aiBadge: {
        width: 42,
        height: 42,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radius.full,
        backgroundColor: colors.primary.forest,
    },

    hero: {
        alignItems: "center",
        marginBottom: spacing.xxl,
        padding: spacing.xl,
        borderRadius: radius.extraLarge,
        backgroundColor: "#EDF6F0",
    },

    heroIcon: {
        width: 54,
        height: 54,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: spacing.md,
        borderRadius: radius.full,
        backgroundColor: colors.primary.forest,
    },

    heroTitle: {
        ...typography.h1,
        color: colors.text.primary,
        textAlign: "center",
    },

    heroDescription: {
        ...typography.body,
        marginTop: spacing.sm,
        color: colors.text.secondary,
        textAlign: "center",
    },

    optionsList: {
        gap: spacing.sm,
    },

    locationButton: {
        minHeight: 44,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: spacing.sm,
        marginTop: spacing.md,
        borderRadius: radius.full,
        backgroundColor: colors.sand,
    },

    locationButtonText: {
        ...typography.cardTitle,
        color: colors.primary.forest,
    },

    budgetCard: {
        padding: spacing.lg,
        borderWidth: 1,
        borderColor: colors.outline,
        borderRadius: radius.large,
        backgroundColor: colors.surface,
    },

    budgetLabel: {
        ...typography.bodySmall,
        color: colors.text.secondary,
        textAlign: "center",
    },

    budgetValue: {
        ...typography.h1,
        marginVertical: spacing.sm,
        color: colors.primary.forest,
        textAlign: "center",
    },

    budgetRange: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    rangeText: {
        ...typography.bodySmall,
        color: colors.text.secondary,
    },

    chipsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: spacing.sm,
    },

    interestCounter: {
        ...typography.bodySmall,
        marginTop: spacing.sm,
        color: colors.text.secondary,
        textAlign: "right",
    },

    errorText: {
        ...typography.bodySmall,
        marginTop: spacing.xs,
        color: colors.error,
    },

    aiNotice: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: spacing.sm,
        marginBottom: spacing.xl,
        padding: spacing.md,
        borderRadius: radius.large,
        backgroundColor: colors.sand,
    },

    aiNoticeText: {
        ...typography.bodySmall,
        flex: 1,
        color: colors.text.primary,
    },
});