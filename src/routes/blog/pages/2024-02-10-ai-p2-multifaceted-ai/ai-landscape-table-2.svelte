<!-- AIAspects.svelte -->
<script>
	// Sample data - replace with your actual table data

	import AIData from './ai-categorizations-1.json'; // Import your JSON data
	// let temp = "Symbolic": {
	// "Unknown": {
	//   "Unknown": {
	//     "methodology": [
	//       {
	//         "id": "a001",
	//         "name": "Logic Programming",
	//         "description": "A programming paradigm based formal logic, representing knowledge as a set of facts and rules that define relationships among entities.",
	//         "link": "https://en.wikipedia.org/wiki/Logic_programming"
	//       }
	console.log(AIData.Symbolic.methodology[1].id);
	let x1 = Object.entries(AIData);
	console.log(Object.entries(AIData));
	let symbolicMethodology = AIData.Symbolic.methodology;
	let connectionistMethodology = AIData.Connectionist.methodology;
	let connectionistArchitecture = AIData.Connectionist.architecture;
	let otherMethodology = AIData.Other.methodology;
	console.log('symbolic-methodology-', symbolicMethodology);
	export let aiData = [
		{
			id: 1,
			ai_category: 'symbolic',
			name: 'Logic Programming',
			type: 'methodology',
			description: 'Programming paradigm based on formal logic',
			date: '1970s',
			link: 'https://en.wikipedia.org/wiki/Logic_programming'
		},
		{
			id: 2,
			ai_category: 'symbolic',
			name: 'Expert Systems',
			type: 'application',
			description: 'Computer system emulating decision-making of a human expert',
			date: '1970s',
			link: 'https://en.wikipedia.org/wiki/Expert_system'
		},
		{
			id: 3,
			ai_category: 'symbolic',
			name: 'Rule-based Systems',
			type: 'method',
			description: 'System that uses rules to make decisions or classifications',
			date: '1980s',
			link: 'https://en.wikipedia.org/wiki/Rule-based_system'
		},
		{
			id: 4,
			ai_category: 'connectionist',
			name: 'Neural Networks',
			type: 'methodology',
			description: 'Computing systems inspired by biological neural networks',
			date: '1950s',
			link: 'https://en.wikipedia.org/wiki/Neural_network'
		},
		{
			id: 5,
			ai_category: 'connectionist',
			name: 'Deep Learning',
			type: 'method',
			description: 'Class of machine learning algorithms using multiple layers',
			date: '2000s',
			link: 'https://en.wikipedia.org/wiki/Deep_learning'
		},
		{
			id: 6,
			ai_category: 'connectionist',
			name: 'Image Recognition',
			type: 'application-type',
			description: 'Technology to identify objects, places, people in images',
			date: '2010s',
			link: 'https://en.wikipedia.org/wiki/Computer_vision'
		},
		{
			id: 7,
			ai_category: 'connectionist',
			name: 'Chatbots',
			type: 'application',
			description: 'Software applications that conduct conversations',
			date: '2010s',
			link: 'https://en.wikipedia.org/wiki/Chatbot'
		},
		{
			id: 8,
			ai_category: 'other',
			name: 'Genetic Algorithms',
			type: 'methodology',
			description: 'Search heuristic inspired by natural selection',
			date: '1970s',
			link: 'https://en.wikipedia.org/wiki/Genetic_algorithm'
		},
		{
			id: 9,
			ai_category: 'other',
			name: 'Fuzzy Logic',
			type: 'method',
			description: 'Form of many-valued logic for approximate reasoning',
			date: '1960s',
			link: 'https://en.wikipedia.org/wiki/Fuzzy_logic'
		},
		{
			id: 10,
			ai_category: 'other',
			name: 'Robotics',
			type: 'application-type',
			description: 'Interdisciplinary branch of engineering and science',
			date: '1980s',
			link: 'https://en.wikipedia.org/wiki/Robotics'
		},
		{
			id: 11,
			ai_category: 'symbolic',
			name: 'Automated Theorem Proving',
			type: 'application',
			description: 'Proving mathematical theorems by computer programs',
			date: '1950s',
			link: 'https://en.wikipedia.org/wiki/Automated_theorem_proving'
		},
		{
			id: 12,
			ai_category: 'connectionist',
			name: 'Backpropagation',
			type: 'method',
			description: 'Algorithm for training feedforward neural networks',
			date: '1980s',
			link: 'https://en.wikipedia.org/wiki/Backpropagation'
		}
	];

	// Group data by category and type
	const groupedData = {
		symbolic: {
			methodology: [],
			method: [],
			'application-type': [],
			application: [],
			remove: []
		},
		other: {
			methodology: [],
			method: [],
			'application-type': [],
			application: []
		},
		connectionist: {
			methodology: [],
			method: [],
			'application-type': [],
			application: []
		}
	};

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
		// symbolic: 'rgba(255, 205, 194, 0.5)',
		symbolic: 'rgba(255, 205, 194, 0.5)',
		other: '#d6f3ff',
		connectionist: '#d6ffdf'
	};
</script>

<h1>3-Column Grid Example</h1>
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

	<div class="item-container grid-item">
		{#each Object.entries(AIData.Other.application) as [oneEntry, item]}
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
<div><p /></div>

<style>
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
		grid-template-columns: repeat(3, 1fr);
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
	}

	.category-title {
		/* background-color: #b8ebfc; */
		background-color: hsla(195, 92%, 85%, 0.5);
		padding: 10px;
		font-family: flamenco;
		text-align: center;
		font-weight: normal;
		font-size: 2em;
		border-radius: 5px 5px 0 0;
		margin-bottom: 0;
		color: hsl(216, 38%, 25%);
		/* border-top: hsl(216, 38%, 47%) 1px solid;
		border-left: hsl(216, 38%, 47%) 1px solid;
		border-right: hsl(216, 38%, 47%) 1px solid; */
	}
	.section-title {
		background-color: #9effe70e;
		border-top: #4a6fa5 1px solid;
		border-bottom: #4a6fa5 1px solid;
		font-family: 'Scope One', galdeano;
		font-style: normal;
		font-size: 1.5em;
		grid-column: 1 / 4;
		padding: 5px 0;
		color: hsla(216.3, 37.5%, 25.1%, 0.75);
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
		border: 0.5px solid hsla(216, 38%, 25%, 0.5);
		cursor: pointer;
		font-size: 0.8em;
		position: relative;
		transition: all 0.2s ease;
		text-decoration: none;
		/* color: rgb(0, 4, 66); */
		/* color: #fffef5ff; */
		color: hsla(216, 38%, 25%, 1);
		/* background-color: #fffef573; */
		background-color: hsla(216, 38%, 25%, 0.1);
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
