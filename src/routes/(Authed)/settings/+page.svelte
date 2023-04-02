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
		let temp = localStorage.getItem('autoSave');
		if (temp !== null) {
			autoSaveAmmo.set(localStorage.getItem('autoSave') === 'true' ? true : false);
			return;
		} else {
			let user = JSON.parse(localStorage.user);

			const docRef = doc(db, 'ammo', user.uid);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				autoSaveAmmo.set(docSnap.data().autoSave);
			}
		}
	};

	const handleAutoSaveChange = (event: any) => {
		const docRef = doc(db, 'ammo', userUID);
		updateDoc(docRef, { autoSave: event.target.checked });
		localStorage.setItem('autoSave', JSON.stringify(event.target.checked));
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
	<div class="flex flex-col bg-gray-600 rounded-lg p-3 w-11/12 md:w-2/5">
		<h1 class="text-2xl">Settings</h1>
		<div>
			<label for="panicNumber" class="text-red-200 pb-2">Restocking time number</label>
			<div class="flex justify-between">
				<input
					type="number"
					placeholder="1000"
					id="panicNumber"
					bind:value={$restockNumber}
					class="w-4/5 mr-2 pl-2 bg-gray-600 border-b border-b-black focus:border-none focus:rounded"
				/>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					on:click|preventDefault={saveRestockNumber}
					class="btn btn-sm w-1/3 sm:w-1/5 p-2 px-3 {saving ? 'loading' : ''}"
				>
					{saving ? 'Saving' : 'Save'}
				</div>
			</div>
		</div>
		<div class="mt-2">
			<h1 class="text-red-200">Auto Save ammo</h1>
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
