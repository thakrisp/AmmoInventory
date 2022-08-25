<script lang="ts">
	import logo from './svelte-logo.svg';
	import logo2 from './logo.png';
</script>

<header class="flex justify-between p-2 lg:px-8 bg-green-100">
	<a href="/" class="flex">
		<img
			src={logo2}
			id="logo"
			alt="SvelteKit"
			class="hidden sm:w-7 sm:h-7 sm:self-center sm:flex"
		/>
		<div class="flex self-end pl-2 text-2xl">Ammo Cache</div>
	</a>
	<div class="text-3xl hover:bg-slate-400/50 hover:rounded-full p-1">
		<img src="user.png" alt="" class="w-8" />
	</div>
</header>

<style>
	#logo {
		-webkit-transform: scaleX(-1);
		transform: scaleX(-1);
	}
</style>
