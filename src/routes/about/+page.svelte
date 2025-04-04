<script>
	import RandomQuote from '$lib/components/random-quote.svelte';
	import Breadcrumbs from '$lib/components/breadcrumbs.svelte';
	import SidebarHeading from '$lib/components/sidebar-heading.svelte';
	import SidebarTags from '$lib/components/sidebar-tags.svelte';
	import TopicBox from '$lib/components/topic-box.svelte';

	const headingText = 'Why this site exists';
</script>

<RandomQuote />
<Breadcrumbs />

<div class="container">
	<div class="sidebar-container">
		<SidebarHeading
			sidebarLeadinText={'A little about myself, and this site (coming at some point)'}
		/>
		<p style="margin-bottom:0">Asif Salam</p>
		<p style="margin:0;padding:0">
			<i
				>Husband to a gifted educator, father of two amazing boys, brother, uncle of brilliant
				nieces & nephews, nephew.</i
			>
		</p>
		<p />
	</div>
	<div class="posts-list">
		<h1 class="heading-title">Why this site exists</h1>
		<p>To do</p>
		<h1 class="heading-title">A little about myself</h1>
		<p>To do</p>
		<h1 class="heading-title">Technology stack</h1>

		<ul class="grid-list">
			<li>
				<a href="https://www.svgrepo.com/">
					<img src="/img/icons/svgrepo-icon.png" alt="SVGRepo" />SVGRepo
				</a>
			</li>
			<li>
				<a href="hhttps://fonts.google.com/">
					<img src="/img/icons/google-color-svgrepo-com.svg" alt="Google Fonts" />Google Fonts
				</a>
			</li>
			<li>
				<a href="https://www.svgrepo.com/">
					<img src="/img/icons/r-svgrepo-com.svg" alt="R" />The R Project
				</a>
			</li>
			<li>
				<a href="https://www.python.org/">
					<img src="/img/icons/python-svgrepo-com.svg" alt="Python" />Python
				</a>
			</li>
			<li>
				<a href="hhttps://www.libreoffice.org/discover/calc/">
					<img
						src="/img/icons/libreoffice-calc-svgrepo-com.svg"
						alt="LibreOffice Calc"
					/>LibreOffice Calc
				</a>
			</li>
			<li>
				<a href="https://svelte.dev/">
					<img
						src="/img/icons/svelte-icon-svgrepo-com.svg"
						alt="Svelte/SvelteKit"
					/>Svelte/SvelteKit
				</a>
			</li>
			<li>
				<a href="https://code.visualstudio.com/">
					<img src="/img/icons/vscode-svgrepo-com.svg" alt="VS Code" />
					<p>VS Code</p>
				</a>
			</li>
			<li>
				<a href="https://github.com/">
					<img src="/img/icons/github-142-svgrepo-com.svg" alt="GitHub" />GitHub
				</a>
			</li>
			<li>
				<a href="https://git-scm.com/">
					<img src="/img/icons/git-logo.png" alt="Git" />Git
				</a>
			</li>
			<li>
				<a href="https://www.npmjs.com/">
					<img src="/img/icons/npm-svgrepo-com.svg" alt="Git" />npm
				</a>
			</li>
		</ul>
	</div>
</div>

<style>
	/* Copied */
	.grid-list {
		display: grid;
		grid-template-rows: repeat(auto-fit, minmax(40px, 1fr));
		gap: 10px;

		padding: 0;
	}

	.grid-list li {
		border: 1px solid #ccc;
		padding: 5px 5px 5px 10px;
		width: 30%;
		list-style-type: none;
		content: 'none';
	}

	.grid-list li a {
		display: flex; /* Or display: grid;  */
		align-items: center;
		/* If using grid:*/
		/* grid-template-columns: auto auto; */
		text-decoration: none; /* remove underline from link */
		color: #333; /* set default text color */
		font-size: 1.2em;
	}

	.grid-list li a img {
		margin-right: 15px; /* Space between text and image */
		height: 30px; /* set image height */
		/* width: 30px; */
	}

	div.container {
		width: 100%;
		display: grid;
		grid-template-columns: 2fr 7fr;
		margin: 10px 0px 5px 0px;
	}
	.sidebar {
		float: left;
		margin: 10px 30px 0px 0px;
		flex-flow: column;
	}
	.posts-list {
		text-align: left;
		margin: 15px;
	}
	.heading-title {
		margin: 0px;
		padding-left: 0px;
		font-size: xx-large;
		font-weight: 200;
		color: hsla(251, 100%, 20%, 1);
		content: '\27A0';
	}
	li::marker {
		list-style-type: 'none'; /* \27BD'; */
		line-height: 1.2em;
		/* content: '\27A0'; */
		color: hsla(var(--main-text-color), 0.15);
	}
	.image-panel {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin: 20px 0 10px 0;
		justify-content: space-around;
	}
	.image-grid {
		width: 40%;
		margin: 10px;
		object-fit: cover;
		border: 10px solid transparent;
		border-image: url('/img/misc/mughal-search-instrument.jpg') 30 10 round;
	}

	@media (max-width: 900px) {
		/* main content container */
		div.container {
			/* display: grid; */
			grid-template-columns: 2fr 4fr;
			/* flex-direction: row; */
		}
		div.posts {
			grid-template-columns: 1fr;
		}
		.sidebar-heading {
			/* display: none; */
			margin: 0;
			padding: 0;
		}
	}

	@media (max-width: 600px) {
		div.sidebar-container {
			margin: 00px 0px 00px 0px;
			border-bottom: 2px dotted var(--main-color);
		}
		div.container {
			/* display: grid; */

			grid-template-columns: 1fr;
			/* flex-direction: row; */
		}
	}
</style>
