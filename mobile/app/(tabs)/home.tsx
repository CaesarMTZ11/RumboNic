import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { ScreenContainer } from "@/src/components/common";
import {
    AIHeroCard,
    CategoryChip,
    DailyRouteCard,
    DestinationCard,
    LocalBusinessCard,
    SectionHeader,
} from "@/src/features/home/components";
import {
    localBusinesses,
    popularDestinations,
    tourismCategories,
} from "@/src/features/home/data/homeData";
import {
    colors,
    radius,
    spacing,
    typography,
} from "@/src/theme";

export default function HomeScreen() {
    function openDestination(id: string) {
        router.push({
            pathname: "/place/[id]",
            params: { id },
        });
    }

    function handleFavorite(name: string) {
        Alert.alert(
            "Favoritos",
            `${name} fue actualizado en tus favoritos.`,
        );
    }

    return (
        <ScreenContainer
            contentContainerStyle={styles.content}
        >
            <View style={styles.header}>
                <View>
                    <Text style={styles.greeting}>Hola 👋</Text>

                    <Text style={styles.title}>
                        ¿Qué aventura quieres vivir hoy?
                    </Text>
                </View>

                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Ver notificaciones"
                    onPress={() =>
                        Alert.alert(
                            "Notificaciones",
                            "No tienes notificaciones nuevas.",
                        )
                    }
                    style={styles.notificationButton}
                >
                    <Ionicons
                        name="notifications-outline"
                        size={23}
                        color={colors.text.primary}
                    />
                </Pressable>
            </View>

            <Pressable
                accessibilityRole="search"
                onPress={() => router.push("/explore")}
                style={styles.searchBar}
            >
                <Ionicons
                    name="search-outline"
                    size={21}
                    color={colors.text.secondary}
                />

                <Text style={styles.searchPlaceholder}>
                    Buscar destinos, rutas o negocios
                </Text>

                <Ionicons
                    name="options-outline"
                    size={21}
                    color={colors.primary.forest}
                />
            </Pressable>

            <AIHeroCard
                onPress={() => router.push("/route-generator")}
            />

            <View style={styles.section}>
                <SectionHeader
                    title="¿Qué quieres descubrir?"
                    actionLabel="Ver todo"
                    onActionPress={() => router.push("/explore")}
                />

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalList}
                >
                    {tourismCategories.map((category) => (
                        <CategoryChip
                            key={category.id}
                            category={category}
                            onPress={() =>
                                router.push({
                                    pathname: "/explore",
                                    params: {
                                        category: category.id,
                                    },
                                })
                            }
                        />
                    ))}
                </ScrollView>
            </View>

            <View style={styles.section}>
                <SectionHeader title="Ruta recomendada de hoy" />

                <DailyRouteCard
                    onPress={() => router.push("/route-preview")}
                />
            </View>

            <View style={styles.section}>
                <SectionHeader
                    title="Destinos populares"
                    actionLabel="Ver todo"
                    onActionPress={() => router.push("/explore")}
                />

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalList}
                >
                    {popularDestinations.map((destination) => (
                        <DestinationCard
                            key={destination.id}
                            destination={destination}
                            onPress={() =>
                                openDestination(destination.id)
                            }
                            onFavoritePress={() =>
                                handleFavorite(destination.name)
                            }
                        />
                    ))}
                </ScrollView>
            </View>

            <View style={styles.section}>
                <SectionHeader
                    title="Apoya negocios locales"
                    actionLabel="Ver todo"
                    onActionPress={() => router.push("/explore")}
                />

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalList}
                >
                    {localBusinesses.map((business) => (
                        <LocalBusinessCard
                            key={business.id}
                            business={business}
                            onPress={() =>
                                openDestination(business.id)
                            }
                        />
                    ))}
                </ScrollView>
            </View>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    content: {
        paddingBottom: spacing.xxl,
    },

    header: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: spacing.md,
        marginBottom: spacing.lg,
    },

    greeting: {
        ...typography.body,
        color: colors.text.secondary,
    },

    title: {
        ...typography.h1,
        maxWidth: 290,
        marginTop: spacing.xs,
        color: colors.text.primary,
    },

    notificationButton: {
        width: 44,
        height: 44,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: colors.outline,
        borderRadius: radius.full,
        backgroundColor: colors.surface,
    },

    searchBar: {
        minHeight: 52,
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
        marginBottom: spacing.lg,
        paddingHorizontal: spacing.lg,
        borderWidth: 1,
        borderColor: colors.outline,
        borderRadius: radius.full,
        backgroundColor: colors.surface,
    },

    searchPlaceholder: {
        ...typography.body,
        flex: 1,
        color: colors.text.secondary,
    },

    section: {
        marginTop: spacing.xl,
    },

    horizontalList: {
        paddingRight: spacing.lg,
    },
});