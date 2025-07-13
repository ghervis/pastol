<script lang="ts">
	import { settings } from '$lib/settings.svelte';
	import { onMount } from 'svelte';
	import type { Settings } from '../types';
	import { initializeEvents } from '$lib/notification.svelte';
	import { voices } from '$lib/say.svelte';

	let dialog: HTMLDialogElement;

	let resetProgressTimeout: NodeJS.Timeout;

	let resetContainer: HTMLElement;

	let resetProgress: HTMLElement;

	let canAllowNotification = false;
	let canAllowNotificationInterval: NodeJS.Timeout;

	onMount(() => {
		dialog = document.querySelector('dialog#settings') as HTMLDialogElement;
		const addCustomButton = document.querySelector('button#open-settings');
		const close = document.querySelector('button#close-settings');
		resetContainer = document.querySelector('.reset-container');
		resetProgress = document.getElementById('reset-progress');

		addCustomButton.addEventListener('click', () => openAddCustomModalEvent(dialog));
		close.addEventListener('click', () => dialog.close());

		addResetProgressEventListeners();

		clearInterval(canAllowNotificationInterval);
		canAllowNotificationInterval = setInterval(
			() => (canAllowNotification = Notification.permission === 'default'),
			1000
		);
	});

	const startResetProgressHold = () => {
		stopResetProgressHold();
		resetContainer.style.animation = 'none';
		resetContainer.offsetHeight; /* trigger reflow */
		resetContainer.style.animation = null;
		resetContainer.classList.add('reset-progress-animation');
		resetProgressTimeout = setTimeout(resetProgressCallback, 4000);
	};

	const stopResetProgressHold = () => {
		resetContainer.classList.remove('reset-progress-animation');
		clearTimeout(resetProgressTimeout);
	};

	const resetProgressCallback = () => {
		resetContainer.classList.remove('reset-progress-animation');

		localStorage.clear();
		sessionStorage.clear();
		window.location.reload();
	};

	const openAddCustomModalEvent = (dialog: HTMLDialogElement) => {
		const currentDate = new Date();
		const [month, date, year] = currentDate.toLocaleDateString().split('/');
		(document.querySelector('#date') as HTMLInputElement).value =
			`${year}-${month.padStart(2, '0')}-${date.padStart(2, '0')}`;

		(document.querySelector('#time') as HTMLInputElement).value = currentDate
			.toTimeString()
			.substring(0, 5);
		dialog.showModal();
	};

	const addResetProgressEventListeners = () => {
		document.getElementById('reset-progress').addEventListener('mousedown', (event) => {
			event.preventDefault();
			startResetProgressHold();
		});

		document.getElementById('reset-progress').addEventListener('mouseup', (event) => {
			event.preventDefault();
			stopResetProgressHold();
		});

		document.getElementById('reset-progress').addEventListener('touchstart', (event) => {
			event.preventDefault();
			startResetProgressHold();
		});

		document.getElementById('reset-progress').addEventListener('touchend', (event) => {
			event.preventDefault();
			stopResetProgressHold();
		});
	};

	const saveSettings = (event: SubmitEvent) => {
		event.preventDefault();
		const htmlFormElement: HTMLFormElement = event.target as HTMLFormElement;
		const formData = new FormData(htmlFormElement);
		const data = Object.fromEntries(formData.entries());

		let enableRainEffect = false;
		if (data.enableRainEffect === 'on') {
			enableRainEffect = true;
		}

		let enableNews = false;
		if (data.enableNews === 'on') {
			enableNews = true;
		}

		settings.set({
			...data,
			enableRainEffect,
			enableNews
		} as unknown as Settings);
		initializeEvents();
		dialog.close();
	};

	function requestNotificationPermission(event: MouseEvent) {
		event.preventDefault();

		Notification.requestPermission();
	}
</script>

<dialog id="settings">
	<form onsubmit={saveSettings}>
		<h1 class="tl-text">Settings</h1>
		<button type="button" id="close-settings">
			<span class="material-symbols-outlined">close</span>
		</button>

		<label for="region" title="Weather and Time Of Day will be based by Region">Region</label>
		<select name="region" id="region" title="Weather and Time Of Day will be based by Region">
			<option value="Japan Oceania">Japan Oceania</option>
			<option value="Eastern Americas">Eastern Americas</option>
			<option value="Europe">Europe</option>
			<option value="South America">South America</option>
			<option value="Western Americas">Western Americas</option>
		</select>

		<label for="voice" title="Selected voice to be used during notificaitons.">Voice</label>
		<select name="voice" id="voice" title="Selected voice to be used during notificaitons.">
			{#each $voices as voice}
				<option value={voice.name} selected={$settings.voice === voice.name}>{voice.name}</option>
			{/each}
		</select>

		<label
			for="iCalendarURL"
			title="Write iCalendar URL here. This URL here will be the source of some of your notifications.">
			iCalendar URL
		</label>
		<input
			type="text"
			name="iCalendarURL"
			value={$settings.iCalendarURL}
			title="Write iCalendar URL here. This URL here will be the source of some of your notifications." />

		<label
			for="discordWebhookURL"
			title="Publish events to your Discord Server using a Webhook URL.">
			Discord Webhook URL
		</label>
		<input
			type="text"
			name="discordWebhookURL"
			id="discordWebhookURL"
			title="Publish events to your Discord Server using a Webhook URL."
			value={$settings.discordWebhookURL} />

		{#if canAllowNotification}
			<button type="button" id="allow-notification" onclick={requestNotificationPermission}>
				Allow Notification
			</button>
		{/if}

		<label for="enableRainEffect" title="Toggle the rain effect on the background.">
			<span>Enable Rain Effect</span>
			<input
				type="checkbox"
				id="enableRainEffect"
				name="enableRainEffect"
				checked={$settings?.enableRainEffect ?? true} />
			<span class="material-symbols-outlined">rainy</span>
		</label>

		<label for="enableNews" title="Toggle News">
			<span>Enable News</span>
			<input
				type="checkbox"
				id="enableNews"
				name="enableNews"
				checked={$settings?.enableNews ?? true} />
			<span class="material-symbols-outlined">newspaper</span>
		</label>

		<details class="advanced-setup-notes">
			<summary>Advanced Setup Notes</summary>
			<div>
				Manually "Allow" Sound in Site Settings to enable passive voice notifications even without
				user interaction.
			</div>
			<div>Ask Ghervis for help.</div>
		</details>

		<div
			class="reset-container settings-item-container cursor-pointer"
			id="reset-progress"
			role="button"
			tabindex="0"
			oncontextmenu={(event) => event.preventDefault()}>
			<div class="no-highlight">Hold to Remove ALL Saved Data</div>
		</div>

		<button type="submit" class="hover-glow hover-lighten">Save</button>
	</form>
</dialog>

<style>
	@import '/common.css';

	dialog#settings {
		margin: 120px auto;
		padding: 1em 1em;
		width: 500px;
		background:
			no-repeat 100% 100%,
			linear-gradient(90deg, rgba(52, 38, 56, 1), rgba(37, 27, 49, 0.4));
		backdrop-filter: blur(4px);
		color: rgb(var(--color-brown));
		border-radius: 5px;
		border: 1px solid rgb(var(--color-brown));

		&::backdrop {
			background-color: rgba(0, 0, 0, 0.7);
		}

		form {
			display: flex;
			flex-wrap: wrap;

			& > * {
				flex: 100%;
			}

			h1 {
				margin-bottom: 10px;
			}

			input,
			select {
				font-family: TLHeader;
			}

			label {
				user-select: none;
			}

			h1 {
				flex: 90%;
			}

			button#close-settings {
				flex: 10%;
				background: none;
				color: inherit;
				border: none;
				padding: 0;
				font: inherit;
				cursor: pointer;
				outline: inherit;
				align-self: self-start;
				text-align: right;
				user-select: none;
			}

			input[name='iCalendarURL'],
			select[name='region'],
			select[name='voice'],
			input[name='discordWebhookURL'] {
				margin-bottom: 24px;
				border-radius: 4px;
				height: 24px;
			}

			label[for='enableRainEffect'] {
				margin-bottom: 24px;
				flex: 60%;

				input[type='checkbox'] {
					display: none;

					&:not(:checked) + span {
						color: rgb(var(--color-gray));
					}
				}

				span.material-symbols-outlined {
					font-size: 1.8em;
					vertical-align: middle;
					margin-left: 20px;
					cursor: pointer;
				}
			}

			label[for='enableNews'] {
				margin-bottom: 24px;
				flex: 60%;

				input[type='checkbox'] {
					display: none;

					&:not(:checked) + span {
						color: rgb(var(--color-gray));
					}
				}

				span.material-symbols-outlined {
					font-size: 1.8em;
					vertical-align: middle;
					margin-left: 20px;
					cursor: pointer;
				}
			}

			.reset-container {
				color: rgb(var(--color-f7df6f));
				border: 5px double rgb(var(--color-ffffee));
				padding: 5px;
				margin-bottom: 24px;
				border: 1px solid rgb(var(--color-brown));
				cursor: pointer;
				border-radius: 5px;
			}

			:global(.reset-progress-animation) {
				background: linear-gradient(
					to right,
					rgb(var(--color-3a3a3a)) 0%,
					rgb(var(--color-cf4f2f)) 50%,
					rgb(var(--color-cf4f2f)) 100%
				);
				width: 100%;
				background-size: 200% auto;
				background-position: 0 100%;
				animation: red-gradient 4s linear;
			}

			button[type='submit'] {
				border: 1px solid rgb(var(--color-yellow));
				background: rgb(var(--color-brown));
				font-size: 1em;
				padding: 5px 12px;
				display: flex;
				align-items: center;
				gap: 0 0.2em;
				justify-content: center;
				width: min-content;
				border-radius: 4px;
				cursor: pointer;
				font-family: TLHeader;
			}

			.advanced-setup-notes {
				margin-bottom: 24px;
				cursor: pointer;
				-webkit-touch-callout: none; /* iOS Safari */
				-webkit-user-select: none; /* Safari */
				-khtml-user-select: none; /* Konqueror HTML */
				-moz-user-select: none; /* Old versions of Firefox */
				-ms-user-select: none; /* Internet Explorer/Edge */
				user-select: none;
			}

			button#allow-notification {
				font-family: TLHeader;
				cursor: pointer;
				background: unset;
				border: unset;
				padding: unset;
				margin: unset;
				color: unset;
				outline: unset;
				border: 1px solid rgb(var(--color-brown));
				font-size: 1em;
				height: 28px;
				border-radius: 4px;
				margin-bottom: 24px;
			}
		}
	}

	@keyframes red-gradient {
		0% {
			background-position: 0 0;
		}

		100% {
			background-position: -100% 0;
		}
	}
</style>
