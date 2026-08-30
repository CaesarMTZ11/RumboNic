export const fontFamilies = {
    poppinsRegular: "Poppins_400Regular",
    poppinsSemiBold: "Poppins_600SemiBold",
    poppinsBold: "Poppins_700Bold",
    poppinsExtraBold: "Poppins_800ExtraBold",

    interRegular: "Inter_400Regular",
    interMedium: "Inter_500Medium",
    interSemiBold: "Inter_600SemiBold",
} as const;

export const typography = {
    display: {
        fontFamily: fontFamilies.poppinsExtraBold,
        fontSize: 34,
        lineHeight: 38,
    },

    h1: {
        fontFamily: fontFamilies.poppinsBold,
        fontSize: 24,
        lineHeight: 28,
    },

    h2: {
        fontFamily: fontFamilies.poppinsSemiBold,
        fontSize: 18,
        lineHeight: 24,
    },

    cardTitle: {
        fontFamily: fontFamilies.poppinsSemiBold,
        fontSize: 14,
        lineHeight: 18,
    },

    body: {
        fontFamily: fontFamilies.interRegular,
        fontSize: 14,
        lineHeight: 20,
    },

    bodySmall: {
        fontFamily: fontFamilies.interRegular,
        fontSize: 12,
        lineHeight: 18,
    },

    label: {
        fontFamily: fontFamilies.poppinsSemiBold,
        fontSize: 11,
        lineHeight: 14,
    },
} as const;