<script lang="ts">
	export let name = '';
	export let amount = 0;

	$: randomnum = Math.ceil(Math.random() * 1000);
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div
	class="{amount > 50
		? 'bg-green-300 hover:bg-green-400 hover:shadow-green-400/50'
		: 'bg-red-300 hover:bg-red-400 hover:shadow-red-400/50'} rounded-md hover:scale-110 lg:hover:scale-105 hover:shadow-md"
>
	<div class="flex justify-center items-center border-black ">
		<div class="font-semibold self-center text-5xl pt-2">{amount}</div>
	</div>
	<div class="flex flex-row items-baseline justify-between p-2">
		<div class="items-baseline">
			<div class="font-semibold text-lg flex flex-wrap">
				{name}
			</div>
			<div class="text-sm font-extralight">
				Grain: <span class="font-semibold">{randomnum}</span>
			</div>
			<div class="text-sm font-extralight">Type: <span class="font-semibold">Lead Tip</span></div>
		</div>
	</div>
</div>

<style>
</style>
