<script>
	export let searchTerm = '';
	export let searchItems = () => {};
	// $: console.log('search-bar: ', searchTerm);

	//Handel Enter key press

	const handleKeyDown = (e) => {
		// console.log('key pressed:', e);
		if (e.key === 'Enter') {
			console.log('Enter key');
			searchItems(searchTerm);
		}
	};

	const handleSearchClick = (e) => {
		console.log('click event: ', e);
		searchItems(searchTerm); //Trigger search on button click
	};

	const handleClearClick = () => {
		searchTerm = ''; // Clear search term
		searchItems(''); // Trigger search with empty term
	};
</script>

<div id="search-input-cont">
	<input
		type="search"
		id="search-field"
		placeholder="enter search term..."
		autocomplete="off"
		bind:value={searchTerm}
		on:keydown={handleKeyDown}
	/>

	<button id="search-click" on:click={handleSearchClick}> search </button>

	<button id="search-clear" on:click={handleClearClick}> clear </button>
</div>

<style>
	#search-input-cont {
		width: 100%;
		display: flex;
		align-items: center;
		margin: 0 0 0 5px;
	}

	#search-field {
		width: 80%;
		height: 80%;
		font-size: 1rem;
		border: 1px solid gray;
		border-radius: 5px;
		padding: 8px;
		margin: 0 10px 0;
		background-color: rgba(0, 0, 0, 0);
	}
	#search-click {
		padding: 2px 5px;
		margin: 3px 10px 3px 0;
		background-color: hsla(251, 25%, 67%, 0.2);
		font-family: Roboto, Arial, Helvetica, sans-serif;
		font-weight: normal;
		font-size: 1rem;
		color: hsl(251, 100%, 15%);
		border-radius: 4px;
		text-decoration: none;
		border: 1px solid hsla(251, 32%, 44%, 0.2);
	}
	#search-clear {
		padding: 2px 5px;
		margin: 3px 10px 3px 0;
		background-color: hsla(251, 25%, 67%, 0.2);
		font-family: Roboto, Arial, Helvetica, sans-serif;
		font-weight: normal;
		font-size: 1rem;
		color: hsl(251, 100%, 15%);
		border-radius: 4px;
		text-decoration: none;
		border: 1px solid hsla(251, 32%, 44%, 0.2);
	}
</style>
