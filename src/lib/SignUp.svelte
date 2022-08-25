<script lang="ts">
	export let username = '';
	export let email = '';
	export let password = '';
	export let confirmPassword = '';
</script>

<form class="flex flex-col space-y-4">
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
