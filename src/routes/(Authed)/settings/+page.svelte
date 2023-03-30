<script lang="ts">
	import { doc, updateDoc, getDoc } from 'firebase/firestore';
	import { onMount } from 'svelte';
	import { db } from '../../../firebase';
	import { user, restockNumber, autoSaveAmmo } from '../../../store/user';

	$: userUID = $user.uid;
	let saving = false;

	onMount(async () => {
		await getAutoSaveData();
	});

	const getAutoSaveData = async () => {
		let user = JSON.parse(localStorage.user);

		const docRef = doc(db, 'ammo', user.uid);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			autoSaveAmmo.set(docSnap.data().AutoSave);
		}
	};

	const handleAutoSaveChange = (event: any) => {
		const docRef = doc(db, 'ammo', userUID);
		updateDoc(docRef, { AutoSave: event.target.checked });
		//localStorage.setItem('ammoAutoSave', JSON.stringify(event.target.checked));
	};

	const saveRestockNumber = async () => {
		saving = true;
		if (typeof $restockNumber === 'number') {
			const docRef = doc(db, 'ammo', userUID);
			updateDoc(docRef, { restockNumber: $restockNumber });
			localStorage.setItem('restockNumber', $restockNumber.toString());
		}
		setTimeout(() => {
			saving = false;
		}, 700);
	};
</script>

<div class="mx-10 flex justify-center">
	<div class="flex flex-col bg-gray-600 rounded-lg p-5 w-4/5 md:w-2/5">
		<label for="panicNumber" class="text-red-200 pb-2">Restocking time number</label>
		<div class="flex justify-between">
			<input
				type="number"
				placeholder="1000"
				id="panicNumber"
				bind:value={$restockNumber}
				class="w-32 pl-2 mr-2 bg-gray-600 border-b border-b-black focus:border-none focus:rounded"
			/>
			<!-- svelte-ignore a11y-click-events-have-key-events -->

			<div on:click|preventDefault={saveRestockNumber} class="btn btn-sm {saving ? 'loading' : ''}">
				{saving ? 'Saving' : 'Save'}
			</div>
		</div>
		<label class="label cursor-pointer">
			<span class="label-text">AutoSave ammos</span>
			<input
				type="checkbox"
				class="toggle {$autoSaveAmmo ? 'toggle-accent' : ''}"
				on:change={handleAutoSaveChange}
				bind:checked={$autoSaveAmmo}
			/>
		</label>
	</div>
</div>

<style>
	/* hide arrows
 Chrome, Safari, Edge, Opera */
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none !important;
		margin: 0 !important;
	}

	/* Firefox */
	input[type='number'] {
		-moz-appearance: textfield !important;
	}
</style>
