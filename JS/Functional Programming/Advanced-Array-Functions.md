# Advanced Array Functions
### `forEach`:
* iterates through an array
* Runs a callback function on each value in the array
* When the loop ends, forEach returns undefined
* *FOREACH ALWAYS RETURNS UNDEFINED*

###### Anatomy of `forEach`
```
[1,2,3].forEach(function(value, index, array) {
	// Do something
});
```
* Array to loop through
* forEach method called
* Callback function
	* Each value in the array
	* Each index in the array
	* the entire array
* *In the case above, since there are three items in the array, the callback function will be executed three times* 
* We don’t always need all three parameters in the callback function, but *order matters*

###### How does `forEach` work?

```
function forEach(array, callback) {
	for(var i = 0; i < arr.length; i++) {
		callback(array[i], i, array);
	}
}
```

Example:
```
var arr = [1,2,3];

arr.forEach(function(value, index, array) {
	console.log(value);
}):

// EXPECTED OUTPUT
// 1
// 2
// 3
```

Simple `forEach` in a function:
```
function halfValues(arr) {
	var newArr = [];
	arr.forEach(function(val) {
		newArr.push(val / 2);
	})
	return newArr;
}

halfValues([2,4,6])

// EXPECTED OUTPUT
// 1
// 2
// 3
```

Exercises: 
```
/*
Write a function called doubleValues which accepts an array and returns a new array with all the values in the array passed to the function doubled



Examples:
    doubleValues([1,2,3]) // [2,4,6]
    doubleValues([5,1,2,3,10]) // [10,2,4,6,20]

*/
function doubleValues(arr){
    var newArr = [];
    arr.forEach(function(value) {
        newArr.push(value * 2);
    });
    return newArr;
}

/*
Write a function called onlyEvenValues which accepts an array and returns a new array with only the even values in the array passed to the function

Examples:
    onlyEvenValues([1,2,3]) // [2]
    onlyEvenValues([5,1,2,3,10]) // [2,10]

*/
function onlyEvenValues(arr){
    newArr = [];
    arr.forEach(function(value) {
        if(value % 2 === 0) {
            newArr.push(value);
        }
    });
    return newArr;
}

/*
Write a function called showFirstAndLast which accepts an array of strings and returns a new array with only the first and last character of each string.

Examples:
    showFirstAndLast(['colt','matt', 'tim', 'udemy']) // ["ct", "mt", "tm", "uy"]
    showFirstAndLast(['hi', 'goodbye', 'smile']) // ['hi', 'ge', 'se']

*/
function showFirstAndLast(arr){
    newArr = [];
    arr.forEach(function(value, index, array) {
        newArr.push(value[0] + val[val.length - 1]);
    })
    return newArr;
}

/*
Write a function called addKeyAndValue which accepts an array of objects, a key, and a value and returns the array passed to the function with the new key and value added for each object 

Examples:
    addKeyAndValue([{name: 'Elie'}, {name: 'Tim'}, {name: 'Matt'}, {name: 'Colt'}], 'title', 'instructor') 
    
    // [{name: 'Elie', title:'instructor'}, {name: 'Tim', title:'instructor'}, {name: 'Matt', title:'instructor'}, {name: 'Colt', title:'instructor'}]

*/
function addKeyAndValue(arr,key,value){
    arr.forEach(function(value, index, array) {
        value[key] = value; 
    })
    return arr;
}

/*
Write a function called vowelCount which accepts a string and returns an object with the keys as the vowel and the values as the number of times the vowel appears in the string. This function should be case insensitive so a lowercase letter and uppercase letter should count

Examples:
    vowelCount('Elie') // {e:2,i:1};
    vowelCount('Tim') // {i:1};
    vowelCount('Matt') // {a:1})
    vowelCount('hmmm') // {};
    vowelCount('I Am awesome and so are you') // {i: 1, a: 4, e: 3, o: 3, u: 1};
*/
function vowelCount(string) {
    var splitArr = str.split("");
    var obj = {};
    var vowels = "aeiou";
    
    splitArr.forEach(function(letter) {
        if(vowels.indexOf(letter.toLowerCase()) !== -1) {
            if(letter in obj) {
                obj[letter]++
            }
            else {
                obj[letter] = 1;
            }
        }
    });
    return obj;
}
```

### `map`
* Invoked on an array
* First thing it does is creates a new array
* It iterates over the first array
* Runs a callback function for each value in the array
* Takes the value returned from callback and places it in the new array
* Returns the new array
* *map ALWAYS returns a new array of the SAME LENGTH*

```
var arr = [1,2,3]

arr.map(function(value, index, array) {
	return value * 2;
});

// EXPECTED OUTPUT
// [2,4,6]
```

###### How does `map` work?
```
function map(arr, callback) {
	var newArr = [];
	for(var i = 0; i < arr.length; i++) {
		newArr.push(callback(arr[i], i, arr))
	}
	return newArr;
}
```

###### Map in a function:
```
function tripleValues(arr) {
	return arr.map(function(value) {
		return value * 3
	});
}
```
Another example:
```
function onlyFirstName(arr) {
	return arr.map(function(val) {
		return val.first;
	});
}

onlyFirstName([{first: "Peter", last: "Eck"}, first: "Patrick", last: "Weeks"}]);

// EXPECTED OUTPUT
// ["Peter", "Patrick"]
```

Exercises:
```
/*
Write a function called doubleValues which accepts an array and returns a new array with all the values in the array passed to the function doubled

Examples:
    doubleValues([1,2,3]) // [2,4,6]
    doubleValues([1,-2,-3]) // [2,-4,-6]
*/

function doubleValues(arr){
    return arr.map(function(value, index, array) {
       return value * 2; 
    });
}

/*
Write a function called valTimesIndex which accepts an array and returns a new array with each value multiplied by the index it is currently at in the array.

Examples:
    valTimesIndex([1,2,3]) // [0,2,6]
    valTimesIndex([1,-2,-3]) // [0,-2,-6]
*/

function valTimesIndex(arr){
    return arr.map(function(value, index, array) {
        return value * index;
    });
}

/*
Write a function called extractKey which accepts an array of objects and some key and returns a new array with the value of that key in each object.

Examples:
    extractKey([{name: 'Elie'}, {name: 'Tim'}, {name: 'Matt'}, {name: 'Colt'}], 'name') // ['Elie', 'Tim', 'Matt', 'Colt']
*/

function extractKey(arr, key){
    return arr.map(function(value, index, array) {
        return value[key];
    });
}

/*
Write a function called extractFullName which accepts an array of objects and returns a new array with the value of the key with a name of "first" and the value of a key with the name of  "last" in each object, concatenated together with a space. 

Examples:
    extractFullName([{first: 'Elie', last:"Schoppik"}, {first: 'Tim', last:"Garcia"}, {first: 'Matt', last:"Lane"}, {first: 'Colt', last:"Steele"}]) // ['Elie Schoppik', 'Tim Garcia', 'Matt Lane', 'Colt Steele']
*/

function extractFullName(arr){
    return arr.map(function(value, index, array) {
        var fullName = value.first + " " + value.last;
        return fullName;
    });
}
```

### `filter`
* Creates a new array
* Iterates through the given array
* Runs a callback function on each value in the array
* *If the callback function returns true, that value will be added to the new array*
* *If the callback function returns false, that value will be IGNORED from the array*
* The result of the callback will *ALWAYS* be a boolean 

Example:
```
var arr = [1,2,3];

arr.filter(function(value, index, array) {
	return value > 2;
});

// EXPECTED OUTPUT
// [3]
```

###### How does `filter` work?
```
function filter(array, callback) {
	newArr = [];
	for(var i = 0; i < array.length; i++) {
		if(callback(array[i], i, array)) {
			newArr.push(array[i]);
		}
	}
	return newArr;
}
```

###### `filter` in a function:
```
function onlyFourLetterNames(arr) {
	return arr.filter(function(value) {
		return value.length === 4;
	});
}

onlyFourLetterNames(["Peter", "Matt", "Patrick", "Chuck", "Bill"]);

// EXPECTED OUTPUT
// ["Matt", "Bill]
```
* Need to return the `filter` call in a function

Another example:
```
function divisibleByThree(arr) {
	return arr.filter(function(value) {
		return value & 3 === 0;
	});
}

divisibleByThree([1,2,3,4,5,6,7,8,9])

// EXPECTED OUTPUT
// [3,6,9]
```

Exercises:
```
/*
Write a function called filterByValue which accepts an array of objects and a key and returns a new array with all the objects that contain that key.

Examples:
    filterByValue([{first: 'Elie', last:"Schoppik"}, {first: 'Tim', last:"Garcia", isCatOwner: true}, {first: 'Matt', last:"Lane"}, {first: 'Colt', last:"Steele", isCatOwner: true}], 'isCatOwner') // [{first: 'Tim', last:"Garcia", isCatOwner: true}, {first: 'Colt', last:"Steele", isCatOwner: true}]
*/

function filterByValue(arr, key){
    return arr.filter(function(value, index, array) {
        return value[key] !== undefined;
    });
}

/*
Write a function called find which accepts an array and a value and returns the first element in the array that has the same value as the second parameter or undefined if the value is not found in the array.

Examples:
    find([1,2,3,4,5], 3) // 3
    find([1,2,3,4,5], 10) // undefined
*/

function find(arr, searchValue){
    return arr.filter(function(value, index, array) {
        return value === searchValue;
    })[0];
}

/*
Write a function called findInObj which accepts an array of objects, a key, and some value to search for and returns the first found value in the arrayt.

Examples:
    findInObj([{first: 'Elie', last:"Schoppik"}, {first: 'Tim', last:"Garcia", isCatOwner: true}, {first: 'Matt', last:"Lane"}, {first: 'Colt', last:"Steele", isCatOwner: true}], 'isCatOwner',true) // {first: 'Tim', last:"Garcia", isCatOwner: true}
*/

function findInObj(arr, key, searchValue){
    return arr.filter(function(value, index, array) {
		return value[key] === searchValue;
    })[0];
}

/*
Write a function called removeVowels which accepts a string and returns a new string with all of the vowels (both uppercased and lowercased) removed. Every character in the new string should be lowercased.

Examples:
    removeVowels('Elie') // ('l')
    removeVowels('TIM') // ('tm')
    removeVowels('ZZZZZZ') // ('zzzzzz')
*/

function removeVowels(str){
	var vowels = "aeiou";
	return str.toLowerCase().split("").filter(function(value) {
		return vowels.indexOf(value) === -1
	}).join("");
}

/*
Write a function called doubleOddNumbers which accepts an array and returns a new array with all of the odd numbers doubled (HINT - you can use map and fitler to double and then filter the odd numbers).

Examples:
    doubleOddNumbers([1,2,3,4,5]) // [2,6,10]
    doubleOddNumbers([4,4,4,4,4]) // []
*/

function doubleOddNumbers(arr){
	return arr.filter(function(value) {
		return value % 2 === 0;
	}).map(function(value) {
		return value * 2;
	});
}
```


### `some`:
* Iterates through an array
* Runs a callback on each value in the array
* If the callback returns true *for at least one single value*, the function returns true
* Otherwise, if no values return true, the function returns false
* The `Or` operator of array methods
* The result of the callback will ALWAYS be a boolean
_Example:_
```
var arr = [1,2,3];

arr.some(function(value, index, array) {
	return value < 2;
});

// EXPECTED OUTPUT
// true
```

###### How does `some` work?
```
function some(arr, callback) {
	for(var i = 0; i < arr.length; i++) {
		if (callback(array[i], i, array)) {
			return true;
		}
	}
	return false;
}
```

###### Using `some` in a function:
```
function hasEvenNumber(arr) {
	return arr.some(function(value) {
		return value % 2 === 0;
	});
}
```

```
function hasComma(str) {
	return str.split("").some(function(value) {
		return value === ",";
	});
}

hasComma("This is wonderful");
hasComma("This, my friend, is wonderful!");

// EXPECTED OUTPUT
// false
// true
```

### `every`
* Iterates through an array
* Runs callback on each value in the array
* If callback returns false for ANY single value, the function returns false
* Otherwise, return true
* The result of the callback function will always be evaluated as a boolean
Example:
```
var arr = [-1, -2, -3];

arr.every(function(value, index, array) {
	return value < 0;
});

// EXPECTED OUTPUT
// true
```

###### How does `every` work?
```
function every(arr, callback) {
	for(var i = 0; i < arr.length; i++) {
		if(callback(array[i], i, array) === false) {
			return false;
		}
	}
	return true;
}
```

###### Using `every` in a function:
```
function allLowerCase(str) {
	return str.split("").every(function(value) {
		return value === value.toLowerCase();
	});
}

allLowerCase("this is nice");
allLowerCase("This is nice");

// EXPECTED OUTPUT
// true
// false
```

```
function allArrays(arr) {
	return arr.every(Array.isArray);
}

allArrays([[1], [2], [3,4]]);
allArrays([[1], [2], {}];

// EXPECTED OUTPUT
// true
// false
```

### `reduce`
* Accepts a callback AND an optional second parameter
* Iterates through array
* Runs a callback on each value in the array
* The first parameter to the callback is either the first value in the array or the optional second parameter
* First parameter to the callback is often call the “*accumulator*”
* The returned value from the callback becomes the new value of accumulator
* WHATEVER IS RETURNED FROM THE CALLBACK FUNCTION BECOMES THE NEW VALUE OF THE ACCUMULATOR. 
###### Anatomy of `reduce`:
```
var arr = [1,2,3];
arr.reduce(function(accumulator, nextValue, index, array) {

	}, optional second parameter);
```

Example:
```
var arr = [1,2,3,4,5];
arr.reduce(function(accumulator, nextValue) {
	return accumulator + nextValue;
});

// No second parameter passed to reduce, so the accumulator starts as the first value of the array
```

[image:9FD1ACA6-371F-4777-AC92-50135BD8574A-58323-000305733C4D02CA/Screen Shot 2018-07-11 at 6.23.12 PM.png]

_Passing Optional Second Parameter:_
```
var arr = [1,2,3,4,5];
arr.reduce(function(accumulator, nextValue) {
	return accumulator + nextValue
}, 10);

// EXPECTED OUTPUT
// 25
```

###### Using `reduce` with strings
```
var names = ["Tim", "Matt", "Colt", "Elie"];
names.reduce(function(accumulator, nextValue) {
	return accumulator += " " + nextValue;
}, "The instructors are");

// EXPECTED OUTPUT
// The instructors are Tim Matt Colt Elie
```

###### Using `reduce` with objects
```
var arr = [5,4,1,4,5];
arr.reduce(function(accumulator, nextValue {
	if(nextValue in accumulator) {
		accumulator[nextValue]++;
	}
	else {
		accumulator[nextValue] = 1;
	}
	return accumulator;
}, {});

// EXPECTED OUTPUT
// {5:2, 4:2, 4:1}
```

[image:C3A5DA75-A9A3-450F-8E8D-DB81D318F4FF-58323-0003061E4F40CEF9/Screen Shot 2018-07-11 at 6.35.32 PM.png]

###### Using `reduce` in a function:
```
function someOddNumbers(arr) {
	return arr.reduce(function(accumulator, nextValue) {
		if(nextValue % 2 !== 0) {
			accumulator += nextValue;
		}
		return accumulator
	}, 0);
}

someOddNumbers([1,2,3,4,5]);

// EXPECTED OUTPUT
// 9
```

```
function createFullName(arr) {
	return arr.reduce(function(accumulator, nextValue) {
		accumulator.push(nextValue.first + " " + nextValue.last);
		return accumulator;
	}, []);
}

createFullName([{first: "Colt", last: "Steele"}, {first: "Matt", last: "Lane"}]);

// EXPECTED OUTPUT
// ["Colt Steele", "Matt Lane"]
```

Exercises:

```
/*
Write a function called extractValue which accepts an array of objects and a key and returns a new array with the value of each object at the key.
*/

function extractValue(arr, key){
    return arr.reduce(function(accumulator, nextValue) {
        accumulator.push(nextValue[key])
        return accumulator;
    }, []);
}


/*
Write a function called vowelCount which accepts a string and returns an object with the keys as the vowel and the values as the number of times the vowel appears in the string. This function should be case insensitive so a lowercase letter and uppercase letter should count
*/

function vowelCount(str){
   var vowels = "aeiou";
   return str..split("").reduce(function(acc, next) {
		if(vowels.indexOf(next.toLowerCase()) !== -1) {
			if(next in acc) {
				acc[next]++
			}
			else {
				acc[next] = 1;
			}
		}
		return acc;
   }, {});
}

/*
Write a function called addKeyAndValue which accepts an array of objects and returns the array of objects passed to it with each object now including the key and value passed to the function.
*/

function addKeyAndValue(arr, key, value){
    return arr.reduce(function(acc, next, index) {
		acc[index][key] = value;
		return acc;
    }, arr);
}


/*
Write a function called partition which accepts an array and a callback and returns an array with two arrays inside of it. The partition function should run the callback function on each value in the array and if the result of the callback function at that specific value is true, the value should be placed in the first subarray. If the result of the callback function at that specific value is false, the value should be placed in the second subarray. 
*/

function partition(arr, callback){
	return arr.reduce(function(acc, next) {
		if(callback(next)) {
			acc[0].push(next);
		}
		else {
			acc[1].push(next);
		}
		return acc;
	}, [[], []]);
}
```







