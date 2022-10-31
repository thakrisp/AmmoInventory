<script lang="ts">
	import { auth } from '../../../firebase';
	import { user } from '../../../store/user';

	/* let userLocal: any;
	user.subscribe((e) => {
		userLocal = e;
	}); */

	let displayName = auth.currentUser?.displayName || 'No User';
	let uid = auth.currentUser?.uid || 'Unavalible';
	let email = auth.currentUser?.email || 'Unavalible';

	//console.log(userLocal.uid);
</script>

<div class="mx-10 bg-gray-600 rounded-lg p-5">
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
</div>
