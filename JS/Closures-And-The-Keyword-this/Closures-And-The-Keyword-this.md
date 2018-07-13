# Closures and the Keyword ‘this’
## Closures:
* A closure is a function that makes use of variables defined in outer functions that have returned.
* The outer function must return first before the inner function can return

Example:
```
function outer() {
	var start = "Closures are"
	return function inner() {
		return start + " " + "awesome";
	}
}

outer()
// EXPECTED OUTPUT
// function inner() {return start + " " + awesome}

outer()()
// EXPECTED OUTPUT
// Closures are awesome
```

Another example:
```
function outer(a) {
	return function inner(b) {
		return a + b;
	}
}
```
* The `inner` function is making use of the variable “a” which was defined in an outer function called `outer`
* By the time `inner` is called, the `outer` function has returned
* This function called `inner` is a closure

###### How Closures Work
* Only variables used in the inner function are *remembered*
```
function outerFn() {
	var data = "something from outerFn";
	var fact = "Remember me!";
	return function innerFn() {
		debugger
		return fact;
	}
}

var outer = outerFn();
outer();
```
* The call to debugger pauses our code and places us in the sources tab where we can examine variables
* Inner functions don’t remember *all* variables from outer functions - only the ones they need / use

###### Using Closures in the Wild
* _Private Variables_: in other languages, there exists support for variables that can not be modified externally. These are called private variables. But in JavaScript we don’t have that built in. This is where closures come in handy!
```
function counter() {
	var count = 0;
	return function() {
		count++;
		return count;
	}
}

var counter1 = counter();
counter1(); // 1
counter1(); // 2

var counter2 = counter();
counter2(); // 1
counter2(); // 2
count // ReferenceError: count is not defined
```

Example:
```
function classRoom() {
	var instructors = ["Elie", "Colt"];
	return {
		getInstructors: function() {
			return instructors;
		}
		addInstructor: function(instructor) {
			instructors.push(instructor);
			retunr instructors;
		}
	}
}

var first = classRoom();
first.getInstructors() // ["Elie", "Colt"];
first.addInstructors("Matt"); // ["Elie", "Colt", "Matt"]
first.addInstructors("Tim"); // ["Elie", "Colt", "Matt", "Tim"]
```
* The inner methods (`getInstructors` and `addInstructors` are closures because they are able to make use of the `instructors` variable defined in the outer function / scope
* There’s a problem with the code above - you can directly change the instructors array by implementing something like:
```
var first = classRoom();
first.getInstructors.pop()

// ["Elie", "Colt", "Matt"]
```

So how do we prevent this?
* Immutable values! 
* We instead return a *copy* of the array so nobody can change the values!
```
function classRoom() {
	var instructors = ["Elie", "Colt"];
	return {
		getInstructors: function() {
			return instructors.slice();
		},
		addInstructor: function(instructor) {
			instructors.push(instructor);
			return instructors.slice();
		}
	}
}
```
* `.slice()` returns a copy of the array

Exercises:
```
/* 
Write a function called specialMultiply which accepts two parameters. If the function is passed both parameters, it should return the product of the two. If the function is only passed one parameter - it should return a function which can later be passed another parameter to return the product. You will have to use closure and arguments to solve this.
*/

function specialMultiply(a,b){
    if(a && b) {
        return a * b;
    }
    else 
        return function(c) {
            return a * c;
    }
}

/* 
Write a function called guessingGame which takes in one parameter amount. The function should return another function that takes in a parameter called guess. In the outer function, you should create a variable called answer which is the result of a random number between 0 and 10 as well as a variable called guesses which should be set to 0.

In the inner function, if the guess passed in is the same as the random number (defined in the outer function) - you should return the string "You got it!". If the guess is too high return "Your guess is too high!" and if it is too low, return "Your guess is too low!". You should stop the user from guessing if the amount of guesses they have made is greater than the initial amount passed to the outer function.

You will have to make use of closure to solve this problem.
*/

function guessingGame(amount){
	var answer = Math.floor(Math.random() * 11);
	var guesses = 0;
	var completed = false;
	return function(guess) {
		if(!completed) {
			if (guess === answer) {
				completed = true;
				return "You got it!"
			}
			else if(guess > answer) {
				return "Your guess is too high!"
			}
			else if(guess < answer) {
				return "Your guess is too low!"
			}
			else if(guesses === amount) {
				completed = true;
				return "No more guesses. The answer was " + answer;
			}
		}
		return "All done playing!"
	}
}
```


## The Keyword “this”
* “This” is a reserved keyword in JavaScript
* Usually determined by how a function is called (what we call *the execution context*
* Every time a function is run, a keyword “this” is defined for that function
* Four Rules:
	* Global
	* Object / Implicit
	* Explicit
	* New

### Four Rules for the Keyword “this”

##### _Global_:
* The keyword “this” is outside of a declared object
* Example: `console.log(this); // window`
* What is a declared object?
```
function whatIsThis() {
	return this;
}
whatIsThis();
// EXPECTED OUTPUT
// window
```
* Even in a function, if we just return `this`, it still refers to the global scope / object, the window.
* Anything we attach to the global object becomes a global variable:
```
function variablesInThis() {
	this.person = "Elie";
}
variablesInThis(); // window
console.log(person) // Elie
```
* We can use the variable outside the function
* We normally don’t have access to variables declared in functions if they are not returned
* `this` enables us to use local variables in the global scope
* `strict mode`:
```
"use strict"
console.log(this) // window
function whatIsThis() {
	return this;
}

whatIsThis(); // undefined
```

##### _Object / Implicit_:
* “use strict” does not make a difference here
```
var person = {
	firstName: "Elie",
	sayHi: function() {
		return "Hi " + this.firstName;
	},
	determineContext: function() {
		return this === person;
	}
}
```
* When `this` is found inside a declared object, it will always equal the closest parent object
* In the example above, the keyword `this` is closest to the `person` object
* `determineContext()` will return `true`

```
var person = {
	firstName: "Elie",
	determineContext: this;
}
person.determineContext; // window
```
* In the example above, the keyword `this` refers to the window object. Why?
* Because `this` is defined when a function is run! 
* There is not a function being run here to create a new value of `this`, so the value of `this` is still the window.
* *Nested Objects:*
```
var person = {
	firstName: "Colt",
	sayHi: function() {
		return "Hi " + this.firstName;
	},
	determineContext: function() {
		return this === person;
	},
	dog: {
			sayHello: function() {
				return "Hello " + this.firstName;
			},
			determinContext: function() {
				return this === person;
			}
		}
}
```
* `person.dog.this` === undefined
* `person.dog.sayHello()` returns `"Hello undefined"`
	* `person.dog.determineContext` returns `false`

##### _Explicit_:
* Choosing what we want the context of `this` to be using *call* *apply* or *bind*
* `call` `apply` and `bind`  methods can only be used on functions

###### `Call`
* Takes as many parameters as you want
	* First parameter is always the `thisArg`, or what you want `this` to be assigned to
	* The latter parameters are any other parameters you’d like to call
* *Invoked immediately*

Example
```
var person = {
	firstName: "Colt",
	sayHi: function() {
		return "Hi " + this.firstName;
	},
	determineContext: function() {
		return this === person;
	},
	dog: {
			sayHello: function() {
				return "Hello " + this.firstName;
			},
			determinContext: function() {
				return this === person;
			}
		}
}

// WITHOUT CALL
person.dog.sayHello() // "Hello undefined"
person.dog.determineContext() // false

// WITH CALL
person.dog.sayHello.call(person) // "Hello Colt"
person.dog.determineContext.call(person) // true
```

Common Use Case:
* Cutting down on duplicate code
```
// WITHOUT CALL BEING USED

var colt = {
	firstName: "Colt",
	sayHi: function() {
		return "Hi " + this.firstName;
	}
}

var elie = {
	firstName: "Elie",
	sayHi: function() {
		return "Hi " + this.firstName;
	}
}

colt.sayHi() // Hi Colt
elie.sayHi() // Hi Elie (But, we had a lot of duplicate code!)


// WITH CALL BEING USED

var colt = {
	firstName: "Colt",
	sayHi: function() {
		return "Hi " + this.firstName;
	}
}

var elie = {
	firstName: "Elie"
}

colt.sayHi() // Hi Colt
colt.sayHi.call(elie) // Hi Elie
```

Ideal Use Case:
```
function sayHi() {
	return "Hi " + this.firstName;
}

var colt = {
	firstName: "Colt"
}

var elie = {
	firstName: "Elie"
}

sayHi.call(colt) // Hi Colt
sayHi.call(elie) // Hi Elie
```

_Using Call in the Wild_:
* Selecting all the divs on a page
/Without Call/
`var divs = document.getElementsByTagName("div");`

/With Call/
`var divsArray = [].slice.call(divs)`

###### `Apply`
* Takes only two parameters
	* First parameter is the `thisArg` parameter
	* Second parameter is an array
* *Invoked immediately*

```
function addNumbers(a,b,c,d) {
	return this.firstName + " just calculated " + (a+b+c+d);
}

var colt = {
	firstName: "Colt"
}

var elie = {
	firstName: "Elie"
}
addNumbers.call(elie, 1,2,3,4); // Elie just calculated 10
addNumbers.apply(elie, [1,2,3,4]); // Elie just calculated 10
```
* We use `apply()` instead of call *when a function does not accept an array*

```
var nums = [5,7,1,4,2];
Math.max(nums) // NaN (Math.max does not accept an array)

Math.max.apply(this, nums); // 7
```

###### `Bind`
* Takes only two parameters:
	* First is `thisArg`
	* Second is an array
* Returns a function definition with the value of `this` set as the first parameter you used in the `bind()` call
* *Not invoked immediately*
```
function addNumbers(a,b,c,d) {
	return this.firstName + " just calculated " + (a+b+c+d);
}

var elie = {
	firstName: "Elie"
}

var elieCalc = addNumbers.bind(elie,1,2,3,4); // function()...
elieCalc(); // Elie just calculated 10
```
* Use `bind()` when *we don’t know all of the arguments that will be passed to a function*
```
function addNumbers(a,b,c,d) {
	return this.firstName + " just calculated " + (a+b+c+d);
}

var elie = {
	firstName: "Elie"
}

var elieCalc = addNumbers.bind(elie,1,2); // function()...
elieCalc(3,4); // Elie just calculated 10
```

* Another common use case is when working with asynchronous code
```
var colt = {
	firstName: "Colt",
	saHi: function() {
		setTimeout(function() {
			console.log("Hi " + this.firstName);
		}, 1000);
	}
}

colt.sayHi(); // Hi undefined
```
* Using the first two methods, you may think the keyword `this` is referring to the nearest parent object (in this case, `colt`), since it is inside of a declared object
* However, since setTimeout is called at a later point in time, `this` does not refer to the parent object, but to the global object (the window)
	* To add to that, the `setTimeout` function has a callback function, which changes the meaning of the keyword `this`

```
var colt = {
	firstName: "Colt",
	saHi: function() {
		setTimeout(function() {
			console.log("Hi " + this.firstName);
		}.bind(this), 1000);
	}
}

```
* By adding the `.bind(this)` call, we set the keyword `this` inline with the function - this is the same as setting a `bind` call to a variable and calling it later
* Why might the keyword `this` be passed into the `bind` method?
	* Because if we change our code to apply to another object (say elie), the keyword `this` will not be pointing to the right code
	* Instead of `.bind(colt)`, we use `.bind(this)` to be able to extend the code to further use cases

Exercises:
```
/*
Write a function called arrayFrom which converts an array-like-object into an array.
*/

function arrayFrom(arrayLikeObject){
    return [].slice.call(arrayLikeObject);
}

/* 
// Write a function called sumEvenArguments which takes all of the arguments passed to a function and returns the sum of the even ones.
*/

function sumEvenArguments(){
	var newArgs = [].slice.call(arguments);
	return newArgs.reduce(function(acc, next) {
		if(next % 2 === 0;) {
			return acc + next;
		}
		return acc;
	}, 0);
}

/* 
Write a function called invokeMax which accepts a function and a maximum amount. invokeMax should return a function that when called increments a counter. If the counter is greater than the maximum amount, the inner function should return "Maxed Out"
*/

function invokeMax(fn, num){
	var max = 0;
	return function() {
		if(max >= num) {
			return "Maxed Out!"
		}
		max++;
		return fn.apply(this,arguments)
	}
}

/* 
Write a function called once which accepts two parameters, a function and a value for the keyword 'this'. Once should return a new function that can only be invoked once, with the value of the keyword this in the function set to be the second parameter.
*/

function once(fn, thisArg){
	var hasBeenCalled = false;
	return function() {
		if(!hasBeenCalled) {
			hasBeenCalled = true;
			return fn.apply(thisArg, arguments);
		}
	}
}

// BONUSES! 

/* 
Write a function called bind which accepts a function and a value for the keyword this. Bind should return a new function that when invoked, will invoke the function passed to bind with the correct value of the keyword this. HINT - if you pass more than two parameters to bind, those parameters should be included as parameters to the inner function when it is invoked. You will have to make use of closure!
*/

function bind(fn, thisArg){
    var outerArgs = [].slice.call(arguments, 2);
	return function() {
		return innerArgs = [].slice.call(arguments);
		var allArgs = outerArgs.concat(innerArgs);
		return fn.apply(thisArg, allArgs);
	}
}

/* 
Write a function called flip which accepts a function and a value for the keyword this. Flip should return a new function that when invoked, will invoke the function passed to flip with the correct value of the keyword this and all of the arguments passed to the function REVERSED. HINT - if you pass more than two parameters to flip, those parameters should be included as parameters to the inner function when it is invoked. You will have to make use of closure! 

Flip should return a new function that when invoked takes the correct number of required arguments to that function which are then reversed. HINT - you will need to use the .length property on functions to figure out the correct amount of arguments. For example:
*/

function flip(fn, thisArg){
    var outerArgs = [].slice.call(arguments, 2);
	return function() {
		var innerArgs = [].slice.call(arguments);
		var allArgs = outerArgs.concat(innerArgs).slice(o, fn.length);
		return fn.apply(thisArg, allArgs.reverse());
	}
}
```

##### _New_:
* We can set the context of `this` using the `new` keyword
```
function Person(firstName, lastName) {
	this.firstName = firstName;
	this.lastName = lastName;
}

var peter = new Person("Peter", "Eck");

peter.firstName // Peter
peter.lastName // Eck
```























