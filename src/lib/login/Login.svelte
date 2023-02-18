<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { goto } from '$app/navigation';
	import { signInWithEmailAndPassword } from 'firebase/auth';
	import { auth } from '../../firebase';
	import SubmitButton from '../SubmitButton.svelte';
	import ErrorMessage from '../ErrorMessage.svelte';

	const dispatch = createEventDispatcher();

	let email = '';
	let password = '';
	let errorMessage = '';
	$: isDisabled = email === '' || password === '';

	if (import.meta.env.DEV) {
		email = 'Test@test.com';
		password = 'testPass';
	}

	let handleMessage = (_: Event) => {
		signInUser();
	};

	function changeToForgotPassword() {
		dispatch('forgotPassword');
	}

	async function signInUser() {
		await signInWithEmailAndPassword(auth, email, password)
			.then((_) => {
				goto('/');
			})
			.catch((error) => {
				errorMessage = error.message;
			});
	}
</script>

<form class="flex flex-col space-y-4">
	{#if errorMessage !== ''}
		<ErrorMessage bind:errorMessage />
	{/if}
	<div class="flex flex-col">
		<label for="email">Email<span class="text-red-600 text-xl">*</span></label>
		<input
			required
			type="text"
			name="email"
			id="emailInput"
			class="bg-transparent border-b-2 border-black focus:outline-none"
			bind:value={email}
		/>
	</div>
	<div class="flex flex-col">
		<label for="userpassword">Password<span class="text-red-600 text-xl">*</span></label>
		<input
			required
			bind:value={password}
			type="password"
			name="userpassword"
			id="passwordInput"
			class="bg-transparent border-b-2 border-black focus:outline-none"
		/>
	</div>
</form>
<div class="flex flex-row-reverse justify-between mt-2">
	<SubmitButton on:pageRequesting={handleMessage} {isDisabled} pageStatus={'Login'} />
	<button on:click={changeToForgotPassword} class="underline flex self-center"
		>Forgot Password</button
	>
</div>
