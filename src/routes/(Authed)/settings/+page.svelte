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
				class="w-32 pl-2 bg-gray-600 border-b border-b-black focus:border-none focus:rounded"
			/>
			<!-- svelte-ignore a11y-click-events-have-key-events -->

			<div
				on:click|preventDefault={saveRestockNumber}
				class="{!saving
					? 'pr-2'
					: ''} flex bg-gray-500 ml-2 pl-2 items-center hover:bg-gray-400 rounded text-black font-semibold focus:outline-none"
			>
				Save
				{#if saving}
					<svg
						class="animate-spin my-1 mx-2 h-5 w-5 text-white"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle
							class="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							stroke-width="2"
						/>
						<path
							class="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						/>
					</svg>
				{/if}
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
