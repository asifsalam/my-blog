export async function load({ params }) {
    // const post = await import(`../${params.id}.md`)
    const post = await import('./2023-09-15-r-and-powerpoint-part-3.md')
    const metadata = post.metadata;
    const content = post.default;
    console.log(post.metadata);
    return {
        postData: {
            metadata,
            content
        }
    }
}