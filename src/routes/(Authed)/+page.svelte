<script lang="ts">
	import { onMount } from 'svelte';
	import type { userAmmo } from 'src/types';
	import { auth, db } from '../../firebase';
	import { doc, getDoc } from 'firebase/firestore';
	import AddCard from '$lib/addCard/addCard.svelte';
	import CardCountImage from '$lib/card/cardCountImage.svelte';
	import { restockNumber, user } from '../../store/user';

	let innerWidth = 0;
	let loading = true;
	//import data from '../../data.json';
	let data: userAmmo[];
	$: data = [];

	let dropDownSelected = 'All ammos';

	$: filteredData = dropDownSelected === 'All ammos' ? data : filterData(dropDownSelected);
	$: optionsDropDown = [...new Set(data.map((i) => i.name))];

	function filterData(selected: string) {
		return data.filter((e) => {
			return e.name === selected;
		});
	}

	async function getData() {
		let user = JSON.parse(localStorage.user);

		const docRef = doc(db, 'ammo', `${user.uid}`);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			if (Object.keys(docSnap.data()).length !== 0) {
				const fetchedData: userAmmo[] = Object.values(docSnap.data()?.ammo) || [];
				data = fetchedData;
				data.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));

				$restockNumber = docSnap.data()?.restockNumber | 0;
			}
		}
	}

	onMount(async () => {
		if (localStorage.user !== undefined) {
			await getData();
		}
		loading = false;
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
			<option>All ammos</option>
			{#each optionsDropDown as ammoOptions}
				<option value={ammoOptions}>{ammoOptions}</option>
			{/each}
		</select>
	</div>
	<div class="w-full flex justify-center my-5">
		<div class="w-10/12 lg:w-11/12 2xl:w-8/12">
			<div class="grid grid-cols-2 md:grid-cols-4 gap-3 xl:grid-cols-5 xl:gap-7">
				{#if loading}
					<p>Loading...</p>
				{:else}
					{#each Object.values(filteredData) as ammo (ammo.ammoUUID)}
						<svelte:component
							this={CardCountImage}
							{ammo}
							on:newData={(e) => {
								data = e.detail;
							}}
						/>
					{/each}
					<AddCard
						on:newData={(e) => {
							data = e.detail;
						}}
					/>
				{/if}
			</div>
		</div>
	</div>
</div>
