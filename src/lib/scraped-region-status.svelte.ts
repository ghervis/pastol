import {persisted} from "svelte-persisted-store"; 
import { type RegionStatusData, type ScrapedRegionStatus, type ScrapedTimeOfDayDateTime, type ScrapedWeatherDateTime, type ServerStatus } from "../types";
import { get, writable } from "svelte/store";

export var weatherStore = writable<RegionStatusData>(null);

export var timeOfDayStore = writable<RegionStatusData>(null);

export const serverStatusStore = writable<ServerStatus>(null);

export const scrapedRegionStatus = persisted('region-status', {} as ScrapedRegionStatus);

export function getWeather(regionName: string) {
    const timestampList = getCurrentAndNext(regionName, 'weather');
    JSON.stringify(get(weatherStore)) !== JSON.stringify(timestampList) && weatherStore.set(timestampList);
    return getCurrentAndNext(regionName, 'weather');
}

export function getServerStatus(regionName: string): ServerStatus {
    const regionStatus = getRegionStatus(regionName);
    const serverStatus = regionStatus?.status ?? 'Unknown';
    get(serverStatusStore) !== serverStatus && serverStatusStore.set(serverStatus);
    return getRegionStatus(regionName)?.status;
}

export function getTimeOfDay(regionName: string) {
    const timestampList = getCurrentAndNext(regionName, 'timeOfDay');
    JSON.stringify(get(timeOfDayStore)) !== JSON.stringify(timestampList) && timeOfDayStore.set(timestampList);
    return timestampList;
}

export function getWeatherList(regionName: string): ScrapedWeatherDateTime[] | undefined {
    return getRegionStatusListOfType(regionName, 'weather') as ScrapedWeatherDateTime[];
}

export function getTimeOfDayList(regionName: string): ScrapedTimeOfDayDateTime[] | undefined {
    return getRegionStatusListOfType(regionName, 'timeOfDay') as ScrapedTimeOfDayDateTime[];
}

function getRegionStatus(regionName: string): ScrapedRegionStatus | undefined {
    if (!regionName) {
        return undefined;
    }

    const regionStatus = get(scrapedRegionStatus);
    
    if (!regionStatus) {
        return undefined;
    }

    return regionStatus;
}

function getCurrentAndNext(regionName: string, typeOfData: 'weather' | 'timeOfDay'): RegionStatusData | undefined {
    const regionStatus = getRegionStatus(regionName);
    
    if (!regionStatus) {
        return undefined;
    }

    const data: ScrapedWeatherDateTime[] | ScrapedTimeOfDayDateTime[] = regionStatus[typeOfData];

    if (!data) {
        return undefined;
    }

    if (!data.length) {
        return undefined;
    }

    const currentTimestamp = Date.now();

    const latestWeatherEntryIndex = data.findIndex((weatherEntry: ScrapedWeatherDateTime | ScrapedTimeOfDayDateTime) => weatherEntry.ts > currentTimestamp);

    if (latestWeatherEntryIndex <= 0) {
        return undefined;
    }

    return {
        currentCondition: data[latestWeatherEntryIndex-1].condition,
        currentIn: data[latestWeatherEntryIndex-1].ts,
        nextIn: data[latestWeatherEntryIndex].ts,
        nextCondition: data[latestWeatherEntryIndex].condition
    };
}

function getRegionStatusListOfType(regionName: string, typeOfData: 'weather' | 'timeOfDay'): ScrapedWeatherDateTime[] | ScrapedTimeOfDayDateTime[] | undefined {
    const regionStatus = getRegionStatus(regionName);
    
    if (!regionStatus) {
        return undefined;
    }

    const data: ScrapedWeatherDateTime[] | ScrapedTimeOfDayDateTime[] = regionStatus[typeOfData];

    if (!data) {
        return undefined;
    }

    return data;
}