import * as d3 from 'd3';
const dataFile = '/data/ai-model-data-2.csv';
// const dataFile = 'https://raw.githubusercontent.com/asifsalam/datasets/master/processed_links-small.csv';

export const ssr = false;
export async function load({ fetch }) {
    const response = await fetch(dataFile);
    const textData = await response.text();
    const xsv = d3.dsvFormat(";")
    const dataset = xsv.parse(textData);
    console.log("dataset: ", dataset);
    dataset.forEach(d => {
        d.date = d3.timeParse("%Y-%m-%d")(d.date);
        d.parameters = +d.parameters;
    })
    const modelData = dataset.filter((d) => d.code === "1" || d.code === "0")

    // console.log(articleData[1]);

    console.log("modelData: ", modelData);
    return {
        modelData
    }
}