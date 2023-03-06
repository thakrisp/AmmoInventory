<script lang="ts">
	import type { userAmmo } from '../../types';
	import Popup from '$lib/Popup.svelte';
	import { restockNumber } from '../../store/user';
	export let ammo: userAmmo;

	let goodCard = 'bg-slate-300 hover:bg-slate-400 hover:shadow-slate-400/50';
	let warnCard = 'bg-yellow-200 hover:bg-yellow-300 hover:shadow-yellow-300/50';
	let panicCard = 'bg-red-300 hover:bg-red-400 hover:shadow-red-400/50';

	$: ammoStockState =
		ammo.count <= ammo.restockNumber
			? 'panic'
			: ammo.count < ammo.restockNumber * 1.333
			? 'warn'
			: 'good';
	let showModal = false;

	//src="https://images.unsplash.com/photo-1581956258836-259a7cdd68eb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
</script>

{#if showModal}
	<Popup {...ammo} on:close={() => (showModal = false)} on:newData />
{/if}

<!-- svelte-ignore a11y-click-events-have-key-events -->
<label for="my-modal" class="">
	<div
		on:click={() => (showModal = true)}
		class="{ammoStockState === 'good'
			? goodCard
			: ammoStockState === 'warn'
			? warnCard
			: panicCard} rounded-md"
	>
		<div class="relative justify-center items-center border-black ">
			<img
				src="https://images.unsplash.com/photo-1545270812-b631d7f05548?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1026&q=80"
				alt=""
				srcset=""
				class="rounded-t-md w-full h-36 lg:h-auto"
			/>
			<div class="absolute z-10 inset-1 flex items-end justify-center pb-1 lg:pb-3">
				<div class="text-4xl md:text-4xl xl:text-5xl font-serif text-gray-200">
					<span
						class="text-base {ammoStockState === 'good'
							? 'text-white'
							: ammoStockState === 'warn'
							? 'text-yellow-200'
							: 'text-red-300'}">{ammo.restockNumber || $restockNumber}</span
					>/<span class="font-semibold">{ammo.count} </span>
				</div>
			</div>
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
