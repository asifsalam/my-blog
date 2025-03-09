<script>
	export let year = '2023'; // Default year, can be overridden when using the component
</script>

<div class="container">
	<!-- Left section: Year -->
	<div class="year-section">
		{year}
	</div>

	<!-- Right section: Text -->
	<div class="text-section">
		<slot />
		<!-- Svelte slot for inserting content -->
	</div>
</div>

<style>
	.container {
		display: flex;
		align-items: stretch;
		width: 100%;
		background-color: #ffffff00;
	}

	.year-section {
		background-color: #e0f7fa; /* Light blue */
		width: 50px; /* Thin section */
		display: flex;
		justify-content: center;
		align-items: center;
		writing-mode: vertical-lr; /* Vertical text */
		transform: rotate(180deg); /* Rotate text to read bottom-to-top */
		font-size: 2rem;
		font-weight: bold;
		color: #8486f7; /* Darker teal for contrast */
		padding: 10px 0;
		border-bottom: hsl(0, 0%, 6%) solid 10px;
	}

	.text-section {
		flex: 1;
		padding: 0px 0px 0px 10px;
		background-color: #fffef5;
	}

	.text-section p {
		margin: 0 0 1em 0;
		line-height: 1.6;
	}
</style>
