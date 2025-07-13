import { format } from 'fecha';
import ICAL from 'ical.js';

export type Source = 'calendar' | 'custom' | 'weather' | 'day' | string;

export class NotificationType {
    uid: string;
    dateTimeString: string;
    text: string;
    enabled: boolean;
    frequency: string;
    source: Source;
    hasChanges: boolean = false;
    shouldTriggerInAdvance: boolean = false;

    getDisplayedSource(): string {
        switch (this.source) {
            case 'calendar':
                return 'Google Calendar Event';
            case 'custom':
                return 'Custom';
            default:
                return 'Unknown';
        }
    }

    getFrequencyDisplay(isMini: boolean = false): string {
        if ('specific-date' === this.frequency) {
            return isMini ? ` ${format(new Date(this.dateTimeString), 'MM/DD/YYYY')}` : ` ${format(new Date(this.dateTimeString), 'dddd, MMMM DD, YYYY')}`;
        }

        if ('DAILY' === this.frequency) {
            return ' Daily';
        }

        if ('MO, TU, WE, TH, FR, SA, SU' === this.frequency) {
            return ' Daily';
        }

        return ` ${this.frequency}`;
    }

    getMiniFrequencyDisplay(): string {
        return this.getFrequencyDisplay(true);
    }

    getDateTimeDisplay(): string {
        return format(this.getDate(), 'hh:mm A');
    }

    getDate(): Date {
        return new Date(this.dateTimeString);
    }
};

export class Settings {
    iCalendarURL: string;
    googleCalendarURL: string;
    region: string;
    voice: string;
    discordWebhookURL: string;
    enableRainEffect: boolean = true;
    enableNews: boolean = true;
}

export class EssentialICalendarFields {
    dtstart: Date;
    description: string;
    rrule: ICAL.Recur;
    uid: string;
}

export class CachedCalendarEvent {
    uid: string;
    dateTimeString: string;
    frequency: string;
    text: string;
}

export class LocalNotification extends NotificationType {
}

export type WeatherCondition = 'EWeatherType::Rain' | 'EWeatherType::Normal' | 'EWeatherType::Snow' | 'EWeatherType::Indoor';

export type TimeOfDayCondition = 'Day' | 'Night';

export interface ScrapedWeatherDateTime {
    ts: number;
    condition: WeatherCondition;
}

export interface ScrapedTimeOfDayDateTime {
    ts: number;
    condition: TimeOfDayCondition;
}

export class ScrapedRegionStatus {
    weather: ScrapedWeatherDateTime[];
    timeOfDay: ScrapedTimeOfDayDateTime[];
    status: ServerStatus;
}

export class RegionStatusData {
    currentCondition: string;
    currentIn: number;
    nextIn: number;
    nextCondition: WeatherCondition | TimeOfDayCondition;
}

export class RegionStatusSubscription {
    region: string;
    currentCondition: WeatherCondition | TimeOfDayCondition;
    currentIn: number;
    nextIn: number;
}

export class ServerStatusSubscription {
    region: string;
    currentCondition: ServerStatus;
}

export class DiscordWebhookNotification {
    webhookUrl: string;
}

export var WEATHER_CONDITION_DISPLAY_MAP: Record<WeatherCondition, string> = {
    'EWeatherType::Rain': 'Raining',
    'EWeatherType::Normal': 'Normal',
    'EWeatherType::Snow': 'Snowing',
    'EWeatherType::Indoor': 'Indoor'
};

export type ServerStatus = 'Good' | 'Busy' | 'Full' | 'Maintenance' | 'Unknown' | string;

export class NewsType {
    title: string;
    description: string;
    link: string;
    pubDate: string;
    mediaContent: string;
}