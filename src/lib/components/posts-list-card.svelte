<script>
	// import TopicListCard from '$lib/components/topic-list-card-v2.svelte';
	// import TopicListCard from '$lib/components/resources-card.svelte';
	// import { getImageUrl } from '$lib/modules/utility_functions';
	let baseImgUrl = '/img/images/geometric-pattern-';

	export let posts;
	// console.log(posts.length);
</script>

<div class="post-card">
	<h3>Recent posts</h3>
	{#if posts.length > 0}
		{#each posts as post}
			<a class="main-link" href={post.link}>
				<p class="article-title">
					{post.title}
				</p>
			</a>
		{/each}
	{:else}
		<p class="empty-list">No posts found</p>
	{/if}
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300&family=Roboto:wght@100;300&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab&family=Scope+One&display=swap');

	.post-card {
		width: 100%;
		min-height: 20px;
		/* max-height: 400px; */
		margin: 10px 0 0px 0;
		padding-bottom: 10px;
		font-size: 1.1rem;
		font-family: 'Scope One', Cochin, Georgia, Times, 'Times New Roman', serif;
		/* border-bottom: 1px solid hsla(278, 13%, 28%, 0.3); */
		border-bottom: 3px solid #9999808a;
		border-radius: 0px;
		z-index: 0;
		position: relative;
		/* overflow: scroll; */
	}

	h3 {
		margin: 0px 0 10px 0;
		/* font-family: 'Scope One', Cochin, Georgia, Times, 'Times New Roman', serif; */
		/* font-size: 1.5rem; */
		font-family: 'Pridi', Georgia, 'Times New Roman', Times, serif;
		font-size: 1.4rem;
		font-weight: 300;
		/* color: hsla(251, 100%, 20%, 0.9); */
		color: hsla(0, 0%, 56%, 80%);
	}

	.main-link {
		position: relative;
		display: inline;
		text-decoration: none;
	}

	.article-title {
		display: block;
		font-family: Urbanist, 'Titillium Web', 'Scope One', Cochin, Georgia, Times, 'Times New Roman',
			serif;
		margin: 0px 0px 15px 2px;
		font-size: 1.1rem;
		/* line-height: 1rem; */
		/* color: rgb(0, 0, 0); */
		/* color: #3b3882; */
		color: hsla(0, 0%, 56%, 80%);
	}

	.article-title:hover {
		text-decoration: underline;
		/* font-weight: bolder; */
	}
</style>
