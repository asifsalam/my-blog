export async function load({ fetch }) {

    const response = await fetch('/data/font-list.txt');
    console.log("fonts-response: ", response);
    const fontText = await response.text();

    console.log("fonts:", typeof fontText);
    let x = fontText.split("\r\n")
    console.log(x);
    return {
        fontList: x
    }
}