<script>
	export let tags;
	export let size = 1;
	export let tagType = 'normal-tag';
	import { goto } from '$app/navigation';
	import { clickedTopic } from '$lib/json/stores';

	let boxSize = 'size-' + size;
</script>

<p class="tags">
	<!-- <span style="font-size:1.1em;font-weight:bold">tags </span> -->
	{#each tags as tag}
		{#if tag != 'NA'}
			<a class="topic-box {boxSize} {tagType}" href={`/resources/tags/${tag}`}>{tag}</a>
		{:else}
			<a class="topic-box {boxSize} {tagType}" href={`/resources/tags/untagged`}>untagged</a>
		{/if}
	{/each}
</p>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300&family=Roboto:wght@100;300&display=swap');

	.tags {
		display: block;
		margin: 0px;
		font-size: smaller;
	}

	.size-1 {
		font-size: 0.9rem;
	}

	.size-2 {
		font-size: 1rem;
	}

	.size-3 {
		font-size: 1.1rem;
	}

	.topic-box {
		padding: 0px 4px;
		margin: 0px 5px 3px 0px;
		border-radius: 5px;
		text-decoration: none;
		display: inline-block;
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

	.topic-box:hover {
		outline: 0.2px solid hsla(252, 32%, 44%, 0.2);
		cursor: pointer;
		color: hsl(253, 39%, 95%);
		background-color: hsl(251, 100%, 15%);
	}
</style>
