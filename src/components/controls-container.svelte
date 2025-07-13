<section class="controls">
	<div class="title-and-help">
		<h1 class="tl-text">Pastol</h1>
		<button id="open-help">
			<span class="material-symbols-outlined">help</span>
		</button>
	</div>
	<div class="add-and-settings">
		<button id="add-custom" class="hover-lighten">
			<span>Add</span>
			<span class="material-symbols-outlined">add</span>
		</button>
		<button id="open-settings" class="hover-lighten">
			<span>Settings</span>
			<span class="material-symbols-outlined">settings</span>
		</button>
	</div>
</section>

<style>
	section.controls {
		display: flex;
		align-items: center;
		margin-bottom: 20px;
		margin-top: 20px;
		padding: 0 20px;

		.title-and-help {
			display: flex;
			flex-direction: row;

			h1 {
				margin: 0 12px 0 0;
				font-size: 3em;
				backdrop-filter: blur(2px);
			}

			& > button#open-help {
				cursor: pointer;
				background: unset;
				border: unset;
				padding: unset;
				margin: unset;
				color: unset;
				outline: unset;
			}
		}

		.add-and-settings {
			display: flex;
			flex-direction: column;
			gap: 10px;
			align-items: flex-end;
			margin-left: auto;

			button {
				font-family: TLHeader;
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
			}
		}
	}
</style>
