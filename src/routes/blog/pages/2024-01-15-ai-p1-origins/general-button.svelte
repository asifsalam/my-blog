<script>
	export let disabledFlag;
	export let buttonFunction = () => {};
	export let heading = 'button heading';
	// console.log(disabledFlag);
</script>

<button
	class="general-button"
	disabled={disabledFlag}
	on:click={() => {
		buttonFunction();
	}}>{@html heading}</button
>

<style>
	.general-button {
		/* border: none; */
		background-color: hsl(80deg 100% 92.35%);
		cursor: pointer;
		color: hsl(220deg 81% 47%);
		/* color: cornflowerblue; */
		width: 30%;
		/* margin-left: 3em; */
		justify-self: center;
		border: 0.5px solid lightgray;
		margin-top: 1em;
		border-radius: 7px;
	}
	.general-button:disabled {
		background-color: grey;
	}
</style>
