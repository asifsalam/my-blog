<script>
	export let AIData;
</script>

<div class="flex space-x-4">
	<!-- Symbolic AI Section -->
	<div class="flex-1">
		<h2 class="text-xl font-bold mb-2">Symbolic AI</h2>

		<div class="mb-4">
			<h3 class="text-lg font-semibold">Techniques</h3>
			{#each AIData['Symbolic AI'].techniques as item}
				<div class="p-2 border rounded mb-1" title={item.description}>{item.name}</div>
			{/each}
		</div>

		<div class="mb-4">
			<h3 class="text-lg font-semibold">Algorithms</h3>
			{#each AIData['Symbolic AI'].algorithms as item}
				<div class="p-2 border rounded mb-1" title={item.description}>{item.name}</div>
			{/each}
		</div>

		<div>
			<h3 class="text-lg font-semibold">Example Applications</h3>
			<div class="italic text-sm">(No example applications provided)</div>
		</div>
	</div>

	<!-- Other Section -->
	<div class="flex-1">
		<h2 class="text-xl font-bold mb-2">Other</h2>

		<!-- Machine Learning Subsection -->
		<div class="mb-6">
			<h3 class="text-lg font-semibold">Machine Learning</h3>

			<div class="mb-4">
				<h4 class="font-medium">Techniques</h4>
				{#each AIData['Other techniques'].techniques.filter( (item) => ['Supervised Learning', 'Unsupervised Learning', 'Reinforcement Learning'].includes(item.name) ) as item}
					<div class="p-2 border rounded mb-1" title={item.description}>{item.name}</div>
				{/each}
			</div>

			<div class="mb-4">
				<h4 class="font-medium">Algorithms</h4>
				{#each AIData['Other techniques'].algorithms.filter( (item) => ['Q-Learning', 'Policy Gradient Methods', 'K-means Clustering', 'Hierarchical Clustering', 'Principal Component Analysis', 'Linear Regression', 'Logistic Regression', 'Support Vector Machines', 'Random Forest'].includes(item.name) ) as item}
					<div class="p-2 border rounded mb-1" title={item.description}>{item.name}</div>
				{/each}
			</div>

			<div>
				<h4 class="font-medium">Example Applications</h4>
				<div class="italic text-sm">(No example applications provided)</div>
			</div>
		</div>

		<!-- Other Subsection -->
		<div>
			<h3 class="text-lg font-semibold">Other</h3>

			<div class="mb-4">
				<h4 class="font-medium">Techniques</h4>
				{#each AIData['Other techniques'].techniques.filter((item) => !['Supervised Learning', 'Unsupervised Learning', 'Reinforcement Learning'].includes(item.name)) as item}
					<div class="p-2 border rounded mb-1" title={item.description}>{item.name}</div>
				{/each}
			</div>

			<div class="mb-4">
				<h4 class="font-medium">Algorithms</h4>
				{#each AIData['Other techniques'].algorithms.filter((item) => !['Q-Learning', 'Policy Gradient Methods', 'K-means Clustering', 'Hierarchical Clustering', 'Principal Component Analysis', 'Linear Regression', 'Logistic Regression', 'Support Vector Machines', 'Random Forest'].includes(item.name)) as item}
					<div class="p-2 border rounded mb-1" title={item.description}>{item.name}</div>
				{/each}
			</div>

			<div>
				<h4 class="font-medium">Example Applications</h4>
				<div class="italic text-sm">(No example applications provided)</div>
			</div>
		</div>
	</div>

	<!-- Connectionist AI Section -->
	<div class="flex-1">
		<h2 class="text-xl font-bold mb-2">Connectionist AI</h2>

		<div class="mb-4">
			<h3 class="text-lg font-semibold">Techniques</h3>
			{#each AIData['Connectionist AI'].techniques as item}
				<div class="p-2 border rounded mb-1" title={item.description}>{item.name}</div>
			{/each}
		</div>

		<div class="mb-4">
			<h3 class="text-lg font-semibold">Algorithms</h3>
			{#each AIData['Connectionist AI'].algorithms as item}
				<div class="p-2 border rounded mb-1" title={item.description}>{item.name}</div>
			{/each}
		</div>

		<div>
			<h3 class="text-lg font-semibold">Example Applications</h3>
			<div class="italic text-sm">(No example applications provided)</div>
		</div>
	</div>
</div>

<style>
	.border {
		border-color: #ddd;
	}
</style>
