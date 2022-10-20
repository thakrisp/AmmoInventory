<script lang="ts">
	import Popup from '$lib/Popup.svelte';
	export let ammo: data;
	let showModal = false;

	interface data {
		uid: number;
		name: string;
		count: number;
		velocity: number;
		type: string;
	}

	//src="https://images.unsplash.com/photo-1581956258836-259a7cdd68eb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

{#if showModal}
	<Popup
		bind:name={ammo.name}
		bind:count={ammo.count}
		bind:velocity={ammo.velocity}
		bind:type={ammo.type}
		on:close={() => (showModal = false)}
	/>
{/if}

<div
	on:click={() => (showModal = true)}
	class="{ammo.count > 50
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
			class="absolute z-10 inset-0 flex items-center justify-center text-6xl sm:text-6xl xl:text-8xl text-gray-300 font-semibold"
			>{ammo.count}</span
		>
	</div>
	<div class="flex flex-row items-baseline justify-between p-2">
		<div class="items-baseline">
			<div class="font-semibold text-lg flex flex-wrap">
				{ammo.name}
			</div>
			<div class="text-sm font-extralight">
				Velocity: <span class="font-semibold">{ammo.velocity}</span>
			</div>
			<div class="text-sm font-extralight">
				Type: <span class="font-semibold">{ammo.type}</span>
			</div>
		</div>
	</div>
</div>

<style>
</style>
