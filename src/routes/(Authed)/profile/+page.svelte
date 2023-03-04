<script lang="ts">
	import { user } from '../../../store/user';
	import { auth } from '../../../firebase';
	import { updateEmail, updateProfile, sendPasswordResetEmail } from 'firebase/auth';

	$: email = $user.email || 'no email';
	$: displayName = $user.displayName || 'no displayName';

	let updateUsername = async () => {
		if (auth.currentUser !== null) {
			await updateProfile(auth.currentUser, {
				displayName
			})
				.then(() => {})
				.catch((error) => {
					console.error(error);
				});
		}
	};

	let updateEmailAddress = async () => {
		if (auth.currentUser !== null) {
			updateEmail(auth.currentUser, email)
				.then(() => {})
				.catch((error) => {
					console.error(error);
				});
		}
	};

	let resetPassword = async () => {
		sendPasswordResetEmail(auth, email)
			.then(() => {})
			.catch((error) => {
				console.error(error);
			});
	};
</script>

<div class="mx-10 bg-gray-600 rounded-lg p-5">
	{#if email === 'no email' || displayName === 'no displayName'}
		<p>Loading</p>
	{:else}
		<div class="flex items-end">
			<div class="form-control w-full max-w-xs">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="label">
					<span class="label-text">Username</span>
				</label>
				<input
					type="text"
					on:change={(event) => (displayName = event.currentTarget.value)}
					value={displayName}
					class="input input-bordered w-full max-w-xs"
				/>
			</div>
			<button class="btn ml-2 mt-2" on:click={updateUsername}>Save</button>
		</div>

		<div class="flex items-end">
			<div class="form-control w-full max-w-xs">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="label">
					<span class="label-text">email Address</span>
				</label>
				<input
					type="text"
					on:change={(event) => (email = event.currentTarget.value)}
					value={email}
					class="input input-bordered w-full max-w-xs"
				/>
			</div>
			<button class="btn ml-2 mt-2" on:click={updateEmailAddress}>Save</button>
		</div>
		<button class="btn btn-wide mt-2" on:click={resetPassword}>Reset password</button>
	{/if}
</div>
