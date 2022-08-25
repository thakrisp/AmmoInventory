<script lang="ts">
	import AddCard from '$lib/addCard/addCard.svelte';
	import CardCountImage from '$lib/card/cardCountImage.svelte';

	import data from '../data.json';

	let innerWidth = 0;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<svelte:window bind:innerWidth />

<div class="flex flex-col">
	<div class="w-full flex justify-center my-5">
		<div class="w-10/12 lg:w-11/12 2xl:w-8/12">
			<div class="grid grid-cols-2 md:grid-cols-4 gap-3 xl:grid-cols-5 xl:gap-7">
				{#each Object.entries(data) as ammo}
					<svelte:component this={CardCountImage} ammo={ammo[1]} amount={150} />
				{/each}
				<AddCard />
			</div>
		</div>
	</div>
</div>

<style>
</style>
