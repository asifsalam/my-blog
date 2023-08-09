<script>
	import TopicListCard from '$lib/components/topic-list-card-v2.svelte';
	// import TopicListCard from '$lib/components/resources-card.svelte';
	// import { excerptLength } from '$lib/json/stores';
	import { getImageUrl } from '$lib/modules/utility_functions';
	const twitterLogoUrl = '/img/icons/twitter-svgrepo-com-1.svg';
	let baseImgUrl = '/img/images/geometric-pattern-';

	export let article;
	export let category;
	let tags;
	let img_url;
	img_url = getImageUrl(article);
	if (article.tags.length > 7) {
		tags = article.tags.slice(0, 6);
	} else if (article.tags.length < 1) {
		tags = ['all'];
	} else {
		tags = article.tags;
	}
	// article.excerpt = article.excerpt.split(' ').slice(0, 15).join(' ').concat('...');
</script>

<div class="post-card">
	<!-- <div class="content"> -->
	<div class="content">
		<div class="main-content">
			<div class="img-content">
				<img class="category-img" src={img_url} alt={category.title} srcset="" />
			</div>
			<a class="main-link" href={article.link}>
				<p class="article-title">
					{article.title}
					{#if article.author == 'NA'}
						<span class="article-author">Uncredited</span>
					{:else}
						<span class="article-author"
							>by {article.author},
							{#if article.post_date == 'undated'}
								<span class="article-date"> {article.post_date.toLower()}</span>
							{:else}
								<span class="article-date"> {article.post_date}</span>
							{/if}
						</span>
					{/if}
				</p>
			</a>
		</div>
		<p class="topics">
			<TopicListCard {tags} link_type={article.link_type} size={1} />
		</p>
	</div>
	<!-- </div> -->
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300&family=Roboto:wght@100;300&display=swap');

	.post-card {
		width: 100%;
		min-height: 20px;
		max-height: 200px;
		margin: 0;
		padding: 0;
		font-family: 'Roboto Slab', Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
		border-top: 1px solid hsla(278, 13%, 28%, 0.3);
		border-radius: 0px;
		z-index: 0;
		position: relative;
	}

	.main-content {
		margin: 0;
		padding: 0;
	}

	.category-img {
		object-fit: fill;
		height: 2.6em;
		width: 2.6em;
	}

	img {
		float: left;
		margin: 0px 10px 2px 3px;
		display: inline;
		position: relative;
		height: 40px;
		max-width: 60px;
		filter: sepia(25%);
	}
	.content {
		display: grid;
		grid-gap: 0;
		align-content: space-between;
		background-color: rgba(255, 254, 243, 0.93);
		width: 100%;
		height: 100%;
		z-index: 3;
		margin: 0;
		color: black;
	}
	.main-link {
		position: relative;
		display: inline;
		text-decoration: none;
	}

	.article-title:hover {
		text-decoration: double;
		font-weight: bolder;
	}

	.article-title {
		font-family: 'Roboto Slab', Poppins, sans-serif;
		margin: 0px 0px 3px 2px;
		font-size: 1rem;
		font-weight: 400;
		color: hsla(251, 100%, 21%, 1);
	}

	.article-author {
		font-family: 'Roboto', Georgia, 'Times New Roman', Times, serif;
		font-size: 1rem;
		font-weight: normal;
		/* font-style: italic; */
		/* color: rgb(0, 0, 0); */
		color: hsla(251, 100%, 20%, 1);
		margin: 0px 0px 0px 0px;
		padding: 0;
		width: 100%;
	}

	.article-date {
		font-family: Roboto, 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
		font-size: 0.95rem;
		font-weight: 400;
		font-style: normal;
		color: hsla(250, 100%, 5%, 0.8);
		/* color: hsla(250, 100%, 5%, 1); */
		margin: 0px 0px 0px 0px;
		width: 100%;
	}

	.topics {
		display: block;
		margin: 0 0 0px 0px;
		/* font-weight: bold; */
	}

	/* .post-card .read-more-link a {
		color: blue;
		display: inline-block;
		position: relative;
		text-decoration: double;
	}

	.post-card .read-more-link a:hover {
		background-color: hsla(16, 100%, 25%, 0);
		text-decoration: underline;
	} */

	/* .logo-container {
		height: 30px;
		width: 30px;
		margin-top: 3px;
		padding-right: 10px;
	}

	.site-logo {
		width: 30px;
		height: 100%;
		position: relative;
		left: 0;
		top: 0;
	}

	.site-logo:hover {
		filter: brightness(0.5);
	} */
</style>
