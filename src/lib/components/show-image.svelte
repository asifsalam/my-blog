<script>
	export let mediaType = 'image';
	export let mediaPath = '/img/images/geometric-pattern-01.jpg';
	export let mediaCaption = 'This is an image';
	export let mediaNumber = 1;
</script>

{#if mediaType === 'image'}
	<img class="figure" width="100%" src={mediaPath} alt={mediaCaption} />
	<p class="caption">Figure {mediaNumber}. {mediaCaption}</p>
	<br />
{:else}
	<!-- svelte-ignore a11y-media-has-caption -->
	<video class="post-video" width="640" height="360" controls>
		<source src={mediaPath} type="video/mp4" />
	</video>
	<p class="caption">Video {mediaNumber}. {mediaCaption}</p>
	<br />
{/if}

<style>
	.caption {
		margin: 0;
		font-size: 1.2rem;
		width: 70%;
	}
</style>
