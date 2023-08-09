<script>
	export let tags;
	export let size = 1;
	import { goto } from '$app/navigation';
	import { clickedTopic } from '$lib/json/stores';

	let boxSize = 'size-' + size;
	// console.log('component: topic-list-card');
	function tagClicked(topic) {
		// @ts-ignore
		$clickedTopic = topic;
		goto(`/resources/topics/`);
		console.log('tag-list-tag: ', $clickedTopic);
	}
	// console.log('tag-list-card:');
</script>

<p class="tags">
	{#each tags as tag}
		<!-- {#if tag != 'NA'}
			<a class="topic topic-box {boxSize}" href={`/resources/topics/${tag}`}> {tag} </a>
		{:else}
			<a class="topic topic-box" href={`/resources/topics/untagged`}> untagged </a>
		{/if} -->
		<button
			class="tag tag-box size-2"
			on:click={() => {
				tagClicked(tag);
			}}>{tag}</button
		>
	{/each}
</p>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300&family=Roboto:wght@100;300&display=swap');

	.tags {
		display: block;
		margin: 0 0 0px 0px;
		font-size: smaller;
	}

	/* .size-1 {
		font-size: 0.9rem;
	} */

	.size-2 {
		font-size: 1rem;
	}

	.tag-box {
		padding: 0px 2px;
		margin: 0px 3px;
		/* background-color: hsla(195, 89%, 69%, 0.1); */
		/* background-color: #eafaff; */
		background-color: hsla(196, 67%, 54%, 0.1);
		color: hsla(251, 100%, 15%, 0.7);
		border-radius: 5px;
		text-decoration: none;
		/* border: 0px solid hsla(252, 32%, 44%, 0.2); */
		border: 1px solid hsla(251, 32%, 44%, 0.2);
	}

	.tag:hover {
		/* color: hsl(251, 100%, 21%); */
		/* font-weight: bold; */
		/* background-color: hsla(195, 89%, 69%, 0.4); */
		outline: 0.2px solid hsla(252, 32%, 44%, 0.2);
		cursor: pointer;
		color: hsl(253, 39%, 95%);
		background-color: hsl(251, 100%, 15%);
	}
</style>
