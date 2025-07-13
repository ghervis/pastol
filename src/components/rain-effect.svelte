<script>
	import { weatherStore } from '$lib/scraped-region-status.svelte';
	import { settings } from '$lib/settings.svelte';

	let weather = 'Normal';

	weatherStore.subscribe((value) => {
		const currentWeatherCondition = value?.currentCondition ?? 'EWeatherType::Normal';

		weather = currentWeatherCondition === 'EWeatherType::Rain' ? 'Rain' : 'Normal';
	});

	let isRainEffectEnabled = false;

	settings.subscribe((value) => {
		isRainEffectEnabled =
			value && (!value.hasOwnProperty('enableRainEffect') || true === value['enableRainEffect']);
	});
</script>

<div id="rain-effect" data-weather={weather} data-is-rain-effect-enabled={isRainEffectEnabled}>
</div>

<style>
	#rain-effect {
		--s: 1px 7px;
		--c: #ccc;
		--a: -7deg;
		--w: 53px;
		--h: 55px;
		--rad: radial-gradient(var(--s), var(--c) 100%, transparent 100%);
		pointer-events: none;
		height: 0;
		width: 100%;
		display: none;

		&[data-weather='Rain'] {
			display: block;
		}

		&[data-is-rain-effect-enabled='false'] {
			display: none !important;
		}

		&:before,
		&:after {
			content: '';
			position: fixed;
			bottom: 0;
			right: -20%;
			left: -20%;
			height: calc(100% + var(--h) + 10px);
			background: var(--rad) 0 3px;
			opacity: 0.6;
			background-size: var(--w) var(--h);
			animation: rain 0.2s linear infinite;
			transform: skew(var(--a));
			margin: 0;
			padding: 0;
		}

		&:before {
			--h: 70px;
			--w: 61px;
		}
	}

	@keyframes rain {
		to {
			transform: skew(var(--a)) translateY(var(--h)); /* Same as the height of the background-size */
		}
	}
</style>
