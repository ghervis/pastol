<script lang="ts">
	import { base } from '$app/paths';
	import NotificationAddModal from '../components/notification-add-modal.svelte';
	import NotificationsContainer from '../components/notifications-container.svelte';
	import SettingsModal from '../components/settings-modal.svelte';

	import { onMount } from 'svelte';

	import { initialize as initializeMain } from '$lib/main-process.svelte';

	import WeatherContainer from '../components/weather-container.svelte';
	import ControlsContainer from '../components/controls-container.svelte';
	import HelpModal from '../components/help-modal.svelte';
	import NewsModal from './news-modal.svelte';

	let mountTimeout: NodeJS.Timeout;

	onMount(async () => {
		initializeMain();

		clearTimeout(mountTimeout);
		mountTimeout = setTimeout(() => {
			new Audio(`${base}/silent.mp3`).play().catch(() => {});
			if (typeof window !== 'undefined' && Notification) {
				Notification.requestPermission();
			}
		}, 5000);
	});
</script>

<main>
	<WeatherContainer />
	<ControlsContainer />
	<NotificationsContainer />
	<NotificationAddModal />
	<SettingsModal />
	<HelpModal />
	<NewsModal />
</main>

<style>
	main {
		font-family: TLHeader;
		color: white;
		padding: 0 0 20px 0;
		overflow: hidden;
		margin: 0 auto;
		max-width: 960px;
		box-sizing: border-box;
		position: relative;
		z-index: 1;
	}
</style>
