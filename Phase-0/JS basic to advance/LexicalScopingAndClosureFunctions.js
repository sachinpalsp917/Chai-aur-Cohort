//In this lecture we will study about Lexical scoping and closures

let fname = 'sachin'

function sayName(){
    let fname = 'sachin1'
    console.log('Inside sayName',fname);
}

// console.log("value of fname is ",fname);
// sayName()

//now the question is if fname is a global variable then how it's accessible inside sayName function and even if we can access it how can we redcalre it inside sayName function why it's not giving any error
//Ans:
//for every code in js there is a Global execution context(GEC) of the code that run all the code in it we have two parts one is memory and another is code phase
//all the varibles and fucntions are declared inside memory part (variables are defined as undefined and the function is there with it's whole body) now once all is declared the next part starts i.e code part
//the code part runs the program and defines the variable it's value and when it's turn of a function to run there comes the Function Execution context(FEC) in it there is also two parts memory and code and it run just as GEC but for only function context 
//In every FEC there is scope var that takes the refrence of it's parent so even if there is no fname in sayName it will search into it's parent's scope i.e the GEC and then will take the value from there.
//Lexical scoping -> it determines how variable are accessible in a block of code


//exercise -> create a count function that increments a count variable and no other can change it and if there are multiple people incrementing count they should have their own count var

function count(){
    let count = 0

    //Closure function(function binded by it's lexical scope) i.e the return function is a function that is only accessible by count only and not anyone can access it
    return function(){
        count++
        return count
    }
}

const person1 = count()
const person2 = count()

// console.log(person1()); // 1
// console.log(person1()); // 2
// console.log(person1()); // 3
// console.log(person2()); // 1
// console.log(person2()); // 2
// console.log(person2()); // 3
// console.log(person2()); // 4
// console.log(person1()); // 4
// console.log(person2()); // 5


//The main drawback of closure function is memory leak i.e the closure function has access to all the variables of it's parent and it's parents parent. So , till the function call exist it will not let the garbage collector to remove others context and will lead to increase in memory usage.
//hack -> when the usage is over just make the refrence to null i.e after the usage we make person1 and person2 as null
// person1 = null
// person2 = null
//due to this the garbage collector will remove the person1 and person2 to free up the memory but don't do this if we want to use it again later in the code
