<script>
	export let data;

	// import Layout from '../../+layout.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import '$lib/styles/blog.css';
	import { postList } from '$lib/json/stores';
	import PostsListCard from '$lib/components/posts-list-card.svelte';
	import SidebarTags from '$lib/components/sidebar-tags.svelte';
	import TopicListCard from '$lib/components/topic-list-card.svelte';

	import MultifacetedAi from './multifaceted-ai.svelte';

	const postData = data.postData;
	let pageId = $page.route.id;

	onMount(() => {
		pageId = $page.route.id;
	});

	const posts = $postList
		.filter((d) => d.link != $page.route.id)
		.map((d) => ({
			link: d.link,
			title: d.title
		}))
		.slice(0, 5);

	const tags = ['post', 'AI', 'data-literacy', 'my-post'];
</script>

<!-- <RandomQuote /> -->

<div class="sidebar">
	<PostsListCard {posts} />
	<p class="topics">
		<SidebarTags useThemes={'yes'} useCategories={'yes'} />
	</p>
</div>
{#key $page}
	<div class="content">
		<div class="heading">
			<pre-title>What is Artificial Intelligence?</pre-title>
			<h1>2) The Multifaceted Landscape of Artificial Intelligence</h1>
		</div>
		<div class="meta-info">
			<p class="author">Asif Salam</p>
			<p class="date">Posted: 2023-11-15</p>
			<TopicListCard {tags} size={3} tagType={'light-tag'} />
		</div>
		<br />
		<div class="main-content">
			In this post, I try
			<MultifacetedAi />

			<div class="references">
				<p>References:</p>
				alan turing on computable numbers: https://www.cs.virginia.edu/~robins/Turing_Paper_1936.pdf
				<ol>
					<li>
						Thiyagalingam et al. (2021, October 25). Scientific Machine Learning Benchmarks. <i
							>arXiv,</i
						> https://arxiv.org/abs/2110.12773.
					</li>
					<li>
						NASA. (n.d). What is artificial intelligence? Retrieved [2023, December 27], from
						https://www.nasa.gov/what-is-artificial-intelligence
					</li>
					<li>
						Brewster, T. (2015, September 3). <i
							>How A 1200-Year-Old Hacking Technique Can Already Crack Tomorrow’s Encrypted Vaults.</i
						> Forbes. Retrieved October 5, 2023, from https://www.forbes.com/sites/thomasbrewster/2015/09/03/microsoft-dumb-attacks-cracks-next-gen-cryptography/?sh=55b84c1a5b55
					</li>
					<li>
						Maidment, J. (2000, October 5). <i>The man who cracked the Kama Sutra code.</i> The Telegraph.
						Retrieved September 24, 2023, from https://www.telegraph.co.uk/news/science/science-news/4754214/The-man-who-cracked-the-Kama-Sutra-code.html
					</li>
					<li>
						Naveed, M., Kamara, S., and Wright, C.V., (2015). Inference Attacks on
						Property-Preserving Encrypted Databases. In <i
							>Proceedings of the 22nd ACM SIGSAC Conference on Computer and Communications Security
							(CCS '15).</i
						> Association for Computing Machinery, New York, NY, USA, 644–655. https://doi-org.ezp.sub.su.se/10.1145/2810103.2813651
					</li>

					<li>
						Singh, S. (2000). <i>The code book : the secret history of codes and codebreaking.</i> http://ci.nii.ac.jp/ncid/BA51150503
					</li>
				</ol>
			</div>
		</div>
	</div>
{/key}

<style>
	.heading {
		margin-top: 10px;
	}
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

	.main-content {
		width: auto;
	}

	text {
		font-family: Arial, sans-serif;
	}

	.section-header {
		align-self: self-start;
		margin-bottom: 10px;
	}

	.sidebar {
		margin: 10px 30px 0px 0px;
	}

	.content {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		margin-top: 10px;
	}

	.section-container {
		display: grid;
		grid-template-columns: 1fr;
	}

	.general-button {
		/* border: none; */
		background-color: hsl(80deg 100% 92.35%);
		cursor: pointer;
		color: hsl(220deg 81% 47%);
		/* color: cornflowerblue; */
		width: 30%;
		margin-left: 3em;
		justify-self: center;
		border: 0.5px solid lightgray;
		margin-top: 1em;
		border-radius: 7px;
	}

	.general-button:disabled {
		background-color: grey;
	}

	.text-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		justify-self: center;
	}

	.quote-block {
		font-family: 'Lancelot', 'Cherry Swash', 'Noto Serif Thai', 'Delius', Georgia, 'Times New Roman',
			Times, serif;
		padding: 5px 0 15px 0;
		border-top: 3px solid rgba(177, 37, 177, 0.2);
		border-bottom: 3px solid rgb(A Brief Review of the Origins of the Term177, 37, 177, 0.2);
		font-size: 1.5em;
		font-style: italic;
	}
	figure {
		margin: 0; /* Removes default margin */
		text-align: center; /* Centers the image and caption */
	}

	figcaption {
		font-style: italic;
		color: #555;
		margin-top: 8px; /* Adds space between the image and caption */
	}
	.references {
		border-top: 2px #8aa9a9 dashed;
	}

	.references :is(p, li) {
		font-size: 1.1em;
	}
	@media (max-width: 1000px) {
		div.sidebar {
			margin: 0px;
			padding-bottom: 20px;
			border-bottom: 2px dotted var(--main-color);
		}
	}
</style>
