<script>
	export let agent;
</script>

<div class="agent-container">
	<a href={agent.link}>
		<h4 class="title">{agent.model_type}</h4>
		<p class="description">{agent.description}</p>
	</a>
</div>

<style>
	.agent-container {
		width: 30%;
		border-radius: 5px;
		background-color: hsla(0, 13%, 25%, 100%);
		background-color: #4d76bd;
		margin: 5px 3px 10px 3px;
		padding: 5px;
		text-align: center;
	}

	.title {
		font-family: 'Source Code Pro', Comfortaa, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		color: antiquewhite;
		font-size: 1.2em;
		margin: 10px;
	}

	.description {
		font-family: 'Antic Slab', 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
			'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
		color: antiquewhite;
		font-size: 1em;
		font-style: normal;
	}
	a {
		text-decoration: none;
		margin: 0;
		padding: 0;
	}
</style>
