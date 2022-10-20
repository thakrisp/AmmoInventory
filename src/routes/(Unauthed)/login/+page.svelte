<script lang="ts">
	import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
	import { slide } from 'svelte/transition';
	import { bounceOut } from 'svelte/easing';
	import Login from '$lib/Login.svelte';
	import SignUp from '$lib/SignUp.svelte';
	import { auth } from '../../../firebase';
	import { goto } from '$app/navigation';

	let email = '';
	let username = '';
	let password = '';
	let confirmPassword = '';
	let isLogin = true;

	$: error = '';

	function signUpUser() {
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				// ...
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.error(`${errorCode}: ${errorMessage}`);
			});
	}

	function signInUser() {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				goto('/home');
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.error(`${errorCode}: ${errorMessage}`);
			});
	}

	$: passwordMatch = password !== '' && confirmPassword !== '' && password === confirmPassword;

	$: isDisabled = isLogin
		? email !== '' && password !== ''
			? false
			: true
		: email !== '' && username !== '' && password !== '' && confirmPassword !== ''
		? false
		: true;

	function Submit() {
		if (isLogin) {
			if (email !== '' && password !== '') {
				signInUser();
				//console.log({ email, password });
			} else {
				console.log('ERROR: Missing username or password');
			}
		} else {
			if (email !== '' && username !== '' && password !== '' && confirmPassword !== '') {
				if (password === confirmPassword) {
					console.log({ email, username, password, confirmPassword });
				} else {
					console.log('Passwords dont match');
				}
			} else {
				console.log('Error: Missing data to Signup');
			}
		}
	}
</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="login" />
</svelte:head>

<div>
	<div class="flex justify-center h-screen">
		<div class="w-4/5 md:w-1/3 2xl:w-1/5 flex flex-col justify-center ">
			<div class="bg-blue-200 py-5 rounded-lg px-5 shadow-lg shadow-blue-400/25">
				<div class="flex flex-row justify-center space-x-5">
					<div
						class="{isLogin ? 'underline decoration-gray-400' : ''} text-center text-xl "
						on:click={() => {
							isLogin = true;
						}}
					>
						Login
					</div>
					<div
						class="{!isLogin ? 'underline decoration-gray-400' : ''} text-center text-xl "
						on:click={() => {
							isLogin = false;
						}}
					>
						SignUp
					</div>
				</div>
				{#if error !== ''}
					<div
						transition:slide={{ delay: 250, duration: 600, easing: bounceOut }}
						class="bg-red-400 my-3 p-2 rounded-lg flex justify-between text-lg shadow-lg shadow-red-400/25"
					>
						<div class="pt-1">Error: {error}</div>
						<div
							class="w-8 justify-center flex pt-1 hover:bg-black/5 hover:rounded-full"
							on:click|preventDefault={() => (error = '')}
						>
							✖
						</div>
					</div>
				{/if}
				{#if isLogin}
					<Login bind:email bind:password />
				{:else}
					<SignUp bind:email bind:username bind:password bind:confirmPassword />
				{/if}
				<div class="flex flex-col justify-between mt-5">
					{#if isLogin}
						<button class="underline flex">Forgot Password</button>
					{/if}
					<div class="flex justify-end">
						<input
							disabled={isDisabled}
							on:click|preventDefault={Submit}
							type="submit"
							class="text-lg px-3 py-1 rounded-lg max-w-max hover:bg-blue-300/50 disabled:bg-gray-500 disabled:opacity-25"
							value={isLogin ? 'Login' : 'SignUp'}
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
</style>
