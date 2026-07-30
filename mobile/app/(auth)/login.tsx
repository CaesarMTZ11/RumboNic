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
    AppInput,
    ScreenContainer,
} from "@/src/components/common";
import {
    LoginFormData,
    loginSchema,
} from "@/src/features/auth/schemas/loginSchema";
import {
    colors,
    radius,
    spacing,
    typography,
} from "@/src/theme";

export default function LoginScreen() {
    const {
        control,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onTouched",
    });

    async function onSubmit(data: LoginFormData) {
        try {
            // Autenticación temporal hasta conectar ASP.NET Core.
            console.log("Datos de inicio de sesión:", data);

            await new Promise((resolve) =>
                setTimeout(resolve, 700),
            );

            router.replace("/home");
        } catch {
            Alert.alert(
                "No pudimos iniciar sesión",
                "Revisa tus datos e inténtalo nuevamente.",
            );
        }
    }

    function handleForgotPassword() {
        Alert.alert(
            "Recuperar contraseña",
            "Esta función se conectará al backend posteriormente.",
        );
    }

    function handleGoogleLogin() {
        Alert.alert(
            "Inicio con Google",
            "Esta integración se implementará después del MVP principal.",
        );
    }

    return (
        <ScreenContainer
            contentContainerStyle={styles.container}
        >
            <View style={styles.brandContainer}>
                <View style={styles.logo}>
                    <Ionicons
                        name="navigate"
                        size={32}
                        color={colors.text.inverse}
                    />
                </View>

                <Text style={styles.brand}>RumboNic</Text>
            </View>

            <View style={styles.header}>
                <Text style={styles.title}>
                    Bienvenido de vuelta
                </Text>

                <Text style={styles.description}>
                    Inicia sesión para continuar tu aventura por
                    Nicaragua.
                </Text>
            </View>

            <View style={styles.form}>
                <Controller
                    control={control}
                    name="email"
                    render={({ field }) => (
                        <AppInput
                            label="Correo electrónico"
                            placeholder="hola@rumbonic.com"
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
                            placeholder="Ingresa tu contraseña"
                            leftIcon="lock-closed-outline"
                            isPassword
                            autoCapitalize="none"
                            autoCorrect={false}
                            returnKeyType="done"
                            value={field.value}
                            onChangeText={field.onChange}
                            onBlur={field.onBlur}
                            onSubmitEditing={handleSubmit(onSubmit)}
                            error={errors.password?.message}
                        />
                    )}
                />

                <Pressable
                    accessibilityRole="button"
                    onPress={handleForgotPassword}
                    style={styles.forgotButton}
                >
                    <Text style={styles.forgotText}>
                        ¿Olvidaste tu contraseña?
                    </Text>
                </Pressable>

                <AppButton
                    label="Iniciar sesión"
                    loading={isSubmitting}
                    onPress={handleSubmit(onSubmit)}
                />
            </View>

            <View style={styles.dividerContainer}>
                <View style={styles.divider} />
                <Text style={styles.dividerText}>
                    o continúa con
                </Text>
                <View style={styles.divider} />
            </View>

            <Pressable
                accessibilityRole="button"
                onPress={handleGoogleLogin}
                style={({ pressed }) => [
                    styles.googleButton,
                    pressed && styles.buttonPressed,
                ]}
            >
                <Text style={styles.googleLetter}>G</Text>
                <Text style={styles.googleText}>
                    Continuar con Google
                </Text>
            </Pressable>

            <View style={styles.registerContainer}>
                <Text style={styles.registerQuestion}>
                    ¿No tienes una cuenta?
                </Text>

                <Pressable
                    accessibilityRole="link"
                    onPress={() => router.push("/register")}
                >
                    <Text style={styles.registerLink}>
                        Crear cuenta
                    </Text>
                </Pressable>
            </View>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
    },

    brandContainer: {
        alignItems: "center",
        marginBottom: spacing.xl,
    },

    logo: {
        width: 64,
        height: 64,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: spacing.md,
        borderRadius: radius.extraLarge,
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
        maxWidth: 300,
        marginTop: spacing.sm,
        color: colors.text.secondary,
        textAlign: "center",
    },

    form: {
        gap: spacing.lg,
    },

    forgotButton: {
        alignSelf: "flex-end",
        minHeight: 36,
        justifyContent: "center",
        marginTop: -spacing.sm,
    },

    forgotText: {
        ...typography.bodySmall,
        color: colors.primary.forest,
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

    registerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        gap: spacing.xs,
        marginTop: spacing.xl,
    },

    registerQuestion: {
        ...typography.body,
        color: colors.text.secondary,
    },

    registerLink: {
        ...typography.cardTitle,
        color: colors.primary.forest,
    },
});