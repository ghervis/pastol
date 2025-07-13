import { persisted } from "svelte-persisted-store";
import { WEATHER_CONDITION_DISPLAY_MAP, type RegionStatusSubscription } from "../types";
import { get } from "svelte/store";
import { getWeather } from "./scraped-region-status.svelte";
import { doNotification } from "./main-process.svelte";

export const weatherSubscription = persisted('weatherSubscription', {} as RegionStatusSubscription);

export function doNotificationOnWeatherChange() {
    const currentWeatherSubscription = get(weatherSubscription);

    if (!Object.keys(currentWeatherSubscription).length) {
        return;
    }

    const currentWeatherData = getWeather(currentWeatherSubscription.region);

    if (!currentWeatherData) {
        return;
    }

    if (currentWeatherSubscription?.nextIn === currentWeatherData.nextIn) {
        return;
    }

    const regionName = currentWeatherSubscription.region

    if (currentWeatherSubscription?.nextIn >= currentWeatherData.currentIn && currentWeatherSubscription.currentCondition === currentWeatherData.currentCondition) {
        const notificationTitle = `${WEATHER_CONDITION_DISPLAY_MAP[currentWeatherData.currentCondition]} in ${regionName}`;
        const notificationMessage = `Weather is now ${WEATHER_CONDITION_DISPLAY_MAP[currentWeatherData.currentCondition]} in ${regionName}.`;
        doNotification(
            `${currentWeatherData.currentCondition}-${currentWeatherData.currentIn}`,
            notificationTitle,
            notificationMessage
        );
    }

    weatherSubscription.set({} as RegionStatusSubscription);
}