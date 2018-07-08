# AJAX
Asynchronous JavaScript and XML (AJAX)

##### Ajax is NOT:
* a library
* a framework
* a technology

##### Ajax IS:
* An approach to web development

##### What can I do with Ajax?
* With AJAX websites can send and request data from a server **in the background** without disturbing the current page (refreshing the browser)
* This led to the big transition to Single Page Web Apps (SPAs)
* This provides a much more seamless and pleasant user experience

### AJAX Methods:
##### XHR
XHR = XML HTTP Request

```
var XHR = new XMLHttpRequest();

XHR.onreadystatechange = function() {
	if(XHR.readyState == 4 && XHR.status == 200) {
		// Do something with the requested data
	}
	XHR.open("GET", url);
	XHR.send();
}
```

##### Fetch 
Fetch is a cleaner, easier way to run an AJAX request

```
fetch(url).then(function(res) {
	// Parse the response JSON object
	return res.json();
}).then(function(data) {
	console.log(data);
}).catch(function() {
	console.log("Error!");
});
```

###### Fetch Options:
* In your `fetch()` call, you can specify options to get the data you want
```
fetch(url, {
	method: "POST",
	body: JSON.stringify({
		name: "blue",
		login: "cats"
	})
}).then(function(data) {
	console.log(data);
}).catch(function(error) {
	console.log(error);
});
```

###### Fetch Error Handling:

```
var btn = document.querySelector("button");
btn.addEventListener("click", function() {
	var url = "https://api.github.com/users/PeterEckIII";
	fetch(url)
	.then(function() {
		conolse.log("Everything is fine");
	}).catch(function() {
		console.log("There is a problem");
	})
});

// Since our URL is a valid endpoint, this will return "Everything is fine".

// However, even if we make the url an invalid endpoint:

url = "https://api.github.com/users/PeterEckIIIdjsnjsndam";

// There will be a 404 error, but the response will still send "Everything is fine"
```
* In the above situation, we’ll only see “There is a problem” if there is some network issue, a problem with credentials, etc., not when there is a problem with the response.
* Instead we run
```
var url = "https://api.github.com/users/PeterEckIIIalkfdnad"
fetch(url).then(function(response) {
	if(!response.ok) {
		throw Error("Custom error");
	}
	return response;
}).then(function(request) {
	console.log("Everything is fine!");
}).catch(function(error) {
	console.log("There is a problem!");
});

// EXPECTED OUTPUT
// There is a problem
```
* `res.ok ` returns true if the response is a successful status code (i.e. 200)
	* If `res.ok` returns true, we return the `response` object and continue into the `.then()` call, which prints “Everything is fine”
	* If `res.ok` returns false, the `.then()` call following it is skipped, and it goes straight to the `.catch()` call, which prints “There is a problem”

```
var url = "https://api.github.com/users/PeterEckIII"
fetch(url).then(function(response) {
	if(!response.ok) {
		throw Error(response.status);
	}
	return response;
}).then(function(request) {
	console.log("Everything is fine!");
	console.log(request);
}).catch(function(error) {
	console.log("There is a problem!");
	console.log(error);
});

// EXPECTED OUTPUT
// Everything is fine!
// [Response object]
```
* Since
```
function(response) {
	if(!response.ok) {
		throw Error(request.status);
	}
	return response;
}
```
Is such a common part to have in a fetch request, we can refactor once more to end up with:

```
function handleError(response) {
	if(!response.ok) {
		throw Error(response.status);
	}
	return response;
}

var url = "https://api.github.com/users/PeterEckIII"
fetch(url).then(handleError)
}).then(function(request) {
	console.log("Everything is fine!");
	console.log(request);
}).catch(function(error) {
	console.log(error);
});
```


### AJAX with jQuery:
* The “base” AJAX jQuery method just creates an XMLHttpRequest under the hood
```
$("#btn").click(function() {
  $.ajax({
    method: "GET",
    url: "https://baconipsum.com/api/?type=meat-and-filler",
    dataType: "json"
  })
  .done(function(data) {
	  // If successful, add the first element of the response to 		 a paragraph
    $("p").text(data)[0];
  })
  .fail(function() {
    alert("Oh no! It failed!");
  })
});
```

###### jQuery & AJAX Shorthand Methods:
* You can also use shorthand methods for AJAX requests with jQuery.
	* `GET()`
	* `POST()`
	* `GETJSON()`

`GET()`:
```
$("getBtn").click(function() {
	$.get("example.api.com)
	.done(function(data) {
		console.log(data);
	});
});
```
* This is the same as writing:
```
$.ajax({
	method: "GET",
	url: "example.api.com"
})
```

`POST()`:
```
$("#postBtn").click(function() {
  var data = {name: "Peter", city: "Chicago"}
  $.post("www.coolURL.com", data)
  .done(function(data) {
    console.log(data);
  })
  .fail(function() {
    console.log("ERROR!");
  })
});
```
* This is the same as writing:
```
$.ajax({
	method: "POST",
	url: "www.coolURL.com",
	data: {
		name: "Peter",
		city: "Chicago"
	}
});
```

`GETJSON()`:
```
$("#getJSONBtn").click(function() {
  $.getJSON("https://api.github.com/users/PeterEckIII")
  .done(function(data) {
    console.log(data)
  })
  .fail(function() {
    console.log("There was a problem");
  })
});
```
* This is the same as writing:
```
$.ajax({
	method: "GET",
	url: "https://api.github.com/users/PeterEckIII"
	dataType: json
});
```

### AJAX & Axios:
* Axios is a lightweight HTTP request library written on top of the XHR API
* It allows you to cut down on writing long AJAX requests, without bloating your requirements with all of jQuery’s features.

Example:
```
axios.get(url)
.then(function(res) {
	console.log(res.data);
})
.catch(function(e) {
	console.log(e);
});
```

###### Handling Errors with Axios
* Axios affords two great tools in error handling - a response error and a request error
* **Response Error** - the API endpoint is not recognized by the response object, meaning the given URL has an invalid substring:
	* The function is literally not being given a response object to return because it can’t recognize the endpoint.
	* Example: www.example.api.com/comments/dslkjdljsal423kl1
* **Request Error** - the domain name itself is not recognized
	* Example: www.example.api323i3md.com/comments/user1

Example:
```
var btn = document.querySelector("button");
var section = document.querySelector("#comments")
btn.addEventListener("click", sendRequest);

function sendRequest() {
  axios.get("https://jsonplaceholder.typicode.com/comments", {
    params: {
      postId: 1
    }
  })
  .then(addComments)
  .catch(handleErrors)
}

function addComments(res) {
  res.data.forEach(function(comment) {
    appendComment(comment);
  });
}

function appendComment (comment) {
  var newP = document.createElement("p");
  newP.innerText = comment.email;
  section.appendChild(newP);
}

function handleErros(err) {
  if(err.response) {
    conosle.log("Problem with response: " + err.response.status);
  }
  else if(err.request) {
    console.log("Problem with request");
  }
  else {
    console.log("Error", err.message);
  }
}
```


