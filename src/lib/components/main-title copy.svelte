<script>
	import '$lib/styles/global.css';
	// let backgroundImage = '/img/islamic-geometric-pattern-14.jpg';
</script>

<div class="main-title-wrap">
	<div class="main-title">
		<p class="main-title-header">
			<span class="main-title-minor">the digital &nbsp </span>
			<span class="main-title-left">peregrinations</span>
			<span class="main-title-minor">&nbsp of a&nbsp</span>
			<span class="main-title-right">data scribe</span>
		</p>
		<div class="title-name-wrap">
			<!-- <p class="title-name">Asif Salam</p> -->
			<p class="title-name">Asif Salam</p>
		</div>
	</div>

	<!-- <p class="my-quote">The data-driven life is not worth examining</p> -->
</div>
<div class="title-border" />

<style>
	@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&display=swap');
	/* @import url('https://fonts.googleapis.com/css2?family=Cherry+Swash&family=Lancelot&family=Maiden+Orange&family=Noto+Serif+Thai:wght@300;400&family=Offside&family=Scope+One&display=swap'); */
	:root {
		--heading-color: hsla(251, 100%, 21%, 1);
	}

	.main-title-wrap {
		width: 100%;
		height: 100px;
		display: grid;
		/* grid-template-columns: 15fr 2fr; */
		grid-template-columns: 1fr;
		/* align-content: space-around; */
		align-content: center;
		justify-content: space-evenly;
		justify-items: center;
		padding: 0 0px;
		margin: 0;
		background-color: beige;
	}

	/* .site-title {
		width: 100%;
		display: grid;
		background-color: beige;
		justify-content: center;
	} */

	.main-title {
		height: 100%;
		font-family: 'Roboto';
		color: hsla(251, 100%, 21%, 0.5);
		font-size: 2em;
		text-align: center;
		margin: 0;
		padding: 0px 0;
	}
	.main-title-header {
		margin: 0;
		padding: 0;
	}

	.main-title-minor {
		font-size: 0.85em;
	}

	.main-title-left {
		height: 100%;
		font-family: 'Dista Calista';
		/* font-family: 'Test 1'; */
		color: var(--heading-color);
		font-size: 1.7em;
		text-align: center;
		margin: 0;
		padding: 0;
	}

	.main-title-right {
		/* font-family: 'IBM Plex Mono', Macondo, Righteous; */
		/* font-family: 'Demora'; MuseoModerno,, Gugi, Iceland, 'Poiret One', Wellfleet, */
		font-family: 'Demora', Gugi, Iceland, 'Poiret One', Wellfleet, Macondo, Gugi, Comfortaa, Iceland,
			MuseoModerno, 'Audiowide';
		color: var(--heading-color);
		font-size: 1.4em;
		font-weight: 100;
		text-align: left;
		letter-spacing: 0px;
		margin: 0;
		padding: 0;
	}

	.title-name-wrap {
		display: flex;
		justify-content: flex-end;
		align-items: end;
	}
	.title-name {
		font-family: 'Great Vibes', MuseoModerno, 'Pacifico';
		font-size: 0.9em;
		margin: 0;
		/* rotate: -34deg; */
		/* color: var(--heading-color); */
		color: hsla(251, 100%, 21%, 0.4);
		margin-top: -15px;
	}

	.title-border {
		width: 100%;
		height: 15px;
		background-image: url('/img/borders/border-01.jpg');
		background-position: top;
		background-color: bisque;
	}
</style>
