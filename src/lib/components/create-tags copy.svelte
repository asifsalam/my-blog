<script>
	import { group_outros } from 'svelte/internal';
	export let tags;
	export let tagType = 'tag';
	export let tagClicked = () => {};
	export let headingText = 'Main themes';
</script>

<p class="tags-header">{headingText}</p>
{#each // @ts-ignore
tags as tag}
	{#if tagType == 'category'}
		{#if tag != 'NA'}
			<button
				class="topic tag-box"
				on:click={() => {
					tagClicked(tag.name);
				}}>{tag.name}</button
			>
		{:else}
			<p class="topic tag-box" on:click={tagClicked('untagged')}>untagged</p>
		{/if}
	{:else if tagType == 'theme'}
		{#if tag != 'NA'}
			<button
				class="topic tag-box"
				on:click={() => {
					tagClicked(tag.name);
				}}>{tag.name}</button
			>
		{:else}
			<p class="topic tag-box" on:click={tagClicked('untagged')}>untagged</p>
		{/if}
	{:else if tagType == 'tag'}
		<div class="tag-group">
			<p class="tag-type">
				{tag.title}
			</p>
			{#each tag.tags.slice(0, 10) as subTag}
				{#if subTag != 'NA'}
					<button
						class="topic tag-box"
						on:click={() => {
							tagClicked(subTag);
						}}>{subTag}</button
					>
				{:else}
					<p class="tag-box" on:click={tagClicked('untagged')}>untagged</p>
				{/if}
			{/each}
		</div>
	{/if}
{/each}

<style>
	.tags-header {
		padding: 10px 0 0 0;
		margin: 0 0 5px 0;
		font-family: 'Pridi', Georgia, 'Times New Roman', Times, serif;
		font-size: 1.4rem;
		font-weight: 300;
		color: hsla(251, 100%, 20%, 0.9);
		border-bottom: 1px solid hsla(251, 100%, 20%, 0.2);
	}
	.tag-group {
		padding: 0 0 10px 0;
	}
	.tag-type {
		padding: 0px 0 0 0;
		margin: 0;
		font-family: 'Pridi', Georgia, 'Times New Roman', Times, serif;
		font-size: 1.2rem;
		/* font-weight: 300; */
		color: hsla(251, 100%, 20%, 0.9);
	}
	.tag-box {
		display: inline-block;
		padding: 2px 5px;
		margin: 3px 10px 3px 0;
		/* background-color: #eafaff; */
		background-color: hsla(196, 67%, 54%, 0.07);
		font-family: Roboto, Arial, Helvetica, sans-serif;
		font-weight: normal;
		/* font-size: 16em; */
		font-size: 16px;
		color: hsl(251, 100%, 15%);
		border-radius: 4px;
		text-decoration: none;
		border: 1px solid hsla(251, 32%, 44%, 0.2);
	}

	.tag-box:hover {
		color: hsl(253, 39%, 95%);
		font-weight: bold;
		/* background-color: #bff0ff; */
		background-color: hsl(251, 100%, 15%);
		cursor: pointer;
	}
</style>
