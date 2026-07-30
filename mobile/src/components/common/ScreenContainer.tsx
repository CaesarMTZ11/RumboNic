import { PropsWithChildren } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, spacing } from "@/src/theme";

type ScreenContainerProps = PropsWithChildren<{
    contentContainerStyle?: ViewStyle;
    scrollable?: boolean;
}>;

export function ScreenContainer({
    children,
    contentContainerStyle,
    scrollable = true,
}: ScreenContainerProps) {
    const content = scrollable ? (
        <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
        >
            {children}
        </ScrollView>
    ) : (
        children
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={styles.keyboardView}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                {content}
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },

    keyboardView: {
        flex: 1,
    },

    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.xl,
    },
});
