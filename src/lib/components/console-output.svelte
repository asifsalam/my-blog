<script>
	export let consoleType = 'R Console';
	export let inputCode;
	// console.log('inputCode: ', inputCode.length);
</script>

<div class="console-box {consoleType}" content={consoleType}>
	<div class="console-box-header">
		<p>{consoleType}</p>
	</div>
	<div class="code-box">
		{#each inputCode as inputLine}
			<p class="console-code">{inputLine}</p>
		{/each}
	</div>
</div>

<style>
	.console-box {
		/* text-wrap: nowrap; */
		box-sizing: border-box;
		font-family: 'JetBrainsMono', 'Courier New', Courier, monospace;
		/* overflow-x: scroll; */
		background-blend-mode: color-burn;
		/* border-radius: 25px; */
		width: 100%;
		display: grid;
		word-wrap: break-word;
	}

	.console-box-header {
		background-color: hsla(250, 100%, 15%, 20%);
		margin: 0;
		padding: 5px 1em;
		color: aliceblue;
		font-size: larger;
		border-radius: 5px 5px 0 0;
		border: hsla(250, 100%, 15%, 25%);
	}
	.console-box-header p {
		margin: 0;
		padding: 0;
	}
	/* .console-box::before {
		content: 'Console';
		background-color: color-mix(in oklab, hsl(250, 100%, 15%) 80%, hsl(54, 100%, 98%) 20%);
		background-blend-mode: difference;
		padding: 5px 10px;
		color: aliceblue;
		font-size: larger;
		border-radius: 5px 5px 0px 0px;
	} */

	.code-box {
		background: color-mix(in oklab, hsl(250, 100%, 15%) 65%, hsl(54, 100%, 98%) 35%);
		background: whitesmoke;
		font-family: 'JetBrainsMono', 'Courier New', Courier, monospace;
		padding: 1em;
		/* width: 850px; */
		/* overflow-x: scroll; */
		/* background-color: #dda384; */
		min-width: 300px;
		border-radius: 0 0 5px 5px;
		border: 2px solid hsl(270deg 8.33% 81.18%);
		border-top: 0px;
	}

	.console-code {
		font-family: 'JetBrainsMono', 'Courier New', Courier, monospace;
		font-size: 1em;
		margin: 0;
		padding: 3px 0 0 0;
		color: rgb(0, 0, 0);
		text-shadow: 0 1px hsla(250, 100%, 15%, 20%);
		box-sizing: border-box;
	}
</style>
