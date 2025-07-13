import ICAL from 'ical.js';
import { get, writable } from 'svelte/store';
import { CachedCalendarEvent, EssentialICalendarFields, NotificationType, type Source } from '../types';
import { localNotifications } from './local-notifications.svelte';
const _NETLIFY_PROXY_URL = 'https://pastol-test-site.netlify.app/.netlify/functions/proxy?url=';

import { format } from 'fecha';
import { calendarEventsCache } from './cached-calendar-events.svelte';
import { settings } from './settings.svelte';
import { fetchCache } from './fetcher.svelte';

export var { subscribe, set, update } = writable<NotificationType[]>([]);

export function deleteNotification(notificationId: string) {
    update(existingNotifications => {
        const result = existingNotifications.filter(n => n.uid !== notificationId);
        localNotifications.set(result);
        return result;
    });
}

export function addNotification(text: string, dateTimeString: string, frequency: string, enabled: boolean, shouldTriggerInAdvance: boolean, source: Source, uid: string) {
    const newNotification = new NotificationType();
    newNotification.uid = uid ?? crypto.randomUUID();
    newNotification.dateTimeString = dateTimeString;
    newNotification.text = text;
    newNotification.frequency = frequency;
    newNotification.enabled = enabled;
    newNotification.source = source;
    newNotification.shouldTriggerInAdvance = shouldTriggerInAdvance;
    
    update(existingNotifications => {
        const existingNotification = (existingNotifications??[]).find(n => n.uid === newNotification.uid)
        if (existingNotification) {
            const hasChanges = newNotification.text !== existingNotification.text ||
                newNotification.dateTimeString !== existingNotification.dateTimeString ||
                newNotification.frequency !== existingNotification.frequency;

            const result = existingNotifications.map(n =>
                n.uid === newNotification.uid
                    ? Object.assign(new NotificationType(), n, { hasChanges })
                    : n
            );
            localNotifications.set(result);
            return result;
        }



        const result = [...(existingNotifications ?? []) , newNotification];
        localNotifications.set(result);
        return result;
    });
};

export function toggleEnable(notificationId: string) {
    update(existingNotifications => {
        const result = existingNotifications.map(n =>
            n.uid === notificationId
                ? Object.assign(new NotificationType(), n, { enabled: !n.enabled })
                : n
        );
        localNotifications.set(result);
        return result;
    });
}

export function updateText(notificationId: string, text: string) {
    update(existingNotifications => {
        const result = existingNotifications.map(n =>
            n.uid === notificationId
                ? Object.assign(new NotificationType(), n, { text, hasChanges: true })
                : n
        );
        localNotifications.set(result);
        return result;
    });
}

export function initializeLocalStorageNotifications() {
    const localStorageNotifications = JSON.parse(localStorage.getItem('localNotifications') ?? '[]');
    localStorageNotifications.forEach((n: NotificationType) => {
        if ('specific-date' === n.frequency && new Date(n.dateTimeString) < new Date()) {
            return;
        }

        addNotification(n.text, n.dateTimeString, n.frequency, n.enabled, n.shouldTriggerInAdvance, n.source, n.uid);
    });
}

export async function fetchSortedCalendarEvents(iCalendarURL: string) {
    try {
        new URL(iCalendarURL);
    } catch (_) {
        console.error('Invalid iCalendar URL');
        return;
    }

    const partialICalendarURL = iCalendarURL.replace('https://calendar.google.com/', '');

    const fetchEndpoint = `${_NETLIFY_PROXY_URL}${partialICalendarURL}`;

    const textResponse = await fetchCache(fetchEndpoint, 'text');
    const jcalData = ICAL.parse(textResponse);
    const comp = new ICAL.Component(jcalData);

    const futureEvents = comp
        .getAllSubcomponents('vevent')
        .map((event) => {
            const dtstartProp = event.getFirstPropertyValue('dtstart');
            const dtstart =
                dtstartProp instanceof ICAL.Time
                    ? new Date(dtstartProp.toJSDate())
                    : new Date(dtstartProp.toString());
            const summary = event.getFirstPropertyValue('summary');
            const rrule = event.getFirstPropertyValue('rrule') as ICAL.Recur;

            if (_isEventInThePast(dtstart, rrule)) {
                console.log(`Event ${summary} is in the past.`);
                return null;
            }

            if (_hasEventEnded(rrule)) {
                console.log(`Event ${summary} has ended.`);
                return null;
            }

            const description = event.getFirstPropertyValue('description');
            const uid = event.getFirstPropertyValue('uid');

            return { dtstart, description, rrule, uid } as EssentialICalendarFields;
        })
        .filter(Boolean);

    return futureEvents.sort(
        (a, b) => a.dtstart.getTime() - b.dtstart.getTime()
    );
}

function addCalendarEventsForView(sortedFutureEvents: EssentialICalendarFields[]) {
    (sortedFutureEvents ?? []).forEach(({ description, dtstart, rrule, uid }) => {
        description = description ?? format(dtstart, 'dddd, hh:mm A, MMMM DD, YYYY');

        let dateTimeString = dtstart.toString();
        let frequency = rrule?.freq ?? 'specific-date';
        if (frequency === 'WEEKLY') {
            frequency = rrule.parts.BYDAY.join(', ');
        }

        calendarEventsCache.update(existingCache => {
            const result = new Map(existingCache);
            result.set(uid, {
                text: description,
                dateTimeString,
                uid,
                frequency: frequency ?? 'specific-date'
            } as CachedCalendarEvent);
            return result;
        });

        addNotification(description, dateTimeString, frequency, true, false, 'calendar', uid);
    });
}

export function resync(notificationId: string) {
    let isExist = false;

    update(existingNotifications => {
        let result = existingNotifications.map(n => {
            if (n.uid !== notificationId) {
                return n;
            }

            const cachedEvent = get(calendarEventsCache).get(notificationId);
            if (!cachedEvent) {
                return n;
            }

            isExist = true;

            return Object.assign(new NotificationType(), n, {
                text: cachedEvent.text,
                dateTimeString: cachedEvent.dateTimeString,
                frequency: cachedEvent.frequency,
                hasChanges: false
            });
        });

        if (!isExist) { // deleted remotely
            result = result.filter(n => n.uid !== notificationId);
        }

        localNotifications.set(result);

        return result;
    });
}

export function toggleAdvanceFiveMinutes(notificationId: string) {
    update(existingNotifications => {
        const result = existingNotifications.map(n =>
            n.uid === notificationId
                ? Object.assign(new NotificationType(), n, { shouldTriggerInAdvance: !n.shouldTriggerInAdvance })
                : n
        );
        localNotifications.set(result);
        return result;
    });
}

function markDeletedEventsWithHasChanges() {
    update(existingNotifications => {
        const result = existingNotifications.map(n => {
            if (n.source !== 'calendar') {
                return n;
            }

            if (!get(calendarEventsCache).get(n.uid)) {
                return Object.assign(new NotificationType(), n, { hasChanges: true });
            }

            return n;
        });

        localNotifications.set(result);
        return result;
    });
}

export async function initializeEvents() {
    initializeLocalStorageNotifications();
    
    await updateCalendarEvents();
}

export async function updateCalendarEvents() {
    const iCalendarURL = get(settings).iCalendarURL;

    const sortedFutureEvents = await fetchSortedCalendarEvents(iCalendarURL);

    addCalendarEventsForView(sortedFutureEvents);

    markDeletedEventsWithHasChanges();
}

function _isEventInThePast(dtstart: Date, rrule: ICAL.Recur) {
    const currentDate = new Date();
    return dtstart < currentDate && (!rrule || !rrule.freq);
}

function _hasEventEnded(rrule: ICAL.Recur) {
    const currentDate = new Date();
    return rrule?.until && new Date(rrule.until.toJSDate()) < currentDate;
}