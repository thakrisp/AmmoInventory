<script lang="ts">
	//import Popup from '$lib/Popup.svelte';
	import Popup2 from '$lib/popup2.svelte';

	let showModal = false;
	export let newCard = true;
</script>

{#if showModal}
	<Popup2 bind:newCard />
{/if}

<!-- svelte-ignore a11y-click-events-have-key-events -->
<label for="my-modal" class="">
	<div
		on:click={() => (showModal = true)}
		class="min-h-[232px] bg-gray-200/75 flex flex-col justify-center items-center outline-dashed outline-1 outline-black/50 rounded-md hover:bg-slate-200 hover:outline hover:scale-110 hover:shadow-lg hover:shadow-slate-400/50 lg:hover:scale-105"
	>
		<div>
			<img src="accuracy.png" alt="" class="h-16 w-16" />
		</div>
		<div class="text-xl text-black">add new ammo</div>
	</div>
</label>
