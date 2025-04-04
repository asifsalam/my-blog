<script>
	let error = null;
	let loading = false;
	let csvData = [];
	let headers = [];

	async function handleFileUpload(event) {
		const file = event.target.files[0];
		if (!file) return;

		loading = true;
		error = null;
		csvData = [];
		headers = [];

		try {
			const text = await readFileContent(file);
			parseCSV(text);
		} catch (err) {
			error = err.message;
		} finally {
			loading = false;
		}
	}

	function readFileContent(file) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = (e) => resolve(e.target.result);
			reader.onerror = (error) => reject(new Error('Error reading file'));
			reader.readAsText(file);
		});
	}

	function parseCSV(text) {
		const rows = text.split(/\r?\n/).filter((row) => row.trim() !== '');

		if (rows.length === 0) {
			throw new Error('CSV file is empty');
		}

		// Get headers (first row)
		headers = rows[0].split(';').map((header) => header.trim());

		// Process data rows
		csvData = rows.slice(1).map((row) => {
			return row.split(';').map((cell) => cell.trim());
		});
	}
</script>

<div class="csv-loader">
	<input type="file" accept=".csv" on:change={handleFileUpload} disabled={loading} />

	{#if loading}
		<div class="loading">Loading...</div>
	{:else if error}
		<div class="error">{error}</div>
	{:else if csvData.length > 0}
		<div class="csv-table">
			<table>
				<thead>
					<tr>
						{#each headers as header}
							<th>{header}</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each csvData as row, i}
						<tr>
							{#each row as cell}
								<td>{cell}</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>

<style>
	.csv-loader {
		font-family: Arial, sans-serif;
		margin: 20px;
	}

	input[type='file'] {
		margin-bottom: 20px;
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 4px;
	}

	.loading {
		color: #666;
		font-style: italic;
	}

	.error {
		color: #ff4444;
		margin: 10px 0;
	}

	table {
		border-collapse: collapse;
		width: 100%;
	}

	th,
	td {
		border: 1px solid #ddd;
		padding: 8px;
		text-align: left;
	}

	th {
		background-color: #f5f5f5;
		font-weight: bold;
	}

	tr:nth-child(even) {
		background-color: #f9f9f9;
	}
</style>
