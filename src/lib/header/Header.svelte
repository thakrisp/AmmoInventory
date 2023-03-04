<script lang="ts">
	import logo2 from './logo.png';
	import { auth } from '../../firebase';
	import { signOut } from 'firebase/auth';

	function signOutUser() {
		signOut(auth).then(() => {
			localStorage.removeItem('UserData');
			localStorage.removeItem('User');
			localStorage.removeItem('restockNumber');
		});
	}
</script>

<div class="navbar bg-base-100">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost normal-case text-xl text-gray-400 px-0 pr-2"
			><img src={logo2} class="scale-50" alt="" />Ammo Cache</a
		>
	</div>
	<div class="flex-none gap-2">
		<div class="dropdown dropdown-end">
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label tabindex="0" class="btn btn-ghost btn-circle avatar">
				<div class="w-10 rounded-full">
					<img src="user.png" alt="ammo cache logo" />
				</div>
			</label>
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<ul
				tabindex="0"
				class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
			>
				<li>
					<a href="/profile" class="justify-between"> Profile </a>
				</li>
				<li>
					<a href="/settings"
						>Settings
						<span class="badge">New</span>
					</a>
				</li>
				<!-- svelte-ignore a11y-missing-attribute -->
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<li on:click={signOutUser}><a>Logout</a></li>
			</ul>
		</div>
	</div>
</div>
