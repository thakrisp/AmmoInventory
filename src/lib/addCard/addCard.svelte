<script lang="ts">
	import Popup from '$lib/Popup.svelte';

	let showModal = false;
</script>

{#if showModal}
	<Popup on:close={() => (showModal = false)} />
{/if}

<div
	on:click={() => (showModal = true)}
	class="min-h-[112px] bg-gray-200/25 flex flex-col justify-center items-center outline-dashed outline-1 outline-black/50 rounded-md hover:bg-slate-200 hover:outline hover:scale-110 hover:shadow-lg hover:shadow-slate-400/50 lg:hover:scale-105"
>
	<div>
		<img src="accuracy.png" alt="" class="h-16 w-16" />
	</div>
	<div class="text-xl">add new ammo</div>
</div>
