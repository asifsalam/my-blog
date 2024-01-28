<script>
	import TopicListCard from '$lib/components/topic-list-card-v2.svelte';
	import { getImageUrl, cleanTags } from '$lib/modules/utility_functions';
	import { excerptLengthL } from '$lib/json/stores';

	export let article;
	let tags = [];
	let img_url;

	img_url = getImageUrl(article);
	tags = cleanTags(article.tags);

	const excerptLength = 200;
	if (article.excerpt.length >= $excerptLengthL)
		article.excerpt = article.excerpt.substring(0, $excerptLengthL);
</script>

<div class="post-main">
	<div class="post-title">
		<a style="text-decoration:none" href={article.link}>
			<h3 class="article-title">{article.title}</h3></a
		>
		{#if article.author == 'NA'}
			<p class="article-author">Uncredited</p>
		{:else}
			<p class="article-author">
				<span>{article.author}</span>,
				<span class="article-date">{article.post_date}</span>
			</p>
		{/if}
	</div>

	<div class="post-content">
		<div class="left-content" style="background-image: url({img_url}); filter:sepia(0.3)" />
		<div class="right-content">
			<a href={article.link} class="excerpt-linked">
				<p class="excerpt" style="text-decoration:none">
					{article.excerpt.substring(0, $excerptLengthL)}
					<span class="read-more">&#8212 read more</span>
				</p>
			</a>
		</div>
	</div>
	<TopicListCard {tags} link_type={article.link_type} size={1} />
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300&family=Roboto:wght@100;300&display=swap');

	.post-main {
		display: grid;
		grid-template-rows: auto;
		grid-template-columns: 1fr;
		width: 100%;
		min-height: 20px;
		max-height: 400px;
		margin: 0;
		padding: 0;
		font-family: 'Roboto Slab', Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
		border-top: solid 4px #9999808a;
		border-radius: 0px;
		overflow: hidden;
		z-index: 0;
		position: relative;
		transition: all ease-in-out 0.2s;
	}

	.post-title {
		font-family: 'Roboto Slab', Poppins, sans-serif;
		border-bottom: 1px dotted hsla(251, 100%, 30%, 0.3);
		grid-column-start: 1;
		grid-column-end: 3;
	}

	.article-title {
		font-family: 'Roboto Slab', Poppins, sans-serif;

		margin: 5px 3px 1px 0;
		font-size: 1.1rem;
		font-weight: 400;
		color: hsla(251, 100%, 21%, 1);
	}
	.article-title:hover {
		text-decoration: underline;
	}
	.article-author {
		font-family: 'Roboto', Georgia, 'Times New Roman', Times, serif;
		font-size: 1rem;
		/* font-weight: bold; */
		font-style: italic;
		color: hsla(251, 100%, 20%, 0.7);
		margin: 0px 0px 5px 0px;
		padding: 0;
		width: 100%;
	}

	.article-date {
		font-family: Roboto, 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
		font-size: 0.95rem;
		font-weight: 400;
		font-style: normal;
		color: hsla(250, 100%, 5%, 0.8);
		margin: 0px 0px 0px 0px;
		width: 100%;
	}

	.post-content {
		display: grid;
		grid-template-columns: 1fr 3fr;
		grid-template-rows: auto auto;
		height: 100%;
		width: 100%;
		background-position: center;
		background-blend-mode: color-burn;
		background-color: hsl(55deg 100% 98% / 25%);
		background-size: cover;
	}

	.left-content {
		width: 100%;
		height: 100%;
		z-index: 0;
		color: white;
		font-weight: 400;
		margin: 0;
		background-size: cover;
		background-position: center;
		background-blend-mode: color-burn;
		background-color: hsl(55deg 100% 98% / 25%);
	}

	.right-content {
		width: 100%;
		height: 100%;
		z-index: 3;
		margin: 0;
		color: black;
		background-size: cover;
		background-position: center;
		background-blend-mode: color-burn;
		background-color: hsl(55deg 100% 98% / 85%);
	}

	.right-content .excerpt {
		font-family: Roboto, Arial, Helvetica, sans-serif;
		color: hsl(257, 89%, 21%);
		font-size: 1rem;
		line-height: 110%;
		margin: 5px 0px 2px 10px;
		flex: 1;
		min-height: 80px;
	}

	.excerpt-linked {
		text-decoration: none;
	}

	.read-more {
		font-weight: bold;
	}
	.read-more:hover {
		font-weight: bold;
		text-decoration: underline;
	}

	.excerpt:hover::after {
		font-weight: 900;
		margin-left: 5px;
		transition: margin 0.3s, opacity 0.3s;
	}
</style>
