function getData(targeturl, callback) {
    console.log('fired from the data mine module');

    //fetch is a JS API that runs AJAX requests
    //and gets data from a resource
    fetch(targeturl) // pass in the path to the data source
        .then(res => res.json()) // convert JSON to plain JS object 
        // the res is the data that we are retrieving from the resource
        .then(data => { // data is converted JSON object -> now it is just data (JS object)
            console.log(data);

            //run the call back when we get all of our data back and ready to go 
            //this gets passed in by referance when we invoke the dataMiner in main.js
            callback(data);
        })
    .catch(error => console.error(error));
    // catch any error that might happens and report to them    
}

export { getData }