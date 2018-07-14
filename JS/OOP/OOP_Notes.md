# Object-Oriented Programming
#### What is OOP?
* Programming model based around the idea of objects and blueprints
* These objects are constructed from what are called “classes”, which we can think of like a blueprint. We call these objects created from classes “instances”
* JavaScript does *not* have classes built in, so we need to use functions and objects to mimic the technique
```
function House(bedrooms, bathrooms, numSqft) {
	this.bedrooms = bedrooms;
	this.bathrooms = bathrooms;
	this.numSqft = numSqft;
}

var home1 = new House(4, 3, 1000);

home1.bedrooms; // 4
home1.bathrooms; // 3
```

#### The `new` keyword:
* Must be used with a function
* Creates an empty object
* Sets the keyword `this` to be that empty object
* It adds the line `return this` at the end of the function
* It adds a property onto the empty object call `__proto__`, which links the prototype property on the constructor function to the empty object

Dog Example:
```
function Dog(name, age) {
	this.name = name;
	this.age = age;
	this.goodBoye = true;
	this.bark = function() {
		return this.name + " just barked!";
	}
}

var rooney = new Dog("Rooney", 5);
// Rooney just barked!
```

#### Using multiple Constructor functions
```
function Car(make, model, year) {
	this.make = make;
	this.model = model;
	this.year = year;
	this.numWheels = 4;
}

function Motorcycle(make, model, year) {
	this.make = make;
	this.model = model;
	this.year = year;
	this.numWheels = 2;
}
```
* Lots of duplicate code!!!
```
function Car(make, model, year) {
	this.make = make;
	this.model = model;
	this.year = year;
	this.numWheels = 4;
}

function Motorcycle(make, model, year) {
	Car.call(this, make, model, year)
	this.numWheels = 2;
}
```
* We pass `this` into the `Car.call` function because we want it to refer to the Motorcycle constructor, not the Car constructor
* We can use `call` or `apply` in this case
```
function Motorcycle(make, model, year) {
	Car.apply(this, [make,model,year]);
	this.numWheels = 2;
}
```
* We can also use the special keyword `arguments` to pass an unknown number of arguments to the `.apply()` method to clean it up even more:
```
function Motorcycle() {
	Car.apply(this, arguments);
	this.numWheels = 2;
}
```
 * Arguments is a list of all arguments passed to a function

Exercises:
```
// PART 1

// Create a constructor function for a Person, each person should have a firstName, lastName, favoriteColor and favoriteNumber. Your function MUST be named Person. 

// Write a method called multiplyFavoriteNumber that takes in a number and returns the product of the number and the object created from the Person functions' favorite number.

function Person(firstName, lastName, favoriteColor, favoriteNumber) {
	this.firstName = firstName;
  this.lastName = lastName;
  this.favoriteColor = favoriteColor;
  this.favoriteNumber = favoriteNumber;
	this.multipleFavoriteNumber = function(num) {
		return this.favoriteNumber * num;
	}
}

// PART 2

// Given the following code - refactor the Child function to remove all the duplication from the Parent function. You should be able to remove 4 lines of code in the Child function and replace it with 1 single line.

function Parent(firstName, lastName, favoriteColor, favoriteFood){
    this.firstName = firstName;
    this.lastName = lastName;
    this.favoriteColor = favoriteColor;
    this.favoriteFood = favoriteFood;
}

function Child(firstName, lastName, favoriteColor, favoriteFood){
    this.firstName = firstName;
    this.lastName = lastName;
    this.favoriteColor = favoriteColor;
    this.favoriteFood = favoriteFood;
}
==============================================================
function Child(firstName, lastName, favoriteColor, favoriteFood){
    Parent.apply(this, arguments);
}
```

### Prototypes:
* Every constructor function has a property on it called “prototype”, which is an object
* The prototype object has a property on it called “constructor”, which points back to the constructor function
* Anytime an object is created using the `new` keyword, a property called `__proto__` (dunder proto) get created, linking the object and the prototype property of the constructor function

*Note*: Circles are functions, squares are objects
[image:BDBDAA9D-BECA-4ABC-8BD1-E5B61F1490B2-82547-000033C858C90743/Screen Shot 2018-07-14 at 9.16.20 AM.png]

```
function Person(name) {
	this.name = name;
}

var colt = new Person("Colt");
var elie = new Person("Elie");

Person.prototype // Object {constructor: function}...
elie.__proto__ === Person.prototype // true
Person.prototype.constructor === Person // true
```
* When elie and colt are created the `__proto__` property is added and points directly to the constructor function’s prototype property

#### The Prototype Chain
```
function Person(name) {
	this.name = name;
}

var colt = new Person("Colt");
var elie = new Person("Elie");

Person.prototype.isInstructor = true;
colt.isInstructor: // true
elie.isInstructor; // true
```
* We are able to access properties on the prototype through `__proto__`
* This is called the Prototype Chain
* When we add a property to the constructor function, that property is added to all objects created with the `new` keyword for that constructor
*The Prototype Chain*
[image:1D585A8D-C981-44E1-AA1C-C1880682C71F-82547-000034AD10E46063/Screen Shot 2018-07-14 at 9.32.44 AM.png]

###### Adding Methods to the Prototype
```
function Person(name) {
	this.name = name;
	this.sayHi = function() {
		return "Hi " + this.name;
	}
}

elie = new Person("Elie");
elie.sayHi(); // Hi Elie
```
* While this works, its inefficient - every time we make an object using the `new` keyword we have to redefine the `sayHi` function
* Instead, we should create a function on the `Person.prototype` property, which will automatically apply to all objects created from the constructor function
```
function Person(name) {
	this.name = name;
}

Person.prototype.sayHi = function() {
	return "Hi " + this.name;
}

elie = new Person("Elie");
elie.sayHi() // Hi Elie
```

Exercise:
```
Create a constructor function for a vehicle - each object should have a mkae, model, and year property. Each object should also have a property called isRunning which should be set to false. Every object created from the vehicle constructor should have a function called tunrOn, which changes isRunning to true, and a function called turnOff, which changes isRunning to false. Finally, every object should have a method called honk, which returns "Beep!" only if the isRunning property is true:

function Vehicle(make, model, year) {
	this.make = make;
	this.model = model;
	this.year = year;
	this.isRunning = false;
}

Vehicle.prototype.turnOn = function() {
	this.isRunning = true;
}

Vehicle.prototype.turnOff = function() {
	this.isRunning = false
}

Vehicle.prototype.honk = function() {
	if(this.isRunning === true) {
		return "Beep!"
	}
}

```

More Exercises:
```
// 1 - Create a constructor function for a Person. Each person should have a firstName, lastName, favoriteColor, favoriteNumber)

/* 2 - Add a function on the Person.prototype called fullName that returns the firstName and lastName property of an object created by the Person constructor concatenated together.

// 3 -  Add a property on the object created from the Person function called family which is an empty array. This will involve you going back and adding an additional line of code to your Person constructor you previously created in exercise 1.

/* 4 - Add a function on the Person.prototype called addToFamily which adds an object constructed from the Person constructor to the family array. To make sure that the object you are adding is an object construced from the Person constructor (HINT - take a look at the instanceof keyword). Make sure that your family array does not include duplicates! This method should return the length of the family array.

==============================================================
function Person(firstName, lastName, favoriteColor, favoriteNumber) {
	this.firstName = firstName;
	this.lastName = lastName;
	this.favoriteColor = favoriteColor;
	this.favoriteNumber = favoriteNumber;
	this.family = [];
}

Person.prototype.fullName = function() {
	return this.firstName + " " + this.lastName;
}

Person.prototype.addToFamily = function(newMember) {
	if(this.family.indexOf === -1) {
		if(newMember instaceof Person) {
			this.family.push(newMember);
		}
	}
	return this.family.length;
}


// PART II 

// 1 - Implement your own version of Array.prototype.map. The function should accept a callback and return a new array with the result of the callback for each value in the array. 

/* 2 - Implement a function called reverse that reverses a string and place it on the String.prototype

==============================================================
1.)

Array.prototype.map = function(callback) {
	var newArr = [];
	for(var i = 0; i < this.length; i++) {
		newArr.push(callback(this[i], i, this));
	}
	return newArr;
}

2.)

String.prototype.reverse() {
	var newStr = "";
	for(var i = this.length - 1; i >= 0; i--) {
		newStr += this[i];
	}
	return newStr;
}

```

* Using `indexOf` we are checking if the new member is already in the family array. Since `indexOf` returns -1 if there is no value matching the description, we know a member is not already in the array when the `indexOf` call returns -1 (in this case, using an `if` statement)

#### Prototypal Inheritance:
* Inheritance is the passing of methods and properties from one class to another

Example:
```
function Person(firstName, lastName) {
	this.firstName = firstName;
	this.lastName = lastName;
}

Person.prototype.sayHi = function() {
	return "Hello " + this.firstName + " " + this.lastName;
}

function Student(firstName, lastName) {
	return Person.apply(this, arguments);
}

Student.prototype.sayHi = function() {
	return "Hello " + this.firstName + " " + this.lastName;
}
```
* While we used `apply()` to cut down on some of the duplicated code, we’re still writing the `.prototype.sayHi` function twice - this is where prototypal inheritance comes in
* Instead of repeating ourselves, we can pass methods from one class to another
* We can’t just assign one object to another - it will just create a reference: 
`Student.prototype = Person.prototype` <- any changes to Student will be made to Person as well, and vice versa
* Instead we can use `Object.create`
	* `Object.create` creates a brand new function and accepts as its first parameter what the prototype object should be for the newly created object
```
function Student(firstName, lastName) {
	Person.apply(this, arguments);
}

Student.prototype = Object.create(Person.prototype);
```
* Why not the `new` keyword?
`Student.prototype = new Person;`
* This adds a lot of unnecessary properties to the prototype object

*But there’s one missing piece…*
* Using the method above will cause the `Student.prototype.constructor` to be set to `Person`
* We need to reset the constructor to the new object:
`Student.prototype.constructor = Student;`

Exercises:
```
// 1 - Create a constructor function for a Vehicle. Each vehicle should have a make, model and year property.

// 2 - Add a function to the Vehicle prototype called start which returns the string "VROOM!"

// 3 - Add a function to the Vehicle prototype called toString which returns the string "The make, model, and year are" concatenated with the make, model and year property

// 4 - Create a constructor function for a Car. Each object created from the Car function should also have a make, model, and year and a property called numWheels which should be 4. The Car prototype should inherit all of the methods from the Vehicle prototype

// 5 - Create a constructor function for a Motorcycle. Each object created from the Motorcycle function should also have a make, model, and year and a property called numWheels which should be 2. The Motorcycle prototype should inherit all of the methods from the Vehicle prototype

==============================================================

function Vehicle(make, model, year) {
	this.make = make;
	this.model = model;
	this.year = year;
}

Prototype.Vehicle.start = function() {
	return "VROOM!";
}

Prototype.Vehicle.toString = function() {
	return "This car is a " + this.year + " " + this.make + " " + this.model;
}

function Car(make, model, year) {
	Vehicle.apply(this, arguments);
	this.numWheels = 4;
}

Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;

function Motorcycle(make, model, year) {
	Vehicle.apply(this, arguments);
	this.numWheels = 2;
}

Motorcycle.prototype = Object.create(Vehicle.prototype);
Motorcycle.prototype.constructor = Motorcycle
```





