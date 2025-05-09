//In this class we will learn about polyfills
//Polyfills -> It's a technique to code functions that are not avaliable in user's browser or built in functionality ka custom implementation
//Do checkout "js/machineCodingPrototype.js" in this i have explained clearly about prototypes and __proto__


let arr = [1, 2, 3, 4, 5];

//let's write polyfill for myForEach
if (!Array.prototype.myForEach) {
  Array.prototype.myForEach = function (userFn) {
    for (let i = 0; i < this.length; i++)
      //function(value,index) -> signature
      userFn(this[i], i);
  };
}

// arr.myForEach((value, index) => {
//   console.log(`At index ${index} value is ${value}`);
// });

//lets write for map function for doubling the elements of array

if (!Array.prototype.myMap) {
  Array.prototype.myMap = function (userFn) {
    let newArr = [];
    for (let i = 0; i < this.length; i++) {
      newArr[i] = userFn(this[i], i);
    }
    return newArr;
  };
}

// arr.myMap((value, index) =>
//   console.log(`At index ${index} value is ${value * 2}`)
// );

//Now let's write for reduce function for adding all the elements of array

if (!Array.prototype.myReduce) {
  Array.prototype.myReduce = function (userFn, initialValue = undefined) {
    let acc = initialValue || this[0];
    let startIndex = initialValue ? 0 : 1;
    for (let i = startIndex; i < this.length; i++) {
      acc = userFn(acc, this[i]);
    }
    return acc;
  };
}

let result = arr.myReduce((acc, current) => {
  return acc + current;
}, 12);
// console.log(result);

//now let's write our own promise

//here we are not writing custom promise but building our own promise mechanism
//steps of a promise:
// - jaise hi promise ka object banate ho ek executor function bana do
// - executor function ke pass resolve and reject function ho
// - resolve ko call karne par
//   - promise fulfill and
//   - jitne bhi .then function hai vo run kardo
// - reject ko call karne par
//   - promise reject ho jata hai and
//   - sabhi catch functions call
// - finally toh har baar karna hai

//first we create a myPromise class
class myPromise {
  //In mypromise we create a constructor and pass the executor function(jo resolve and reject ko call kare)
  constructor(executorFn) {
    this._state = "pending";
    //all the callbacks of flfilled state
    this._successCallbacks = [];
    //all the callbacks of rejected state
    this._errorCallbacks = [];
    //all the callbacks of finally method
    this._finallyCallbacks = [];
    //the value passed inside the callback function (resolve/reject)
    this._value = undefined;
    //executorFunction calling resolve resolve/reject function and we will bind this so once it is run it will not loose it's context
    executorFn(
      this.resolverFunction.bind(this),
      this.rejectorFunction.bind(this)
    );
  }
  //.then function taking the user's callback function as an argument
  then(userFn) {
    //cheking if the state is already fulfilled we do not need to push it in the successcallbacks and run it.
    // just run it only one time
    if (this._state == "fulfilled") {
      console.log("your promise is already fulfilled just run your promise");
      userFn(this._value);
      return this;
    }
    this._successCallbacks.push(userFn);
    return this;
  }
  //.catch function taking the user's callback function as an argument
  catch(userFn) {
    //cheking if the state is already rejected we do not need to push it in the errorcallbacks and run it.
    // just run it only one time
    if (this._state == "rejected") {
      console.log("your promise is already rejected just run your promise");
      userFn();
      return this;
    }
    this._errorCallbacks.push(userFn);
    return this;
  }

  //.finally function taking the user's callback function as an argument
  finally(userFn) {
    //if state is already in pending no need to push inside finallyCallback just run it directly here only
    if (this._state !== "pending") {
      userFn();
      return this;
    }
    this._finallyCallbacks.push(userFn);
    return this;
  }
  //now this is the good stuff the resolver and rejector function
  resolverFunction(value) {
    this._state = "fulfilled";
    this._value = value;
    //running all the success and finally callback functions one after another
    this._successCallbacks.forEach((userFn) => userFn(value));
    this._finallyCallbacks.forEach((userFn) => userFn());
}
rejectorFunction(err) {
    this._state = "rejected";
    //running all the rejected and finally callback functions one after another
    this._errorCallbacks.forEach((userFn) => userFn(err));
    this._finallyCallbacks.forEach((userFn) => userFn());
  }
}

//created a function to return a promise
function wait(seconds) {
  const p = new myPromise((resolve, reject) => {
    // setTimeout(() => resolve("sachin"), seconds * 1000);
    resolve("sachin"); //becoz of this here we have checked the condition of state inside the then, catch and finally function i.e if a promise is already in fulfilled /rejected state the we don't have to push it inside the success/error callbacks and then run it just run it directly
  });
  return p;
}

// const p = wait(0);
// p.then((e) => console.log("V1 run after 2s", e))
//   .catch(() => console.log("V1 failed to load after 2s"))
//   .finally(() => console.log("V1 i will run no matter what"));

// p.then((e) => console.log("V2 run after 2s", e))
//   .catch(() => console.log("V2 failed to load after 2s"))
//   .finally(() => console.log("V2 i will run no matter what"));

//now we will make a script for calling a function only once even if we have written it multiple times

function caller(fn,delay){
    let myId
    //this function calling is called debounce
    return function(...args){
        clearTimeout(myId)
        myId = setTimeout(()=>{
            fn.apply(this,args)
        },delay*1000)
    }
}

function greet(name){
    console.log(`Hello ${name}`);
}

//now this here will directly call the greet function and execute it
// caller(greet("Sachin"),2)
const trueCaller = caller(()=>greet("Sachin"),3)//we have to store it into some variable as it returns a function and then call it
//now even if we call trueCaller multiple time it will run only one time
// trueCaller()
// trueCaller()
// trueCaller()
// trueCaller()


//now we will understand about throttling
const ptaNahi = (fn,delay) =>{
    let myId = null
    return (...args)=>{
        if(myId === null){
            fn(...args)
            myId = setTimeout(()=>{
                myId = null
            },delay)
        }
    }
}

// ptaNahi()
// ptaNahi()
// ptaNahi()

//the difference between debounce and throttling is
//debounce -> if a user click a button multiple time then only the latest request should be addressed and all the previous request should be cancelled(like searching in a search bar)
//throttling -> if a user clicked a button then it can again click it after a certain duration not before it(like in otp resend button)