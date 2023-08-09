<script>
	import { page } from '$app/stores';
	import { capitalizeFirstLetter } from '$lib/modules/utility_functions.js';
	// $: currentPage = $page.url.pathname;

	$: crumbsList = () => {
		const tokens = $page.url.pathname.split('/').filter((t) => t !== '');
		let tokenPath = '';
		let x = tokens.map((t) => {
			tokenPath += '/' + t;
			return {
				label: t,
				href: tokenPath,
				labelCap: capitalizeFirstLetter(t)
			};
		});
		x.unshift({ labelCap: 'Home', href: '/' });
		return x;
	};
	$: crumbs = crumbsList();
</script>

<ul class="breadcrumbs">
	{#each crumbs as c, i}
		{#if i == crumbs.length - 1}
			<li class="breadcrumbs-item">{c.labelCap}</li>
		{:else}
			<li class="breadcrumbs-item-active">
				<a href={c.href}> {c.labelCap}</a>&nbsp;&nbsp;&gt;
			</li>
		{/if}
	{/each}
</ul>

<style>
	.breadcrumbs {
		padding: 0;
		margin: 0 0 0px 0;
		background-color: #f1f1e4f5;
		border-top: 1px solid #9999808f;
		border-bottom: 1px solid #9999808f;
		font-family: Roboto, Verdana, Geneva, Tahoma, sans-serif;
		font-size: 1.1rem;
		position: sticky;
		top: 0;
		z-index: 250;
	}

	.breadcrumbs-item {
		display: inline-block;
		color: hsl(250.34, 87.7%, 14.51%);
	}

	.breadcrumbs-item-active {
		display: inline-block;
		color: hsl(250, 87.7%, 14.51%);
	}

	.breadcrumbs-item-active a {
		color: rgb(255 208 0);
		color: beige;
		color: hsl(250, 87.7%, 14.51%);
	}
	li {
		list-style: none;
		margin: 5px 5px;
		padding: 0;
	}
	ul {
		margin: 0;
		padding: 0;
	}
</style>
