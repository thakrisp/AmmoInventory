<script lang="ts">
	import type { userAmmo } from 'src/types';
	import { createEventDispatcher } from 'svelte';
	import { doc, getDoc, updateDoc } from 'firebase/firestore';
	import { db } from '../firebase';
	import { user } from '../store/user';
	import shortUUID from 'short-uuid';

	$: userUID = $user.uid;
	export let ammoUUID: string = shortUUID.generate().toString();
	export let name: string | undefined = undefined;
	export let count: number | undefined = undefined;
	export let type: string | undefined = undefined;
	export let grain: number | undefined = undefined;
	let error: string | null = null;

	const dispatch = createEventDispatcher();
	const close = () =>
		dispatch('close', () => {
			name = undefined;
			count = undefined;
			type = undefined;
			grain = undefined;
		});

	const handleKeydown = (e: KeyboardEvent) => {
		if (e.key == 'Escape') close();
	};

	let validateForm = () => {
		return name !== undefined && count !== undefined && type !== undefined && grain !== undefined;
	};

	// if (import.meta.env.DEV) {
	// 	(name = 'Test Name2'), (count = 125), (type = 'Test Type2'), (grain = 112);
	// }

	let saveData = async () => {
		const dataRef = doc(db, 'ammo', userUID);
		let data = await fetchData();

		if (data !== undefined) {
			let indexToChange = data.findIndex((e: userAmmo) => e.ammoUUID === ammoUUID);
			if (indexToChange !== -1) {
				data[indexToChange].name = name;
				data[indexToChange].count = count;
				data[indexToChange].type = type;
				data[indexToChange].grain = grain;
			} else {
				data.push({ ammoUUID, name, count, grain, type });
			}
			await updateDoc(dataRef, { ammo: data });
			dispatch('newData', data);
		} else {
			await updateDoc(dataRef, { ammo: [{ ammoUUID, name, count, type, grain }] });
			dispatch('newData', [{ ammoUUID, name, count, type, grain }]);
		}

		close();
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
			{#if error}
				<p class="bg-red-100 rounded-lg pl-5 text-black">{error}</p>
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
			<label class="input-group input-group-vertical">
				<span>Count</span>
				<input
					type="number"
					placeholder="99"
					bind:value={count}
					class="input input-bordered text-white"
				/>
			</label>
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
		<div class="modal-action">
			<label for="my-modal" class="btn min-w-full" on:click={saveData}>Save</label>
		</div>
	</label>
</label>

<style>
	label {
		font-weight: 600;
	}
</style>
