import parser from "./OcrParser";
import { Text, View } from "react-native";
import { API_KEY } from "@env";

//this endpoint will tell Google to use the Vision API. We are passing in our key as well.

const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;

// this function generates a request body
function generateBody(image) {
  const body = {
    requests: [
      {
        image: {
          content: image,
        },
        features: [
          {
            type: "DOCUMENT_TEXT_DETECTION",
            maxResults: 1,
          },
        ],
      },
    ],
  };
  return body;
}

// Submits the request body, calls OCR/GCV API, parses results, returns list of items w/ total.
async function processOcrRequest(image) {
  const body = generateBody(image.base64); // passes in our img for payload
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const json = await response.json();

  let userUploadedStatus = image.isUserTaken;

  let results = parser(json, userUploadedStatus);

  // ternary: if result[0] ? returnTheListOfOrganizedStuff : return -1;

  if (results.items[0]) {
    return results;
  }

  return "An error has occurred while processing the image, please try again";
}

export default processOcrRequest;
