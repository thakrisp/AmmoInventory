<script lang="ts">
	import '../app.css';
	import { user as userStore, userData } from '../store/user';
	import { auth } from '../firebase';
	import { onAuthStateChanged } from 'firebase/auth';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	onMount(() => {
		onAuthStateChanged(auth, (user) => {
			if (!user) {
				goto('/login');
			} else {
				userStore.set({ uid: user?.uid, displayName: user?.displayName, email: user?.email });
				localStorage.setItem(
					'user',
					JSON.stringify({ uid: user?.uid, displayName: user?.displayName, email: user?.email })
				);
			}
		});
	});
</script>

<main>
	<slot />
</main>

<style>
</style>
