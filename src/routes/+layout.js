import * as d3 from 'd3';
import { parseArticle, parsePosts } from '/src/lib/modules/utility_functions';
import { themes, categories, tags, allThemes, allCategories, allTopics } from '$lib/json/categories';
const dataFile = '/data/link_data_full-v4.csv';
// const dataFile = 'https://raw.githubusercontent.com/asifsalam/datasets/master/processed_links-small.csv';

export const ssr = false;
export async function load({ fetch }) {
    const response = await fetch(dataFile);
    const textData = await response.text();
    const xsv = d3.dsvFormat(";")
    const articleData = xsv.parse(textData)
        .filter((d) => d.link_type !== "blog")
        .filter((d) => d.link_type !== "site");

    // console.log(articleData[1]);

    /**
     * @type {any[]}
     */
    let articles = [];
    articleData
        .forEach((d, i) => {
            let x = parseArticle(d)
            x.search_text = [x.author.toLowerCase(), x.title.toLowerCase(), x.excerpt.toLowerCase(), ...x.tags].join(" ")
            // articles[i] = parseArticle(d)
            articles[i] = x

            // articles[i].searchs_text = `${d.article_title} ${d.article_author} ${d.article_excerpt}`
        })

    articles.sort((a, b) => {
        if (a.link_id > b.link_id) {
            // console.log(a, b)
            return -1
        } else {
            return 1;
        }
    })

    const posts = articles.filter((d) => d.link_type === "my-post");
    // console.log("layout-js", articles[1], articleData[1]);
    return {
        articles, posts, themes, categories, tags
    }
}

/**
 * @type {any[]}
 */
// let posts = []
// postData.forEach((d, i) => {
//     posts[i] = parseArticle(d)
// })

// posts = posts.sort((first, second) =>
// new Date(second.date).getTime() - new Date(first.date).getTime()
// second.link_id - first.link_id
// )
// posts = posts.sort((a, b) => {
//     if (a.link_id > b.link_id) {
//         return -1;
//     } else {
//         return 1;
//     }
// });
