<ul class="test">
	<li>Norway</li>
	<li>Finland</li>
	<li>Denmark</li>
</ul>
<ol class="test">
	<li>Norway</li>
	<li>Finland</li>
	<li>Denmark</li>
</ol>

<style>
	@counter-style thumbs {
		system: cyclic;
		symbols: '\1F44D''a' 'b' 'c';
		suffix: ' ';
	}

	ul {
		list-style: thumbs;
	}
	ol {
		list-style: thumbs;
	}
</style>
