<script lang="ts">
	export let email = '';
	export let password = '';
</script>

<form class="flex flex-col space-y-4">
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
