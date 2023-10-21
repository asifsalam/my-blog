export async function load({ fetch }) {

    const response = await fetch('/data/source_text.txt');
    // console.log("fonts-response: ", response);
    const fontText = await response.text();

    // console.log("source_text:", typeof fontText);
    let x = fontText.split("\r\n")
    // console.log(x);
    return {
        sourceText: x
    }
}