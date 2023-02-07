let thresholdNum = 20; // This variable is super important for picking up prices on slanted receipts.


let badWords = ['tel', 'fax', 'tax', 'vat', 'subtotal', 'sub total', 'items', 'tendered', 'cash tendered', 'ticket', 'discount', 'gratuity', 'credit card', 'credit', 'debit', 'saved', 'you saved', 'you', 'promotion', 'delivery', 'surcharge', 'change', 'service']
// badwords - potential adds: credit card, saved, gratuity/tip??, 

const getPrice = (item) => {
    let matches = item.match(/[0-9]+\.[0-9]{2}/);
    if (matches === null) return 1;
    return matches[0];
}

const getQuantity = (item) => {
    // ^[^\.d]*(\d+)[^\d\$] other regex that /might/ work better, but it works for now so who cares lol
    let matches = item.match(/^[^\d]*(\d+)/);
    if (matches === null) return 1;
    return matches[1];
}


const itemizeList = (list) => {
    let order = {items: [], total: ''};

    for (let i = 0; i < list.length; i++) {
        // list[i] = '1 Hamburger $8.00'

        let item = list[i];

        console.log(item);

        let badStrCheck = item.toLowerCase();

        if (badWords.some((word) => badStrCheck.includes(word))) {
            continue;
        } else if (badStrCheck.includes('total')) {
            order.total = item;
            continue;
        }

        let itemDetails = item.replace(/[0-9.,()@]+/g, ' '); // Converts line to text-only.
        itemDetails = itemDetails.trim();

        // Checks if a bad read/faulty line. -- Is this needed, or can be implemented cleaner?
        if (itemDetails.length <= 1) {
            continue;
        }

        let qty = getQuantity(item);
        let price = getPrice(item);

        if (parseInt(qty) === parseInt(price)) {
            qty = 1;
        }

        let itemObj = {
            qty: parseInt(qty),
            item: itemDetails,
            price: parseFloat(price),
        };
        order.items.push(itemObj);
    }
    if (typeof order.total !== 'number') {
        let newTotal = order.total.replace(/[A-Za-z$]+/g, ' '); // Replaces all text w/ whitespace.
        order.total = parseFloat(newTotal.trim()); // Should provide a full decimal (88.62) for total. If not, look here first.
    }
    return order
};

const thresholdCheck = (obj, xValue) => { 
    // Adding onto this, anyway I could grab both Y-vals of the box to expand/optimize range of line-detection?
    for (let i = -thresholdNum; i < thresholdNum; i++) {
        if (obj.hasOwnProperty(xValue - i)) {
            return xValue - i;
        }
    }
    return xValue;
}

function removeLinesWithoutPrice(lines) {
    return lines.filter((line) => {
      let priceReg = /\.\d{2}/gm
      return priceReg.test(line)
    })
}
  
const parser = (json) => {
    let obj = {};

    console.log(json);

    let array = json.responses[0].textAnnotations;

    if (json.responses[0].fullTextAnnotation.pages[0].confidence < .95) thresholdNum = 15;
    // default value is 20, so lets see if this works!

    // if json.fullTextAnnotation.pages[0].confidence is less than .95, decrease threshold by 5.
    


    // PARSER STEP BY STEP:
    // This loop sorts through the JSON, storing info line-by-line into obj.
    // The values of 'obj' are passed through removeLinesWithoutPrice, results are stored onto 'results' variable.
    // 'RESULTS' is returned.

    for (let i = 1; i < array.length; i++) { // start at 1 to avoid all-text/all-coords element
        let char = array[i].description;
        let vertices = array[i].boundingPoly.vertices;
        let xValue = vertices[0].x;
        let checkXvalue = thresholdCheck(obj, xValue);
        if (obj[checkXvalue] === undefined) {
            obj[checkXvalue] = '';
        } 
        obj[checkXvalue] += char + ' ';
    } // ******* Somewhere around here, sort the list by X-val so all words are in order. Is this even needed still? Regex handles all of this.

    console.log(obj);
    const parsedResults = removeLinesWithoutPrice(Object.values(obj));
    let results = itemizeList(parsedResults);

    console.log(results);

    return results;
}

export default parser;

