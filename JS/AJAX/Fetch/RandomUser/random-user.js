var fullNameDisplay = document.querySelector("#fullname");
var avatarImage = document.querySelector("#avatar");
var username = document.querySelector("#username");
var email = document.querySelector("#email");
var city = document.querySelector("#city");

var btn = document.querySelector("#btn");

btn.addEventListener("click", function () {
    url = "https://randomuser.me/api/"
    fetch(url)
        .then(handleErrors)
        .then(parseJSON)
        .then(updateProfile)
        .catch(displayErrors);
});

function parseJSON(res) {
    return res.json().then(function (parsedData) {
        return parsedData.results[0];
    });
}


function updateProfile(data) {
    var fullName = data.name.first + " " + data.name.last;
    fullNameDisplay.innerText = fullName;
    avatar.src = data.picture.medium;
    username.innerText = data.login.username;
    email.innerText = data.email;
    city.innerText = data.location.city;
}

function handleErrors(res) {
    if (!res.ok) {
        throw Error(res.status);
    }
    return res;
}

function displayErrors(error) {
    console.log("Inside displayErrors");
    console.log(error);
}