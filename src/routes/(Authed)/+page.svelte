<script lang="ts">
	import type { PageData } from './$types';

	import AddCard from '$lib/addCard/addCard.svelte';
	import CardCountImage from '$lib/card/cardCountImage.svelte';
	import { userData } from '../../store/user';
	import { onMount } from 'svelte';

	let innerWidth = 0;
	//import jsonData from '../../data.json';

	export let data: PageData;
	let parsedData: userAmmo[];
	let dropDownSelected: string;
	let optionsDropDown: string[] = [];

	parsedData = Object.values(data);
	$: filteredData = parsedData.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));

	interface userAmmo {
		name: string;
		count: number;
		grain: number;
		type: string;
	}

	parsedData.filter((item) => {
		var i = optionsDropDown.findIndex((x) => x == item.name);
		if (i <= -1) {
			optionsDropDown.push(item.name);
		}
		return null;
	});

	function filterData(selected: string) {
		if (selected === 'All') {
			filteredData = parsedData;
			return;
		}

		filteredData = parsedData.filter((e) => {
			return e.name === selected;
		});

		return;
	}

	onMount(() => {
		console.log('On Mount');
		console.log(parsedData);
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Ammo cache" />
</svelte:head>

<svelte:window bind:innerWidth />

<div class="flex flex-col">
	<div class="flex justify-center md:justify-end mr-5">
		<select
			class="select select-primary w-full max-w-xs"
			bind:value={dropDownSelected}
			on:change={() => filterData(dropDownSelected)}
		>
			<option>All</option>
			{#each optionsDropDown as ammoOptions}
				<option value={ammoOptions}>{ammoOptions}</option>
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
