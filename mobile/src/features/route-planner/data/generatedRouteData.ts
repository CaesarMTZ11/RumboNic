import { GeneratedRoute } from "@/src/features/route-planner/types/generatedRouteTypes";
import { RoutePreferences } from "@/src/features/route-planner/types/routePlannerTypes";

const durationMinutes = {
  "half-day": 300,
  "one-day": 540,
  weekend: 960,
  "several-days": 1440,
} as const;

const distanceByDuration = {
  "half-day": 38.5,
  "one-day": 72.5,
  weekend: 126.8,
  "several-days": 198.4,
} as const;

const companionLabels = {
  solo: "una persona",
  couple: "una pareja",
  family: "una familia",
  friends: "un grupo de amigos",
} as const;

export function createDemoGeneratedRoute(
  preferences: RoutePreferences,
): GeneratedRoute {
  const estimatedCost = calculateEstimatedCost(preferences.budget);

  const firstStopCost = Math.round(estimatedCost * 0.2);

  const secondStopCost = Math.round(estimatedCost * 0.35);

  const thirdStopCost = estimatedCost - firstStopCost - secondStopCost;

  const sustainabilityScore = calculateSustainabilityScore(
    preferences.interests,
  );

  return {
    id: `demo-${Date.now()}`,
    title: "Naturaleza y cultura entre Masaya y Granada",

    summary:
      `Una experiencia diseñada para ${
        companionLabels[preferences.companion]
      }, combinando gastronomía local, naturaleza volcánica ` +
      "y arquitectura colonial.",

    originLabel: preferences.originLabel,
    currencyCode: "NIO",
    estimatedCost,
    totalDurationMinutes: durationMinutes[preferences.duration],
    distanceKm: distanceByDuration[preferences.duration],
    sustainabilityScore,

    aiTip:
      "Inicia temprano para disfrutar de temperaturas más frescas " +
      "en la Laguna de Apoyo. Lleva agua, protector solar y dinero " +
      "en efectivo para apoyar a los negocios locales.",

    generatedAt: new Date().toISOString(),

    stops: [
      {
        id: "stop-cafe-catarina",
        placeId: "cafe-catarina",
        order: 1,
        name: "Café Mirador Catarina",
        municipality: "Catarina",
        department: "Masaya",
        category: "Cafetería local",
        imageUrl:
          "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=900&q=80",
        startTime: "08:00",
        durationMinutes: 60,
        estimatedCost: firstStopCost,
        distanceFromPreviousKm: 16.2,
        rating: 4.8,

        reason:
          "Un inicio tranquilo con productos nicaragüenses, " +
          "vistas panorámicas y apoyo directo a un negocio local.",

        activities: ["Desayuno", "Café local", "Fotografía"],
      },
      {
        id: "stop-laguna-apoyo",
        placeId: "laguna-apoyo",
        order: 2,
        name: "Laguna de Apoyo",
        municipality: "Catarina",
        department: "Masaya",
        category: "Reserva natural",
        imageUrl:
          "https://images.unsplash.com/photo-1439853949127-fa647821eba0?auto=format&fit=crop&w=900&q=80",
        startTime: "09:30",
        durationMinutes: 240,
        estimatedCost: secondStopCost,
        distanceFromPreviousKm: 12.4,
        rating: 4.9,

        reason:
          "Fue seleccionada por tus intereses en naturaleza, " +
          "relajación y experiencias sostenibles.",

        activities: ["Natación", "Kayak", "Naturaleza", "Relax"],
      },
      {
        id: "stop-granada",
        placeId: "granada",
        order: 3,
        name: "Centro Histórico de Granada",
        municipality: "Granada",
        department: "Granada",
        category: "Cultura",
        imageUrl:
          "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=900&q=80",
        startTime: "15:00",
        durationMinutes: 180,
        estimatedCost: thirdStopCost,
        distanceFromPreviousKm: 24.8,
        rating: 4.9,

        reason:
          "La última parada combina arquitectura colonial, " +
          "cultura, gastronomía y oportunidades fotográficas.",

        activities: ["Recorrido cultural", "Gastronomía", "Fotografía"],
      },
    ],
  };
}

function calculateEstimatedCost(budget: number) {
  const calculatedCost = Math.round((budget * 0.82) / 50) * 50;

  return Math.max(300, Math.min(budget, calculatedCost));
}

function calculateSustainabilityScore(interests: string[]) {
  let score = 78;

  if (interests.includes("nature")) {
    score += 4;
  }

  if (interests.includes("local-businesses")) {
    score += 6;
  }

  if (interests.includes("coffee")) {
    score += 2;
  }

  return Math.min(score, 94);
}
