import Tesseract from "tesseract.js";
import fs from "fs";

const imagePath = "./src/assets/INTEGRATED-FARE-TABLE_updated-06MAY21_Cashless_1_small.png";

Tesseract.recognize(
  imagePath,
  'eng',
  { logger: info => console.log(info) })
  .then(({ data: { text } }) => {
  console.log('OCR Result:', text);
// Save the extracted text to a JSON file
  fs.writeFileSync("./output.json", JSON.stringify({ ocrResult: text }, null, 2));
  console.log('JSON data saved to output.json');
  })
  .catch(error => console.error('OCR Error:', error));

