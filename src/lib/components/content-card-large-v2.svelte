<script>
	import { excerptLength, excerptLengthL } from '$lib/json/stores';
	import { getImageUrl, cleanTags } from '$lib/modules/utility_functions';
	import TopicListCard from '$lib/components/topic-list-card-v2.svelte';
	// import TagListCard from '$lib/components/tag-list-card.svelte';
	const twitterLogoUrl = '/img/icons/twitter-svgrepo-com-1.svg';
	export let article;
	let tags = cleanTags(article.tags);
	let img_url = getImageUrl(article);

	//link_type
</script>

<div class="post-container {article.link_type}">
	<div class="left-container">
		<div class="articleId-container">
			<a class="articleId-link" href={article.link} target="_blank" rel="noopener noreferrer">
				<p class="articleId">{article.link_id}</p>
			</a>
		</div>
		<div class="image-container">
			<a class="left-image" href={article.link}>
				<div class="left-image" style="background-image: url({img_url}); filter:sepia(0.5)" />
			</a>
		</div>
	</div>
	<div class="post-main">
		<div class="post-title">
			<a style="text-decoration:none" href={article.link}>
				{#if article.pre_title.length > 0}
					<p class="pre-title">{article.pre_title}</p>
				{/if}
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
		<div class="right-content">
			<a href={article.link} class="excerpt-linked">
				<p class="excerpt" style="text-decoration:none">
					{article.excerpt.substring(0, $excerptLengthL)}
					<span class="read-more">&#8674 read more</span>
				</p>
			</a>
		</div>
	</div>
	<TopicListCard {tags} link_type={article.link_type} size={1} />
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300&family=Roboto:wght@100;300&display=swap');

	.post-container {
		display: grid;
		grid-template-rows: auto;
		grid-template-columns: 1fr 4fr;
		width: 100%;
		min-height: 150px;
		max-height: 400px;
		margin: 0;
		padding: 0;
		border-top: solid 2px #9999808a;
		overflow: overlay;
		position: relative;
		transition: all ease-in-out 0.2s;
	}

	.post-container.my-post {
		border-top: solid hsl(13.02deg 100% 79.22% / 66%) 4px;
	}
	.left-container {
		width: 100%;
		min-height: 50px;
		max-height: 400px;
		display: flex;
		flex-direction: column;
	}

	.articleId-container {
		height: 24px;
		background-color: #f5f5dc;
		border-bottom: 1px solid black;
		display: flex;
		flex-direction: row;
	}

	.articleId-link {
		margin: 0;
		padding: 0;
		text-decoration: none;
	}

	.articleId-link:hover {
		text-decoration: underline;
	}

	.articleId {
		margin: 0;
		color: hsl(257, 89%, 21%);
		font-family: Roboto, Verdana, Geneva, Tahoma, sans-serif;
		font-size: 0.9rem;
		padding: 4px 0 2px 4px;
		text-decoration: none;
	}

	.image-container {
		width: 100%;
		height: 100%;
	}
	.pre-title {
		font-family: 'Roboto', 'Roboto Slab', Poppins, sans-serif;
		margin: 3px 0px 1px 10px;
		font-size: 1.1rem;
		font-weight: 400;
		color: hsla(251, 100%, 21%, 1);
	}

	.left-image {
		height: 100%;
		background-color: none;
		background-size: cover;
		background-position: center;
	}

	.post-main {
		width: 100%;
		min-height: 20px;
		margin: 0;
		padding: 0;
		font-family: 'Roboto Slab', Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
		border-radius: 0px;
		overflow: hidden;
		z-index: 0;
		position: relative;
		transition: all ease-in-out 0.2s;
	}

	.post-title {
		font-family: 'Roboto Slab', Poppins, sans-serif;
		border-bottom: 1px dotted hsla(251, 100%, 30%, 0.3);
	}

	.article-title {
		font-family: 'Roboto Slab', Poppins, sans-serif;
		margin: 3px 0px 1px 10px;
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
		color: hsla(251, 100%, 20%, 1);
		margin: 0px 0px 5px 10px;
		padding: 0;
		width: 100%;
	}

	.article-date {
		font-family: Roboto, 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
		font-size: 0.95rem;
		font-weight: 400;
		font-style: normal;
		color: hsla(250, 100%, 5%, 0.8);
		margin: 0px 0px 0px p3x;
	}

	.right-content {
		width: 100%;
		z-index: 3;
		/* margin: 5px 0 0 10px; */
		color: black;
	}

	.right-content .excerpt {
		font-family: Roboto, Arial, Helvetica, sans-serif;
		color: hsla(257, 89%, 21%, 0.6);
		font-size: 1rem;
		line-height: 110%;
		margin: 0;
		flex: 1;
		margin: 5px 0 3px 10px;
		min-height: 75px;
	}

	.excerpt-linked {
		text-decoration: none;
	}

	.read-more {
		/* font-weight: bold; */
		font-style: italic;
		color: rgb(177, 116, 164);
	}

	.read-more:hover {
		font-weight: bold;
		text-decoration: underline;
	}

	.excerpt {
		color: pink;
	}

	.excerpt:hover::after {
		font-weight: 900;
		margin-left: 5px;
		transition: margin 0.3s, opacity 0.3s;
	}
</style>
