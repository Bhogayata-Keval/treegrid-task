const faker = require('faker')
const fs = require('fs')

let firstName = faker.name.firstName();
let lastName = faker.name.lastName();
let jobTitle = faker.name.jobTitle();

console.log("firstname", firstName)
console.log("lastName", lastName)
console.log("jobTitle", jobTitle)

let dummydata = {
    data: [],
    settings: {
        "field1": {
            "alias": "firstname"
        },"field2": {
            "alias": "lastname"
        },"field3": {
            "alias": "jobtitle"
        }
    },
    events: {}
}

for (i=0; i<10; i++) {
    dummydata.data.push({
        field1: faker.name.firstName(),
        field2: faker.name.lastName(),
        field3: faker.name.jobTitle(),
    })
}

console.log("dummy", dummydata)

// fs.writeFile("data.json", JSON.stringify(dummydata), 'utf8', function (err) {
//     if (err) {
//         console.log("An error occured while writing JSON Object to File.");
//         return console.log(err);
//     }
 
//     console.log("JSON file has been saved.");
// });

fs.readFile("./data.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    console.log("File data:", typeof jsonString);

    dummydata = JSON.parse(jsonString)
    console.log("new", dummydata)
  });
