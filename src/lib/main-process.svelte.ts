import { get } from "svelte/store";
import { createDeviceNotification } from "./device-notification.svelte";
import { localNotifications } from "./local-notifications.svelte";
import { doSpeak, loadVoices } from "./say.svelte";
import { format } from "fecha";
import type { LocalNotification, ScrapedRegionStatus } from "../types";
import { settings } from "./settings.svelte";
import { scrapedRegionStatus } from "./scraped-region-status.svelte";
import { deleteNotification, initializeLocalStorageNotifications, updateCalendarEvents } from "./notification.svelte";
import { doNotificationOnTimeOfDayChange } from "./time-of-day-subscription.svelte";
import { doNotificationOnWeatherChange } from "./weather-subscription.svelte";
import { createDiscordNotification } from "./discord-notification.svelte";
import { fetchCache } from "./fetcher.svelte";
import { doNotificationOnStatusChange } from "./status-subscription.svelte";

const WEEKDAYS = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
const VOICES_LOADED_EVENT_NAME = 'voices-loaded';

let queuedNotificationIdMap = {};
let processCounter = 0;

let queuedNotifications = [];

export function run() {
    if (0 === processCounter) {
        initializeLocalStorageNotifications();
    }

    if (0 === (processCounter % 300)) {
        _doScrapeRegionStatus();
    }

    if (0 === (processCounter % 543)) {
        updateCalendarEvents();
    }

    doNotificationOnTimeOfDayChange();
    doNotificationOnWeatherChange();
    doNotificationOnStatusChange()

    if (0 === (processCounter % 5)) {
        _processEachQueuedNotification();
    }
    _checkNotifications();

    processCounter = (processCounter + 1) % 69000;
}

export function initialize() {
	document.addEventListener(VOICES_LOADED_EVENT_NAME, async () => {
		new Worker(`worker.js`).onmessage = function () {
            run();
		};
	});

	loadVoices(VOICES_LOADED_EVENT_NAME);
}

function _checkNotifications() {
    get(localNotifications).forEach((eachNotification) => {
        if (!eachNotification.enabled) {
            return;
        }

        const baseNotificationId = getBaseNotificationId(eachNotification);

        if(eachNotification.shouldTriggerInAdvance && _shouldTriggerByDate(new Date(Date.now() + (5 * 60 * 1000)), eachNotification)) {
            _queueNotification(`${baseNotificationId}-advance`, eachNotification, false);
        }

        if(_shouldTriggerByDate(new Date(), eachNotification)) {
            _queueNotification(`${baseNotificationId}-on-time`, eachNotification, true);
        }
    });
}

function _shouldTriggerByDate(dateToEvaluate: Date, localNotification: LocalNotification) {
    const currentHour = dateToEvaluate.getHours();
    const currentMinute = dateToEvaluate.getMinutes();
    const notificationDate = new Date(localNotification.dateTimeString);

    if (notificationDate.getHours() === currentHour && notificationDate.getMinutes() === currentMinute) {
        if (!localNotification?.frequency || localNotification?.frequency === 'specific-date') {
            if (notificationDate.getDate() === dateToEvaluate.getDate() &&
                    notificationDate.getMonth() === dateToEvaluate.getMonth() &&
                    notificationDate.getFullYear() === dateToEvaluate.getFullYear()) {
                return true;
            }
        }

        if (localNotification?.frequency === 'DAILY') {
            return true;
        }
        
        const weeklyDays = localNotification?.frequency.split(', ');

        if (weeklyDays.includes(WEEKDAYS[dateToEvaluate.getDay()])) {
            return true;
        }
    }

    return false;
}

function _queueNotification(notificationId: string, localNotification: LocalNotification, isOnTime: boolean) {
    if (queuedNotificationIdMap[notificationId]) {
        return;
    }
    
    queuedNotificationIdMap[notificationId] = true;

    queuedNotifications.push({
        text: localNotification.text,
        isOnTime,
        displaySource: localNotification.getDisplayedSource(),
        notificationId,
        frequency: localNotification.frequency,
        uid: localNotification.uid,
    });
}

function getBaseNotificationId(localNotification: LocalNotification) {
    const { uid, dateTimeString } = localNotification;
    const notificationDateId = format(new Date(dateTimeString), 'YYYY-MM-DD-HH-mm-ss');
    const currentDate = new Date();
    return `${notificationDateId}-${uid}-${currentDate.getDay()}`;
}

const _REGION_MAPPING = {
    'Japan Oceania': 'jp',
    'Eastern Americas': 'ea',
    'Europe': 'eu',
    'South America': 'sa',
    'Western Americas': 'wa',
};

async function _doScrapeRegionStatus() {
    settings.subscribe(async (settings) => {
        if (!settings.region) {
            return;
        }

        const regionAbbreviation = _REGION_MAPPING[settings.region];

        const fetchEndpoint = `https://pastol-test-site.netlify.app/.netlify/functions/region-status?region=${regionAbbreviation}`;
        const jsonResponse = await fetchCache(fetchEndpoint, 'json');
        scrapedRegionStatus.set(jsonResponse as ScrapedRegionStatus);
    });

}

function _processEachQueuedNotification() {
    if (!queuedNotifications.length) {
        return;
    }

    const { text, isOnTime, displaySource, notificationId, frequency, uid } = queuedNotifications.shift();

    let notificationMessage = text

    if (!isOnTime) {
        notificationMessage = `This is an early notification for ${text}`;
    }

    const notificationTitle = `${displaySource} notification`;

    doNotification(notificationId, notificationTitle, notificationMessage);

    if (frequency === 'specific-date' && isOnTime) {
        deleteNotification(uid);
    }
}

export function doNotification(tagId: string, title: string, message: string) {
    doSpeak(message ?? 'empty message');

    createDeviceNotification(tagId, title, message);

    createDiscordNotification(message);
}