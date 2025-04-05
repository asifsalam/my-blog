<!-- AIAspects.svelte -->
<script>
	import AIData from './ai-categorizations.json'; // Import your JSON data
	import agentData from './ai-agents.json';
	import AgentBox from './agent-box.svelte';

	const x1 = Object.entries(AIData);
	// console.log(Object.entries(AIData));
	const symbolicMethodology = AIData.Symbolic.methodology;
	const connectionistMethodology = AIData.Connectionist.methodology;
	const connectionistArchitecture = AIData.Connectionist.architecture;
	const otherMethodology = AIData.Other.methodology;
	const statApplications = AIData.Other.application.filter((d) => {
		return d.sub_cat2 == 'Unknown';
	});
	const mlApplications = AIData.Other.application.filter((d) => {
		return d.sub_cat2 == 'discriminative_ai';
	});
	const genAiApplications = AIData.Connectionist.application;
	const rlApplications = AIData.Other.application.filter(
		(d) => d.sub_cat2 === 'reinforcement_learning'
	);
	// console.log('statApplications', statApplications, mlApplications);

	const stanfordTitle = 'Stanford Artificial Intelligence Program';
	const russellTitle = 'Russell & Norvig - Artificial Intelligence, A Modern Approach (3rd ed.)';
	console.log(agentData);
	// Section titles
	const sectionTitles = {
		methodology: 'Representative methodologies, techniques',
		method: 'Notable methods, algorithms',
		'application-type': 'Application types',
		application: 'Application examples',
		architecture: 'Architecture',
		remove: 'Remove'
	};

	// Category colors
	const categoryColors = {
		symbolic: 'rgba(255, 205, 194, 0.5)',
		other: '#d6f3ff',
		connectionist: '#d6ffdf'
	};
</script>

<div class="grid-container">
	<h2 class="category-title">Symbolic</h2>
	<h2 class="category-title">Other</h2>
	<h2 class="category-title">Connectionist</h2>
</div>
<div class="grid-container">
	<div class="section-title">{sectionTitles['methodology']}</div>
</div>
<div class="grid-container">
	<div class="item-container grid-item">
		{#each Object.entries(symbolicMethodology) as [oneEntry, item]}
			<a href={item.link} target="_blank" class="item">
				{item.name}
				<div class="tooltip">
					{item.description}
				</div>
			</a>
		{/each}
	</div>

	<!-- style="background-color:#ffe4e1" -->
	<div class="item-container grid-item">
		{#each Object.entries(otherMethodology) as [oneEntry, item]}
			<a href={item.link} target="_blank" class="item">
				{item.name}
				<div class="tooltip">
					{item.description}
				</div>
			</a>
		{/each}
	</div>

	<div class="item-container grid-item">
		{#each Object.entries(connectionistMethodology) as [oneEntry, item]}
			<a href={item.link} target="_blank" class="item">
				{item.name}
				<div class="tooltip">
					{item.description}
				</div>
			</a>
		{/each}
		<p class="sub-section">Architectures</p>
		{#each Object.entries(connectionistArchitecture) as [oneEntry, item]}
			<a href={item.link} target="_blank" class="item">
				{item.name}
				<div class="tooltip">
					{item.description}
				</div>
			</a>
		{/each}
	</div>
</div>
<div class="grid-container">
	<div class="section-title">{sectionTitles['method']}</div>
</div>
<div class="grid-container">
	<div class="item-container grid-item">
		{#each Object.entries(AIData.Symbolic.method) as [oneEntry, item]}
			<a href={item.link} target="_blank" class="item">
				{item.name}
				<div class="tooltip">
					{item.description}
				</div>
			</a>
		{/each}
	</div>

	<div class="item-container grid-item">
		{#each Object.entries(AIData.Other.method) as [oneEntry, item]}
			<a href={item.link} target="_blank" class="item">
				{item.name}
				<div class="tooltip">
					{item.description}
				</div>
			</a>
		{/each}
	</div>

	<div class="item-container grid-item">
		{#each Object.entries(AIData.Connectionist.method) as [oneEntry, item]}
			<a href={item.link} target="_blank" class="item">
				{item.name}
				<div class="tooltip">
					{item.description}
				</div>
			</a>
		{/each}
	</div>
</div>
<div class="grid-container">
	<div class="section-title">{sectionTitles['application']}</div>
</div>
<div class="grid-container">
	<div class="item-container grid-item">
		{#each Object.entries(AIData.Symbolic.application) as [oneEntry, item]}
			<a href={item.link} target="_blank" class="item">
				{item.name}
				<div class="tooltip">
					{item.description}
				</div>
			</a>
		{/each}
	</div>
	<div class="ml-container">
		<div class="ml-item-container">
			{#each statApplications as item}
				<a href={item.link} target="_blank" class="item">
					{item.name}
					<div class="tooltip">
						{item.description}
					</div>
				</a>
			{/each}
			{#each rlApplications as item}
				<a href={item.link} target="_blank" class="item">
					{item.name}
					<div class="tooltip">
						{item.description}
					</div>
				</a>
			{/each}
		</div>
		<div class="ml-item-container">
			{#each mlApplications as item}
				<a href={item.link} target="_blank" class="item">
					{item.name}
					<div class="tooltip">
						{item.description}
					</div>
				</a>
			{/each}
		</div>
		<div class="ml-item-container">
			{#each genAiApplications as item}
				<a href={item.link} target="_blank" class="item">
					{item.name}
					<div class="tooltip">
						{item.description}
					</div>
				</a>
			{/each}
		</div>
	</div>
</div>
<div class="end-section" />
<div class="grid-container">
	<div class="ml-span-container">
		<p class="discriminiative-ai-span ai-span">Discriminative AI</p>
		<p class="generative-ai-span ai-span">Generative AI</p>
	</div>
</div>
<div class="grid-container">
	<div class="ml-span-container">
		<p class="ml-span ai-span">Machine Learning</p>
	</div>
</div>
<div class="grid-container">
	<div class="hybrid-span">
		<p class="ai-span">Hybrid, composite, integrated approaches & workflows</p>
	</div>
</div>

<div class="other-categorizations">
	<h2>Agent based categorizations</h2>
</div>

<div class="agents-section">
	<h3 class="agents-title">Stanford Artificial Intelligence Program</h3>
	<div class="agents-container">
		{#each agentData.stanford as agent}
			<AgentBox {agent} />
		{/each}
	</div>
	<h3 class="agents-title">{russellTitle}</h3>
	<div class="agents-container">
		{#each agentData.russell as agent}
			<AgentBox {agent} />
		{/each}
	</div>
</div>
<div class="end-section" />

<div><p /></div>

<style>
	.agents-section {
		margin: 0;
		padding: 10px;
		background-color: #b29b9b;
		background-color: #a1b5d875;
		/* border-bottom: #4a6fa5 2px solid; */
	}
	.agents-title {
		margin: 0px;
		padding: 10px 5px 0px 5px;
		background-color: none;
		color: hsl(0deg 11.76% 18.45%);
	}

	.agents-container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-content: flex-start;
		justify-content: center;
		align-items: stretch;
	}

	.other-categorizations {
		margin-top: 50px;
		background-color: hsla(0, 13%, 87%, 0.09);
		border-top: #4a6fa5 2px solid;
		border-bottom: #4a6fa5 2px solid;
	}
	.hybrid-span {
		grid-column: 1 / 13;
	}

	.ai-span {
		text-align: center;
		background-color: rgba(173, 216, 230, 0);
		margin: 5px 0 5px 0;
		padding: 2px;
		border-bottom: indigo 5px solid;
		border-left: indigo 5px solid;
		border-right: indigo 5px solid;
		font-size: 1em;
		font-family: comfortaa;
	}
	.ml-span-container {
		display: grid;
		grid-column: span 6;
		grid-template-columns: repeat(12, 1fr);
		margin: 0;
		padding: 0;
		font-family: Comfortaa;
	}
	.discriminiative-ai-span {
		grid-column: 7 / 11;
	}
	.generative-ai-span {
		grid-column: 11 / 13;
	}

	.ml-span {
		grid-column: 6 / 13;
	}
	h1 {
		text-align: center;
		color: #4a6fa5;
		margin-bottom: 30px;
		font-family: Flamenco;
		font-size: 3rem;
	}

	h2 {
		padding: 10px;
		margin: 0;
	}
	.grid-container {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		column-gap: 5px;
		margin: 0;
		padding: 0;
		background-color: rgba(230, 230, 230, 0);
		/* align-items: start; */
	}
	.grid-item {
		display: flex;
		flex-direction: column;
		/* height: 100%; */
		background-color: #f0f0f0;
		border: 0px solid #ccc;
		padding: 0px;
		/* text-align: center; */
		grid-column-start: span 2;
	}

	.ml-container {
		grid-column: span 4;
		display: grid;
		grid-template-columns: 3fr 5fr 3fr;
		gap: 8px;
		padding: 10px 2px 10px 5px;
		justify-items: start;
		background-color: hsla(195, 92%, 85%, 0.5);
	}

	.ml-item-container {
		display: flex;
		word-break: keep-all;
		flex-direction: row;
		flex-wrap: wrap;
		align-content: flex-start;
		justify-content: flex-start;
		gap: 8px;
		padding: 10px 2px 10px 5px;
		background-color: hsla(195, 92%, 85%, 0);
	}

	.ml-item {
		padding: 3px;
		border-radius: 3px;
		border: 0.5px solid hsla(216, 38%, 25%, 0.3);
		cursor: pointer;
		font-size: 0.8em;
		position: relative;
		transition: all 0.2s ease;
		text-decoration: none;
		color: hsla(251, 100%, 15%, 1);
		background-color: hsl(190, 68%, 95%);
	}

	.category-title {
		grid-column-start: span 2;
		background-color: hsla(195, 92%, 85%, 0.5);
		padding: 10px;
		font-family: flamenco;
		text-align: center;
		font-weight: normal;
		font-size: 2em;
		border-radius: 5px 5px 0 0;
		margin-bottom: 0;
		color: hsl(216, 38%, 25%);
	}
	.section-title {
		grid-column-start: span 6;
		background-color: #9effe70e;
		border-top: #4a6fa5 1px solid;
		border-bottom: #4a6fa5 1px solid;
		font-family: 'Scope One', galdeano;
		font-style: normal;
		font-size: 1.5em;
		padding: 5px 0;
		color: hsla(216.3, 37.5%, 25.1%, 0.75);
		margin: 0;
	}
	.end-section {
		grid-column-start: span 6;
		background-color: #4a6ea583;
		border-top: #4a6fa5 1px solid;
		border-bottom: #4a6fa5 1px solid;
		padding: 5px 0;
		margin: 0;
	}

	.sub-section {
		font-size: 1.3em;
		margin-top: 15px;
		margin-bottom: 5px;
		padding: 0;
		width: 100%;
		border-bottom: 1px dashed hsl(216, 38%, 25%, 0.7);
		color: hsl(216, 38%, 25%, 0.7);
	}

	.item-container {
		flex: 1;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-content: flex-start;
		justify-content: flex-start;
		gap: 8px;
		padding: 10px 2px 10px 5px;
		/* background-color: hsl(263, 100%, 87%); */
		/* background-color: hsla(195, 92%, 85%, 0.123); */
		background-color: hsla(195, 92%, 85%, 0.5);
		/* border-left: hsl(216, 38%, 47%) 1px solid;
		border-right: hsl(216, 38%, 47%) 1px solid;
		border-bottom: hsl(216, 38%, 47%) 1px solid; */
	}

	.item {
		padding: 3px;
		border-radius: 3px;
		border: 0.5px solid hsla(216, 38%, 25%, 0.3);
		cursor: pointer;
		font-size: 0.8em;
		position: relative;
		transition: all 0.2s ease;
		text-decoration: none;
		/* color: rgb(0, 4, 66); */
		/* color: #fffef5ff; */
		/* color: hsla(216, 38%, 25%, 1); */
		color: hsla(251, 100%, 15%, 1);
		/* background-color: #fffef573; */
		/* background-color: hsla(216, 38%, 25%, 0.1); */
		background-color: hsl(190, 68%, 95%);
		/* text-decoration: dashed; */
	}

	.item:hover {
		transform: translateY(-2px);
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
		text-decoration: double;
	}

	.tooltip {
		position: absolute;
		bottom: 100%;
		left: 50%;
		transform: translateX(-50%);
		background-color: #fff;
		padding: 8px;
		border-radius: 4px;
		border: 1px solid #ddd;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
		width: 200px;
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.2s ease;
		font-size: 12px;
		z-index: 10;
	}

	.item:hover .tooltip {
		opacity: 1;
	}
</style>
