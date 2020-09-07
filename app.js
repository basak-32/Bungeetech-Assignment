// 1st part

const fs = require('fs');

const data = fs.readFileSync('./input/main.csv', 'utf8');
const rowsArray = data.split('\n');
const FilteredArray = [rowsArray[0]];

rowsArray.forEach(row => {
  const columns = row.split(',');
  if (columns[columns.length-1].includes('USA')) {
    FilteredArray.push(columns);
  }
})

if (!fs.existsSync('./output')) {
  fs.mkdirSync('output');
}

fs.writeFileSync('./output/filteredCountry.csv', FilteredArray.join('\n'));



// 2nd part

const filteredData = fs.readFileSync('./output/filteredCountry.csv', 'utf8');
const filteredDataTable = filteredData.split('\n');
const prices = {};

let dataValues = [];
filteredDataTable.forEach(row => {
  dataValues.push(row.split(','));
  // console.log(dataValues[0]);
})

// console.log(dataValues);
console.log(dataValues[1][0]);

for (let i = 0; i < dataValues.length; i++) {
  let sku = dataValues[i][0];
  dataValues[i].forEach(item => {
    if (item.includes('$')) {
      // console.log(item);
      if (prices[sku] === undefined) {
        // console.log(prices[sku]);
        prices[sku] = [item];
      } else {
        prices[sku].push(item);
      }
    }
  })
}

// console.log(prices);

let resultantArray = [['SKU', 'FIRST_MINIMUM_PRICE', 'SECOND_MINIMUM_PRICE']];
for (sku in prices) {
  let eachArray = [sku, prices[sku][0], prices[sku][1]];
  resultantArray.push(eachArray);
}

// console.log(resultantArray);

fs.writeFileSync('./output/lowestPrice.csv', resultantArray.join('\n'));