<script>
	import ContentCardSmall from '$lib/components/content-card-small-v1.svelte';
	import ContentCardMedium from './content-card-medium-v3.svelte';
	import { clickedCategory } from '$lib/json/stores';
	import { goto } from '$app/navigation';
	// import { allCategories } from '$lib/json/stores';
	import ContentCardMediumV3 from './content-card-medium-v3.svelte';
	export let articles;
	export let category;
	export let displayArticles = 5;
	// let categories = $allCategories;
	// console.log('resources-category-card: ', category);
	function categoryClicked(selectedCategory) {
		// @ts-ignore
		$clickedCategory = selectedCategory;
		goto('/resources/category');
		// console.log('resources-category-card-clicked: ', $clickedCategory);
	}
</script>

<div class="category-container">
	<div class="category-header">
		<img class="category-img" src={category.img} alt={category.title} srcset="" />
		<h2
			class="category-title view-all"
			on:click={() => {
				categoryClicked(category.name);
			}}
		>
			{category.title.toLowerCase()}
		</h2>
		<h3 class="category-title article-count">
			{#if articles.length > displayArticles}
				{displayArticles}
			{:else}
				{articles.length}
			{/if}
			of
			<span
				class="view-all"
				on:click={() => {
					categoryClicked(category.name);
				}}>{articles.length}</span
			>
			items<br />
			<p
				class="article-count view-all"
				on:click={() => {
					categoryClicked(category.name);
				}}
			>
				view all
			</p>
			<!-- <button class="topic topic-box" on:click={() => categoryClicked(category.category)}
				>{category.category}</button -->
			<!-- <a class="article-count" href={`/resources/${category.category}`}>view all</a> -->
		</h3>
	</div>
	{#each articles.slice(0, displayArticles) as article}
		<!-- <ContentCardSmall {article} {category} /> -->
		<!-- <ContentCardMediumV3 {article} /> -->
		<ContentCardSmall {article} {category} />
	{/each}
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300&family=Roboto:wght@100;300&display=swap');

	.category-container {
		display: grid;
		grid-template-columns: 1fr;
		grid-gap: 0px 15px;
		max-height: 1000px;
		overflow: hidden;
		align-content: start;
		margin-bottom: 15px;
	}
	.category-header {
		/* background-image: url('https://picsum.photos/200/300'); */
		display: grid;
		grid-template-columns: 2fr 5fr 3fr;
		height: 3em;
		padding: 0px 0px 10px 0px;
		align-items: center;
		vertical-align: middle;
		font-family: 'Crete Round', Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
	}
	.category-title {
		margin: 0;
		padding-left: 10px;
		padding-bottom: 0;
		font-size: 1.2em;
		font-weight: 600;
		color: hsla(251, 100%, 20%, 0.6);
	}
	.article-count {
		font-family: 'Scope One', Roboto, Arial, Helvetica, sans-serif;
		font-size: 1em;
		font-weight: bold;
		text-align: right;
		color: hsla(251, 100%, 20%, 0.6);
		margin: 0;
	}
	.view-all {
		cursor: pointer;
	}
	.view-all:hover {
		text-decoration: underline 4px;
		color: hsla(251, 100%, 20%, 1);
	}
	/* .article-count a {
		font-weight: normal;
		opacity: 0.7;
		text-decoration: none;
	}
	.article-count a:hover {
		text-decoration: underline;
		opacity: 1;
		font-weight: bold;
	} */
	.category-img {
		background-color: rgba(255, 0, 0, 0.019);
		bottom: 0;
		left: 0;
	}
	img {
		display: inline;
		position: relative;
		height: inherit;
	}
</style>
