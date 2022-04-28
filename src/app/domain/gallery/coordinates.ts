import { getRandomArbitrary } from "src/app/lib";

export interface Coordinates {
    longitude: number;
    latitude: number;
}

export const MOSCOW_COORDINATES = {
    begin: {longitude: 37.428645, latitude: 55.876448},
    end: {longitude: 37.835122, latitude: 55.653490}
}

export function getRandomCoordinatesFromMoscow(): Coordinates {
    return {
        longitude: getRandomArbitrary(MOSCOW_COORDINATES.begin.longitude, MOSCOW_COORDINATES.end.longitude),
        latitude: getRandomArbitrary(MOSCOW_COORDINATES.begin.latitude, MOSCOW_COORDINATES.end.latitude)
    }
}