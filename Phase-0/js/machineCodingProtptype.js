//In this lecture we understand how the .(dot operator) lists out the different methods even without us defining it
//For this js uses prototypes i.e built in classes and methods
//for eg:
let arr = [1, 2, 3];
//when we use the .(dot operator) we get to use diiferent methods
let newArr = arr.map((x) => x * 2);
//console.log(newArr);

//but how come we can use this map function when we haven't even defined it yet
//thats where the prototypes are used
//the type of arr is object i.e its parent class is Array
//but in the js engine there is a Array.prototype class where all this methods are defined
//so when we use the arr
//the js engine inherits all the Array.prototype properties using the __proto__
//arr.__proto__ = Array.prototype
//now the arr has all the methods that the Array.prototype has

//we can also create our own methods and then put it in the prototype class
Array.prototype.hello = function (name) {
  return `hello ${name}`;
};

//now that we have defined the hello function in the array prototype
let result = arr.hello("sachin");
//console.log(result); //O/P: hello sachin

// polyfills -> even if there is not a standard method of js we can make our own method and use it
//for eg:
//razor pay loads all the polyfills in the user's browser so that they don't lose the client just because their browser is not supporting. It acts as a backup function.

//now lets write our own polyfills
const arr1 = [1, 2, 3, 4, 5, 6];
//Question: write polyfill for .forEach
//Or: they will give you some error like Error: .forEach function does not exist and ask you why this happened?

//before proceding learn about the function
// like for .forEach what it takes and how it works or what it returns and then start typing

//now let's create our own forEach function we call it myForEach

Array.prototype.myForEach = function (userFn) {
  const originalArr = this; //this -> current object ko point karta hai
  for (let i = 0; i < originalArr.length; i++) {
    userFn(originalArr[i], i);
  }
};

//we have successfully created our own polyfill named .myForEach
// arr1.myForEach(function (value, index) {
//   console.log(`index ${index}: ${value}`);
// });

//now let's try for .map
//return -> new array, Each item iterate, userFn

Array.prototype.myMap = function (userFn) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    let value = userFn(this[i], i);
    result.push(value);
  }
  return result;
};

let result1 = arr1.myMap((x) => x * 2);
//console.log(result1);

//let's do it for filter
//return -> new array, each item iterate, userFn
let result3 = arr1.filter((e) => e%2 == 0)

Array.prototype.myFilter = function(userFn){
    const result = []
    for(let i=0;i<this.length;i++){
        let value = userFn(this[i],i)
        if(value == true)
            result.push(this[i])
    }
    return result
}

let result2  = arr1.myFilter((e) => e%2 == 0)
console.log("myFilter: ",result2);
console.log("Filter: ",result3);

