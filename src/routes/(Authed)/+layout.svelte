<script lang="ts">
	import Header from '$lib/header/Header.svelte';
	import { restockNumber } from '../../store/user';
	import { onMount } from 'svelte';

	onMount(async () => {
		// let localStorageRestockNumber = localStorage.getItem('restockNumber');
		// if (localStorageRestockNumber !== null) {
		// 	$restockNumber = Number(localStorageRestockNumber);
		// }
		console.log(`localRN: ${localStorage.getItem('restockNumber')},\nstoreRN: ${$restockNumber}`);
	});
</script>

<svelte:head>
	<title>Ammo Cache - Home</title>
</svelte:head>

<Header />
<slot />

<style>
</style>
