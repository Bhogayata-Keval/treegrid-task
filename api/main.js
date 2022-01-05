const faker = require('faker')
const fs = require('fs')
var express = require('express')
var app = express()

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


app.get('/generate-fakedata', function (req, res) {
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
        events: {},
        globals: {
            lastColumnIndex: 3,   
        }
    }

    for (i=0; i<10; i++) {
        dummydata.data.push({
            field1: faker.name.firstName(),
            field2: faker.name.lastName(),
            field3: faker.name.jobTitle(),
        })
    }
    
    fs.writeFile("data.json", JSON.stringify(dummydata), 'utf8', function (err) {
        if (err) {
            res.send("")
        }
    });

    res.send({
        success: true,
        error: {},
        data: "data generated successfully !"
    })
})

app.get('/read', function (req, res) {
    fetchData(function send(data) {
        res.send(data)
    })
})

app.post('/column', function (req, res) {
    insertColumn(req.body)
    res.send({
        success: true,
        error: "",
        data: "column added successdfully !"
    })
})

function insertColumn(columnData) {
    fs.readFile("./data.json", "utf8", (err, jsonString) => {
        if (err) {
          console.log("File read failed:", err);
          res.send({})
        }

        // column entry in settings
        let jsondata = JSON.parse(jsonString)
        let newColumnIndex = jsondata.globals.lastColumnIndex + 1;
        let index =  "field" + newColumnIndex.toString();
        jsondata.settings[index] = columnData

        // updating data        
        for (i=0; i<jsondata.data.length; i++) {
            jsondata.data[i][index] = columnData.default_value;
        }

        // updating global index
        jsondata.globals.lastColumnIndex = jsondata.globals.lastColumnIndex + 1;

        fs.writeFile("data.json", JSON.stringify(jsondata), 'utf8', function (err) {
            if (err) {
                res.send("")
            }
        });
    });
}

app.put('/column', function (req, res) {
    fs.readFile("./data.json", "utf8", (err, jsonString) => {
        if (err) {
          console.log("File read failed:", err);
          res.send({})
        }
        
        let jsondata = JSON.parse(jsonString)
        //updating data in case of new default value
        if (req.body.default_value != jsondata.settings[req.body.index].default_value) {
            for (i=0; i<jsondata.data.length; i++) {
                if (jsondata.data[i][req.body.index] === "") {
                    jsondata.data[i][req.body.index] = req.body.default_value;
                }   
            }
        }
        
        data = JSON.parse(JSON.stringify(req.body))

        // removing index key from request body
        delete data["index"]
        jsondata.settings[req.body.index] = data
    

        fs.writeFile("data.json", JSON.stringify(jsondata), 'utf8', function (err) {
            if (err) {
                res.send({
                    success: false,
                    data: "Could not save to .json file",
                    error: ""
                })
            }
            res.send({
                success: true,
                data: "Column updated successfully",
                error: ""
            })
        });
    });
})

app.delete('/column', function (req, res) {
    fs.readFile("./data.json", "utf8", (err, jsonString) => {
        if (err) {
          console.log("File read failed:", err);
          res.send({})
        }

        // column entry in settings
        let jsondata = JSON.parse(jsonString)

        if (jsondata.settings[req.body.index]) {
            delete jsondata.settings[req.body.index]
 
            for (i=0; i<jsondata.data.length; i++) {
                delete jsondata.data[i][req.body.index]
            }

            // updating global index
            // jsondata.globals.lastColumnIndex = jsondata.globals.lastColumnIndex + 1;

            fs.writeFile("data.json", JSON.stringify(jsondata), 'utf8', function (err) {
                if (err) {
                    res.send("")
                }

                res.send({
                    success: true,
                    data: "Column deleted successfully",
                    error: ""
                })
            });
        } else {
            res.send({
                success: false,
                data: "Column with this index does not exist",
                error: ""
            })
        }
        

       
    });
})

app.listen(3000, function () {
    console.log('app listening on port 3000!')
})


function fetchData(callback) {
    fs.readFile("./data.json", "utf8", (err, jsonString) => {
        if (err) {
          console.log("File read failed:", err);
          res.send({
              success: false,
              error: "failed to read file"
          })
        }
        jsondata = JSON.parse(jsonString)
        
        if (typeof callback === "function") {
            callback(jsondata)
        }
    });
}
