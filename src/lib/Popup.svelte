<script lang="ts">
	import type { userAmmo } from 'src/types';
	import ErrorMessage from './ErrorMessage.svelte';
	import { createEventDispatcher } from 'svelte';
	import { doc, getDoc, updateDoc } from 'firebase/firestore';
	import { db } from '../firebase';
	import { restockNumber as storeRestockNumber, user } from '../store/user';
	import shortUUID from 'short-uuid';

	$: userUID = $user.uid;
	export let ammoUUID: string = shortUUID.generate().toString();
	export let name: string = '';
	export let count: number = 0;
	export let type: string = '';
	export let grain: number = 0;
	export let restockNumber: number = $storeRestockNumber;
	let errorMessage: string = '';

	const dispatch = createEventDispatcher();
	const close = () => dispatch('close');

	const handleKeydown = (e: KeyboardEvent) => {
		if (e.key == 'Escape') close();
	};

	let validateForm = () => {
		return name !== '' && count > 0 && type !== '' && grain > 0;
	};

	// if (import.meta.env.DEV) {
	// 	(name = 'Test Name2'), (count = 125), (type = 'Test Type2'), (grain = 112);
	// }
	let deleteData = async () => {
		const dataRef = doc(db, 'ammo', userUID);
		let data: userAmmo[] = await fetchData();

		let indexToChange = data.findIndex((e: userAmmo) => e.ammoUUID === ammoUUID);

		if (indexToChange !== -1) {
			data.splice(indexToChange, 1);
			await updateDoc(dataRef, { ammo: data });
			dispatch('newData', data);
		}
	};

	let saveData = async () => {
		const dataRef = doc(db, 'ammo', userUID);
		let data: userAmmo[] = (await fetchData()) || [];

		let indexToChange = data.findIndex((e: userAmmo) => e.ammoUUID === ammoUUID);

		if (validateForm()) {
			if (indexToChange !== -1) {
				data[indexToChange].name = name;
				data[indexToChange].count = count;
				data[indexToChange].restockNumber = restockNumber;
				data[indexToChange].type = type;
				data[indexToChange].grain = grain;
			} else {
				data.push({ ammoUUID, restockNumber, name, count, grain, type });
			}
			await updateDoc(dataRef, { ammo: data });
			dispatch('newData', data);
			close();
		} else {
			errorMessage = 'form isnt filled out completely';
		}
	};

	async function fetchData() {
		const docRef = doc(db, 'ammo', userUID);
		const docSnap = await getDoc(docRef);

		return docSnap.data()?.ammo;
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<!-- Put this part before </body> tag -->
<input type="checkbox" id="my-modal" class="modal-toggle" />
<!-- svelte-ignore a11y-click-events-have-key-events -->
<label for="my-modal" class="modal cursor-pointer" on:click|self={close}>
	<label class="modal-box relative " for="">
		<div class="flex justify-end pb-4">
			<label for="my-modal" class="btn btn-sm btn-circle right-2 top-2" on:click={close}>✕</label>
		</div>
		<div class="form-control space-y-5">
			{#if errorMessage !== ''}
				<ErrorMessage bind:errorMessage />
			{/if}
			<label class="input-group input-group-vertical">
				<span>Name</span>
				<input
					type="text"
					placeholder="name"
					bind:value={name}
					class="input input-bordered text-white"
				/>
			</label>
			<div class="flex flex-col md:flex-row ">
				<label class="input-group input-group-vertical">
					<span>Count</span>
					<input
						type="number"
						placeholder="99"
						bind:value={count}
						class="input input-bordered text-white"
					/>
				</label>
				<label class="input-group input-group-vertical mt-5 md:mt-0 md:ml-2">
					<span>Restock Number</span>
					<input
						type="number"
						placeholder="1000"
						bind:value={restockNumber}
						class="input input-bordered text-white"
					/>
				</label>
			</div>
			<label class="input-group input-group-vertical">
				<span>type</span>
				<input
					type="text"
					placeholder="bird shot"
					bind:value={type}
					class="input input-bordered text-white"
				/>
			</label>
			<label class="input-group input-group-vertical">
				<span>Grain</span>
				<input
					type="number"
					placeholder="111"
					bind:value={grain}
					class="input input-bordered text-white"
				/>
			</label>
		</div>
		<div class="flex justify-between my-2">
			<button class="btn btn-error" on:click={deleteData}>Delete</button>
			<button class="btn" on:click={saveData}>Save</button>
		</div>
	</label>
</label>

<style>
	label {
		font-weight: 600;
	}

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	input[type='number'] {
		-moz-appearance: textfield;
	}
</style>
