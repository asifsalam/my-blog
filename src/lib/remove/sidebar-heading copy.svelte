<script>
	// import Sidebar from './remove/sidebar.svelte';
	// import '/src/styles/global.css';
	export let sidebarTitle = '';
	export let sidebarLeadinText = '';
	/**
	 * @type {string | any[]}
	 */
	export let sidebarBulletText = [];
</script>

<div class="sidebar-header">
	{#if sidebarTitle.length > 0}
		<p class="sidebar-title">{sidebarTitle}</p>
	{/if}
	{#if sidebarLeadinText.length > 0}
		<p class="sidebar-leadin-text">{@html sidebarLeadinText}</p>
	{/if}
	{#if sidebarBulletText.length > 0}
		{#each sidebarBulletText as bulletText, i}
			<p class="sidebar-bullet">{sidebarBulletText[i]}</p>
		{/each}
	{/if}
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Crete+Round&family=Sanchez&family=Pridi:wght@200;300;400&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab&family=Scope+One&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

	.sidebar-header {
		display: block;
		height: auto;
		width: 100%;
		background-color: rgb(255, 254, 243);
		padding: 0 0 6px 0;
		margin: 0;
		/* border-bottom: 3px dotted hsl(23, 8%, 50%); */
		border-bottom: 3px solid #9999808a;
	}
	.sidebar-title {
		display: block;
		padding: 0;
		margin: 0px 0 5px 0;
		font-family: 'Crete Round';
		font-size: 1.4em;
		font-weight: 100;
		color: hsla(251, 100%, 15%, 1);
		text-align: left;
	}
	.sidebar-leadin-text {
		display: inline;
		padding: 0;
		margin: 0 0 5px 0;
		font-family: 'Scope One';
		font-size: 1.1em;
		font-weight: 100;
		color: hsla(251, 100%, 15%, 1);
		text-align: left;
	}

	.sidebar-bullet {
		position: relative;
		list-style: none;
		font-family: 'Scope One', 'Crete Round';
		color: rgb(154, 154, 154);
		margin-left: 0;
		margin-top: 0px;
		margin-bottom: 0px;
		padding-left: 1.2em;
	}
	.sidebar-bullet:before {
		content: '□';
		position: absolute;
		left: 0;
	}
</style>
