<script>
	export let tags;
	export let link_type = 'website';
	export let tagType = 'normal-tag';
	export let size = 1;
	import { goto } from '$app/navigation';
	import { clickedTopic } from '$lib/json/stores';

	const twitterLogoUrl = '/img/icons/twitter-svgrepo-com-1.svg';

	let boxSize = 'size-' + size;
</script>

<div class="tag-container">
	<!-- <div class="topics"> -->
	<!-- <p class="tags"> -->
	{#if link_type === 'twitter'}
		<a class="logo-container {boxSize}" href="https://twitter.com">
			<img class="site-logo {boxSize}" src={twitterLogoUrl} alt="" srcset="" /></a
		>
	{/if}
	<!-- <span style="font-size:1.1em;font-weight:bold">tags </span> -->
	{#each tags as tag}
		{#if tag != 'NA'}
			<a class="topic-box {boxSize} {tagType}" href={`/resources/tags/${tag}`}>{tag}</a>
		{:else}
			<a class="topic-box {boxSize} {tagType}" href={`/resources/tags/untagged`}>untagged</a>
		{/if}
	{/each}
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300&family=Roboto:wght@100;300&display=swap');

	.tag-container {
		display: flex;
		flex-wrap: wrap;
		/* align-items: flex-start; */
		align-items: center;
		padding: 0px 0px 0px 0px;
		grid-column-start: 1;
		grid-column-end: 3;
		border-top: 1px solid hsla(251, 100%, 30%, 0.1);
		border-bottom: 1px solid hsla(251, 100%, 30%, 0.1);
		z-index: 5;
	}
	.tags {
		display: block;
		margin: 0px;
		font-size: smaller;
	}

	.size-1 {
		font-size: 0.9rem;
		height: 20px;
	}

	.size-2 {
		font-size: 1rem;
		height: 30px;
	}
	.size-3 {
		font-size: 1.1rem;
		height: 30px;
	}
	.topic-box {
		padding: 0px 4px;
		margin: 3px 5px 3px 0px;
		background-color: hsla(196, 67%, 54%, 0.05);
		color: hsl(251, 100%, 15%);
		border-radius: 5px;
		text-decoration: none;
		border: 1px solid hsla(251, 32%, 44%, 0.2);
		/* display: inline-block; */
		display: inline-flex;
		align-items: center;
	}

	.topic-box:hover {
		outline: 0.2px solid hsla(252, 32%, 44%, 0.2);
		cursor: pointer;
		color: hsl(253, 39%, 95%);
		background-color: hsl(251, 100%, 15%, 0.5);
	}

	.logo-container.size-2 {
		height: 30px;
		width: 30px;
		/* margin-top: 3px; */
		padding-right: 7px;
		align-self: self-end;
	}

	.site-logo.size-2 {
		width: 30px;
		/* height: 30px; */
		height: 100%;
		/* position: relative;
		left: 0;
		top: 0; */
	}

	.logo-container.size-1 {
		height: 25px;
		width: 25px;
		/* margin-top: 3px; */
		padding-right: 5px;
		align-self: self-end;
	}

	.site-logo.size-2 {
		width: 25px;
		/* height: 30px; */
		height: 100%;
		/* position: relative;
		left: 0;
		top: 0; */
	}

	.site-logo:hover {
		filter: brightness(0.5);
	}

	.normal-tag {
		background-color: hsla(196, 67%, 54%, 0.1);
		color: hsl(251, 100%, 15%);
		border: 1px solid hsla(251, 32%, 44%, 0.2);
	}
	.light-tag {
		/* background-color: hsla(55, 67%, 54%, 0.1); */
		/* background-color: hsl(6, 38%, 33%, 0.1); */
		background-color: hsla(240, 39%, 77%, 0.2);
		color: hsl(251, 100%, 15%);
		border: 1px solid hsla(251, 32%, 44%, 0.4);
	}

	.topics {
		line-height: 1.7;
		margin-top: 3px;
		padding: 0px 0px 0px 0px;
		display: flex;
		grid-column-start: 1;
		grid-column-end: 3;
		background: linear-gradient(hsl(55deg 100% 98% / 50%), hsl(55deg 100% 98% / 100%));
		z-index: 5;
	}
</style>
