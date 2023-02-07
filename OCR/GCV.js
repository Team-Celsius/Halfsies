import parser from "./OcrParser";
import { Text, View } from "react-native";

const API_KEY = "AIzaSyCJrJkGj8k99BeWhmz5EUzwzqW7WMJ0gXc"
// find a way to properly store this lmao

//this endpoint will tell Google to use the Vision API. We are passing in our key as well.

const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;

// this function generates a request body (obviously)

// - Option 1: TEXT_DETECTION - Words with coordinates
// - Option 2: DOCUMENT_TEXT_DETECTION - OCR on dense text to extract lines and paragraph information

function generateBody(image) {
    console.log(image);
    const body = {
        requests: [
            {
                image: {
                    content: image,
                },
                features: [
                    {
                        type: 'DOCUMENT_TEXT_DETECTION',
                        maxResults: 1,
                    },
                ],
            },
        ],
    };
    console.log(body);
    return body;
}

async function callGoogleVisionAsync (image) {
    // console.log(image);
    const body = generateBody(image.base64); // passes in our img for payload
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    const json = await response.json();
    // console.log(result);

    let result = parser(json);

    console.log(result);

    // const toBeDisplayed = parser(result);
    // console.log(toBeDisplayed);

    // const detectedText = result.responses[0].fullTextAnnotation;

    // ternary: if result[0] ? returnTheListOfOrganizedStuff : return -1;

    return result ? result.items.map((item) => {
        return (
                <Text>Name: {item.item} Qty: {item.qty} Price: {item.price}</Text>
        )
        // return {text: ('qty: ' + item.qty + ' ' + item.item + ' ' + '$' + item.price)}
    }) : { text: 'This image does not contain any text!' };
}

export default callGoogleVisionAsync;