<script>
	import { page } from '$app/stores';

	const menuItems = [
		{ name: 'Posts', url: '/' },
		//		{ name: 'Blog', url: '/blog' },
		{ name: 'Explorations', url: '/explorations' },
		// { name: 'Articles', url: '/articles' },
		{ name: 'Resources', url: '/resources' },
		{ name: 'Melancholy', url: '/shayari' },
		// { name: 'Contact', url: '/contact' },
		{ name: 'About', url: '/about' }
	];
	// other names - Log book, Manifest, Chronicle, Voyage, Journey

	$: currentPage = $page.url.pathname;
</script>

<header>
	<div class="nav-container">
		<nav class="middle-section large">
			<ul>
				{#each menuItems as { url, name }}
					<li class="nav-item">
						<!-- we are using the class directive here -->
						{#if currentPage === '/theme'}
							{#if url === '/'}
								<a class:active={true} data-sveltekit-prefetch href={'/'}>Posts</a>
							{:else}
								<a class:active={false} data-sveltekit-prefetch href={url}>{name}</a>
							{/if}
						{:else}
							<a
								class:active={url !== '/' ? currentPage.match(url) : url === currentPage}
								data-sveltekit-prefetch
								href={url}>{name}</a
							>
						{/if}
					</li>
				{/each}
			</ul>
		</nav>
		<nav class="middle-section medium">
			<ul>
				{#each [0, 1, 2, 3].map((d) => menuItems[d]) as { url, name }}
					<li class="nav-item">
						<!-- we are using the class directive here -->
						{#if currentPage === '/theme'}
							{#if url === '/'}
								<a class:active={true} data-sveltekit-prefetch href={'/'}>Home</a>
							{:else}
								<a class:active={false} data-sveltekit-prefetch href={url}>{name}</a>
							{/if}
						{:else}
							<a
								class:active={url !== '/' ? currentPage.match(url) : url === currentPage}
								data-sveltekit-prefetch
								href={url}>{name}</a
							>
						{/if}
					</li>
				{/each}
			</ul>
		</nav>
	</div>
</header>

<style>
	header {
		width: 100%;
	}

	nav {
		height: inherit;
		position: sticky;
		top: 0;
		height: 40px;
	}

	ul {
		list-style-type: none;
		margin: 0;
		padding: 0;
		/* overflow: hidden; */
		/* background-color: rgb(254, 255, 247); */
		display: flex;
		/* gap: 1rem; */
		flex-direction: row;
		justify-content: space-around;
		height: inherit;
	}

	a {
		text-decoration: none;
		color: darkgray;
	}

	li {
		float: left;
		vertical-align: middle;
		margin: auto;
		font-family: 'Roboto Slab';
		text-decoration: none;
		font-size: 1.2em;
		padding: 1px 2px;
		/* margin: 4px; */
	}

	li:hover {
		text-decoration: underline hsl(251, 100%, 20%) 0.2em;
	}

	.active {
		/* background-color: rgba(16, 2, 77, 0.9); */
		border: 1px solid hsl(251, 100%, 20%, 0.2);
		background-color: hsl(251, 25%, 67%);
		color: hsl(55, 100%, 97%);
		/* font-weight: bolder; */
	}

	a {
		padding: 5px;
		margin: 5px;
	}

	.nav-container {
		width: 100%;
		display: block;
		margin: 0;
		border-bottom: 2px solid #999980;
		position: sticky;
		top: 0;
	}

	.middle-section {
		width: 100%;
	}
	.medium {
		display: none;
	}

	@media (max-width: 900px) {
		.nav-container {
			font-size: 0.9em;
		}
		.large {
			display: none;
		}
		.medium {
			display: contents;
		}
	}
</style>
