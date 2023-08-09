<script>
	import TopicListCard from '$lib/components/topic-list-card.svelte';
	let baseImgUrl = '/img/images/geometric-pattern-';

	export let article;
	export let category;
	let tags;
	if (article.tags.length > 5) {
		tags = article.tags.slice(0, 5);
	} else {
		tags = article.tags;
	}
	// article.excerpt = article.excerpt.split(' ').slice(0, 15).join(' ').concat('...');
</script>

<div class="post-card">
	<div class="content">
		<div class="right-content">
			<div class="main-content">
				<div class="img-content">
					<img class="category-img" src={article.img_url} alt={category.title} srcset="" />
				</div>
				<a class="main-link" style="text-decoration:none" href={article.link}>
					<p class="article-title">
						{article.title}
						{#if article.author == 'NA'}
							<span class="article-author">Uncredited</span>
						{:else}
							<span class="article-author"
								>by {article.author},
								{#if article.post_date == 'undated'}
									<span class="article-date"> {article.post_date.toLower()}.</span>
								{:else}
									<span class="article-date"> {article.post_date}.</span>
								{/if}
							</span>
						{/if}
					</p>
				</a>
				<p class="topics">
					<TopicListCard {tags} size={1} />
				</p>
			</div>
		</div>
	</div>
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
		/* overflow: hidden; */
		z-index: 0;
		position: relative;
		/* color: var(--color_grey_dark); */
	}

	.content {
		display: grid;
		grid-template-columns: 1fr;
		height: 100%;
		width: 100%;
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
	.right-content {
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
	}
	.article-date::after {
		content: '\21D2';
		position: absolute;
		margin-left: 5px;
		font-weight: bold;
	}
	.article-date:hover::after {
		text-decoration: underline;
		font-weight: 900;
	}

	.article-title:hover {
		text-decoration: wavy;
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
		font-style: italic;
		color: rgb(0, 0, 0);
		margin: 0px 0px 0px 0px;
		padding: 0;
		width: 100%;
	}
	.article-date {
		font-family: Roboto, 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
		font-size: 0.95rem;
		font-weight: 400;
		font-style: normal;
		color: hsla(250, 100%, 5%, 1);
		margin: 0px 0px 0px 0px;
		width: 100%;
	}
	.topics {
		display: block;
		margin: 0 0 3px 0px;
		/* font-weight: bold; */
	}

	.post-card .read-more-link a {
		color: blue;
		display: inline-block;
		position: relative;
		text-decoration: double;
	}
	.post-card .read-more-link a:hover {
		background-color: hsla(16, 100%, 25%, 0);
		text-decoration: underline;
	}
</style>
