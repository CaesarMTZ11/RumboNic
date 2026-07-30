import { Text } from "react-native";

import { ScreenContainer } from "@/src/components/common";
import { colors, typography } from "@/src/theme";

export default function ExperiencesScreen() {
    return (
        <ScreenContainer>
            <Text
                style={{
                    ...typography.h1,
                    color: colors.text.primary,
                }}
            >
                Experiencias
            </Text>
        </ScreenContainer>
    );
}