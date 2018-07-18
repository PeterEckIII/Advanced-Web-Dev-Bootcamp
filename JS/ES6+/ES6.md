# ES6+
## `const`
* Allows us to create constants, or objects that cannot be redeclared
```
var student = "Peter"
student = "Matt"
// This works just fine!

const student = "Peter"
student = "Matt"
// Error
```

#### Gotcha with `const`
```
const numbers = [1,2,3,4];

numbers.push(10)
// [1,2,3,4,10];
```
* You can modify an object assigned to a `const` variable, but you can not declare it again
* `const` *DOES NOT MAKE VARIABLES IMMUTABLE*

## `let`
```
let instructor = "Tim";
instructor = "Elie"; // no problem!
let instructor = "Colt" // SyntaxError
```
* Can reassign, but cannot redeclare
* `let` creates a brand new scope in JavaScript called “block scope”
```
var instructor = "Elie";

if(instructor === "Elie") {
	let funFact = "Plays the cello";
}

funFact; // ReferenceError
```

#### What is Block Scope?
* Before ES6 there was only global scope and function scope
* `let` introduced a new way to consider scope, by only working in the block it was called in
* Block keywords that use block scope are:
	* `if`
	* `for`
	* `while`
	* `do`
	* `try`
	* `catch`
* When `let` is used in functions, it does not have the same effect as the `var` keyword


#### Hoisting
* Hoisting is when variables defined using `var` are “lifted” or “hoisted” to the top of the scope
```
function helloStudent() {
	return elie
	var elie = "ME!"
}

helloInstructor();
// undefined
```
* JavaScript hoists the variable declaration, but *not the assignment*, to the top of the function. The above code, to JavaScript looks like this:
```
function helloStudent() {
	var elie;
	return elie;
	elie = "ME!"
}
```
* As you can see, the declaration of the variable is hoisted to the top of the function scope
* `let` hoists as well, but we do not have access to its value and get a reference error
	* This is called the Temporal Dead Zone (TDZ)
	* TDZ - a place where variables are declared, but we cannot access their values
```
function helloStudent() {
	return peter;
	let peter = "My name!";
}

helloStudent(); // ReferenceError
```

#### So, when should we use `let`?
* When you’re in a block and don’t want your variables accessible outside of that block, use the `let` keyword

#### Use Cases for `let`
```
for(var i = 0; i < 5; i++) {
	setTimeout(function() {
		console.log(i)
	}, 1000);
}

// 5 (five times)
```
* The reason this does not output `0, 1, 2, 3, 4` is that by the time the `setTimeout` function is run (1 second later), the loop is done iterating and just returns 5, five times.
```
for(let i = 0; i < 5; i++) {
	settTimeout(function() {
		console.log(i);
	}, 1000);
}

// 0
// 1
// 2
// 3
// 4
```


## Template Strings
* Also known as string interpolation

_The Old Way_:
```
var firstName = "Peter";
var lastName = "Eck";

console.log("Hello " + firstName + " " + lastName);
// ERROR PRONE!
```

_The New Way_:
```
var firstName = "Peter";
var lastName = "Eck";

console.log(`Hello ${firstName} ${lastName}`);
```

#### Multiline String:
* Template strings also allows us to easily make multiline strings
```
"
Hello
"
// does not work

`
Hello
How
Cool
Is
This
Feature
`
```

## Arrow Functions:
```
var add = function(a,b) {
	return a+b;
}
```
* Replace the `function` keyword with `=>` to form an arrow
* The parameters go first, then the `=>` sign
```
var add = (a,b) => {
	return a+b;
}
```

#### One-line Arrow Functions:
* You can put arrow functions on one line
* But - you must first omit the return keyword, as well as the curly braces:
```
var add = (a,b) => a+b;
```

#### Refactoring with Arrow Functions:
```
[1,2,3].map(function(value) {
	return value * 2;
});
// [2,4,6]
```
Changes to…
```
[1,2,3].map(value => value * 2);
// [2,4,6]
```

```
function doubleAndFilter(arr) {
	return arr.map(function(value) {
		return value * 2;
	}).filter(function(value) {
		return value % 3 === 0;
	})
};

doubleAndFilter([5,10,15,20]); // [30]
```
Changes to…
```
var doubleAndFilter = arr => arr.map(val => val * 2).filter(num => num % 3 === 0);

doubleAndFilter([5,10,15,20]); // [30]
```
* When you only have one parameter you do not need to wrap it in parenthesis

#### What’s the catch?
* Arrow functions are not exactly the same as regular functions
* Arrow functions do not get their own `this` keyword
* Inside of an arrow function, the keyword of `this` has its original meaning from the enclosing context
* The fact that arrow functions do not have their own `this` keyword can be quite helpful - you just need to understand when you might NOT want that
```
var student = {
	firstName: "Peter",
	sayHi: function() {
		setTimeout(function() {
			console.log("Hello " + this.firstName);
		}, 1000);
	}
}

student.sayHi(); // Hello undefined

var student = {
	firstName: "Peter",
	sayHi: function() {
		setTimeout(function() {
			console.log("Hello " + this.firstName);
		}.bind(this), 1000);
	}
}

student.sayHi(); // Hello Peter
```
* We can still achieve what the second function above is doing without using `bind()` by taking advantage of arrow functions:

```
var student = {
	firstName: "Peter",
	sayHi: function() {
		setTimeout(() => {
			console.log("Hello " + this.firstName);
		}, 1000);
	}	
}

student.sayHi(); // Hello Peter
```
* We don’t need `bind()` because in arrow functions, `this` is defined as one step above the block it is used in
* In this case, `this.firstName` refers to the `student` object, which is where it’s `this` keyword is pointing to
* Why did we use both an arrow function and a regular function declaration?
	* Because if we used an arrow function on the `sayHi` method it would not have its own `this`, and `this` would be pointing to the global object, the window
#### Drawbacks:
* Arrow functions do not get their own keyword arguments in `arguments`
```
var add = (a,b) => {
	return arguments;
}

add(2,4); // ReferenceError: arguments is not defined
```

* An arguments keyword can be accessed if the arrow function is inside of another function (it will be the outer functions arguments)
```
function outer() {
	return inner = () => {
		return arguments;
	}
}

outer(1)(2); // [1]
```
* Notice that it only prints 1


#### When NOT to use Arrow Functions
* Arrow functions should *never* be used as methods in objects since we will get the incorrect value of the keyword `this`
* ES2015 proves a better alternative (coming soon)
```
var student = {
	firstName: "Peter",
	sayHi: () => `Hello $(this.firstName)`
}

student.sayHi(); // Hello undefined
```

#### Arrow Functions Exercise
```
/* 1 - Refactor the following code to use ES2015 arrow functions - make sure your function is also called tripleAndFilter

function tripleAndFilter(arr){
  return arr.map(function(value){
    return value * 3;
  }).filter(function(value){
    return value % 5 === 0;
  })
}

*/

let tripleAndFilter = arr => arr.map(val => val * 3).filter(num => num % 5 === 0);


/* 2 - Refactor the following code to use ES2015 arrow functions. Make sure your function is also called doubleOddNumbers

function doubleOddNumbers(arr){
    return arr.filter(function(val){
        return val % 2 !== 0;
    }).map(function(val){
        return val *2;
    })
}

*/

let doubleOddNumbers = arr => arr.filter(val => val % 2 !== 0).map(val => val * 2);

/* 3 - Refactor the following code to use ES2015 arrow functions. Make sure your function is also called mapFilterAndReduce.

function mapFilterAndReduce(arr){
  return arr.map(function(val){
    return val.firstName
  }).filter(function(val){
    return val.length < 5;
  }).reduce(function(acc,next){
    acc[next] = next.length
    return acc;
  }, {})
}
*/

let mapFilterAndReduce = arr => {
	return arr.map(function(val) {
		return val.firstName
	}).filter(val => val.length < 5).reduce((acc, next) => {
		acc[next] = next.length
		return acc;
	}, {})
}

var mapFilterAndReduce = function() {
	return arr.map(function(val) {
		return val.firstName
	}).filter(val => val.length < 5).reduce(function(acc, next) {
	acc[next] = next.length
	return acc;
}, {});
}

/* 4 - Write a function called createStudentObj which accepts two parameters, firstName and lastName and returns an object with the keys of firstName and lastName with the values as the parameters passed to the function.

Example:
    createStudentObj('Elie', 'Schoppik') // {firstName: 'Elie', lastName: 'Schoppik'}
*/

let createStudentObj = (firstName, lastName) => {
	var object = {};
	return Object.assign(object, {firstName: firstName}, {lastName: lastName});
}

/* 5 - Given the following code: 


Refactor this code to use arrow functions to make sure that in 1000 milliseconds you console.log 'Hello Colt'
    
var instructor = {
  firstName: "Colt",
  sayHi: function(){
    setTimeout(function(){
      console.log('Hello ' + this.firstName)
    },1000)
  }
}

*/

let instructor = {
	firstName: "Colt",
	sayHi: function() {
		setTimeout(() => {
			console.log("Hello " + this.firstName)
		}, 1000);	
	}
}
```

## Default Parameters
```
function add(a, b) {
	return a+b;
}

add() // NaN (becase undefined + undefined = Nan)
```
* What if we want to add default parameters, in case the function is called without any
```
function add(a=10, b=20) {
	return a+b;
}

add(); // 30
add(20) // 40
```
* Helps lessen conditional logic and overwriting code

## `For…of` Loops
```
var arr =[1,2,3,4,5];

for(let val of arr) {
	console.log(val);
}
```
* Can’t access an index
* Can only be used on data structures with a `Symbol.iterator` method implemented
	* Cannot use to iterate over an object

## Rest
* Collects the remaining arguments in a function and returns them in an array
```
function printRest(a,b,...c) {
	console.log(a);
	console.log(b);
	console.log(c);
}

printRest(1,2,3,4,5);

// 1
// 2
// [3,4,5]
```
* Rest operator always returns an array
* Is called the rest operator only when it is a parameter to a function
* Is accessed without `...` in a function
* A better alternative to using the arguments array-like-object
```
// ES5
function sumArguments() {
	var total = 0;
	for(var i = 0; i < arguments.length; i++) {
		total += arguments[i];
	}
	return total;
}

// Fancier ES5

function sumArguments() {
	var argumentsArray = [].slice.call(arguments);
	return argumentsArray.reduce(function(acc, next) {
		return acc + next;
	});
}


// ES6
var sumArguments = (...args) => args.reduce((acc, next) => acc + next);
```
* Helps cut down on code, instead of writing out all of the arguments, the rest operator `...` allows us to forget about the arguments passed, and focus on the logic in our function

## Spread
* Used on arrays to spread each value out (as a common separated value)
* Useful when you have an array, but what you are working with expects comma separated values
```
// ES5

var arr1 = [1,2,3];
var arr2 = [4,5,6];
var arr3 = [7,8,9];

var combined = arr1.concat(arr2).concat(arr3);
```

```
// ES6

var combined = [...arr1, ...arr2, ...arr3];
```
* You can use the spread argument instead of apply too:
```
// ES5

var arr = [3,2,4,1,5];
Math.max(arr) // NaN

Math.max.apply(this, arr); // 5
```

```
// ES6

Math.max(...arr); // 5
```

```
// ES5

function sumValues(a,b,c) {
	return a+b+c;
}

sumValues.apply(this, nums); // 47
```

```
// ES6

sumValues(...nums); // 47
```

#### Rest & Spread Exercises:
```
1. Write a function called smallestValue which accepts a variable number of parameters and returns the smallest parameters passed to the function.

function smallestValue(...args) {
	return Math.min(...args);
}

2. Write a function called placeInMiddle which accepts two parameters, an array and another array. This function should return the first array with all of the values in the second array placed in the middle of the first array.

function placeInMiddle(arr, vals) {
	let mid = Math.floor(arr.length / 2);
	arr.splice(mid, 0, ...vals);
	return arr;
}

3. Write a function called joinArrays which accepts a variable number of parameters (you can assume that each argument to this function will be an array) and returns an array of all of the parameters concatenated together

function joinArrays(...args) {
	return args.reduce((acc, next) => acc.concat(next), []);
}


4. Write a function called sumEvenArgs which takes all of the parameters passed to a function and returns the sum of the even ones.

function sumEvenArgs(...args) {
	return args.reduce((acc, next) => next % 2 ===0 ? acc += next : acc, 0);
}


5. Write a function called flip which accepts a function and a value for the keyword this. Flip should return a new function that when invoked, will invoke the function passed to flip with the correct value of the keyword this and all of the parameters passed to the function REVERSED. HINT - if you pass more than two parameters to flip, those parameters should be included as parameters to the inner function when it is invoked. You will have to make use of closure!

function flip(fn, thisArg, ...outerArgs) {
	return function(innerArgs) {
		let allArgs = outerArgs.concat(innerArgs).slice(0, fn.length);
		return fn.apply(thisArg, allArgs.reverse());
	}
}


6. Write a function called bind which accepts a function and a value for the keyword this. Bind should return a new function that when invoked, will invoke the function passed to bind with the correct value of the keyword this. HINT - if you pass more than two parameters to bind, those parameters should be included as parameters to the inner function when it is invoked. You will have to make use of closure!

function bind(fn, thisArg, ...outerArgs) {
	return function(...innerArgs) {
		return fn.apply(thisArg, [...outerArgs, ...innerArgs]);
	}
}
```


## Object Enhancements
#### Object Shorthand Notation:
```
// ES5
var firstName = "Peter",
var lastName = "Eck"

var student = {
	firstName: firstName,
	lastName: lastName
}

// ES6

var firstName = "Peter";
var lastName = "Eck";

var student = {
	firstName,
	lastName
}
```
* If the key and value are the same, we only need to pass one in

#### Object Methods:
```
// ES5

var instructor = {
	sayHello: function() {
		return "Hello!"
	}
}
```

```
// ES6

var instructor = {
	sayHello() {
		return "Hello";
	}
}
```

#### Computed Property Names:
```
// ES5

var firstName = "Peter";
var instructor = {};
instructor[firstName] = "That's me!";

instructor.Peter; // That's me!
```

```
// ES6

var firstName = "Peter";
var instructor = {
	[firstName]: "That's me!"
}

instructor.Peter; // That's me!
```

## Object Destructering
* Extracting values from data stored in objects and arrays
```
// ES5

var instructor = {
	firstName: "Peter",
	lastName: "Eck
}

var firstName = instructor.firstName;
var lastName = instructor.lastName;

firstName; // "Peter"
lastName; // "Eck"
```

```
// ES6

var instructor = {
	firstName: "Peter",
	lastName: "Eck
}

var {firstName, lastName} = instructor;

firstName; // "Peter"
lastName; // "Eck"
```
* Must ensure the variable names are the same as the property names
* But if you’d like to change the variable names, add a colon and the variable name you want:
```
var instructor = {
	firstName: "Peter",
	lastName: "Eck
}

var {firstName: first, lastName: last} = instructor;

first; // "Peter"
last; // "Eck"
```


#### Where Destructering Really Helps
```
// ES5

function createInstructor(options) {
	var options = options || {};
	var name = options.name || {first: "Peter", last: "Eck"}
	var isHilarious = options.isHilarious || false;
	return [name.first, name.last, isHilarious];
}

createInstructor(); // ["Peter", "Eck", false]
createInstructor({isHilarious: true}); 
// ["Peter", "Eck", true]

createinstructor({name: {first: "Peter", last: "Eck"}});
// ["Peter", "Eck", false]
```
* Lots of work!

```
// ES6

function createInstructor({name = {first: "Peter", last: "Eck"}, isHilarious=false } = {}) {
	return [name.first, name.last, isHilarious];
}

createInstructor(); // ["Peter", "Eck", false]
createInstructor({isHilarious: true}); 
// ["Peter", "Eck", true]

createinstructor({name: {first: "Peter", last: "Eck"}});
// ["Peter", "Eck", false]
```
* Passing a destructured object as a *default parameter*
* We assign as a default value an empty object so ES6 knows we are destructering
* If nothing is passed in, we default to the restructured object as the parameter

_Object Fields as Parameters_
```
// ES5

function displayInfo(obj) {
	return [obj.name, obj.favColor];
}

var instructor = {
	name: "Peter",
	favColor: "Blue"
}

displayInfo(instructor); // ["Peter", "Blue"]
```

```
// ES6

function displayInfo({name, favColor}) {
	return [name, favColor];
}

var instructor = {
	name: "Peter",
	favColor: "Blue"
}

displayInfo(instructor); // ["Peter", "Blue"]
```

### Array Destructering
* Destructering allows us to extract values from arrays, or properties from objects, into variables

```
// ES5

var arr = [1,2,3];

var a = arr[0];
var b = arr[1];
var c = arr[2];

a; // 1
b; // 2
c; // 3
```

```
// ES6

var arr = [1,2,3];
var [a,b,c] = arr;

a; // 1
b; // 2
c; // 3
```

Another Example:
```
// ES5

function returnNumbers(a,b) {
	return [a,b];
}

var first = returnNumbers(5,10)[0];
var second = returnNumbers(5,10)[1];

first; // 5
second; // 10
```

```
// ES6

function returnNumbers(a,b) {
	return [a,b];
}

[first, second] = returnNumbers(5,10);

first; // 5
second; // 10
```

##### Swapping Values:
```
// ES5

function swap(a,b) {
	var temp = a;
	a = b;
	b = temp;
	return [a,b];
}

swap(10,5); // [5,10]
```

```
// ES6

function swap(a,b) {
	return [a,b] = [b,a];
}

swap(5,10); // [10,5]
```


### Destructering Exercises:
```
1. Write a function called displayStudentInfo which accepts an object and returns the string "Your full name is" concatenated with the value of the first key and a space and then the value of the last key. See if you can destructure this object inside of the function.

function displayStudentInfo(obj) {
	[first, second] = obj
}

2. Write a function called printFullName which accepts an object and returns the string "Your full name is" concatenated with the value of the first key and a space and then the value of the last key. See if you can destructure this object DIRECTLY from the parameters. The output of the printFullName function should be the exact same as the displayStudentInfo function. 



3. Write a function called createStudent which accepts as a parameter, a default parameter which is a destructured object with the key of likesES2015 and value of true, and key of likesJavaScript and value of true. 



4. Write a function called reverseArray which accepts an array and returns the array with all values reversed. See if you can do this without creating a new array!


```



# PART TWO:
## `class`
* Creates a constant that cannot be redeclared
* Abstraction of constructor functions, because JavaScript does not have built-in support for OOP
* Does NOT hoist
* Still use `new`
```
class Student {
	constructor(firstName, lastName) {
		this.firstName = firstName;
		this.lastName = lastName;
	}
}

var peter = new Student("Peter", "Eck");
```

### Instance Methods
```
class Student {
	constructor(firstName, lastName) {
		this.firstName = firstName;
		this.lastName = lastName;
	}
	sayHello() {
		return `Hello ${this.firstName} ${this.lastName}`;
	}
}
```
* If you place methods inside the constructor function, they are redefined each time we create a new instance

#### Class Exercise:
```
// 1 - Create a class for a Person. Each person should have a firstName, lastName, favoriteColor, favoriteNumber.

/* 2 - Add an instance method called multiplyFavoriteNumber that accepts one parameter and returns the product of the parameter multiplied with the favoriteNumber property on a person object.

class Person {
    constructor(firstName, lastName, favoriteColor, favoriteNumber) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.favoriteColor = favoriteColor;
        this.favoriteNumber = favoriteNumber;
    }
    multiplyFavoriteNumber(num) {
        return num * this.favoriteNumber;
    }
}
```


### Inheritance
* Use the `extends` keyword!
```
class Person {
	constructor(firstName, lastName) {
		this.firstName = firstName;
		this.lastName = lastName;
	}
	sayHello() {
		return `Hello ${firstName} ${lastName}`;
	}
}

class Student extends Person {

}
```


### Super
* 
```
class Student extends Person {
	constructor(firstName, lastName) {
		super(firstName, lastName);
	}
}
```
* Can only be used if a method by the same name lives in the parent class


#### `extend` and `super`  Exercise:

```
// 1 - Create a class for for a Vehicle. Each vehicle should have a make, model and year property.
// 2 - Add an instance method called start which returns the string "VROOM!"
// 3 - Add an instance method called toString which returns the string "The make, model, and year are" concatenated with the make, model and year property
// 4 - Create a class for a Car. Each object created from the Car function should also have a make, model, and year and a property called numWheels which should be 4. The Car prototype should inherit all of the methods from the Vehicle prototype
// 5 - Create a class for a Motorcycle. Each object created from the Motorcycle function should also have a make, model, and year and a property called numWheels which should be 2. The Motorcycle prototype should inherit all of the methods from the Vehicle prototype

class Vehicle {
    constructor(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }
    start() {
        return "VROOM!";
    }
    toString() {
        return `The make, model, and year are ${this.make} ${this.model} ${this.year}`;
    }
}

class Car extends Vehicle {
    constructor(make, model, year) {
        super(make, model, year);
        this.numWheels = 4;
    }
}

class Motorcycle extends Vehicle {
    constructor(make, model, year) {
        super(make, model, year);
        this.numWheels = 2;
    }
}
```


## `Maps`
* Also called “hash maps” in other languages
* Similar to objects, except the keys can be any data type
* Use the `new` keyword
```
var firstMap = new Map;

// Setting values

firstMap.set(1, "Peter");
firstMap.set(false, "a boolean");
firstMap.set("nice", "a string");

// Deleting values

firstMap.delete("nice") // true

// Size

firstMap.size // 2

// Extracting values

firstMap.get(1); // "Peter"
firstMap.get(false) // "a boolean"
firstMap.get(arrayKey); // [1,2,3,4,5]
firstMap.get(objectKey); // {a:1}
```

We can also iterate over a map:
```
firstMap.forEach(v => console.log(v));

// Peter
// a boolean
// [1,2,3,4,5]
// {a:1}
```
* * `maps` implement a `Symbol.iterator` which means we can also use a `for...of` loop to iterate

To iterate over the keys and values of a `map`:
```
firstMap.values();
firstMap.keys();
```

#### Why Use a `map`  ?
* Finding the size of a `map` is easy - no more loops or `Object.keys()`
* The keys can be any data type
* You’re never able to overwrite keys, because `map` does not have an `Object.prototype` property
* Iterating over keys and values in a `map` is easy

#### When to use a `map`
* If you need to look up keys dynamically (they are not hard coded strings)
* If you need keys that are not strings
* If you are frequently adding and removing key / value pairs
* If you are operating on multiple keys at a time

#### WeakMaps:
* Similar to `map`, but all keys must be objects
* This makes a WeakMap more performant than a `map`
* Values in a WeakMap can be cleared from memory if there is no reference to them
* Cannot iterate over WeakMaps

## `Sets`
* All values in a set are unique
* Any type of value can exist in a `set`
* Created using the `new` keyword

```
var s = new Set;
OR
var s2 = new Set([3, 1, 4, 1, 2, 1, 5]);

s.add(10); // {10}
s.add(20); // {10, 20}
s.add(10); // {10, 20}

s.size; // 2

s.has(10); // true

s.delete(20); // true

s.size; // 1
```
* `Sets` also have a `Symbol.iterator` property on them, so we can iterate, use `for…of` loops and more

#### `WeakSet`
* Similar to a `set`, but all values must be objects
* Values in a  WeakSet can be cleared from memory if there is no reference to them
* More performant than sets, but cannot be iterated over


#### `map` and `set` Exercises:
```
class MessageBoard {
    
    /*
    In your constructor method, you should assign two properties for each object created from the MessageBoard class. The first should be a property called messages which is an empty Map, and the second is a property called id which has a value of 1. 
    
    constructor(messages, id){
        this.messages = new Map();
        this.id = 1;
    }
    
    /*
    
    Add a method called addMessage which accepts a string. The function should add a key and value to the messages map with a key of whatever the value of this.id is and a value of whatever the string is that is passed to the function. The function should return the object created from the class so that the method can be chained. (HINT - to implement the last part, make sure to return this).

    addMessage(str){
        this.messages.set(this.id, str);
		  this.id++;
		  return this;
    }
    
    /*
    Add a method called findMessageById which accepts a number and returns the message in the messages map with the same key as the number passed to the function. If the key is not found in the messages map, the function should return undefined.
    
    findMessageById(num){
			return this.messages.get(id);
	}
    /*
    Add a method called findMessageByValue which accepts a string and returns the message in the messages map with the same value as the string passed to the function. If the value is not found in the messages map, the function should return undefined.

    findMessageByValue(str){
      for(let msg of this.messages.values()) {
			if(msg === val) return message;
		}
    }	
    
    Add a method called removeMessage which accepts a number and removes a message in the messages map with a key of the number passed to the function.
    
    removeMessage(id){
        this.messages.delete(id);
		  return this;
    }
    
    Add a method called numberOfMessages which returns the number of keys in the messages map
    
    numberOfMessages(){
        return this.messages.size;
    }
    
    /*
    Add a method called messagesToArray which returns an array of all of the values in the messages map
    
    messagesToArray(){
        return Array.from(this.messages.values());
    }
}

Write a function called uniqueValues which accepts an array and returns the number of unique values in the array

function uniqueValues(arr){
	return new Set(arr).size;
}


Write a function called hasDuplicates which accepts an array and returns true if there are duplicate values in the array, otherwise it should return false.

function hasDuplicates(arr){
  return new Set(arr).size !== arr.length
}

Write a function called countPairs which accepts an array of numbers and a number. The function should return the number of unique pairs (two numbers) that sum up to the number passed to the function.

function countPairs(){
  var cache = new Set(arr);
	fvar count = 0;
	for(let val of arr) {
		cache.delete(val);
		if(cache.has(num - val)) {
			count++;
		}
	}
	return count;
}

```












