// var farmerID = "FARMER123";
// var classificationID = [1, 2];
// var fieldID = ["FIELD1", "FIELD2", "FIELD3", "FIELD4"];

// var json = {
//     [farmerID]: {
//         [classificationID[0]]: [
//             {
//                 [fieldID[0]]: "some data"
//             },
//             {
//                 [fieldID[1]]: "some other data"
//             }
//         ],
//         [classificationID[1]]: [
//             {
//                 [fieldID[2]]: "some data"
//             },
//             {
//                 [fieldID[3]]: "some other data"
//             }
//         ]
//     }
// };

var json = {

    "farmerID": {
        "farmID": {
            "C2": [
                {
                    "landID1": "QmHash1"
                },
                {
                    "landID2": "QmHash2"
                }
            ],
            "C3": [
                {
                    "areaID1": "QmHash3"
                },
                {
                    "areaID2": "QmHash4"
                }
            ]
        }
    }
};

console.log(json['farmerID']['farmID']['C2'][0]);
json['farmerID']['farmID']['C2'][0].landID1="QmHashNew";
console.log(json['farmerID']['farmID']['C2'][0]);