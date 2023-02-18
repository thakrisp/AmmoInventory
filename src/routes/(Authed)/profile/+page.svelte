<script lang="ts">
	import { user } from '../../../store/user';

	$: displayName = $user?.displayName;
	$: uid = $user?.uid;
	$: email = $user?.email;
</script>

<div class="mx-10 bg-gray-600 rounded-lg p-5">
	{#if !uid}
		<p>Loading</p>
	{:else}
		<div>
			<h1 class="text-xl text-red-200">UserName</h1>
			<div class="text-3xl text-red-400">
				{displayName}
			</div>
		</div>
		<div>
			<h1 class="text-xl text-red-200">UID</h1>
			<div class="text-3xl text-red-400">
				{uid}
			</div>
		</div>
		<div>
			<h1 class="text-xl text-red-200">Email</h1>
			<div class="text-3xl text-red-400">
				{email}
			</div>
		</div>
	{/if}
</div>
