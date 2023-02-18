<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { debug } from 'svelte/internal';

	export let pageStatus: String;
	export let isDisabled: boolean;

	const dispatch = createEventDispatcher();

	function sendPageStatus() {
		dispatch('pageRequesting');
	}
</script>

<div class="flex justify-end">
	<input
		on:click={sendPageStatus}
		disabled={isDisabled}
		type="submit"
		class="text-lg px-3 py-1 rounded-lg max-w-max bg-blue-500/50 hover:bg-blue-700/50 disabled:bg-gray-500 disabled:opacity-25"
		value={pageStatus}
	/>
</div>
