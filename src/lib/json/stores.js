import { writable } from "svelte/store";

export const articleList = writable([]);
export const filteredArticles = writable([]);
export const postList = writable([]);
export const themes = writable([]);
export const categories = writable([]);
export const tags = writable([]);
export const allCategories = writable([]);
export const allThemes = writable([]);
export const allTopics = writable([]);
export const clickedCategory = writable('all');
export const clickedTheme = writable('all');
export const clickedTopic = writable('all');
export const clickedTag = writable('all');
export const excerptLength = writable(100);
export const excerptLengthL = writable(200);
export const excerptLengthM = writable(150);
export const excerptLengthS = writable(100)
export const itemsPerPage = writable(30);