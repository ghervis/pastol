import { persisted } from "svelte-persisted-store";
import { ServerStatusSubscription } from "../types";
import { get } from "svelte/store";
import { getServerStatus } from "./scraped-region-status.svelte";
import { doNotification } from "./main-process.svelte";

export const statusSubscription = persisted('statusSubscription', {} as ServerStatusSubscription);

export function doNotificationOnStatusChange() {
    const currentStatusSubscription = get(statusSubscription);

    if (!Object.keys(currentStatusSubscription).length) {
        return;
    }

    const currentStatusData = getServerStatus(currentStatusSubscription.region);

    if (!currentStatusData) {
        return;
    }

    if (currentStatusData === 'Unknown') {
        return;
    }

    const regionName = currentStatusSubscription.region;

    const isFromMaintenance = currentStatusSubscription.currentCondition === 'Maintenance' && currentStatusData !== 'Maintenance';
    
    const isFromLive = currentStatusSubscription.currentCondition !== 'Maintenance' && currentStatusData === 'Maintenance';

    if (isFromMaintenance || isFromLive) {
        const notificationTitle = `${regionName}: ${currentStatusData}`;
        const notificationMessage = `${regionName} is now on ${currentStatusData} server status.`;
        doNotification(
            `${currentStatusData}-${regionName}`,
            notificationTitle,
            notificationMessage
        );

        statusSubscription.set({} as ServerStatusSubscription);
    }
}