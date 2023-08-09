<script>
	export let data;
	import { page } from '$app/stores';
	// import '$lib/styles/global.css';
	// import '$lib/styles/gruvbox-light-scribe.css';
	import '$lib/styles/blog.css';
	import { cleanTags } from '$lib/modules/utility_functions.js';

	import TopicListCard from '$lib/components/topic-list-card.svelte';
	let postData = data.postData;
	// const tags = postData.metadata.categories;
	const tags = cleanTags(data.posts.filter((d) => d.link_id === postData.metadata.id)[0].tags);
	// console.log('[id-page] ', $page.params.id, tags);
</script>

{#key $page.params.id}
	<div class="heading">
		<h1>{postData.metadata.title}</h1>
	</div>
	<div class="meta-info">
		<p class="author">{postData.metadata.author}</p>
		<p class="date">Posted: {postData.metadata.post_date}</p>
		<TopicListCard {tags} size={3} tagType={'light-tag'} />
	</div>
	<div class="main-content">
		<svelte:component this={postData.content} />
	</div>
{/key}

<style>
	.heading h1 {
		margin-top: 10px;
		margin-bottom: 20px;
	}

	.meta-info {
		border-left: hsl(251, 100%, 15%) solid 4px;
		padding: 0 0 0 10px;
	}

	.meta-info .author,
	.date {
		font-family: Roboto, Verdana, Geneva, Tahoma, sans-serif;
		font-style: oblique;
		margin: 5px;
	}
</style>
