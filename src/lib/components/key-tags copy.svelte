<script>
	import { goto } from '$app/navigation';
	import { clickedCategory, clickedTheme, clickedTopic } from '$lib/json/stores';
	import CreateTags from '$lib/components/create-tags.svelte';
	/** @type {string}*/
	export let tagType = 'theme';
	/** @type {undefined}*/
	export let tags;
	export let headingText = 'Main themes';

	if (tagType == 'category') {
		tags = tags.filter((d) => d.type === 'category');
	}

	/** @param {string} theme */
	function themeClicked(theme) {
		// @ts-ignore
		$clickedTheme = theme;
		goto('/theme');
	}

	function categoryClicked(tag) {
		// @ts-ignore
		$clickedCategory = tag;
		goto('/resources/category');
	}

	function tagClicked(tag) {
		// @ts-ignore
		$clickedTopic = tag;
		goto(`/resources/tags/${tag}`);
	}
</script>

<div class="sidebar-themes">
	<!-- <p class="themes-header">{headingText}</p> -->
	{#if tagType == 'theme'}
		<p class="tags">
			<CreateTags {tags} tagClicked={themeClicked} {tagType} {headingText} />
		</p>
	{:else if tagType == 'category'}
		<p class="tags">
			<CreateTags {tags} tagClicked={categoryClicked} {tagType} {headingText} />
		</p>
	{:else if tagType == 'tag'}
		<p class="tags">
			<CreateTags {tags} {tagClicked} {tagType} {headingText} />
		</p>
	{/if}
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Crete+Round&family=Sanchez&family=Pridi&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab&family=Scope+One&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

	.sidebar-themes {
		margin: 0;
		padding: 0;
	}

	.tags {
		line-height: 1.5;
	}
</style>
