<script>
	import { clickedCategory } from '$lib/json/stores';
	import { goto } from '$app/navigation';
	export let category = 'all';
	export let displayQuantity = 10;
	export let totalQuantity = 50;
	export let headingTitle = 'Interesting';
	export let moreItemsClicked = (selectedCategory) => {
		$clickedCategory = selectedCategory;
		goto('/resources/category');
	};
	function categoryClicked(selectedCategory) {
		// @ts-ignore
		$clickedCategory = selectedCategory;
		goto('/resources/category');
	}
</script>

<div class="heading">
	<h1 class="heading-title">{headingTitle}</h1>
	<h3 class="article-count">
		{#if totalQuantity > displayQuantity}
			{displayQuantity}
		{:else}
			{totalQuantity}
		{/if}
		of
		<span
			class="view-all"
			on:click={() => {
				moreItemsClicked(category);
			}}>{totalQuantity}</span
		>
		items<br />
		<p
			class="article-count view-all"
			on:click={() => {
				moreItemsClicked(category);
			}}
		>
			view all
		</p>
	</h3>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Pridi:wght@200;400&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Sanchez&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Crete+Round&display=swap');
	h1 {
		font-family: 'Sanchez';
		margin: 0;
	}

	.heading {
		/* background-image: url('https://unsplash.com/photos/VWcPlbHglYc'); */
		display: grid;
		grid-template-columns: 4fr 1fr;
		height: 4em;
		padding: 0px 0px 0px 0px;
		align-items: top;
		vertical-align: middle;
		font-family: Sanchez;
	}

	.heading-title {
		margin: 0;
		padding: 0;
		font-size: xx-large;
		font-weight: 200;
		color: hsla(251, 100%, 20%, 1);
	}

	.article-count {
		font-family: 'Scope One', Roboto, Arial, Helvetica, sans-serif;
		font-size: large;
		font-weight: bold;
		text-align: right;
		color: hsla(251, 100%, 20%, 0.6);
		margin: 0 0 0 0;
	}
	.view-all {
		margin: 0;
		cursor: pointer;
	}
	.view-all:hover {
		text-decoration: underline 4px;
		color: hsla(251, 100%, 20%, 1);
	}
</style>
