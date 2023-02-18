<script lang="ts">
	import { slide } from 'svelte/transition';
	import { bounceOut } from 'svelte/easing';

	export let errorMessage = '';
</script>

<div
	transition:slide={{ delay: 250, duration: 600, easing: bounceOut }}
	class="bg-red-400 my-3 p-2 rounded-lg flex justify-between text-lg shadow-lg shadow-red-400/25"
>
	<div class="pt-1">Error: {errorMessage}</div>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="w-8 justify-center flex h-fit pt-1 hover:bg-black/5 hover:rounded-full"
		on:click|preventDefault={() => (errorMessage = '')}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-6 h-6"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
			/>
		</svg>
	</div>
</div>
