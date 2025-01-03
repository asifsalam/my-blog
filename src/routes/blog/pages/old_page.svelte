<script>
	import { postList } from '$lib/json/stores';
	import Breadcrumbs from '$lib/components/breadcrumbs.svelte';
	import RandomQuote from '$lib/components/random-quote.svelte';
	import SidebarTags from '$lib/components/sidebar-tags.svelte';
	import SectionHeading from '$lib/components/section-heading.svelte';
	import ContentCard from '$lib/components/content-card-large-v2.svelte';
	// import SidebarHeadingBlog from '$lib/components/sidebar-heading-blog.svelte';
	import SidebarHeading from '$lib/components/sidebar-heading.svelte';

	// const categories = $allCategories.filter((d) => d.type === 'category').map((d) => d.category);

	let displayQuantity = $postList.length;
	let headingText = 'My scribery';
	let totalQuantity = displayQuantity;
	let category = 'all';

	let sidebarTitle = '';
	let sidebarLeadinText = 'Not nearly enough.';
	let sidebarBulletText = [];
</script>

<!-- <RandomQuote /> -->
<!-- <Breadcrumbs /> -->

<div class="container">
	<div class="sidebar-container">
		<!-- <SidebarHeadingBlog /> -->
		<SidebarHeading {sidebarLeadinText} />
		<SidebarTags useThemes={'yes'} useCategories={'yes'} useTags={'no'} />
	</div>
	<div class="main-content">
		<SectionHeading {category} headingTitle={headingText} {displayQuantity} {totalQuantity} />
		<div class="articles">
			<div class="posts">
				{#each $postList.slice(0, 50) as post}
					<ContentCard article={post} />
				{/each}
			</div>
			<!-- <p class="more-posts"><a href="\blog">More posts</a></p> -->
		</div>
	</div>
</div>

<style>
	div.main-container {
		display: grid;
		grid-template-columns: 2fr 5fr;
		margin: 0px 0px 5px 0px;
	}

	div.container {
		width: 100%;
		display: grid;
		grid-template-columns: 3fr 7fr;
		margin: 10px 0px 5px 0px;
	}
	div.sidebar-container {
		float: left;
		margin: 10px 30px 0px 0px;
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

	@media (max-width: 900px) {
		div.container {
			grid-template-columns: 2fr 4fr;
		}

		div.posts {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 600px) {
		div.container {
			grid-template-columns: 1fr;
		}
		div.sidebar-container {
			margin: 0px;
		}
	}
</style>
