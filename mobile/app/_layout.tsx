import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />

      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          contentStyle: {
            backgroundColor: "#F5F8F5",
          },
        }}
      >
        {/* Autenticación */}
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
          }}
        />

        {/* Navegación principal */}
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />

        {/* Detalle de lugares */}
        <Stack.Screen
          name="place/[id]"
          options={{
            headerShown: false,
          }}
        />

        {/* Generador inteligente */}
        <Stack.Screen
          name="route-generator"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="route-preview"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="route-result"
          options={{
            headerShown: false,
          }}
        />

        {/* Mapa */}
        <Stack.Screen
          name="map"
          options={{
            headerShown: false,
            animation: "fade",
          }}
        />

        {/* Experiencias */}
        <Stack.Screen
          name="share-experience"
          options={{
            headerShown: false,
          }}
        />

        {/* Favoritos */}
        <Stack.Screen
          name="favorites"
          options={{
            headerShown: false,
          }}
        />

        {/* Perfil */}
        <Stack.Screen
          name="edit-profile"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="profile-settings"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
}