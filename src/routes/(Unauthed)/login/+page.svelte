<script lang="ts">
	import { slide } from 'svelte/transition';
	import { bounceOut } from 'svelte/easing';
	import { goto } from '$app/navigation';
	import {
		createUserWithEmailAndPassword,
		signInWithEmailAndPassword,
		updateProfile
	} from 'firebase/auth';
	import { auth } from '../../../firebase';

	import Login from '$lib/Login.svelte';
	import SignUp from '$lib/SignUp.svelte';

	let email = '';
	let username = '';
	let password = '';
	let confirmPassword = '';
	let isLogin = true;

	if (import.meta.env.DEV) {
		email = 'Test@test.com';
		password = 'testPass';
	}

	let error = '';

	function signUpUser() {
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
				const errorCode = error.code;
				const errorMessage = error.message;
				console.error(`${errorCode}: ${errorMessage}`);
			});
	}

	async function signInUser() {
		let test = await signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				goto('/');
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				return `${errorCode}: ${errorMessage}`;
			});

		if (test) error = test;
	}

	//$: passwordMatch = password !== '' && confirmPassword !== '' && password === confirmPassword;

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
			} else {
				console.log('ERROR: Missing username or password');
			}
		} else {
			if (email !== '' && username !== '' && password !== '' && confirmPassword !== '') {
				if (password === confirmPassword) {
					signUpUser();
				} else {
					error = 'Passwords dont match';
				}
			} else {
				error = 'Error: Missing data to Signup';
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
							class="w-8 justify-center flex h-fit pt-1 hover:bg-black/5 hover:rounded-full"
							on:click|preventDefault={() => (error = '')}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-6 h-6"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</div>
					</div>
				{/if}
				{#if isLogin}
					<Login bind:email bind:password />
				{:else}
					<SignUp bind:email bind:username bind:password bind:confirmPassword />
				{/if}
				<div class="flex flex-row-reverse justify-between mt-2">
					<div class="flex justify-end">
						<input
							autofocus
							disabled={isDisabled}
							on:click|preventDefault={Submit}
							type="submit"
							class="text-lg px-3 py-1 rounded-lg max-w-max bg-blue-500/50 hover:bg-blue-700/50 disabled:bg-gray-500 disabled:opacity-25"
							value={isLogin ? 'Login' : 'SignUp'}
						/>
					</div>
					{#if isLogin}
						<button class="underline flex self-center">Forgot Password</button>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>

<style>
</style>
