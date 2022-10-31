<script lang="ts">
	export let count: number;
	export let name: string;
	export let type: string;
	export let grain: number;

	import { createEventDispatcher, onDestroy } from 'svelte';

	const dispatch = createEventDispatcher();
	const close = () => dispatch('close');

	let modal: HTMLDivElement;

	const handle_keydown = (e: { key: string; shiftKey: any; preventDefault: () => void }) => {
		if (e.key === 'Escape') {
			close();
			return;
		}

		if (e.key === 'Tab') {
			// trap focus
			const nodes = modal.querySelectorAll('*');
			const tabbable = Array.from(nodes).filter((n) => n.tabIndex >= 0);

			let index = tabbable.indexOf(document.activeElement);
			if (index === -1 && e.shiftKey) index = 0;

			index += tabbable.length + (e.shiftKey ? -1 : 1);
			index %= tabbable.length;

			tabbable[index].focus();
			e.preventDefault();
		}
	};

	const previously_focused = typeof document !== 'undefined' && document.activeElement;

	if (previously_focused) {
		onDestroy(() => {
			previously_focused.focus();
		});
	}
</script>

<svelte:window on:keydown={handle_keydown} />

<div class="modal-background z-40" on:click={close} />

<div class="modalOwn z-50" role="dialog" aria-modal="true" bind:this={modal}>
	<!-- svelte-ignore a11y-autofocus -->
	<div class="flex justify-end" autofocus on:click={close}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-6 h-6 cursor-pointer"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
		</svg>
	</div>

	<div class="flex flex-col">
		<div class="my-2 flex">
			<label for="AmmoName">Ammo</label>
			<input type="text" name="AmmoName" id="" bind:value={name} class="pl-2" />
		</div>
		<div class="my-2 flex">
			<label for="AmmoCount">Amount</label>
			<input type="number" name="AmmoCount" id="" bind:value={count} class="pl-2" />
		</div>
		<div class="my-2 flex">
			<label for="AmmoType">Type of round</label>
			<input type="text" name="Ammotype" id="" bind:value={type} class="pl-2" />
		</div>
		<div class="my-2 flex">
			<label for="AmmoGrain">grain</label>
			<input type="number" name="AmmoGrain" id="" bind:value={grain} class="pl-2" />
		</div>
	</div>
</div>

<style>
	input {
		border-bottom: black 1pt solid;
	}
	input:focus {
		border-bottom: black 1pt solid;
		outline: transparent;
	}

	.modal-background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.4);
	}

	.modalOwn {
		position: absolute;
		left: 50%;
		top: 50%;
		max-width: 32em;
		max-height: calc(100vh - 4em);
		/* overflow: auto; */
		transform: translate(-50%, -50%);
		padding: 1em;
		border-radius: 0.2em;
		background: white;
	}

	label {
		font-weight: 600;
	}
</style>
