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

	// Populate the grouped data
	aiData.forEach((item) => {
		const type = item.type.toLowerCase().replace(' ', '-');
		if (groupedData[item.ai_category] && groupedData[item.ai_category][type]) {
			groupedData[item.ai_category][type].push(item);
		}
	});

	// Section titles
	const sectionTitles = {
		methodology: 'Representative methodologies',
		method: 'Notable methods',
		'application-type': 'Application types',
		application: 'Applications',
		architecture: 'Architecture',
		remove: 'Remove'
	};

	// Category colors
	const categoryColors = {
		symbolic: '#ffd6e0',
		other: '#d6f3ff',
		connectionist: '#d6ffdf'
	};
</script>

<title>3-Column Grid Example</title>
<div class="grid-test">
	<div class="grid-item-test"><h2 class="grid-item item1">Symbolic</h2></div>
	<div class="grid-item-test"><h2 class="grid-item item1">Other</h2></div>
	<div class="grid-item-test"><h2 class="grid-item item1">Connectionist</h2></div>
	<div class="grid-item-test">
		<div class="section-title">{sectionTitles['methodology']}</div>
		<div class="item-container">
			{#each Object.entries(symbolicMethodology) as [oneEntry, item]}
				<a
					href={item.link}
					target="_blank"
					class="item"
					style="background-color: {categoryColors['symbolic']}"
				>
					{item.name}
					<div class="tooltip">
						{item.description}
					</div>
				</a>
			{/each}
		</div>
	</div>
	<div class="grid-item-test">
		<div class="section-title">{sectionTitles['methodology']}</div>
		<div class="item-container">
			{#each Object.entries(symbolicMethodology) as [oneEntry, item]}
				<a
					href={item.link}
					target="_blank"
					class="item"
					style="background-color: {categoryColors['symbolic']}"
				>
					{item.name}
					<div class="tooltip">
						{item.description}
					</div>
				</a>
			{/each}
		</div>
	</div>
	<div class="grid-item-test">
		<div class="section-title">{sectionTitles['methodology']}</div>
		<div class="item-container">
			{#each Object.entries(symbolicMethodology) as [oneEntry, item]}
				<a
					href={item.link}
					target="_blank"
					class="item"
					style="background-color: {categoryColors['symbolic']}"
				>
					{item.name}
					<div class="tooltip">
						{item.description}
					</div>
				</a>
			{/each}
		</div>
	</div>
	<div class="grid-item-test">Item 7</div>
</div>
<div class="container">
	<h1>The AI Landscape</h1>
	<div class="grid-container">
		<div class="category-column">
			<h2 class="grid-item item1">Symbolic</h2>

			<div class="section-title">{sectionTitles['methodology']}</div>
			<div class="item-container">
				{#each Object.entries(symbolicMethodology) as [oneEntry, item]}
					<a
						href={item.link}
						target="_blank"
						class="item"
						style="background-color: {categoryColors['symbolic']}"
					>
						{item.name}
						<div class="tooltip">
							{item.description}
						</div>
					</a>
				{/each}
			</div>
			<!-- {#if items.length > 0}{/if} -->
		</div>
		<div class="category-column">
			<h2 class="grid-item item2">Other</h2>
			<div class="section-title">{sectionTitles['methodology']}</div>
			<div class="item-container">
				{#each Object.entries(otherMethodology) as [oneEntry, item]}
					<a
						href={item.link}
						target="_blank"
						class="item"
						style="background-color: {categoryColors['other']}"
					>
						{item.name}
						<div class="tooltip">
							{item.description}
						</div>
					</a>
				{/each}
			</div>
		</div>
		<!-- <div class="category-column">
			<h2 class="category-title">Connectionist</h2>
			<div class="section-title">{sectionTitles['methodology']}</div>
			<div class="item-container">
				{#each Object.entries(connectionistMethodology) as [oneEntry, item]}
					<a
						href={item.link}
						target="_blank"
						class="item"
						style="background-color: {categoryColors['connectionist']}"
					>
						{item.name}
						<div class="tooltip">
							{item.description}
						</div>
					</a>
				{/each}
				<br />
				<p>Architectures</p>
				{#each Object.entries(connectionistArchitecture) as [oneEntry, item]}
					<a
						href={item.link}
						target="_blank"
						class="item"
						style="background-color: {categoryColors['connectionist']}"
					>
						{item.name}
						<div class="tooltip">
							{item.description}
						</div>
					</a>
				{/each}
			</div>

		</div> -->
	</div>
</div>

<div class="container">
	<h1>The AI Landscape</h1>

	<div class="columns-container">
		{#each Object.entries(AIData) as [category, sections]}
			<div class="category-column {category}">
				<h2 class="category-title">{category.charAt(0).toUpperCase() + category.slice(1)}</h2>

				{#each Object.entries(sections) as [type, items]}
					{#if items.length > 0}
						<div class="section">
							<div class="section-title">{sectionTitles[type]}</div>
							<div class="item-container">
								{#each items as item}
									<a
										href={item.link}
										target="_blank"
										class="item"
										style="background-color: {categoryColors[category]}"
									>
										{item.name}
										<div class="tooltip">
											{item.description}
										</div>
									</a>
								{/each}
							</div>
						</div>
					{/if}
				{/each}

				{#if category !== 'connectionist'}
					<div class="bottom-square" />
				{/if}
			</div>
		{/each}
	</div>
</div>

<div class="container">
	<h1>AI Aspects Overview</h1>

	<div class="columns-container">
		{#each Object.entries(groupedData) as [category, sections]}
			<div class="category-column {category}">
				<h2 class="category-title">{category.charAt(0).toUpperCase() + category.slice(1)}</h2>

				{#each Object.entries(sections) as [type, items]}
					{#if items.length > 0}
						<div class="section">
							<div class="section-title">{sectionTitles[type]}</div>
							<div class="item-container">
								{#each items as item}
									<a
										href={item.link}
										target="_blank"
										class="item"
										style="background-color: {categoryColors[category]}"
									>
										{item.name}
										<div class="tooltip">
											{item.description}
											<br /><br />
											Date: {item.date}
										</div>
									</a>
								{/each}
							</div>
						</div>
					{/if}
				{/each}

				{#if category !== 'connectionist'}
					<div class="bottom-square" />
				{/if}
			</div>
		{/each}
	</div>
</div>

<style>
	.grid-test {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 10px;
	}
	.grid-item-test {
		background-color: #ccc;
		padding: 10px;
		text-align: center;
	}

	.grid-container {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		/* grid-template-rows: repeat(7, auto); */
		gap: 10px;
	}

	.grid-item {
		background-color: #f0f0f0;
		border: 1px solid #ccc;
		padding: 20px;
		text-align: center;
	}

	.item1 {
		grid-row: 1;
		grid-column: 1;
	}

	.item2 {
		grid-row: 1;
		grid-column: 2;
	}

	.item3 {
		grid-row: 1;
		grid-column: 3;
	}

	.item4 {
		grid-row: 2;
		grid-column: 1;
	}
	.item5 {
		grid-row: 2;
		grid-column: 2;
	}
	.item6 {
		grid-row: 2;
		grid-column: 3;
	}
	.item7 {
		grid-row: 3;
		grid-column: 1;
	}
	.item8 {
		grid-row: 3;
		grid-column: 2;
	}
	.item9 {
		grid-row: 3;
		grid-column: 3;
	}
	.item10 {
		grid-row: 4;
		grid-column: 1;
	}
	.item11 {
		grid-row: 4;
		grid-column: 2;
	}
	.item12 {
		grid-row: 4;
		grid-column: 3;
	}
	.item13 {
		grid-row: 5;
		grid-column: 1;
	}
	.item14 {
		grid-row: 5;
		grid-column: 2;
	}
	.item15 {
		grid-row: 5;
		grid-column: 3;
	}
	.item16 {
		grid-row: 6;
		grid-column: 1;
	}
	.item17 {
		grid-row: 6;
		grid-column: 2;
	}
	.item18 {
		grid-row: 6;
		grid-column: 3;
	}
	.item19 {
		grid-row: 7;
		grid-column: 1;
	}
	.item20 {
		grid-row: 7;
		grid-column: 2;
	}
	.item21 {
		grid-row: 7;
		grid-column: 3;
	}
	.container {
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		margin: 0;
		padding: 20px;
		background-color: #f5f7fa;
		color: #333;
	}

	h1 {
		text-align: center;
		color: #4a6fa5;
		margin-bottom: 30px;
	}

	.columns-container {
		display: flex;

		gap: 10px;
		margin-bottom: 30px;
	}

	.category-column {
		flex: 1;
		display: flex;
		flex-direction: column;
		position: relative;
	}

	.category-title {
		background-color: #e8f4f8;
		padding: 12px;
		text-align: center;
		font-weight: bold;
		font-size: 18px;
		border-radius: 5px 5px 0 0;
		margin-bottom: 0;
		color: #4a6fa5;
	}

	.section {
		margin-bottom: 20px;
		position: relative;
	}

	.section-title {
		background-color: #f0f4f8;
		padding: 8px;
		text-align: center;
		font-weight: bold;
		font-size: 14px;
		margin-bottom: 5px;
		border-radius: 3px;
	}

	.item-container {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		padding: 5px;
	}

	.item {
		padding: 6px 10px;
		border-radius: 4px;
		border: 1px solid rgba(0, 0, 0, 0.1);
		cursor: pointer;
		font-size: 13px;
		position: relative;
		transition: all 0.2s ease;
		text-decoration: none;
		color: inherit;
	}

	.item:hover {
		transform: translateY(-2px);
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
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

	/* Vertical dividers with squares */
	.category-column:not(:last-child)::after {
		content: '';
		position: absolute;
		top: 0;
		right: -8px;
		height: 100%;
		width: 1px;
		background-color: #ccc;
	}

	.category-column:not(:last-child)::before {
		content: '';
		position: absolute;
		top: -5px;
		right: -11px;
		width: 10px;
		height: 10px;
		background-color: #ccc;
		transform: rotate(45deg);
	}

	.category-column:not(:last-child) .bottom-square::after {
		content: '';
		position: absolute;
		bottom: -5px;
		right: -11px;
		width: 10px;
		height: 10px;
		background-color: #ccc;
		transform: rotate(45deg);
	}
</style>
