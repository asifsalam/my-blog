// src/routes/blog/topics/[topic]/+page.js
export const load = ({ params }) => {
    const { tag } = params;
    // console.log("page.js-topics-[topic]", params, topic)
    return { tag }
}