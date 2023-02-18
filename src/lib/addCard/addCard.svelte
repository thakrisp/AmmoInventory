<script lang="ts">
	import Popup from '$lib/popup.svelte';

	let showModal = false;
</script>

{#if showModal}
	<Popup on:close={() => (showModal = false)} on:newData />
{/if}

<!-- svelte-ignore a11y-click-events-have-key-events -->
<label for="my-modal" class="flex items-stretch ">
	<div
		on:click={() => (showModal = true)}
		class="bg-gray-200/75 w-full flex flex-col justify-center items-center outline-dashed outline-1 outline-black/50 rounded-md hover:bg-slate-200 hover:outline hover:scale-110 hover:shadow-lg hover:shadow-slate-400/50 lg:hover:scale-105"
	>
		<img src="accuracy.png" alt="w-14 h-14" />
		<div class="text-xl text-black">add new ammo</div>
	</div>
</label>
