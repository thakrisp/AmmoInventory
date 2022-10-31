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
		? 'bg-blue-300 hover:bg-blue-400 hover:blue-green-400/50'
		: 'bg-red-300 hover:bg-red-400 hover:shadow-red-400/50'}
    flex flex-row rounded-md hover:scale-110 lg:hover:scale-105 hover:shadow-md"
>
	<div class="flex justify-center items-center border-black ">
		<img
			src="https://source.unsplash.com/random/500x500"
			alt=""
			srcset=""
			class="rounded-md w-24 h-full"
		/>
	</div>
	<div class="flex flex-col items-baseline justify-between p-2">
		<div class="items-baseline">
			<div class="font-semibold text-xl flex flex-wrap ">
				{name}
			</div>
			<div class="text-sm font-extralight">Grain:</div>
			<div class="text-sm font-extralight">Type:</div>
		</div>
		<div class=" flex items-baseline">
			Count:
			<span class="pl-1 font-semibold text-xl">{amount}</span>
		</div>
	</div>
</div>

<style>
</style>
