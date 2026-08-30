export type GeneratedRouteStop = {
    id: string;
    placeId: string;
    order: number;
    name: string;
    municipality: string;
    department: string;
    category: string;
    imageUrl: string;
    startTime: string;
    durationMinutes: number;
    estimatedCost: number;
    distanceFromPreviousKm: number;
    rating: number;
    reason: string;
    activities: string[];
};

export type GeneratedRoute = {
    id: string;
    title: string;
    summary: string;
    originLabel: string;
    currencyCode: "NIO";
    estimatedCost: number;
    totalDurationMinutes: number;
    distanceKm: number;
    sustainabilityScore: number;
    aiTip: string;
    generatedAt: string;
    stops: GeneratedRouteStop[];
};