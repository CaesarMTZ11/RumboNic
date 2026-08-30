export function formatCurrency(value: number) {
    return `C$ ${Math.round(value).toLocaleString("es-NI")}`;
}

export function formatDuration(minutes: number) {
    if (minutes < 60) {
        return `${minutes} min`;
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (remainingMinutes === 0) {
        return `${hours} h`;
    }

    return `${hours} h ${remainingMinutes} min`;
}

export function formatDistance(kilometers: number) {
    return `${kilometers.toFixed(1)} km`;
}

export function formatGeneratedDate(isoDate: string) {
    return new Intl.DateTimeFormat("es-NI", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(isoDate));
}