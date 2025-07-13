<script lang="ts">
	import {
		deleteNotification,
		resync,
		toggleAdvanceFiveMinutes,
		toggleEnable,
		updateText
	} from '$lib/notification.svelte';
	import { doSpeak } from '$lib/say.svelte';
	import type { NotificationType } from '../types';

	let {
		notification
	}: {
		notification: NotificationType;
	} = $props();

	function speak(notificationText: string = 'empty message') {
		doSpeak(notificationText);
	}
</script>

<article class="notification-item" data-enabled={notification.enabled}>
	<div class="time-header">
		<label
			class="hover-lighten"
			title={notification.enabled
				? `Disable this ${notification.getDisplayedSource()} notification`
				: `Enable this ${notification.getDisplayedSource()} notification`}>
			<input
				type="checkbox"
				id=""
				style="display: none;"
				onchange={() => toggleEnable(notification.uid)} />
			<span class="time-enabled material-symbols-outlined">
				{notification.source === 'custom' ? 'alarm' : 'event'}
			</span>
			<span class="time-text tl-text">
				{notification.getDateTimeDisplay()}
				<span class="smaller large-screen">{notification.getFrequencyDisplay(false)}</span>
				<span class="smaller small-screen">{notification.getFrequencyDisplay(true)}</span>
			</span>
		</label>
		<button
			class="advance-five-minutes hover-glow hover-lighten"
			class:should-trigger-in-advance-disabled={!notification.shouldTriggerInAdvance}
			onclick={() => toggleAdvanceFiveMinutes(notification.uid)}>
			<span class="material-symbols-outlined" title="Trigger this notification five minutes early">
				timer_5
			</span>
		</button>
		{#if notification.source === 'calendar'}
			<button
				class="calendar-sync hover-glow hover-lighten"
				class:has-changes={notification.hasChanges}
				disabled={!notification.hasChanges}
				onclick={() => notification.hasChanges && resync(notification.uid)}>
				<span class="material-symbols-outlined" title="Resync this calendar event">sync</span>
			</button>
		{:else}
			<button
				class="delete-time hover-glow hover-lighten"
				onclick={() => deleteNotification(notification.uid)}
				title={`Delete this ${notification.getDisplayedSource()} notification`}>
				<span class="material-symbols-outlined">delete</span>
			</button>
		{/if}
	</div>
	<div class="custom-message">
		<!-- prettier-ignore -->
		<textarea
			oninput={(event) => updateText(notification.uid, (event.target as HTMLTextAreaElement).value)}
			id=""
			placeholder="placeholder"
			title="Message that would be spoken for this notification"
			rows="2">{ notification.text }</textarea>
		<button
			class="time-voice-preview hover-glow hover-lighten"
			onclick={() => speak(notification?.text)}>
			<span class="material-symbols-outlined" title="Hear a sound preview of this notification">
				record_voice_over
			</span>
		</button>
	</div>
</article>

<style>
	.notification-item {
		background:
			no-repeat 100% 100%,
			linear-gradient(90deg, rgba(52, 38, 56, 1), rgba(37, 27, 49, 0.4));
		backdrop-filter: blur(4px);
		border-radius: 5px;
		border: 1px solid rgb(var(--color-brown));
		padding: 10px 10px;
		background-color: var(--background-color);
		height: fit-content;
		display: flex;
		flex-direction: column;
		gap: 0.4em;

		.time-header {
			display: flex;
			align-items: center;
			gap: 0.5em;

			& > label {
				display: flex;
				align-items: center;
				cursor: pointer;
				-webkit-touch-callout: none;
				-webkit-user-select: none;
				-khtml-user-select: none;
				-moz-user-select: none;
				-ms-user-select: none;
				user-select: none;
				gap: 0.5em;

				span.time-enabled {
					color: rgb(var(--color-brown));
				}
			}

			button.advance-five-minutes {
				all: unset;
				cursor: pointer;
				color: rgb(var(--color-brown));
				margin-left: auto;

				&.should-trigger-in-advance-disabled {
					color: rgb(var(--color-gray));
					filter: unset !important;
					text-shadow: unset !important;
				}
			}

			button.calendar-sync {
				all: unset;
				cursor: pointer;
				color: rgb(var(--color-gray));

				&.has-changes {
					color: rgb(var(--color-brown));
				}
			}

			button.delete-time {
				all: unset;
				cursor: pointer;
				color: rgb(var(--color-brown));
			}
		}

		div.custom-message {
			position: relative;

			textarea {
				width: -webkit-fill-available;
				padding: 5px;
				font-family: TLHeader;
				background: #fff0dd;
				border-color: #7f4f2c;
				border-radius: 3px;
			}

			button.time-voice-preview {
				all: unset;
				cursor: pointer;
				color: rgb(var(--color-brown));
				position: absolute;
				bottom: 0px;
				right: 0;
				height: 24px;
			}
		}

		span.time-text {
			span.small-screen {
				display: none;
			}
			span.smaller {
				font-size: 0.75em;
			}
		}

		&[data-enabled='false'] {
			border: 1px solid transparent;

			span.time-enabled,
			span.time-text,
			button.time-voice-preview {
				color: rgb(var(--color-gray)) !important;

				&.tl-text {
					background: unset;
					-webkit-text-fill-color: unset;
					background-clip: unset;
				}
			}

			button.advance-five-minutes {
				color: rgb(var(--color-gray));
			}

			div.custom-message {
				display: none;
			}
		}
	}

	@media (max-width: 820px) {
		.notification-item {
			.time-header {
				gap: 0.08em;

				span.time-text {
					span.small-screen {
						display: inline;
					}
					span.large-screen {
						display: none;
					}
				}
			}
		}
	}
</style>
