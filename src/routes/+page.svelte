<script lang="ts">
	import { base } from '$app/paths';
	import { timeOfDayStore } from '$lib/scraped-region-status.svelte';
	import BackgroundImageDarkener from '../components/background-image-darkener.svelte';
	import MainPage from '../components/main-page.svelte';
	import RainEffect from '../components/rain-effect.svelte';
	import NewsContainer from '../components/news-container.svelte';

	let timeOfDay = undefined;

	timeOfDayStore.subscribe((value) => {
		timeOfDay = value?.currentCondition;
	});
</script>

<svelte:head>
	<link rel="icon" type="image/svg" href="{base}/favicon.ico" />
	<link rel="stylesheet" href="{base}/reset.css" />
	<link rel="stylesheet" href="{base}/colors.css" />
	<link rel="stylesheet" href="{base}/font.css" />
	<link rel="stylesheet" href="{base}/common.css" />
	<link rel="prefetch" href="{base}/korea_mobile_2_1month_logo.png" />
	<link rel="prefetch" href="{base}/mobile_24_05month_logo.png" />
</svelte:head>

<div class="container" data-time-of-day={timeOfDay}>
	<BackgroundImageDarkener />
	<MainPage />
	<RainEffect />
	<NewsContainer />
</div>

<style>
	.container {
		background-image: url('/korea_mobile_2_1month_logo.png');
		height: 100%;
		background-repeat: no-repeat;
		background-position: top;
		background-size: cover;
		overflow: hidden;
		box-sizing: border-box;
		transition: background-image 2s ease-in-out;

		&[data-time-of-day='Night'] {
			background-image: url('/korea_mobile_2_1month_logo.png');
		}

		&[data-time-of-day='Day'] {
			background-image: url('/mobile_24_05month_logo.png');
		}
	}
</style>
