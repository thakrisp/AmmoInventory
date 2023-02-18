<script lang="ts">
	import { sendPasswordResetEmail } from 'firebase/auth';
	import { auth } from '../../firebase';
	import ErrorMessage from '../ErrorMessage.svelte';
	import SubmitButton from '../SubmitButton.svelte';

	let email = '';
	let errorMessage = '';
	$: isDisabled = email === '';

	let handleMessage = (_: Event) => {
		resetUserPassword();
	};

	let resetUserPassword = async () => {
		sendPasswordResetEmail(auth, email)
			.then(() => {})
			.catch((error) => {
				errorMessage = error.message;
			});
	};
</script>

<form action="" class="flex flex-col">
	{#if errorMessage !== ''}
		<ErrorMessage bind:errorMessage />
	{/if}
	<label for="emailAddress">emailAddress<span class="text-red-600 text-xl">*</span></label>
	<input
		required
		bind:value={email}
		type="email"
		name="emailAddress"
		id="emailAddressInput"
		class="bg-transparent border-b-2 border-black focus:outline-none"
	/>
</form>
<div class="flex flex-row-reverse justify-between mt-2">
	<SubmitButton bind:isDisabled pageStatus={'reset Password'} on:pageRequesting={handleMessage} />
</div>
