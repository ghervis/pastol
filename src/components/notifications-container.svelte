<script lang="ts">
	import { subscribe } from '$lib/notification.svelte';
	import type { NotificationType } from '../types';
	import NotificationItem from './notification-item.svelte';

	let notifications: NotificationType[] = [];
	subscribe((value) => {
		notifications = value;
	});

	function getSortNumber(notification: NotificationType): number {
		// Implement the logic to get the sort number for a notification
		return (
			new Date(
				`${new Date().toLocaleDateString()} ${new Date(notification.dateTimeString).toLocaleTimeString()}`
			).getTime() + (notification.source === 'calendar' ? 5_000_000_000_000 : 0)
		);
	}
</script>

<section class="notifications-container">
	{#each notifications.sort((a: NotificationType, b: NotificationType) => getSortNumber(a) - getSortNumber(b)) as notification}
		<NotificationItem {notification} />
	{/each}
</section>

<style>
	.notifications-container {
		display: flex;
		flex-direction: column;
		gap: 0.9em 0;
		margin-top: 20px;
		height: calc(100vh - 260px);
		overflow-y: auto;
		padding: 10px 20px;
	}
</style>
