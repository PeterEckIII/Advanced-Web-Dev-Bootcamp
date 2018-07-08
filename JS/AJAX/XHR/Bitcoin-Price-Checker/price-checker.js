var price = document.querySelector("#price");
var btn = document.querySelector("button");

btn.addEventListener("click", function() {
    var XHR = new XMLHttpRequest();

    XHR.onreadystatechange = function() {
        if(XHR.readyState == 4 && XHR.status == 200) {
            var rate = JSON.parse(XHR.responseText).bpi.USD;
            price.textContent = "$" + rate.rate + " " + rate.code;
        }
    }

    XHR.open("GET", "https://api.coindesk.com/v1/bpi/currentprice.json");
    XHR.send();
});
