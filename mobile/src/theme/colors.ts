export const colors = {
    primary: {
        forest: "#1B5E3A",
        medium: "#2E8B57",
        light: "#7FB77E",
    },

    info: "#4DA8DA",
    earth: "#8B5E3C",
    sand: "#EFE6D5",
    warning: "#F5B301",
    error: "#E1543B",

    text: {
        primary: "#1D231F",
        secondary: "#6B7A70",
        inverse: "#FFFFFF",
    },

    background: "#F5F8F5",
    surface: "#FFFFFF",
    outline: "#DCE5DE",
    divider: "#E7EDE8",

    overlay: "rgba(0, 0, 0, 0.45)",
} as const;

export type AppColors = typeof colors;