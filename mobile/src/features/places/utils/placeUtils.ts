import { PlaceSchedule } from "@/src/features/places/types/placeTypes";

function timeToMinutes(value: string) {
    const [hours, minutes] = value
        .split(":")
        .map(Number);

    return hours * 60 + minutes;
}

function getCurrentDayNumber(date: Date) {
    const nativeDay = date.getDay();

    return nativeDay === 0 ? 7 : nativeDay;
}

export function getPlaceOpenStatus(
    schedules: PlaceSchedule[],
    now = new Date(),
) {
    const currentDayNumber =
        getCurrentDayNumber(now);

    const todaySchedule = schedules.find(
        (schedule) =>
            schedule.dayNumber === currentDayNumber,
    );

    if (!todaySchedule) {
        return {
            isOpen: false,
            label: "Horario no disponible",
        };
    }

    if (todaySchedule.isClosed) {
        return {
            isOpen: false,
            label: "Cerrado hoy",
        };
    }

    if (todaySchedule.isOpen24Hours) {
        return {
            isOpen: true,
            label: "Abierto las 24 horas",
        };
    }

    if (
        !todaySchedule.opensAt ||
        !todaySchedule.closesAt
    ) {
        return {
            isOpen: false,
            label: "Horario no disponible",
        };
    }

    const currentMinutes =
        now.getHours() * 60 + now.getMinutes();

    const openingMinutes = timeToMinutes(
        todaySchedule.opensAt,
    );

    const closingMinutes = timeToMinutes(
        todaySchedule.closesAt,
    );

    const isOpen =
        currentMinutes >= openingMinutes &&
        currentMinutes < closingMinutes;

    return {
        isOpen,
        label: isOpen
            ? `Abierto hasta las ${todaySchedule.closesAt}`
            : `Cerrado · Abre a las ${todaySchedule.opensAt}`,
    };
}

export function formatExperienceDate(
    isoDate: string,
) {
    return new Intl.DateTimeFormat("es-NI", {
        day: "numeric",
        month: "short",
        year: "numeric",
    }).format(new Date(isoDate));
}