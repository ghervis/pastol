<script lang="ts">
	import { fetchNews } from '$lib/news.svelte';
	import { settings } from '$lib/settings.svelte';
	import { onMount } from 'svelte';

	const _REFRESH_NEWS_INTERVAL = 300000;

	let newsContent = [];
	let _contentApplyAsync: NodeJS.Timeout;

	let newsInterval: NodeJS.Timeout;

	onMount(async () => {
		settings.subscribe(async (value) => {
			const isNewsEnabled =
				value && (!value.hasOwnProperty('enableNews') || true === value['enableNews']);
			await restartTheProcess(isNewsEnabled);
		});
	});

	async function restartTheProcess(isNewsEnabled: boolean): Promise<void> {
		if (!isNewsEnabled) {
			clearInterval(newsInterval);
			newsContent = [];
			return;
		}

		if (isNewsEnabled && !!newsContent.length) {
			return;
		}

		clearInterval(newsInterval);
		_populateNewsDisplay();
		newsInterval = setInterval(_populateNewsDisplay, _REFRESH_NEWS_INTERVAL);
		return;
	}

	async function _populateNewsDisplay(): Promise<void> {
		newsContent = await fetchNews();

		applyContent();
	}

	function applyContent(): void {
		clearTimeout(_contentApplyAsync);
		_contentApplyAsync = setTimeout(() => {
			const scrollingContent = document.querySelector('.scrolling-content') as HTMLElement;

			const marquee = document.querySelector('section.news-container') as HTMLElement;

			scrollingContent.style.animation = 'none';
			scrollingContent.offsetHeight;
			scrollingContent.style.animation = null;

			scrollingContent.style.animationDuration = `${Math.floor((scrollingContent.offsetWidth / marquee.offsetWidth) * (document.body.offsetWidth / 180))}s`;
		});
	}
</script>

<section class="news-container" aria-label="News">
	<div class="scrolling-content">
		{#each newsContent as news}
			<div class="each-news">
				<div class="material-symbols-outlined">newspaper</div>
				<div>{news.title}: {news.description}</div>
			</div>
		{/each}
	</div>
	<button id="open-news">Display All News</button>
</section>

<style>
	.news-container {
		font-family: TLHeader;
		font-size: 1em;
		color: white;
		width: 100%;
		border-radius: 5px;
		overflow: hidden;
		white-space: nowrap;
		bottom: 0px;
		height: 20px;
		position: fixed;
		backdrop-filter: blur(10px);
		z-index: 2;
		display: flex;
		align-items: center;

		&:hover button#open-news {
			display: inline !important;
		}

		.scrolling-content {
			width: fit-content;
			animation: news-container-animation 60s linear infinite;
			transform: translateX(0%);
			display: flex;

			&:hover {
				animation-play-state: paused;
			}

			.each-news {
				display: inline-flex;

				&:nth-child(n + 1) {
					padding-right: 100px;
				}

				.material-symbols-outlined {
					font-size: 1em;
					padding-right: 10px;
				}
			}
		}

		button#open-news {
			font-family: TLHeader;
			position: absolute;
			right: 20px;
			bottom: 2px;
			color: white;
			padding: 1px 10px;
			border-radius: 5px;
			cursor: pointer;
			border: 1px solid rgb(var(--color-yellow));
			background: rgb(var(--color-brown));
			display: none;
		}
	}

	@keyframes news-container-animation {
		from {
			transform: translateX(2%);
		}
		to {
			transform: translateX(-50%);
		}
	}
</style>
