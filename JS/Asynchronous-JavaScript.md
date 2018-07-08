# Asynchronous JavaScript
_Callback function_:
A function passed inside another function to be invoked on the calling of the first function.

_Higher Order Function_:
A function that a callback is passed to

```
function callback() {
    return "This is the callback!";
}

function higherOrder(fn) {
    return "Before calling the callback";
    fn();
    return "After calling the callback";
}

higherOrder(callback);

// EXPECTED RETURN:
// "Before calling the callback"
// "This is the callback"
// "After calling the callback”
```

Helps to cut down on repetitive code - for example:

``` 
function greet(name, formatter) {
	return "Hello " + formatter(name);
}

function upperCaseName(name) {
	return name.toUppercase();
}

function lowerCaseName(name) {
	return name.toLowerCase();
}

greet("Peter", upperCaseName);
greet("Johnny", lowerCaseName);

// EXPECTED OUTPUT
// "Hello PETER"
// "Hello johnny"
```

It’s common to use higher order functions with anonymous callback functions as well:
```
greet("Peter", function(name) {
	return name + "!!!!!";
});

// EXPECTED OUTPUT
// "Hello Peter!!!!!"
```

## `forEach`
`forEach` loops accept an array and a callback function to tell it what to do to each array item.

This is an example of a traditional looping function to multiply numbers by 2:

```
var arr = [1,2,3,4,5,6];

function double(arr) {
	for(var 1 = 0; i < arr.length; i++) {
		console.log(arr[i] * 2);
	}
}

double(arr)

// EXPECTED OUTPUT
// 2
// 4
// 6
// 8
// 10
// 12
```

This is an example of a `forEach` loop that does the same thing:
```
var arr = [1,2,3,4,5,6];

forEach(arr, function(number) {
	console.log(number * 2);
});

// EXPECTED OUTPUT
// 2
// 4
// 6
// 8
// 10
// 12
```

It is common to use an anonymous function with `forEach` loops. 

The callback in the forEach function will return three parameters, shown below:
```
function forEach(array, callback) {
	// Do something with array
}

function callback(currentElement, currentIndex, array) {
	// Implemented by the caller of forEach
}
```
**It’s up to you whether you want to use all three parameters the callback makes available**


A more complex example:
```
var string = ["my", "forEach", "example"];

var result = "";

forEach(string, function(str, index, array) {
	if(array.length - 1 !== index) {
		result += str + " ";
	}
	else {
		result += str + "!!!";
	}
});

// EXPECTED OUTPUT
// "my forEach example"
```

#### Step-by-Step Walkthrough:

First time through forEach:
![](Screen%20Shot%202018-07-02%20at%205.50.59%20PM.png)
result = “my “

Second time through forEach:
![](Screen%20Shot%202018-07-02%20at%205.52.39%20PM.png)
result = “my forEach “

Third time through forEach:
![](Screen%20Shot%202018-07-02%20at%205.53.49%20PM.png)
 result = “my forEach example!!!”


## `findIndex `
* `findIndex` returns the index of the first element in the array for which the callback returns a truthy value. 
* If the array has no truthy value, the findIndex function returns -1

#### Definition function:
```
function findIndex(array, callback) {
	// Code to be implemented
}

function callback(currentElement, currentIndex, array) {
	// callback implement by caller of function
}
```

An example:
```
var arr = [3,4,6,2,1];
findIndex(arr, function(num, index, array) {
	return num === 6;
});

// EXPECTED OUTPUT
// 2
```
The findIndex function will return the index, but the callback itself will return either true or false depending on the condition inside of the callback (in this case, num === 6).
**This is important to understand the difference between the callback return and the actual function return!!!**


Another example:
```
var arr = [5, 11, 13, 8, 6, 7];
findIndex(arr, function(num, index, array) {
	return num % 2 === 0;
});

// EXPECTED OUTPUT
// 3
```

What happens when `findIndex` can’t find the index indicated in the callback function?
```
var langs = ["Java", "C++", "Python", "Ruby"];
findIndex(langs, function(lang, index, arr) {
	return lang === "JavaScript";
});

// EXPECTED OUTPUT
// -1
```

#### Create Your Own findIndex function
```
function findIndexOf(arr, callback) {
	for(var i = 0; i < arr.length; i++) {
		// if the callback function returns a truthy value, 			// return the index (i) of that value.
		if(callback(arr[i], i, arr)) {
			return i;
		}
	}
	// if no truthy values, 
	return -1;
}
```



## The Stack and the Heap

#### The Stack:
* The stack is an ordered data structure that keeps track of our invoked functions
* It is part of the runtime - basically every time you invoke a function, the function is added to the top of the stack. 
* When that function is called, it is removed from the stack

The Stack Frame:
![](Screen%20Shot%202018-07-02%20at%206.20.06%20PM.png)

Stack Frame Contents:
* Function that was invoked
*  Parameters that were passed to the function
* Current line number

**Stack Definition**:
* An ordered set of stack frames
* Most recently invoked function is on top of the stack
* Bottom of the stack is the first function invoked
* The stack is processed from top to bottom - Last-In First-Out (LIFO)

#### The Heap:
An area in memory where your data is stored

```
var obj = {firstName: "Peter", lastName: "Eck"}

// The object is created in the heap. obj is a reference to the object in memory


var referenceCopy = obj;

// New data is not created here, only a copy of the reference
```


## `setTimeout` & `setInterval`

#### `setTimeout`:
* `setTimeout` is a function that asynchronously invokes a callback after a delay in milliseconds.
```
function callback() {
	console.log("Callback function!");
}

setTimeout(function() {
	console.log("runs in approx 2000ms")
}, 2000);

// Callback is run 2 seconds after setTimeout is called
```

* Canceling setTimeout:
```
var timerId = setTimeout(function() {
	console.log("This function runs in 30 seconds...");
}, 30000);

setTimeout(function() {
	console.log("Canceling the first setTimeout ", timerId)
	clearTimeout(timerId);
}, 2000);

// Second function cancels first function after 2 seconds
```

#### `setInterval`:
* a function that continually invokes a callback after every x milliseconds, where x is provided in `setInterval`
```
function callback() {
	console.log("Callback is called continuously");
}

var repeat = 3000;
setInterval(callback, repeat);
```

An example:
```
var num = 0;
setInterval(function() {
	num++;
console.log("Num: ", num);
}, 1000);

// EXPECTED OUTPUT
// Num: 1
// Num: 2
// etc.
```

* Canceling setInterval:
```
var num = 0;
var intervalId = setInterval(function() {
	num++;
	console.log("num:", num);
	if(num === 3) {
		clearInterval(intervalId);
	}
}, 1000);


// EXPECTED OUTPUT:
// num: 1
// num: 2
// num: 3
```

### Countdown Exercise:
Create a function that counts down from a given number. When the timer reaches 0, print “Ring ring ring!”
```
function countDown(num) {
	var countdownId = setInterval(function() {
		num--;
		console.log("Timer:", num);
		if(num === 0) {
			clearInterval(countdownId);
			console.log("Ring Ring Ring!");
		}
	}, 1000);
}
```


## The Event Loop and the Queue
#### The Queue:
* An ordered list of functions waiting to be placed on the stack
* Functions in the queue are processed on a first-in, first-out basis (FIFO)

#### The Event Loop
* Functionality in the JS runtime that checks the queue when the stack is empty
* If the stack is empty, the front of the queue is placed in the stack

_Single Threaded Language:_ 
* Code execution is linear. Code that is running cannot be interrupted by something else going on in the program

Example:
```
setTimeout(function() {
	console.log("Hello from the timeout!");
}, 0);

for (var i = 0; i < 1000000000000; i++) {
	var x = i * 2;
}

console.log("Done with the loop!");

// EXPECTED OUTPUT
// Done with the loop
// undefined
// Hello from the timeout
```
The setTimeout function, while only having a timeout of 0 seconds, cannot run until the loop is done running. This shows the event loop in action.

## Promises
* An object that represents a task that will be completed in the future
* _Analogy_: Taking a number at a government office before you can get helped. The piece of paper you get is like a promise . The help you get at the counter is like the invocation of your callback

Creating a Promise:
```
var p1 = new Promise(function(resolve, reject) {
	resolve([1,2,3,4]);
});

// Callback below
p1.then(function(arr) {
	console.log("Promise p1 resolved with data: ", arr);
});
```
`.then()` invokes the callback whenever resolve is invoked

Promise Handling Errors:
```
var p1 = new Promise(function(resolve, reject) {
	reject("ERROR!");
});

p1.then(function(data) {
	console.log("Promise p1 resolved with data:", data);
}).catch(function(data) {
// data = ERROR in this case, as reject was invoked
	console.log("Promise p1 was rejected with data:", data);
});

// EXPECTED OUTPUT
// Promise p1 was rejected with data: ERROR
```
* When reject is invoked from within the promise, none of the `.then()` calls will run. This is why we need a `.catch()` function, to catch any errors

Randomly occurring errors:
```
var p1 = new Promise(function(resolve, reject) {
	var num = Math.random();
	if (num < 0.5) {
		resolve(num);
	}
	else {
		reject(num);
	}
});

p1.then(function(result) {
	console.log("Success:", result);
}).catch(function(error) {
	console.log("Error:", error);
});

// If Math.random() returns a number below 0.5, the resolve and .then() function will be invoked

// If Math.random() returns a number above 0.5, the reject and .catch() function will be invoked
```


#### Promise Chaining:
 Nested Async Callbacks:
```
var counter = 0;
setTimeout(function() {
	counter++;
	console.log("Counter:", counter);
	setTimeout(function() {
		counter++;
		console.log("Counter:", counter);
		setTimeout(function() {
			counter++;
			console.log("Counter:", counter);
		}, 3000);
	}, 2000);
}, 1000);

// EXPECTED OUTPUT
// Counter: 1
// Counter: 2
// Counter: 3
```
This is a mess! Callback hell is a common description for code like this. Buy why?
* Nest callbacks are hard to read
* Logic is difficult to reason about - makes it hard to understand what’s going on
* Code is not modular

Enter Promise Chaining:
```
var promise = new Promise(function(resolve, reject) {
	setTimeout(function() {
		randomInt = Math.floor(Math.random() * 10);
		resolve(randomInt);
	}, 500);
});

promise.then(function(data) {
	console.log("Random int passed to resolve: " + data);
	return new Promise(function(resolve, reject) {
		setTimeout(function() {
			resolve(Math.floor(Math.random() * 10));
		}, 3000);
	});
}).then(function(data) {
	console.log("Second random int passed to resolve: " + data);
});
```
* Promise chaining allows multiple `.then()`  to be chained to a Promise
* If a previous callback function inside `.then()` returns a Promise,  the next callback inside `.then()` will be waiting for the previous Promise to resolve

###### Returning Data
* Promise chaining also allows you to return data from a `.then()` function
```
var promise = new Promise(function(resolve, reject) {
	resolve(5);
});

promise.then(function(data) {
	return data * 2;
}).then(function(data) {
	return data + 20;
}).then(function(data) {
	console.log(data);
});

// EXPECTED OUTPUT
// 30
```

_**Refactoring our nested callback code from above**:_
```
// Create function declaration
var counter = 0;
function incCounter() {
	counter++;
	console.log("Counter: " + counter);
}

// Create async function to return a promise
function runLater(callback, timeInMs) {
	var p = new Promise(function(resolve, reject) {
		setTimeout(function() {
			var res = callback();
			resolve(res);
		}, timeInMs);
	});
	return p;
}

runLater(incCounter, 1000).then(function() {
	return runLater(incCounter, 2000);
}).then(function() {
	return runLater(incCounter, 3000);
}).then(function() {
	console.log("Finished!");
});
```
* `runLater` creates a promise which returns a `setTimeout` function that returns the callback (in this case `incCounter`, just incrementing by 1) and resolves the promise with the new counter variable, allowing us to access it in a `.then()` function. 
* The `runLater` function is called first and will run in 1 second
	* `.then()` we ask the runLater function to run again in 2 seconds
	* `.then()` we ask the runLater function to run a final time in 3 seconds
	* `.then()` we ask the function to print “finished”

* It’s useful to understand that Promises are often returned to you




