var xhr = document.querySelector("#xhr");
var fetchBtn = document.querySelector("#fetch");
var jquery = document.querySelector("#jquery");
var axiosBtn = document.querySelector("#axios");
var quoteText = document.querySelector("#quote");

// XHR Setup
xhr.addEventListener("click", function() {
    var XHR = new XMLHttpRequest();

    XHR.onreadystatechange = function() {
        if(XHR.readyState == 4 && XHR.status == 200) {
            var quote = JSON.parse(XHR.response)[0];
            quoteText.innerHTML = quote;
        }
    }
    XHR.open("GET", "https://ron-swanson-quotes.herokuapp.com/v2/quotes");
    XHR.send();
});

// jQuery Setup
$("#jquery").click(function() {
    $.get("https://ron-swanson-quotes.herokuapp.com/v2/quotes")
    .done(function(data) {
        $("#quote").text(data[0]);
    })
    .fail(function(error) {
        console.log("Error: " + error);
    })
});

// Axios Setup
axiosBtn.addEventListener("click", sendRequest);

function sendRequest() {
    axios.get("https://ron-swanson-quotes.herokuapp.com/v2/quotes")
    .then(addQuote)
    .catch(handleErrors)
}

function addQuote(response) {
    quoteText.innerHTML = response.data[0];
}

function handleErrors(error) {
    if(error.response) {
        console.log("There was a response error");
    }
    else if(error.request) {
        console.log("There was a request error");
    }
    else {
        console.log("Unknown error: " + error);
    }
}

// Fetch setup
fetchBtn.addEventListener("click", function() {
    var url = "https://ron-swanson-quotes.herokuapp.com/v2/quotes";
    fetch(url)
    .then(handleErrors)
    .then(parseJSON)
    .then(updateQuote)
    .catch(displayErrors)
});

function handleErrors(response) {
    if(!response.ok) {
        throw Error("There was an error with the fetch");
    }
    return response;
}

function parseJSON(response) {
    return response.json().then(function(parsedData) {
        return parsedData;
    });
}

function updateQuote(data) {
    quoteText.innerText = data;
}

function displayErrors(error) {
    console.log("Error: " + error);
}