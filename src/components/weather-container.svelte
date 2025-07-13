<script lang="ts">
	import { settings } from '../lib/settings.svelte';
	import {
		getServerStatus,
		getTimeOfDay,
		getTimeOfDayList,
		getWeather,
		getWeatherList
	} from '$lib/scraped-region-status.svelte';
	import {
		ServerStatusSubscription,
		WEATHER_CONDITION_DISPLAY_MAP,
		type RegionStatusData,
		type RegionStatusSubscription,
		type ScrapedTimeOfDayDateTime,
		type ScrapedWeatherDateTime,
		type ServerStatus,
		type TimeOfDayCondition,
		type WeatherCondition
	} from '../types';
	import { weatherSubscription } from '$lib/weather-subscription.svelte';
	import { timeOfDaySubscription } from '$lib/time-of-day-subscription.svelte';
	import { format } from 'fecha';
	import { doSpeak } from '$lib/say.svelte';
	import { statusSubscription } from '$lib/status-subscription.svelte';

	let regionName: string;

	let currentWeatherData: RegionStatusData;
	let weatherDisplay: string;
	let weatherNextInShortVersion = '';
	let weatherNextInLongVersion = '';
	let weatherDescription: string;

	let currentTimeOfDayData: RegionStatusData;
	let timeOfDayDisplay: string;
	let timeOfDayNextInShortVersion = '';
	let timeOfDayNextInLongVersion = '';
	let timeOfDayDescription: string;

	let currentServerStatusData: ServerStatus;
	let serverStatusDisplay: string;
	let serverStatusDescription: string;

	const containerInterval = () => {
		if (!($settings || {})['region']) {
			return;
		}

		regionName = $settings['region'];

		currentWeatherData = getWeather(regionName);

		if (!currentWeatherData) {
			return;
		}

		currentTimeOfDayData = getTimeOfDay(regionName);

		if (!currentTimeOfDayData) {
			return;
		}

		currentServerStatusData = getServerStatus(regionName);

		if (!currentServerStatusData) {
			return;
		}

		assembleTimeOfDayDisplay(currentTimeOfDayData);
		assembleWeatherDisplay(currentWeatherData);
		assembleServerStatusDisplay(currentServerStatusData);
	};

	function assembleTimeOfDayDisplay(weatherData: RegionStatusData) {
		const currentTimestamp = Date.now();
		const nextDuration = weatherData.nextIn - currentTimestamp;
		const secondsRemaining = Math.floor(nextDuration / 1000);

		const remainingTimeObject = getRemainingTime(secondsRemaining);

		timeOfDayDisplay = weatherData.currentCondition === 'Day' ? 'brightness_5' : 'dark_mode';
		timeOfDayNextInShortVersion = remainingTimeObject.shortVersion;

		timeOfDayNextInLongVersion = `${'brightness_5' === timeOfDayDisplay ? 'night' : 'day'} in ${remainingTimeObject.longVersion}.`;

		let timeOfDayListString = '';
		const timeOfDayList = getTimeOfDayList(regionName);
		if (Array.isArray(timeOfDayList) && timeOfDayList.length) {
			timeOfDayListString = timeOfDayList
				.slice(1)
				.map(
					(timeOfDay: ScrapedTimeOfDayDateTime) =>
						`${timeOfDay.condition}: ${format(new Date(timeOfDay.ts), 'hh:mm A')}`
				)
				.join('\n');

			timeOfDayListString = `Upcoming time of day changes:\n${timeOfDayListString}`;
		}

		const wasSubscribedToTimeOfDayChange = _hasKeys($timeOfDaySubscription);
		timeOfDayDescription = `${timeOfDayListString}${timeOfDayListString.length ? '\n\n' : ''}Click to ${
			wasSubscribedToTimeOfDayChange ? 'unsubscribe' : 'subscribe'
		} to time of day change.`;
	}

	function assembleWeatherDisplay(weatherData: RegionStatusData) {
		const currentTimestamp = Date.now();
		const nextDuration = weatherData.nextIn - currentTimestamp;
		const secondsRemaining = Math.floor(nextDuration / 1000);

		const remainingTimeObject = getRemainingTime(secondsRemaining);

		weatherDisplay =
			weatherData.currentCondition === 'EWeatherType::Normal' ? 'sentiment_satisfied' : 'rainy';
		weatherNextInShortVersion = remainingTimeObject.shortVersion;

		weatherNextInLongVersion = `${'rainy' === weatherDisplay ? 'stops' : 'rains'} in ${remainingTimeObject.longVersion}.`;

		const weatherList = getWeatherList(regionName);
		let weatherListString = '';
		if (Array.isArray(weatherList) && weatherList.length) {
			weatherListString = weatherList
				.slice(1)
				.map(
					(weather: ScrapedWeatherDateTime) =>
						`${WEATHER_CONDITION_DISPLAY_MAP[weather.condition]}: ${format(new Date(weather.ts), 'hh:mm A')}`
				)
				.join('\n');

			weatherListString = `Upcoming weather changes:\n${weatherListString}`;
		}

		const wasSubscribedToWeatherChange = _hasKeys($weatherSubscription);

		weatherDescription = `${weatherListString}${weatherListString.length ? '\n\n' : ''}Click to ${
			wasSubscribedToWeatherChange ? 'unsubscribe' : 'subscribe'
		} to weather change.`;
	}

	const SERVER_STATUS_MATERIAL_SYMBOL_MAP = {
		Good: 'check',
		Busy: 'history_toggle_off',
		Full: 'close',
		Maintenance: 'build',
		Unknown: 'question_mark'
	};

	function assembleServerStatusDisplay(serverStatus: ServerStatus) {
		serverStatusDisplay = SERVER_STATUS_MATERIAL_SYMBOL_MAP[serverStatus];

		const wasSubscribedToServerStatusChange = _hasKeys($statusSubscription);

		serverStatusDescription = `${regionName} is on ${serverStatus} server status.\n\nClick to ${
			wasSubscribedToServerStatusChange ? 'unsubscribe' : 'subscribe'
		} to server status change.`;
		return serverStatus;
	}

	let intervalHolder: NodeJS.Timeout;
	$: {
		clearInterval(intervalHolder);
		intervalHolder = setInterval(containerInterval, 1000);
	}

	function getRemainingTime(secondsRemaining: number) {
		const secondsPortion = secondsRemaining % 60;
		const minutesPortion = Math.floor(secondsRemaining / 60) % 60;
		const hoursPortion = Math.floor(secondsRemaining / 3600) % 24;

		let longPortions = [
			hoursPortion > 0 ? `${hoursPortion} hour${hoursPortion > 1 ? 's' : ''}` : undefined,
			minutesPortion > 0 ? `${minutesPortion} minute${minutesPortion > 1 ? 's' : ''}` : undefined,
			secondsPortion > 0 ? `${secondsPortion} second${secondsPortion > 1 ? 's' : ''}` : undefined
		];

		const longVersion = longPortions.filter(Boolean).join(', ');

		if (secondsRemaining < 120) {
			return {
				shortVersion: `${secondsRemaining}s`,
				longVersion
			};
		}

		if (secondsRemaining < 7200) {
			return {
				shortVersion: `${Math.floor(secondsRemaining / 60)}m`,
				longVersion
			};
		}

		return {
			shortVersion: `${Math.floor(secondsRemaining / 3600)}h`,
			longVersion
		};
	}

	function subscribeToTimeOfDayChange(event: Event) {
		event.preventDefault();

		if (!currentTimeOfDayData) {
			return;
		}

		const wasSubscribedToTimeOfDayChange = _hasKeys($timeOfDaySubscription);

		doSpeak(
			`${wasSubscribedToTimeOfDayChange ? 'Unsubscribed' : 'Subscribed'} to time of day change.`
		);

		timeOfDaySubscription.set(
			wasSubscribedToTimeOfDayChange
				? ({} as RegionStatusSubscription)
				: {
						region: regionName,
						currentCondition: currentTimeOfDayData.nextCondition as TimeOfDayCondition,
						currentIn: currentTimeOfDayData.currentIn,
						nextIn: currentTimeOfDayData.nextIn
					}
		);
	}

	function subscribeToWeatherChange(event: Event) {
		event.preventDefault();

		if (!currentWeatherData) {
			return;
		}

		const wasSubscribeToWeatherChange = _hasKeys($weatherSubscription);

		doSpeak(`${wasSubscribeToWeatherChange ? 'Unsubscribed' : 'Subscribed'} to weather change.`);

		weatherSubscription.set(
			wasSubscribeToWeatherChange
				? ({} as RegionStatusSubscription)
				: {
						region: regionName,
						currentCondition: currentWeatherData.nextCondition as WeatherCondition,
						currentIn: currentWeatherData.currentIn,
						nextIn: currentWeatherData.nextIn
					}
		);
	}

	function subscribeToServerStatusChange(event: Event) {
		event.preventDefault();

		if (!currentServerStatusData) {
			return;
		}

		const wasSubscribeToServerStatusChange = _hasKeys($statusSubscription);

		doSpeak(
			`${wasSubscribeToServerStatusChange ? 'Unsubscribed' : 'Subscribed'} to server status change.`
		);

		statusSubscription.set(
			wasSubscribeToServerStatusChange
				? ({} as ServerStatusSubscription)
				: {
						region: regionName,
						currentCondition: currentServerStatusData as ServerStatus
					}
		);
	}

	function _hasKeys(obj: RegionStatusSubscription | ServerStatusSubscription) {
		return !!Object.keys(obj).length;
	}
</script>

<section class="header">
	<div class="server-name">{regionName}</div>
	<button
		class="server-status"
		title={serverStatusDescription}
		data-server-status={currentServerStatusData}
		class:is-subscribed={_hasKeys($statusSubscription)}
		onclick={subscribeToServerStatusChange}
		aria-label="server status">
		<span class="material-symbols-outlined">
			{serverStatusDisplay}
		</span>
	</button>
	<button
		class="time-of-day"
		title={timeOfDayDescription}
		class:is-subscribed={_hasKeys($timeOfDaySubscription)}
		onclick={subscribeToTimeOfDayChange}
		aria-label="time of day">
		<span class="time-of-day-current material-symbols-outlined">
			{timeOfDayDisplay}
		</span>
		<span class="full next-in-text">{timeOfDayNextInLongVersion}</span>
		<span class="small next-in-text">{timeOfDayNextInShortVersion}</span>
	</button>
	<button
		class="weather"
		title={weatherDescription}
		class:is-subscribed={_hasKeys($weatherSubscription)}
		onclick={subscribeToWeatherChange}
		aria-label="weather">
		<span class="weather-current material-symbols-outlined" aria-label="Change weather">
			{weatherDisplay}
		</span>
		<span class="full next-in-text">{weatherNextInLongVersion}</span>
		<span class="small next-in-text">{weatherNextInShortVersion}</span>
	</button>
</section>

<style>
	section.header {
		display: flex;
		flex-direction: row;
		align-items: center;
		background: #000;
		background:
			no-repeat 100% 100%,
			linear-gradient(90deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.4));
		backdrop-filter: blur(4px);
		padding: 10px 20px;

		& > * {
			align-items: center;
			height: 24px;
			align-content: center;
			font-family: TLHeader;
		}

		.server-name {
			flex: 12%;
		}

		.server-status {
			border-radius: 50%;
			background: transparent;
			height: 24px;
			width: 24px;
			position: relative;
			cursor: pointer;
			background: unset;
			border: unset;
			padding: unset;
			margin: unset;
			color: unset;
			outline: unset;
			position: relative;
			margin-left: 5px;

			&.is-subscribed {
				&[data-server-status='Good'] {
					color: #24ff00;
				}

				&[data-server-status='Busy'] {
					color: #fff500;
				}

				&[data-server-status='Full'] {
					color: #ff0000;
				}

				&[data-server-status='Maintenance'] {
					color: #00f0ff;
				}

				&[data-server-status='Unknown'] {
					color: #aaaaaa;
				}
			}
		}

		.time-of-day {
			border-left: 1px solid #fff;
			display: flex;
			flex: 45%;
			text-align: right;
			justify-content: space-between;
			cursor: pointer;
			background: unset;
			border: unset;
			padding: unset;
			margin: unset;
			color: unset;
			outline: unset;
			position: relative;

			&.is-subscribed {
				color: rgb(var(--color-yellow));
			}

			.time-of-day-current {
				flex: 10%;
			}

			span.small {
				display: none;
			}

			span.next-in-text {
				flex: 90%;
				margin-left: auto;
				margin-right: 20px;
			}
		}

		.weather {
			border-left: 1px solid #fff;
			display: flex;
			flex: 40%;
			text-align: right;
			justify-content: space-between;
			cursor: pointer;
			background: unset;
			border: unset;
			padding: unset;
			margin: unset;
			color: unset;
			outline: unset;

			&.is-subscribed {
				color: rgb(var(--color-yellow));
			}

			.weather-current {
				flex: 10%;
			}

			span.small {
				display: none;
			}

			span.next-in-text {
				flex: 90%;
				margin-left: auto;
			}
		}
	}

	@media (max-width: 920px) {
		section.header {
			.server-name {
				flex: unset;
			}
			.server-status {
				margin-right: auto;
			}
			.time-of-day {
				flex: unset;
				border-left: unset;

				.time-of-day-current {
					margin-right: 5px;
				}

				span.small {
					display: inline !important;
				}

				span.full {
					display: none;
				}
			}

			.weather {
				flex: unset;
				border-left: unset;

				.weather-current {
					margin-right: 5px;
				}

				span.small {
					display: inline !important;
				}

				span.full {
					display: none;
				}
			}
		}
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
