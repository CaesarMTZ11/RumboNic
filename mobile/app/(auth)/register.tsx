import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
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
    AppCheckbox,
    AppInput,
    ScreenContainer,
} from "@/src/components/common";
import {
    RegisterFormData,
    registerSchema,
} from "@/src/features/auth/schemas/registerSchema";
import {
    colors,
    radius,
    spacing,
    typography,
} from "@/src/theme";

export default function RegisterScreen() {
    const {
        control,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
            termsAccepted: false,
        },
        mode: "onTouched",
    });

    async function onSubmit(data: RegisterFormData) {
        try {
            // Registro temporal hasta conectar ASP.NET Core.
            console.log("Datos del registro:", {
                fullName: data.fullName,
                email: data.email,
                termsAccepted: data.termsAccepted,
            });

            await new Promise((resolve) => setTimeout(resolve, 700));

            Alert.alert(
                "Cuenta creada",
                "Tu cuenta fue creada correctamente.",
                [
                    {
                        text: "Continuar",
                        onPress: () => router.replace("/home"),
                    },
                ],
            );
        } catch {
            Alert.alert(
                "No pudimos crear tu cuenta",
                "Revisa la información e inténtalo nuevamente.",
            );
        }
    }

    function handleGoogleRegister() {
        Alert.alert(
            "Registro con Google",
            "Esta integración se implementará posteriormente.",
        );
    }

    function handleTerms() {
        Alert.alert(
            "Términos y privacidad",
            "El documento legal definitivo se incorporará antes de publicar la aplicación.",
        );
    }

    return (
        <ScreenContainer
            contentContainerStyle={styles.container}
        >
            <Pressable
                accessibilityRole="button"
                accessibilityLabel="Volver al inicio de sesión"
                hitSlop={12}
                onPress={() => router.back()}
                style={styles.backButton}
            >
                <Ionicons
                    name="arrow-back"
                    size={24}
                    color={colors.text.primary}
                />
            </Pressable>

            <View style={styles.brandContainer}>
                <View style={styles.logo}>
                    <Ionicons
                        name="navigate"
                        size={28}
                        color={colors.text.inverse}
                    />
                </View>

                <Text style={styles.brand}>RumboNic</Text>
            </View>

            <View style={styles.header}>
                <Text style={styles.title}>Crear cuenta</Text>

                <Text style={styles.description}>
                    Únete a la comunidad de viajeros y comienza a
                    descubrir Nicaragua.
                </Text>
            </View>

            <View style={styles.form}>
                <Controller
                    control={control}
                    name="fullName"
                    render={({ field }) => (
                        <AppInput
                            label="Nombre completo"
                            placeholder="María Fernández"
                            leftIcon="person-outline"
                            autoCapitalize="words"
                            autoCorrect={false}
                            returnKeyType="next"
                            value={field.value}
                            onChangeText={field.onChange}
                            onBlur={field.onBlur}
                            error={errors.fullName?.message}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="email"
                    render={({ field }) => (
                        <AppInput
                            label="Correo electrónico"
                            placeholder="maria@correo.com"
                            leftIcon="mail-outline"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            returnKeyType="next"
                            value={field.value}
                            onChangeText={field.onChange}
                            onBlur={field.onBlur}
                            error={errors.email?.message}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="password"
                    render={({ field }) => (
                        <AppInput
                            label="Contraseña"
                            placeholder="Mínimo 6 caracteres"
                            leftIcon="lock-closed-outline"
                            isPassword
                            autoCapitalize="none"
                            autoCorrect={false}
                            returnKeyType="next"
                            value={field.value}
                            onChangeText={field.onChange}
                            onBlur={field.onBlur}
                            error={errors.password?.message}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <AppInput
                            label="Confirmar contraseña"
                            placeholder="Repite tu contraseña"
                            leftIcon="shield-checkmark-outline"
                            isPassword
                            autoCapitalize="none"
                            autoCorrect={false}
                            returnKeyType="done"
                            value={field.value}
                            onChangeText={field.onChange}
                            onBlur={field.onBlur}
                            onSubmitEditing={handleSubmit(onSubmit)}
                            error={errors.confirmPassword?.message}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="termsAccepted"
                    render={({ field }) => (
                        <AppCheckbox
                            checked={field.value}
                            label="Acepto los"
                            linkLabel="Términos y la Política de privacidad."
                            onChange={field.onChange}
                            onPressLink={handleTerms}
                            error={errors.termsAccepted?.message}
                        />
                    )}
                />

                <AppButton
                    label="Crear cuenta"
                    loading={isSubmitting}
                    onPress={handleSubmit(onSubmit)}
                />
            </View>

            <View style={styles.dividerContainer}>
                <View style={styles.divider} />

                <Text style={styles.dividerText}>o</Text>

                <View style={styles.divider} />
            </View>

            <Pressable
                accessibilityRole="button"
                onPress={handleGoogleRegister}
                style={({ pressed }) => [
                    styles.googleButton,
                    pressed && styles.buttonPressed,
                ]}
            >
                <Text style={styles.googleLetter}>G</Text>

                <Text style={styles.googleText}>
                    Registrarse con Google
                </Text>
            </Pressable>

            <View style={styles.loginContainer}>
                <Text style={styles.loginQuestion}>
                    ¿Ya tienes una cuenta?
                </Text>

                <Pressable
                    accessibilityRole="link"
                    onPress={() => router.replace("/login")}
                >
                    <Text style={styles.loginLink}>
                        Iniciar sesión
                    </Text>
                </Pressable>
            </View>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: spacing.lg,
        paddingBottom: spacing.xxl,
    },

    backButton: {
        width: 44,
        height: 44,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: spacing.md,
        borderRadius: radius.full,
    },

    brandContainer: {
        alignItems: "center",
        marginBottom: spacing.lg,
    },

    logo: {
        width: 56,
        height: 56,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: spacing.sm,
        borderRadius: radius.large,
        backgroundColor: colors.primary.forest,
    },

    brand: {
        ...typography.h2,
        color: colors.primary.forest,
    },

    header: {
        alignItems: "center",
        marginBottom: spacing.xl,
    },

    title: {
        ...typography.h1,
        color: colors.text.primary,
        textAlign: "center",
    },

    description: {
        ...typography.body,
        maxWidth: 310,
        marginTop: spacing.sm,
        color: colors.text.secondary,
        textAlign: "center",
    },

    form: {
        gap: spacing.lg,
    },

    dividerContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.md,
        marginVertical: spacing.xl,
    },

    divider: {
        flex: 1,
        height: 1,
        backgroundColor: colors.divider,
    },

    dividerText: {
        ...typography.bodySmall,
        color: colors.text.secondary,
    },

    googleButton: {
        minHeight: 52,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: spacing.md,
        paddingHorizontal: spacing.lg,
        borderWidth: 1,
        borderColor: colors.outline,
        borderRadius: radius.full,
        backgroundColor: colors.surface,
    },

    googleLetter: {
        fontFamily: "Inter_600SemiBold",
        fontSize: 18,
        color: colors.info,
    },

    googleText: {
        ...typography.cardTitle,
        color: colors.text.primary,
    },

    buttonPressed: {
        opacity: 0.8,
    },

    loginContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: spacing.xs,
        marginTop: spacing.xl,
    },

    loginQuestion: {
        ...typography.body,
        color: colors.text.secondary,
    },

    loginLink: {
        ...typography.cardTitle,
        color: colors.primary.forest,
    },
});