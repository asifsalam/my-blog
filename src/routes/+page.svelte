<script>
	import { articleList, clickedTheme } from '$lib/json/stores';
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import ContentCard from '$lib/components/content-card-large-v2.svelte';
	import RandomQuote from '$lib/components/random-quote.svelte';
	import Breadcrumbs from '$lib/components/breadcrumbs.svelte';
	import SidebarTags from '$lib/components/sidebar-tags.svelte';
	import SidebarHeading from '$lib/components/sidebar-heading.svelte';
	import SectionHeading from '$lib/components/section-heading.svelte';

	// const themes = $allThemes;
	// console.log('home-page:');
	let sidebarTitle = '';
	let sidebarLeadinText =
		'Greetings! In case you are here unwittingly, I am Asif, and this is my personal site. It is:';
	let sidebarBulletText = [
		'Something of a personal bookmark manager',
		'Mostly about data',
		'And how enterprises can become "data-driven"',
		'Mostly links that I have found interesting, useful, or even somewhat unsavoury',
		'With some original posts',
		'Send an email or a message on LinkedIn if you have a comment or just want to connect'
	];
	let headingTitleItems = 'Latest posts';
	let displayQuantityItems = 20;
	let totalQuantityItems = $articleList.length;
	// @ts-ignore
	function moreItemsClicked(selectedCategory) {
		$clickedTheme = 'all';
		goto('/theme');
	}
</script>

<RandomQuote />
<Breadcrumbs />
{#key $articleList.length}
	<div class="container" transition:fade={{ delay: 250, duration: 300 }}>
		<div class="sidebar-container">
			<SidebarHeading {sidebarTitle} {sidebarLeadinText} {sidebarBulletText} />
			<SidebarTags useThemes={'yes'} useCategories={'yes'} />
		</div>
		<div class="main-content">
			<div class="articles">
				<SectionHeading
					headingTitle={headingTitleItems}
					displayQuantity={displayQuantityItems}
					totalQuantity={totalQuantityItems}
					{moreItemsClicked}
				/>
				<div class="posts">
					{#each $articleList.slice(0, displayQuantityItems) as article}
						<ContentCard {article} />
					{/each}
				</div>
				<!-- <p class="more-posts"><a href="\blog">More posts</a></p> -->
			</div>
			<div class="section-break" />
		</div>
	</div>
{/key}

<style>
	@import url('https://fonts.googleapis.com/css2?family=Crete+Round&family=Sanchez&family=Pridi&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab&family=Scope+One&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

	div.container {
		width: 100%;
		display: grid;
		grid-template-columns: 3fr 7fr;
		margin: 10px 0px 5px 0px;
	}

	div.sidebar-container {
		float: left;
		margin: 10px 30px 00px 0px;
		flex-flow: column;
	}

	div.main-content {
		margin: 0;
		padding: 0;
	}

	div.posts {
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-items: start;
		column-gap: 1.5rem;
		row-gap: 1.5rem;
	}

	div.section-break {
		background-image: url('/img/borders/taj_mahal_border_floral_03.png');
		height: 15px;
		background-size: contain;
		margin: 10px 0;
		padding: 0;
	}

	.articles {
		margin-bottom: 20px;
	}
</style>
