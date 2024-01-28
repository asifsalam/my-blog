<script>
	import { themes, categories, tags, allThemes, allCategories, allTopics } from '$lib/json/stores';
	import KeyTags from '$lib/components/key-tags.svelte';
	// import '/src/styles/global.css';

	export let useThemes = 'no';
	export let useCategories = 'no';
	export let useTags = 'no';
</script>

<div class="sidebar">
	{#if useThemes == 'yes'}
		<!-- change $theme to $allThemes to revert -->
		<KeyTags headingText={'Themes'} tags={$themes} tagType="theme" />
	{/if}
	{#if useCategories == 'yes'}
		<!-- change $categories to $allCategories to revert -->
		<KeyTags headingText={'Categories'} tags={$categories} tagType="category" />
	{/if}
	{#if useTags == 'yes'}
		<KeyTags headingText={'Other tags'} tags={$tags} tagType="tag" />
	{/if}
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Crete+Round&family=Sanchez&family=Pridi:wght@200;300;400&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab&family=Scope+One&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

	.sidebar {
		/* float: left;
		margin: 10px 30px 00px 0px;
		flex-flow: column; */
	}
</style>
