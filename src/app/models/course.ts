import { GeoLocation } from './geo-location';

export interface Course extends GeoLocation {
    id: number;
    userId: number;
    name: string;
    latitude: number;
    longitude: number;
    addressLine1: string;
    addressLine2: string;
    city: string;
    stateProvinceId: number;
    postalCode: string;
    scorecardDataValidated: boolean;
    geoDataValidated: boolean;
    holes: Array<Hole>;
}

export interface Hole {
    id: number;
    courseId: number;
    number: number;
    mensHandicap: number;
    mensPar: number;
    womensHandicap: number;
    womensPar: number;
    holeLocations: Array<HoleLocation>;
    holeTees: Array<HoleTee>;
}

export interface HoleTee extends GeoLocation {
    id: number;
    holeId: number;
    teeTypeId: TeeType;
    length: number;
    latitude: number;
    longitude: number;
}

export interface HoleLocation extends Geolocation {
    id: number;
    holeId: number;
    holeLocationTypeId: HoleLocationType;
    latitude: number;
    longitude: number;
}

export enum HoleLocationType {
    GreenCenter = 1,
    GreenFront = 2,
    GreenBack = 3,
    Tee = 4,
    Hazard = 5,
    Waypoint = 6
}

export enum TeeType {
    Black = 1,
    Blue = 2,
    Gold = 3,
    Green = 4,
    Red = 5,
    White = 6,
    Yellow = 7
}
