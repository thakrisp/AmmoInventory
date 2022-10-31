<script lang="ts">
	import '../app.css';
	import { user as userStore } from '../store/user';
	import { auth } from '../firebase';
	import { connectAuthEmulator, onAuthStateChanged } from 'firebase/auth';
	import { connectFirestoreEmulator } from 'firebase/firestore';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	import { db } from '../firebase';

	if (import.meta.env.DEV) {
		//connectAuthEmulator(auth, 'http://localhost:9099');
		//connectFirestoreEmulator(db, 'localhost', 8081);
	}

	onMount(() => {
		onAuthStateChanged(auth, (user) => {
			if (!user) {
				goto('/login');
			}
			userStore.set({ uid: user?.uid, displayName: user?.displayName });
		});
	});
</script>

<main>
	<slot />
</main>

<style>
</style>
