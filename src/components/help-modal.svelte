<script lang="ts">
	import { onMount } from 'svelte';

	let dialog: HTMLDialogElement;

	onMount(() => {
		dialog = document.querySelector('dialog#help') as HTMLDialogElement;
		const addCustomButton = document.querySelector('button#open-help');
		const closeHelpButton = document.querySelector('button#close-help');

		const openAddCustomModalEvent = () => dialog.showModal();

		addCustomButton.addEventListener('click', openAddCustomModalEvent);

		closeHelpButton.addEventListener('click', () => {
			dialog.close();
		});
	});
</script>

<dialog id="help">
	<h1 class="tl-text">Help</h1>
	<button type="button" id="close-help">
		<span class="material-symbols-outlined">close</span>
	</button>

	<details name="help-one-item-opened-at-a-time">
		<summary>Why</summary>
		<div>
			You are on a different tab of your browser or alt-tabbed from the game. You are on your phone
			with Google Chrome opened and you want to get notified about <em>some</em>
			in-game events.
		</div>
	</details>

	<details name="help-one-item-opened-at-a-time">
		<summary>Custom Notifications</summary>
		<!-- prettier-ignore -->
		<div>
			Click the Add <span class="material-symbols-outlined">add</span>
			button to create a custom notification. This custom notification can be scheduled with a specific
			date or time. This notification can be repeated on specific days of the week. Custom notifications
			can be deleted by clicking on the trash icon <span class="material-symbols-outlined">delete</span>.
			Custom notifications can be disabled by clicking on the alarm icon <span class="material-symbols-outlined">alarm</span>.
		</div>
	</details>

	<details name="help-one-item-opened-at-a-time">
		<summary>Calendar Events</summary>
		<!-- prettier-ignore -->
		<div>
			Input an iCalendar URL to populate Pastol with your calendar events. These events will be used
			to create notifications. These events can be disabled by clicking on the calendar icon <span class="material-symbols-outlined disabled-icon">event</span>. Calendar events can only be deleted when that item is removed from the source calendar.
			These events can will have the resynced button <span class="material-symbols-outlined">sync</span> enabled when the event text is changed locally or when that event is deleted from the
			sourced iCalendar.
		</div>
	</details>

	<details name="help-one-item-opened-at-a-time">
		<summary>Five Minutes Early Notification</summary>
		<!-- prettier-ignore -->
		<div>
			Calendar Events and Custom Notifications can be triggered five minutes early by clicking on
			the clock watch icon <span class="material-symbols-outlined">timer_5</span>. This will trigger an additional notification five minutes before the actual notification.
		</div>
	</details>

	<details name="help-one-item-opened-at-a-time">
		<summary>Time of Day</summary>
		<!-- prettier-ignore -->
		<div>
			These will be displayed as either Day <span class="material-symbols-outlined">brightness_5</span>, or Night <span class="material-symbols-outlined">dark_mode</span> depending on your set Server Region.
		</div>
		<div>
			Clicking on this section will trigger a one-time notification when the current time of day
			switches to another time of day (day to night or vice-versa).
		</div>
	</details>

	<details name="help-one-item-opened-at-a-time">
		<summary>Weather</summary>
		<!-- prettier-ignore -->
		<div>
			These will be displayed as either Normal <span class="material-symbols-outlined">sentiment_satisfied</span>, or Rain <span class="material-symbols-outlined">rainy</span> depending on your set Server Region.
		</div>
		<div>
			Clicking on this section will trigger a one-time notification when the current weather
			switches to another weather (normal to rain or vice-versa).
		</div>
	</details>

	<details name="help-one-item-opened-at-a-time">
		<summary>Voice</summary>
		<div>
			Select your desired voice in the Settings menu. I was hoping to add a custom voice but browser
			limitation said no.
		</div>
	</details>

	<details name="help-one-item-opened-at-a-time">
		<summary>Voice Preview</summary>
		<!-- prettier-ignore -->
		<div>
			Click the Preview icon <span class="material-symbols-outlined">record_voice_over</span> to hear a preview of the notification's text.
		</div>
	</details>

	<details name="help-one-item-opened-at-a-time">
		<summary>Reset</summary>
		<div>If all else fails, please Reset the data in the Settings menu.</div>
	</details>
</dialog>

<style>
	dialog#help[open] {
		margin: 60px auto;
		padding: 1em 1em;
		width: 500px;
		background:
			no-repeat 100% 100%,
			linear-gradient(90deg, rgba(52, 38, 56, 1), rgba(37, 27, 49, 0.4));
		backdrop-filter: blur(4px);
		color: rgb(var(--color-brown));
		border-radius: 5px;
		border: 1px solid rgb(var(--color-brown));
		display: flex;
		flex-wrap: wrap;

		&::backdrop {
			background-color: rgba(0, 0, 0, 0.7);
		}

		h1 {
			flex: 90%;
			margin-bottom: 24px;
		}

		button#close-help {
			flex: 10%;
			align-self: flex-start;
			margin-left: auto;
			background: unset;
			border: unset;
			padding: unset;
			margin: unset;
			color: unset;
			outline: unset;
			text-align: right;
			cursor: pointer;
		}

		details {
			width: inherit;
			margin-bottom: 16px;

			.material-symbols-outlined {
				vertical-align: middle;
			}
		}

		.disabled-icon {
			color: rgb(var(--color-gray));
		}
	}
</style>
