<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { doc, setDoc, updateDoc } from 'firebase/firestore';
	import { getAuth } from 'firebase/auth';
	import { db } from '../firebase';

	export let count: number = 0;
	export let name: string = '';
	export let type: string = '';
	export let grain: number = 0;
	export let newCard: boolean = false;

	const dispatch = createEventDispatcher();
	const close = () => dispatch('close');

	interface userAmmo {
		name: string;
		count: number;
		type: string;
		grain: number;
	}

	async function saveData(userdata: userAmmo, newCard: boolean) {
		let user = getAuth().currentUser?.uid;

		if (newCard) {
			try {
				const docRef = await setDoc(doc(db, 'ammo', `${user}`), {
					ammo: [userdata]
				});
				console.log('NEW FILE ADDED');
			} catch (e) {
				console.error('Error adding document: ', e);
			}
		} else {
			try {
				const docRef = await updateDoc(doc(db, 'ammo', `${user}`), {
					ammo: [userdata]
				});
				console.log('UPDATED FILE');
			} catch (e) {
				console.error('Error adding document: ', e);
			}
		}
		close;
	}
</script>

<!-- Put this part before </body> tag -->
<input type="checkbox" id="my-modal" class="modal-toggle" />
<!-- svelte-ignore a11y-click-events-have-key-events -->
<label for="my-modal" class="modal cursor-pointer" on:click={close}>
	<label class="modal-box relative " for="">
		<div class="flex justify-end pb-4">
			<label for="my-modal" class="btn btn-sm btn-circle right-2 top-2" on:click={close}>✕</label>
		</div>
		<div class="form-control space-y-5">
			<label class="input-group input-group-vertical">
				<span>Name</span>
				<input type="text" placeholder="name" bind:value={name} class="input input-bordered" />
			</label>
			<label class="input-group input-group-vertical">
				<span>Count</span>
				<input type="number" placeholder="99" bind:value={count} class="input input-bordered" />
			</label>
			<label class="input-group input-group-vertical">
				<span>type</span>
				<input type="text" placeholder="bird shot" bind:value={type} class="input input-bordered" />
			</label>
			<label class="input-group input-group-vertical">
				<span>Grain</span>
				<input type="number" placeholder="111" bind:value={grain} class="input input-bordered" />
			</label>
		</div>
		<div class="modal-action">
			<label
				for="my-modal"
				class="btn min-w-full"
				on:click={() => saveData({ name, count, grain, type }, newCard)}>Save</label
			>
		</div>
	</label>
</label>

<style>
	label {
		font-weight: 600;
	}
</style>
