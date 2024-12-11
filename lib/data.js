
import got from 'got';

const dataURL = 
"https://dev-nickfitzpatrick-5513-w11.pantheonsite.io/wp-json/twentytwentyone-child/v1/latest-posts/1";

async function getJSON(url) {
    let jsonString;
    try {
        // next line uses got synchronouosly to retrive via https our json from wp site
        jsonString = await got(url);
        const jsonObj = JSON.parse(jsonString.body);
        console.log("Parsed JSON:", jsonObj);
        return jsonObj;
    } catch(error) {
        console.log(error);
        return [];
    }  
}



export async function getAllIds() {
    const jsonObj = await getJSON(dataURL);

    //use map() or array to extract just id + name properties into new array of object values
    return jsonObj.map(
        function(item) {
            return {
                params: {
                    id: item.ID.toString()
                }
            };
        }
    );
}



export async function getSortedList(){
    const jsonObj = await getJSON(dataURL);

    //sort json array by name property
    jsonObj.sort(function(a,b) {
            return a.post_title.localeCompare(b.post_title);
        }
    );

    //use map() or array to extract just id + name properties into new array of object values
    return jsonObj.map(
        function(item) {
            return {
                id: item.ID.toString(),
                name: item.post_title
            };
        }
    );
}



export async function getData(idRequested) {
    const jsonObj = await getJSON(dataURL);

    const objMatch = jsonObj.filter(obj => {
        return obj.ID.toString() === idRequested;
    });
    
    // extract object value in filtered array if any
    let objReturned;
    if (objMatch.length > 0) {
        objReturned = objMatch[0];
    } else {
        objReturned = {};
    }

    return objReturned;
}






// // all the utility funtions to read data 
// // import fs from 'fs';
// // import path from 'path';

// // BEFORE USING got MUST DO: npm install got@9.6.0
// import got from 'got';

// // get filepath to data directory
// // const dataDir = path.join(process.cwd(), 'data');

// //define URL for rest endpoint
// const dataURL = 
// "https://dev-nickfitzpatrick-5513-w11.pantheonsite.io/wp-json/twentytwentyone-child/v1/latest-posts/1";

// // Refactored: Load json file into json array object
// // function loadJson(fileName) {
// //     //get file path to json file
// //     const filePath = path.join(dataDir, fileName);
// //     //load json file contents
// //     const jsonString = fs.readFileSync(filePath,'utf-8');
// //     //convert string from file into json array object
// //     return JSON.parse(jsonString);
// // }

// // function returns ids for all json objects in array
// // add async keyword
// export async function getAllIds() {
//     let jsonString;
//     try {
//         // next line uses got synchronouosly to retrive via https our json from wp site
//         jsonString = await got(dataURL);
//         // console.log(jsonString.body);
//     } catch {
//         jsonString.body = [];
//         console.log(error);
//     }


//     // const jsonObj = loadJson('persons.json');
//     const jsonObj = JSON.parse(jsonString.body);
//     console.log("Parsed JSON:", jsonObj);

//     //use map() or array to extract just id + name properties into new array of object values
//     return jsonObj.map(
//         function(item) {
//             return {
//                 params: {
//                     id: item.ID.toString()
//                 }
//             };
//         }
//     );
// }



// // function returns names and ids for all json objects in array, sorted by name property
// // add async keyword
// export async function getSortedList(){
//     // const jsonObj = loadJson('persons.json');
//     let jsonString;
//     try {
//         // next line uses got synchronouosly to retrive via https our json from wp site
//         jsonString = await got(dataURL);
//         console.log(jsonString.body);
//     } catch {
//         jsonString.body = [];
//         console.log(error);
//     }

//     // const jsonObj = loadJson('persons.json');
//     const jsonObj = JSON.parse(jsonString.body);

//     //sort json array by name property
//     jsonObj.sort(function(a,b) {
//             return a.post_title.localeCompare(b.post_title);
//         }
//     );

//     //use map() or array to extract just id + name properties into new array of object values
//     return jsonObj.map(
//         function(item) {
//             return {
//                 id: item.ID.toString(),
//                 name: item.post_title
//             };
//         }
//     );
// }



// // Function return all of the properties for a single object with matching id value
// export async function getData(idRequested) {
//     // load the first json file (persons.json)
//     // const jsonObj = loadJson('persons.json');
//     let jsonString;
//     try {
//         // next line uses got synchronouosly to retrive via https our json from wp site
//         jsonString = await got(dataURL);
//         console.log(jsonString.body);
//       } catch(error) {
//         jsonString.body = [];
//         console.log(error);
//       }

//     // const jsonObj = loadJson('persons.json');
//     const jsonObj = JSON.parse(jsonString.body);

//     // find object value in array that has matching id
//     // const objMatch = jsonObj.filter(
//     //     function(obj) {
//     //       return obj.id.toString() === idRequested;
//     //     }
//     // );

//     const objMatch = jsonObj.filter(obj => {
//         return obj.ID.toString() === idRequested;
//     });
    
//     // extract object value in filtered array if any
//     let objReturned;
//     if (objMatch.length > 0) {
//         objReturned = objMatch[0];
//     } else {
//         objReturned = {};
//     }

//     // New Code here to handle second json file
//     // const personalData = await getPersoanlData(objReturned.name);

//     // Use Object.assign() to merge objReturned (holding the persons.json data) 
//     // with personalData (holding the personlinfo.json data)
//     // found Oject.assign() @ https://www.codecademy.com/resources/docs/javascript/objects/assign
//     // objReturned = Object.assign(objReturned, personalData);
//     return objReturned;
// }




// // export async function getPersoanlData(nameRequested){
// //     const jsonObj = loadJson('personalinfo.json')

// //     // find object value in array that has matching name
// //     const objMatch = jsonObj.filter(
// //         function(obj) {
// //             return obj.name === nameRequested;
// //         }
// //     );

// //     // extract object value in filtered array if any
// //     let objReturned;
// //     if (objMatch.length > 0) {
// //         objReturned = objMatch[0];
// //     } else {
// //         objReturned = {};
// //     }

// //     return objReturned;
// // }