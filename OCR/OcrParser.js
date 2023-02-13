let thresholdNum = 20; // This variable is super important for picking up prices on slanted receipts.

let badWords = [
  "tel",
  "fax",
  "tax",
  "vat",
  "subtotal",
  "sub total",
  "items",
  "cash tendered",
  "ticket",
  "discount",
  "gratuity",
  "credit card",
  "credit",
  "debit",
  "saved",
  "you saved",
  "promotion",
  "delivery",
  "surcharge",
  "change",
  "service",
];

const getPrice = (item) => {
  let matches = item.match(/[0-9]+\.[0-9]{2}/);
  if (matches === null) return 1;
  return matches[0];
};

const getQuantity = (item) => {
  // ^[^\.d]*(\d+)[^\d\$] other regex that /might/ work better, but it works for now so who cares lol
  let matches = item.match(/^[^\d]*(\d+)/);
  if (matches === null) return 1;
  return matches[1];
};

const itemizeList = (list) => {
  let order = { items: [], total: "" };

  for (let i = 0; i < list.length; i++) {
    // list[i] = '1 Hamburger $8.00'

    let item = list[i];

    let badStrCheck = item.toLowerCase();

    if (badWords.some((word) => badStrCheck.includes(word))) {
      continue;
    } else if (badStrCheck.includes("total")) {
      order.total = item;
      continue;
    }

    let itemDetails = item.replace(/[0-9.,()$@#"]+/g, " "); // Converts line to text-only.
    itemDetails = itemDetails.trim();

    // Checks if a bad read/faulty line. -- Is this needed, or can be implemented cleaner?
    if (itemDetails.length <= 1) {
      continue;
    }

    let qty = getQuantity(item);
    if (!qty) qty = 1;
    let price = getPrice(item);

    if (parseInt(qty) === parseInt(price)) {
      qty = 1;
    }

    let itemObj = {
      qty: parseInt(qty),
      description: itemDetails,
      price: parseFloat(price),
      selected: false,
      users: [],
    };
    order.items.push(itemObj);
  }

  if (typeof order.total !== "number") {
    let newTotal = order.total.replace(/[A-Za-z$]+/g, " "); // Replaces all text w/ whitespace.
    order.total = parseFloat(newTotal.trim()); // Should provide a full decimal (88.62) for total. If not, look here first.
  }

  for (let i = 0; i < order.items.length; i++) {
    order.items[i].key = i + 1;
  }
  return order;
};

const thresholdCheck = (obj, xValue) => {
  // Adding onto this, anyway I could grab both Y-vals of the box to expand/optimize range of line-detection?
  for (let i = -thresholdNum; i < thresholdNum; i++) {
    if (obj.hasOwnProperty(xValue - i)) {
      return xValue - i;
    }
  }
  return xValue;
};

function removeLinesWithoutPrice(lines) {
  return lines.filter((line) => {
    let priceReg = /\.\d{2}/gm;
    return priceReg.test(line);
  });
}

const parser = (json, isUserUploaded) => {
  let obj = {};

  let coordToCheck = "x";

  if (isUserUploaded) {
    coordToCheck = "y";
  }

  let array = json.responses[0].textAnnotations;

  if (json.responses[0].fullTextAnnotation.pages[0].confidence < 0.95)
    thresholdNum = 15;

  // if json.fullTextAnnotation.pages[0].confidence is less than .95, decrease threshold by 5.

  for (let i = 1; i < array.length; i++) {
    // start at 1 to avoid all-text/all-coords element
    let char = array[i].description;
    let vertices = array[i].boundingPoly.vertices;
    // let xValue = vertices[0].x;
    let coordValue = vertices[0][coordToCheck];
    let checkCoordvalue = thresholdCheck(obj, coordValue);
    if (obj[checkCoordvalue] === undefined) {
      obj[checkCoordvalue] = "";
    }
    obj[checkCoordvalue] += char + " ";
  }

  const parsedResults = removeLinesWithoutPrice(Object.values(obj));
  let results = itemizeList(parsedResults);

  console.log(results);

  return results;
};

export default parser;
