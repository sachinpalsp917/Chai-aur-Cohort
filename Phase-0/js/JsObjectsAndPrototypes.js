let person1 = {
  fname: "sachin",
  lname: "Pal",
  getFullName: function () {
    if (this.lname !== undefined) return `${this.fname} ${this.lname}`;
    else return this.fname;
  },
};

let person2 = {
  fname: "Dhruv",
  lname: "Pal",
  getFullName: function () {
    if (this.lname !== undefined) return `${this.fname} ${this.lname}`;
    else return this.fname;
  },
};

//console.log(person1.getFullName());
// console.log(person2.getFullName());
//in this both the cases we have to write all the properties just because we wanted the same template for both the objects. but what if there are 20 different persons with different names and properties.
//due to this we can have multiple problems and can lead to multiple bugs.
//so the better option for thi problem is to have a class and define all the properties int that class and then create a object if needed and then create n numbers of objects that you like.
//so lets create a class

class Person {
  constructor(fname, lname) {
    this.fname = fname;
    this.lname = lname;
  }
  //A method that return the complete name
  getFullName() {
    return `${this.fname} ${this.lname}`;
  }
}

//the objects of class person
const p1 = new Person("sachin", "pal");
const p2 = new Person("dhruv", "pal");

// console.log(p1.fname);
// console.log(p1.getFullName());
// console.log(p2.getFullName());

// console.log(Person.prototype); //this is an object
// console.log(p1.__proto__); //this is also an object and that too having all the same properties as Person class.
//so the new Person() does nothing but
//p1.__proto__ = Person.prototype
//then only p1 has all the properties of Person class
//while prototype is used for class i.e blueprint
//and __proto__ is used for actual objects

//In js all things are consdidered as objects. why?
//lets learn through examples
let obj1 = {}

// console.log(obj1.__proto__); //object
// console.log(obj1.__proto__.__proto__); //null 
//this upper line will give value null. WHY? 
//bcoz in js everything is an object and everything is derived from object
//so if we use the __proto__ once it give the parent class i.e Object
//but if we use __proto__ again it will give null as the Object does not have any parent class but instead it is the parent of all things(baap baap hota hai beta beta hota hai)

//lets  take another example
let arr = [1,2,3,4,5]
// console.log(arr.__proto__);//this is also object
// console.log(arr.__proto__.__proto__); //this is also object
// console.log(arr.__proto__.__proto__.__proto__);//this will give null value

//lets take string as exmaple
let n = "sachin"
// console.log(n.__proto__.__proto__.__proto__);// this is giving null
//the above this where we go inside a __proto__ and then inside again is known as 
//proto chaining

//inheritance in class
class A{
    funInsideA(){
        return "sachin in A"
    }
}

class B extends A{
    funInsideB(){
        return "sachin in B"
    }
}

//Now when we see the prototype of A we have on single method and that is the same case for B

const p = new B();
p.funInsideB() //this will work
p.funInsideA() //this will not work why because we don't have this method in our blueprint
//that why we use extends keyword so that our class B has all the methods and properties of class A and we can frrely access it.
//but how does it work it just make the __proto__ of class B as of class A i.e class B has all methods of class A in its __proto__ section and it also has its own methods.