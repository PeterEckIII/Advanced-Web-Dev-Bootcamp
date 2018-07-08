var url = "https://api/coindesk.com/v1/bpi/currentprice.json";


// Parsing JSON with fetch

fetch(url).then(function(res) {
    return res.json();
}).then(function(data) {
    console.log(data.bpi.USD.rate);
}).catch(function() {
    console.log("There was a problem!");
});

// First the fetch method is called, which does the same thing as an XHR.open("GET", URL)
// This returns a Promise object res.json() in parsed JSON format. From there, we call the
// .then() and .catch() response / error handling to make sure we get back a result we can
// work with. If .then() is called, the res.json() method successfully returned data. If 
// .catch() is called, the res.json() method returned an error.