<script lang="ts">
	import { news } from '$lib/news.svelte';
	import { onMount } from 'svelte';

	let dialog: HTMLDialogElement;

	onMount(() => {
		dialog = document.querySelector('dialog#news') as HTMLDialogElement;
		const openNewsButton = document.querySelector('button#open-news');
		const closeNewsButton = document.querySelector('button#close-news');

		const openNewsModalEvent = () => dialog.showModal();

		openNewsButton.addEventListener('click', openNewsModalEvent);

		closeNewsButton.addEventListener('click', () => {
			dialog.close();
		});
	});
</script>

<dialog id="news">
	<h1 class="tl-text">News</h1>
	<button type="button" id="close-news">
		<span class="material-symbols-outlined">close</span>
	</button>

	{#each $news as item}
		<details
			name="help-one-item-opened-at-a-time"
			style="background-image: url({item.mediaContent});">
			<summary>
				<span>{item.title}</span>
				<a href={item.link} target="_blank">
					<em>[visit]</em>
				</a>
			</summary>
			<div>{item.description}</div>
		</details>
	{/each}
</dialog>

<style>
	dialog#news[open] {
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

		button#close-news {
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
			--border-radius: 9px;
			background-size: cover;
			--background-image-linear-gradient: linear-gradient(
				90deg,
				rgba(0, 0, 0, 0.8),
				rgba(0, 0, 0, 0.2)
			);
			width: inherit;
			margin-bottom: 16px;
			border-radius: 9px;

			&[open] > summary {
				border-bottom-left-radius: 0;
				border-bottom-right-radius: 0;
			}

			& > summary {
				backdrop-filter: blur(1px);
				background-image: var(--background-image-linear-gradient);
				padding: 5px;
				border-radius: var(--border-radius);

				& > a {
					vertical-align: middle;
					font-size: 0.7em;
					display: none;
					position: absolute;
					right: 14px;

					& > em {
						font-style: normal;
					}
				}
			}

			& > div {
				backdrop-filter: blur(1px);
				background-image: var(--background-image-linear-gradient);
				padding: 5px;
				border-bottom-left-radius: var(--border-radius);
				border-bottom-right-radius: var(--border-radius);
			}

			&:hover a {
				display: inline;
			}
		}
	}
</style>
