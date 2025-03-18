<script>
	export let mediaType = 'image';
	export let mediaPath = '/img/images/geometric-pattern-01.jpg';
	export let mediaCaption = 'This is an image';
	export let mediaNumber = 1;
	export let mediaWidth = '100%';
	export let youtubeSrc = 'https://www.youtube.com/embed/pHSRHi17RKM?si=6bECW2UbA7i2i6Zz';
	const youtubeHeight = '190';
	const youtubeWidth = '350';

	console.log(mediaNumber);
	let hideNumber = false;
	if (mediaNumber === '') {
		hideNumber = true;
	}
	console.log(hideNumber);
</script>

<div class="media-container" style:width={mediaWidth}>
	<div class="content-container">
		{#if mediaType === 'image'}
			<img class="post-figure" width="100%" src={mediaPath} alt={mediaCaption} />
			<p class="caption">Figure {mediaNumber}. {mediaCaption}</p>
			<!-- <br /> -->
		{:else if mediaType === 'video'}
			<!-- svelte-ignore a11y-media-has-caption -->
			<video class="post-video" width="640" controls>
				<source src={mediaPath} type="video/mp4" />
			</video>
			{#if hideNumber}
				<p class="caption">{mediaCaption}</p>
			{:else}
				<p class="caption">Video {mediaNumber}. {mediaCaption}</p>
			{/if}
		{/if}
	</div>
	{#if mediaType === 'youtube'}
		<!-- <div class="youtube-container" style="height = {youtubeHeight}; width={youtubeWidth}"> -->
		<div class="youtube-container" style="height = {youtubeHeight}; width={youtubeWidth}">
			<iframe
				class="youtube-iframe"
				width={youtubeWidth}
				height={youtubeHeight}
				src={youtubeSrc}
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				referrerpolicy="strict-origin-when-cross-origin"
				allowfullscreen
			/>
			<p class="caption">Youtube video. {mediaCaption}</p>
		</div>
	{/if}
</div>

<style>
	.media-container {
		margin: 0 auto;
		text-align: center;
		border: solid 3px hsla(var(--main-text-color), 0.3);
		float: right;
		display: grid;
		justify-items: center;
		margin: 5px;
	}

	.content-container {
		padding: 5px;
		width: 90%;
		text-align: left;
		/* border: 2px solid var(--main-color); */
	}
	.youtube-container {
		display: grid;
		padding: 10px;
		justify-content: center;
		/* text-align: center; */
		/* border: 2px solid var(--main-color); */
	}

	.youtube-iframe {
		margin-bottom: 0px;
		aspect-ratio: 16 / 9;
	}

	.post-figure {
		width: 100%;
		margin: 5px;
	}
	.post-video {
		width: 100%;
		margin: 5px;
	}
	.caption {
		margin: 0;
		padding-left: 5px;
		font-size: 0.9rem;
		text-decoration: none;
		text-align: left;
		/* width: 70%; */
	}

	@media (max-width: 1000px) {
		.youtube-container {
			width: 426px;
			height: 240px;
		}
	}
</style>
