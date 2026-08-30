import { Ionicons } from "@expo/vector-icons";
import { ComponentProps, forwardRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

import { colors, radius, spacing, typography } from "@/src/theme";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

type AppInputProps = TextInputProps & {
  label: string;
  error?: string;
  leftIcon?: IoniconName;
  isPassword?: boolean;
};

export const AppInput = forwardRef<TextInput, AppInputProps>(function AppInput(
  { label, error, leftIcon, isPassword = false, style, ...textInputProps },
  ref,
) {
  const [focused, setFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>

      <View
        style={[
          styles.inputContainer,
          focused && styles.inputFocused,
          error && styles.inputError,
        ]}
      >
        {leftIcon ? (
          <Ionicons
            name={leftIcon}
            size={20}
            color={
              error
                ? colors.error
                : focused
                  ? colors.primary.forest
                  : colors.text.secondary
            }
          />
        ) : null}

        <TextInput
          ref={ref}
          {...textInputProps}
          style={[styles.input, style]}
          placeholderTextColor={colors.text.secondary}
          secureTextEntry={isPassword && !passwordVisible}
          onFocus={(event) => {
            setFocused(true);
            textInputProps.onFocus?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            textInputProps.onBlur?.(event);
          }}
        />

        {isPassword ? (
          <Ionicons
            accessibilityLabel={
              passwordVisible ? "Ocultar contraseña" : "Mostrar contraseña"
            }
            name={passwordVisible ? "eye-off-outline" : "eye-outline"}
            size={21}
            color={colors.text.secondary}
            onPress={() => setPasswordVisible((current) => !current)}
          />
        ) : null}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
});

const styles = StyleSheet.create({
  field: {
    width: "100%",
  },

  label: {
    ...typography.cardTitle,
    marginBottom: spacing.sm,
    color: colors.text.primary,
  },

  inputContainer: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    borderColor: colors.outline,
    borderRadius: radius.medium,
    backgroundColor: colors.surface,
  },

  inputFocused: {
    borderColor: colors.primary.forest,
  },

  inputError: {
    borderColor: colors.error,
  },

  input: {
    ...typography.body,
    flex: 1,
    minHeight: 50,
    paddingVertical: 0,
    color: colors.text.primary,
  },

  errorText: {
    ...typography.bodySmall,
    marginTop: spacing.xs,
    color: colors.error,
  },
});
