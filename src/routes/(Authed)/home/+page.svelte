<script lang="ts">
	import AddCard from '$lib/addCard/addCard.svelte';
	import CardCountImage from '$lib/card/cardCountImage.svelte';

	import data from '../../../data.json';

	$: filteredData = data;
	let selected: string;

	var resArr: string[] = [];
	data.filter((item) => {
		var i = resArr.findIndex((x) => x == item.name);
		if (i <= -1) {
			resArr.push(item.name);
		}
		return null;
	});

	function filterData(selected: string) {
		if (selected === 'All') {
			filteredData = data;
			return;
		}
		filteredData = data.filter((e) => {
			return e.name === selected;
		});
		return;
	}

	let innerWidth = 0;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<svelte:window bind:innerWidth />

<div class="flex flex-col">
	<div class="flex justify-end mr-5">
		<select name="" id="" bind:value={selected} on:change={() => filterData(selected)}>
			<option>All</option>
			{#each resArr as ammo}
				<option value={ammo}>{ammo}</option>
			{/each}
		</select>
	</div>
	<div class="w-full flex justify-center my-5">
		<div class="w-10/12 lg:w-11/12 2xl:w-8/12">
			<div class="grid grid-cols-2 md:grid-cols-4 gap-3 xl:grid-cols-5 xl:gap-7">
				{#each filteredData as ammo}
					<svelte:component this={CardCountImage} {ammo} />
				{/each}
				<AddCard />
			</div>
		</div>
	</div>
</div>

<style>
</style>
