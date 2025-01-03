<script>
	export let data;
	const fontList = data.fontList;
	console.log(fontList);
	fontList.sort();
	let loremUpper =
		'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque quas assumenda repudiandae excepturi saepe, fugit quos distinctio rem vero sapiente expedita consectetur culpa numquam';
</script>

{#each fontList as fontItem}
	<p class="font-header" style="font-family:'{fontItem}';">{fontItem}</p>
	<p class="font-sub-heading" style="font-family:'{fontItem}';">422px</p>
	<p class="font-text" style="font-family:'{fontItem}';">
		Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque quas assumenda repudiandae
		excepturi saepe, fugit quos distinctio rem vero sapiente expedita consectetur culpa numquam
		voluptate neque eius, laudantium voluptas, id totam iure a blanditiis. Ad optio eos neque esse
		nesciunt corporis doloribus voluptates voluptate iusto, maiores quisquam, magni incidunt
		pariatur.
	</p>
	<p class="font-text" style="font-family:'{fontItem}';">
		{loremUpper.toUpperCase()}
	</p>
{/each}

<style>
	.font-header {
		font-size: 42px;
		margin: 5px;
		color: blue;
	}
	.font-sub-heading {
		font-size: 20px;
		color: rgb(126, 0, 130);
		margin: 0 5px 5px 5px;
	}
	.font-text {
		font-size: 24px;
		color: indigo;
		margin: 5px 5px 20px 5px;
	}
</style>
