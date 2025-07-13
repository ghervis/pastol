<script lang="ts">
	import { onMount } from 'svelte';
	import { format } from 'fecha';
	import { addNotification } from '$lib/notification.svelte';

	let dialog: HTMLDialogElement;

	let someAudioTimeout: NodeJS.Timeout;

	onMount(() => {
		dialog = document.querySelector('dialog#add') as HTMLDialogElement;
		const addCustomButton = document.querySelector('button#add-custom');
		const close = document.querySelector('button#close-custom');

		const openAddCustomModalEvent = () => {
			const currentDate = new Date();
			const [month, date, year] = currentDate.toLocaleDateString().split('/');
			(document.querySelector('#date') as HTMLInputElement).value =
				`${year}-${month.padStart(2, '0')}-${date.padStart(2, '0')}`;

			(document.querySelector('#time') as HTMLInputElement).value = currentDate
				.toTimeString()
				.substring(0, 5);
			dialog.showModal();
		};

		addCustomButton.addEventListener('click', openAddCustomModalEvent);

		close.addEventListener('click', () => dialog.close());
	});

	function addCustomNotification(event: SubmitEvent) {
		event.preventDefault();

		const htmlFormElement: HTMLFormElement = event.target as HTMLFormElement;
		const message = htmlFormElement.message.value;
		const time = htmlFormElement.time.value;
		const date = htmlFormElement.date.value;
		const shouldTriggerInAdvance = htmlFormElement.elements['shouldTriggerInAdvance'].checked;

		let frequency = htmlFormElement.elements['frequency'].value;

		let dateTimeString = new Date(`${date} ${time}`).toString();

		if ('repeat-days' === frequency) {
			const days = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];
			const selectedDays = days.filter((day) => htmlFormElement.elements[day].checked);
			if (selectedDays.length === 0) {
				alert('Please select at least one day to repeat the notification.');
				return;
			}

			frequency = selectedDays.join(', ');

			dateTimeString = new Date(`Feb 14, 2077 ${time}`).toString();
		}

		addNotification(
			message,
			dateTimeString,
			frequency,
			true,
			shouldTriggerInAdvance,
			'custom',
			crypto.randomUUID()
		);

		dialog.close();

		clearTimeout(someAudioTimeout);
		if (0 === Math.floor(Math.random() * 10)) {
			someAudioTimeout = setTimeout(() => {
				const audio = new Audio('aint-nobody-got-time-for-that.mp3');
				audio.play();
			}, 6666);
		}
	}
</script>

<dialog id="add">
	<form onsubmit={addCustomNotification}>
		<h1 class="tl-text">Add Custom Notification</h1>
		<button type="button" id="close-custom">
			<span class="material-symbols-outlined">close</span>
		</button>
		<label for="time">Time</label>
		<input type="time" id="time" required />
		<input
			type="radio"
			id="specific-date"
			name="frequency"
			value="specific-date"
			checked
			style="display: none;" />
		<input
			type="radio"
			id="repeat-days"
			name="frequency"
			value="repeat-days"
			style="display: none;" />
		<label for="specific-date">Specific Date</label>
		<label for="repeat-days">Repeat Days</label>
		<input type="date" id="date" required min={format(new Date(), 'YYYY-MM-DD')} />
		<input type="checkbox" id="MO" name="MO" value="MO" style="display: none;" />
		<label for="MO">Mon</label>
		<input type="checkbox" id="TU" name="TU" value="TU" style="display: none;" />
		<label for="TU">Tue</label>
		<input type="checkbox" id="WE" name="WE" value="WE" style="display: none;" />
		<label for="WE">Wed</label>
		<input type="checkbox" id="TH" name="TH" value="TH" style="display: none;" />
		<label for="TH">Thu</label>
		<input type="checkbox" id="FR" name="FR" value="FR" style="display: none;" />
		<label for="FR">Fri</label>
		<input type="checkbox" id="SA" name="SA" value="SA" style="display: none;" />
		<label for="SA">Sat</label>
		<input type="checkbox" id="SU" name="SU" value="SU" checked style="display: none;" />
		<label for="SU">Sun</label>
		<label for="shouldTriggerInAdvance">
			<span>Additional Five Minutes Notification</span>
			<input
				type="checkbox"
				id="shouldTriggerInAdvance"
				name="shouldTriggerInAdvance"
				value="shouldTriggerInAdvance"
				style="display: none;" />
			<span class="material-symbols-outlined">timer_5</span>
		</label>
		<label for="text">Message</label>
		<textarea id="message" placeholder="Spoken message" rows="2" required></textarea>
		<button type="submit" class="hover-glow hover-lighten">Add</button>
	</form>
</dialog>

<style>
	dialog#add {
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

			input {
				font-family: TLHeader;
			}

			label {
				user-select: none;
			}

			h1 {
				flex: 90%;
			}

			button#close-custom {
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

			input[type='time'] {
				margin-bottom: 24px;
				border-radius: 4px;
			}

			label[for='specific-date'],
			label[for='repeat-days'] {
				flex: 50%;
				cursor: pointer;
				text-align: center;
				padding: 5px 0;
				border: 1px solid rgb(var(--color-violet));
				box-sizing: border-box;
				border-radius: 4px;
				margin-bottom: 4px;
			}

			label[for='MO'],
			label[for='TU'],
			label[for='WE'],
			label[for='TH'],
			label[for='FR'],
			label[for='SA'],
			label[for='SU'] {
				flex: 13.4%;
				text-align: center;
				justify-content: center;
				cursor: pointer;
				margin-right: 1%;
				border-radius: 3px;
				margin-bottom: 24px;
				height: 26px;
				line-height: 26px;
			}

			label[for='SU'] {
				margin-right: 0;
			}

			input#specific-date:checked {
				& ~ label[for='specific-date'] {
					border: 1px solid rgb(var(--color-yellow));
				}

				& ~ input#date {
					display: block;
					margin-bottom: 24px;
					height: 22px;
					border-radius: 4px;
				}

				& ~ input#MO,
				& ~ label[for='MO'],
				& ~ input#TU,
				& ~ label[for='TU'],
				& ~ input#WE,
				& ~ label[for='WE'],
				& ~ input#TH,
				& ~ label[for='TH'],
				& ~ input#FR,
				& ~ label[for='FR'],
				& ~ input#SA,
				& ~ label[for='SA'],
				& ~ input#SU,
				& ~ label[for='SU'] {
					display: none;
				}
			}

			input#repeat-days:checked {
				& ~ input#date {
					display: none;
				}

				& ~ label[for='repeat-days'] {
					border: 1px solid rgb(var(--color-yellow));
				}

				& ~ input#MO,
				& ~ label[for='MO'],
				& ~ input#TU,
				& ~ label[for='TU'],
				& ~ input#WE,
				& ~ label[for='WE'],
				& ~ input#TH,
				& ~ label[for='TH'],
				& ~ input#FR,
				& ~ label[for='FR'],
				& ~ input#SA,
				& ~ label[for='SA'],
				& ~ input#SU,
				& ~ label[for='SU'] {
					display: block;
				}
			}

			input[type='checkbox']#MO,
			input[type='checkbox']#TU,
			input[type='checkbox']#WE,
			input[type='checkbox']#TH,
			input[type='checkbox']#FR,
			input[type='checkbox']#SA,
			input[type='checkbox']#SU {
				& + label {
					box-sizing: border-box;
					border: 1px solid rgb(var(--color-violet));
				}

				&:checked + label {
					border: 1px solid rgb(var(--color-yellow));
				}
			}

			label[for='shouldTriggerInAdvance'] {
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

			textarea#message {
				font-family: TLHeader;
				resize: none;
				padding: 2px 5px;
				margin-bottom: 24px;
				border-radius: 4px;
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
		}
	}
</style>
