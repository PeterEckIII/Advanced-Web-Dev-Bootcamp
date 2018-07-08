# Testing
### Unit Tests:
* Unit tests are a programming feature that tests part of an application (or “units”).
* Commonly, each unit is tested individually and independently to ensure an application is running as expected

_What do we need to start testing?_
* A framework to write tests - in this case, Jasmine
* A way of describing the code we are testing
* A tool where we can make assertions or expectations about our code

##### Essential Keywords:
* describe - let me describe ____________ to you
* it - let me tell you about _____________ in more detail
* expect - here’s what I expect to happen _____________

Conceptual:
```
describe(“Earth”)
	it("is round")
		expect(earth.isRound.toBe(true))
	it("is the third planet from the sun")
		expect(earth.numberFromSun).toBe(3)
```

Example:
```
var earth = {
	isRound: true,
	numberFromSun: 3
}

describe("Earth", function() {
	it("is round", function() {
		expect(earth.isRound).toBe(true)
	});
	it("is the third planet from the sun", function() {
		expect(earth.numberFromSun).toBe(3)
	});
});
```

#### Matchers:
* Matchers are the functions we attach to the result of the expect function:
	* `toBe()`  - triple equals or `not.toBe()`  - triple not equals
	* `toBeCloseTo()`
	* `toBeDefined()`
	* `toBeFalsey()`  or  `toBeTruthy()`
	* `toBeGreaterThan()`  or  `toBeLessThan()`
	* `toContain()` 
	* `toEqual()`  - accepts two different values and if the objects are the same, it will return true, **EVEN IF THEY ARE REFERRING TO DIFFERENT PLACES IN MEMORY**
	* `jasmine.any()`

#### Efficient Jasmine Testing:

```
describe("#push", function() {
	it("adds elements to an array", function() {
		var arr = [1,3,5];
		arr.push(7);
		expect(arr).toEqual([1,3,5,7]);
	});
	it("returns the new length of the array", function() {
		var arr = [1,3,5];
		expect(arr.push(7)).toBe(4);
	});
	it("adds anything into the array", function() {
		var arr = [1,3,5];
		expect(arr.push({})).toBe(4);
	});
});
```
* These tests will all return true and not cause a testing failure, however it is not DRY code
* Instead we can shorten things up with Jasmine’s built in `beforeEach()` and `afterEach()` methods.

###### `beforeEach()`

* `beforeEach()`  accepts a callback that will be run **before the callback** for each `it()` function:

```
describe("Arrays", function() {
	var arr;
	beforeEach(function() {
		arr = [1,3,5];
	});

	it("adds elements to an array", function() {
		arr.push(7);
		expect(arr).toEqual([1,3,5,7]);
	});

	it("returns the new length of the array", function() {
		expect(arr.push(7)).toBe(4);
	});

	it("adds anything into the array", function() {
		expect(arr.push({})).toBe(4);
	});
});
```
* **NOTE**:We need to define `arr` before the `beforeEach()` function, otherwise it would not be available to any other usage due to JavaScript’s screwy scope properties.

###### `afterEach()`

* `afterEach()` accepts a callback that will be run **after the callback** for each `it()` function
* Commonly called “teardown code”, and is used in testing DBs
```
describe("Counting", function() {
	var count = 0;

	beforeEach(function() {
		count++
	});

	afterEach(function() {
		count = 0;
	});

	it("has a counter that increments", function() {
		expect(count).toBe(1);
	});

	it("gets reset", function() {
		expect(count).toBe(1);
	});
});
```

###### Nesting Describe:
* When testing oft-used objects like Arrays, you can nest describe blocks to make your code more readable and efficient.

```
describe("Array", function() {
	var arr;
	beforeEach(function() {
		arr = [1,3,5];
	});

	describe("#unshift", function() {
		it("adds an element to the beginning of an array", function() {
			arr.unshift(17);
			expect(arr.unshift(1000)).toBe(4);
		});
	});

	describe("#push", function() {
		it("adds elements to the end of an array", function() {
			arr.push(7);
			expect(arr[arr.length-1]).toBe(7);
		});
	});
});
```

###### Pending Tests
* Used when we don’t know what we’ll be testing yet
* You can do this three ways:
	* Omit a callback to the `it()` function
```
describe("Pending specs", function() {
	it("is a pending test if there is no callback function");
});
```
	* Add a `pending()` call to the `it()` function
```
it("is pending if the pending function is invoked in the callback", function() {
	expect(2).toBe(2);
	pending();
});
```
	* Adding an `x` in front of the `it()` function
```
xit("can start with an xit", function() {
	expect(true).toBe(true);
});
```

#### Spies
* Mimics any function and track calls to it and all arguments
* Spies only exist in the `describe` or `it` block in which it is defined
* Spies are removed after each spec
* Can speed up testing
* There are special matchers for interacting with spies
```
function add(a,b,c) {
	return a+b+c;
}

describe("add", function() {
	var addSpy;
	var result;
	beforeEach(function() {
		addSpy = spyOn(window, "add");
		result = addSpy;
	})
	it("can have params tested", function() {
		expect(addSpy).toHaveBeenCalled();
	});
});
```

Testing Parameters:
```
function add(a,b,c) {
	return a+b+c;
}

describe("add", function() {
	var addSpy;
	var result;
	beforeEach(function() {
		addSpy = spyOn(window, "add");
		result = addSpy(1,2,3);
	})
	it("can have params tested", function() {
		expect(addSpy).toHaveBeenCalled();
		expect(addSpy).toHaveBeenCalledWith(1,2,3);
	});
});
```

Returning a value:
```
function add(a,b,c) {
	return a+b+c;
}

describe("add", function() {
	var addSpy;
	var result;
	beforeEach(function() {
		addSpy = spyOn(window, "add").and.callThrough();
		result = addSpy(1,2,3);
	})
	it("can have a return value tested", function() {
		expect(result).toEqual(6);
	});
});
```

Testing Frequency:
```
function add(a,b,c) {
	return a+b+c;
}

describe("add", function() {
	var addSpy;
	var result;
	beforeEach(function() {
		addSpy = spyOn(window, "add").and.callThrough();
		result = addSpy(1,2,3);
	})
	it("can have params tested", function() {
		expect(addSpy.calls.any()).toBe(true);
		expect(addSpy.calls.count()).toBe(1);
		expect(result).toEqual(6);
	});
});
```

##### `Clock` and Testing Time-Dependent Code
* The Jasmine Clock is available testing time-dependent code
* It’s installed by invoking `jasmine.clock().install()`
* Always need to uninstall the clock after you are done to restore the original functions

```
describe("a simple setTimeout", function() {
	var sample;
	beforeEach(function() {
		sample = jasmine.createSpy("sampleFunction");
		jasmine.clock().install();
	});

	afterEach(function() {
		jasmine.clock().uninstall();
	});

	it("is only invoked after 1000 milliseconds", function() {
		setTimeout(function() {
			sample();
		}, 1000);
		jasmine.clock().tick(99);
		expect(sample).not.toHaveBeenCalled();
		jasmine.clock().tick(1);
		expect(sample).toHaveBeenCalled();
	});
});
```


###### Testing Asynchronous Code:
* `beforeAll()`, `afterAll()`, `beforeEach()`, `afterEach()`, and it take an optional single argument (commonly called `done`) that should be called when the async work is complete
* Test will not complete until `done` is called
```
function getUserInfo(username) {
	return $.getJSON("https://api.github.com/users/" + username;
}

describe("#getUserInfo", function() {
	it("returns the correct name for the user", function() {
		getUserInfo('peter').then(function(data) {
			expect(data.name).toBe("Peter Eck");
			done();
		});
	});
});
```

#### Test Driven Development:
* Write tests first, then write code
* Process:
	* Step 1: Write the tests
	* Step 2: See the tests fail
	* Step 3: Write code to pass the tests
	* Step 4: Refactor code as needed
	* Step 5: Repeat

![](Screen%20Shot%202018-07-08%20at%206.33.06%20PM.png)

#### Behavior Driven Development:
* Subset of TDD
* Describe the behavior of our functionality, not just what the result should be
* Helpful when testing the design of the software


### Other Testing Types
* Integration Testing - 
* Acceptance Testing - determines if a result is acceptable or not
* Stress Testing - determine how effective our applications can be under unfavorable conditions









