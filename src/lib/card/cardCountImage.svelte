<script lang="ts">
	import type { userAmmo } from 'src/types';
	import Popup from '$lib/popup.svelte';
	import { restockNumber } from '../../store/user';
	export let ammo: userAmmo;
	let showModal = false;

	//src="https://images.unsplash.com/photo-1581956258836-259a7cdd68eb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
</script>

{#if showModal}
	<Popup
		ammoUUID={ammo.ammoUUID}
		name={ammo.name}
		count={ammo.count}
		grain={ammo.grain}
		type={ammo.type}
		on:close={() => (showModal = false)}
		on:newData
	/>
{/if}

<!-- svelte-ignore a11y-click-events-have-key-events -->
<label for="my-modal" class="">
	<div
		on:click={() => (showModal = true)}
		class="{ammo.count > $restockNumber
			? 'bg-slate-300 hover:bg-slate-400 hover:shadow-slate-400/50'
			: 'bg-red-300 hover:bg-red-400 hover:shadow-red-400/50'} rounded-md"
	>
		<div class="relative justify-center items-center border-black ">
			<img
				src="https://images.unsplash.com/photo-1545270812-b631d7f05548?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1026&q=80"
				alt=""
				srcset=""
				class="rounded-t-md w-full h-36 lg:h-auto"
			/>
			<span
				class="absolute z-10 inset-0 flex items-center justify-center text-6xl sm:text-6xl xl:text-7xl text-gray-300 font-semibold"
				>{ammo.count}</span
			>
		</div>
		<div class="flex flex-row items-baseline justify-between p-2 text-slate-900">
			<div class="items-baseline">
				<div class="font-semibold text-lg flex flex-wrap">
					{ammo.name}
				</div>
				<div class="text-sm font-extralight">
					Grain: <span class="font-semibold">{ammo.grain}</span>
				</div>
				<div class="text-sm font-extralight">
					Type: <span class="font-semibold">{ammo.type}</span>
				</div>
			</div>
		</div>
	</div>
</label>
