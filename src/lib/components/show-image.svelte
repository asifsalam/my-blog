<script>
	export let mediaType = 'image';
	export let mediaPath = '/img/images/geometric-pattern-01.jpg';
	export let mediaCaption = 'This is an image';
	export let mediaNumber = 1;
</script>

<div class="media-container">
	{#if mediaType === 'image'}
		<img class="post-figure" width="100%" src={mediaPath} alt={mediaCaption} />
		<p class="caption">Figure {mediaNumber}. {mediaCaption}</p>
		<br />
	{:else}
		<!-- svelte-ignore a11y-media-has-caption -->
		<video class="post-video" width="640" controls>
			<source src={mediaPath} type="video/mp4" />
		</video>
		<p class="caption">Video {mediaNumber}. {mediaCaption}</p>
		<br />
	{/if}
</div>

<style>
	.media-container {
		margin: 0 auto;
		width: 90%;
	}
	.post-figure {
		width: 100%;
	}
	.post-video {
		width: 100%;
		min-width: 300px;
	}
	.caption {
		margin: 0;
		font-size: 1.1rem;
		width: 70%;
	}
</style>
