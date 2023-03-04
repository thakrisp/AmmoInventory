<script lang="ts">
	import { doc, updateDoc } from 'firebase/firestore';
	import { db } from '../../../firebase';
	import { user, restockNumber } from '../../../store/user';

	$: userUID = $user.uid;
	let saving = false;

	const saveRestockNumber = async () => {
		saving = true;
		if (typeof $restockNumber === 'number') {
			const dataRef = doc(db, 'ammo', userUID);
			updateDoc(dataRef, { restockNumber: $restockNumber });
			localStorage.setItem('restockNumber', $restockNumber.toString());
		}
		setTimeout(() => {
			saving = false;
		}, 700);
	};
</script>

<div class="mx-10 bg-gray-600 rounded-lg p-5">
	<div class="flex flex-col">
		<label for="panicNumber" class="text-red-200 pb-2">Restocking time number</label>
		<div class="flex">
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
