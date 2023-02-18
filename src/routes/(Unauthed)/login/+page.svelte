<script lang="ts">
	import Login from '$lib/login/Login.svelte';
	import SignUp from '$lib/login/SignUp.svelte';
	import ForgotPassword from '$lib/login/ForgotPassword.svelte';

	let pageStatus: 'Login' | 'SignUp' | 'Reset' = 'Login';
</script>

<svelte:head>
	<title>{pageStatus === 'Reset' ? 'Reset Password' : pageStatus}</title>
	<meta name="description" content="login" />
</svelte:head>

<div>
	<div class="flex justify-center h-screen">
		<div class="w-4/5 md:w-1/3 2xl:w-1/5 flex flex-col justify-center ">
			<div class="bg-blue-200 py-5 rounded-lg px-5 shadow-lg shadow-blue-400/25">
				<div class="flex flex-row justify-center space-x-5">
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div
						class="{pageStatus === 'Login'
							? 'underline decoration-gray-400'
							: ''} text-center text-xl "
						on:click={() => {
							pageStatus = 'Login';
						}}
					>
						Login
					</div>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div
						class="{pageStatus === 'SignUp'
							? 'underline decoration-gray-400'
							: ''} text-center text-xl "
						on:click={() => {
							pageStatus = 'SignUp';
						}}
					>
						SignUp
					</div>
				</div>
				{#if pageStatus === 'Login'}
					<Login on:forgotPassword={() => (pageStatus = 'Reset')} />
				{:else if pageStatus === 'SignUp'}
					<SignUp />
				{:else}
					<ForgotPassword />
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
</style>
