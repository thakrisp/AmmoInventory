<script lang="ts">
	import { goto } from '$app/navigation';
	import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
	import { auth } from '../../firebase';
	import ErrorMessage from '$lib/ErrorMessage.svelte';
	import SubmitButton from '$lib/SubmitButton.svelte';

	let username = '';
	let email = '';
	let password = '';
	let confirmPassword = '';
	let errorMessage = '';
	$: isDisabled =
		email === '' || username === '' || password === '' || password !== confirmPassword;

	let handleMessage = (_: Event) => {
		signUpUser();
	};

	function signUpUser() {
		if (email !== null && password !== null) {
			createUserWithEmailAndPassword(auth, email, password)
				.then((_) => {
					if (auth.currentUser) {
						updateProfile(auth.currentUser, {
							displayName: username
						});
						goto('/');
					}
				})
				.catch((error) => {
					errorMessage = error.message;
				});
		}
	}

	if (import.meta.env.DEV) {
		email = 'Test25@test.com';
		username = 'Test25';
		password = 'testPass';
		confirmPassword = 'testPass';
	}
</script>

<form class="flex flex-col space-y-4">
	{#if errorMessage !== ''}
		<ErrorMessage bind:errorMessage />
	{/if}
	<div class="flex flex-col">
		<label for="emailAddress">Email<span class="text-red-600 text-xl">*</span></label>
		<input
			bind:value={email}
			type="email"
			name="emailAddress"
			id="emailInput"
			class="bg-transparent border-b-2 border-black focus:outline-none"
			required
		/>
	</div>
	<div class="flex flex-col">
		<label for="username">Username<span class="text-red-600 text-xl">*</span></label>
		<input
			bind:value={username}
			type="text"
			name="username"
			id="usernameInput"
			class="bg-transparent border-b-2 border-black focus:outline-none"
			required
		/>
	</div>
	<div class="flex flex-col">
		<label for="userpassword">Password<span class="text-red-600 text-xl">*</span></label>
		<input
			bind:value={password}
			type="password"
			name="userpassword"
			id="passwordInput"
			class="bg-transparent border-b-2 border-black focus:outline-none"
			required
		/>
	</div>
	<div class="flex flex-col">
		<label for="confirmPassword">Confirm Password<span class="text-red-600 text-xl">*</span></label>
		<input
			bind:value={confirmPassword}
			type="password"
			name="confirmPassword"
			id="confirmInput"
			class="bg-transparent border-b-2 border-black focus:outline-none"
			required
		/>
	</div>
</form>
<div class="flex flex-row-reverse justify-between mt-2">
	<SubmitButton on:pageRequesting={handleMessage} bind:isDisabled pageStatus={'Sign Up'} />
</div>
