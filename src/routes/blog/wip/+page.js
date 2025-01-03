import * as d3 from 'd3';
const dataFile = '/data/ai-model-data.csv';
// const dataFile = 'https://raw.githubusercontent.com/asifsalam/datasets/master/processed_links-small.csv';

export const ssr = false;
export async function load({ fetch }) {
    const response = await fetch(dataFile);
    const textData = await response.text();
    const xsv = d3.dsvFormat(";")
    const modelData = xsv.parse(textData);
    console.log(modelData);
    modelData.forEach(d => {
        d.date = d3.timeParse("%Y-%m-%d")(d.date);
        d.parameters = +d.parameters;
    })

    // console.log(articleData[1]);


    return {
        modelData
    }
}