// enable use of require statements in ESM
import { createRequire } from "module";
const require = createRequire(import.meta.url);
import slugify from "slugify";

// use the require statement
const fs = require("fs");

// Read in the JSON file
const inputFile = "raw_lingos.json";
const inputData = fs.readFileSync(inputFile);

// Parse the JSON data
const inputArray = JSON.parse(inputData);

// Loop through the array and write each object to a separate file
for (let i = 0; i < inputArray.length; i++) {
  // Modify the object to add a slug property
  inputArray[i].slug = slugify(inputArray[i].term, {
    lower: true,
    strict: true,
  });
  const fileName = slugify(inputArray[i].term, { lower: true, strict: true });
  const outputData = JSON.stringify(inputArray[i], null, 2); // Stringify the object with 2 spaces for indentation
  const outputFilename = `lingos/${inputArray[i].slug}.json`; // Create a unique output filename for each object
  fs.writeFileSync(outputFilename, outputData); // Write the data to the output file
}

console.log(
  `Successfully wrote ${inputArray.length} objects to separate JSON files.`
);
