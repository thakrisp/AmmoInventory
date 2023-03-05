<script lang="ts">
	export const prerender = true;

	import '../app.css';
	import { user as userStore } from '../store/user';
	import { auth } from '../firebase';
	import { onAuthStateChanged } from 'firebase/auth';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	onMount(() => {
		onAuthStateChanged(auth, (user) => {
			if (!user) {
				goto('/login');
			} else {
				let userData = {
					uid: user?.uid,
					displayName: user?.displayName || '',
					email: user?.email || ''
				};
				userStore.set(userData);
				localStorage.setItem('user', JSON.stringify(userData));
			}
		});
	});
</script>

<main>
	<slot />
</main>

<style>
</style>
