let expenses = [
  { description: "Groceries", amount: 50, category: "Food" },
  { description: "Electricity bill", amount: 100, category: "Utilities" },
  { description: "Dinner", amount: 30, category: "Food" },
  { description: "Internet bill", amount: 50, category: "Utilities" },
  { description: "sachin", amount: 100, category: "xyz" },
  { description: "sachin", amount: 100, category: "xyz" }, ];

let expenseReport = expenses.reduce((report, expense) => {
  //Basic report
  // report[expense.category] += expense.amount
  //this is somewhat advance thing for your logic
  report[expense.category] = (report[expense.category] || 0) + expense.amount;
  return report;
}, {});
// console.log(expenseReport);

let tasks = [
  { description: "Write report", completed: false, priority: 2 },
  { description: "Send email", completed: true, priority: 3 },
  { description: "Prepare presentation", completed: false, priority: 1 },
];

//return all the incompleted tasks and sort according to priority
let pendingTasks = tasks
  .filter((value) => !value.completed)
  .sort((a, b) => a.priority - b.priority);
// console.log(pendingTasks);

let movieRating = [
  { title: "Movie A", rating: [4, 5, 3] },
  { title: "Movie B", rating: [5, 5, 4] },
  { title: "Movie C", rating: [3, 4, 2] },
];

//return average of movie ratings => [{title:"Movie A",rating: 4,0}]
let averageMovieRatings = movieRating.map((movie)=> {
    let average = movie.rating.reduce((sum,rating)=>sum+rating,0)/movie.rating.length
    return {title: movie.title ,rating: Number(average.toFixed(1))}
})
// console.log(averageMovieRatings);


//Functions

//this is an arrow function which will execute automatically when the file is loaded this is called IIFE(immediately invoked function expression) it's basically use and throw function 
//1st method
// (()=>{})()
//2nd method
// let config = function(){}()

let person1 = {
    name: "sachin",
    greet : function (){
        console.log(`hello ${this.name}`);
    }
}

let person2 = {
    name:"dhruv"
}
//if we want to call greet method of person1 but it should have the properties of person2
// person1.greet.call(person2) //this will call the function using different object

let bindGreet = person1.greet.bind(person2) //this will also call do the same as above but it will return a Function
// console.log(bindGreet);//this will show function
// console.log(bindGreet()); //this will call the function
// console.log(person1.greet.call({name:"xyz"})) // in this we have given the context in the call function itself only

// console.log("HI");
// setTimeout(person1.greet,2*1000)
// console.log("Bye");

//now this will produce the output but why it's giving "hello undefined" bcoz that's how js works i.e
// when we say js to run some code it uses the js stack to run each and everything but when there are functions like setTimeout(these funtions are not of js but of browser) so when it's the turn for setTimeout funtion they are transfered to browser to run and then after all other statments are over then browser transfers these statments to "Callback queue" and then it's transfered to event loop to run on the js stack therefore the context of person1 is over then the setTimeout comes into place. So. that's why it's shows as undefined.
//But to fix this problem we use the bind function to bind the properties of person1 to setTimeout so that it doesn't loose it's context.

// console.log("HI");
// setTimeout(person1.greet.bind(person1),2*1000)
// console.log("Bye");

//Hoisting -> In this scenario js apperars to shift all the variables and function call on top of the file just so that they can have thier own space and run like normal.
//this is all done in the Global Execution Context in that we have two phases 
//1. memory phase -> In this we define all the variables and functions but all variables are defined as "undefined" and functions consists of the whole function body
//2. code phase -> here goes all our code and js runs it line by line

//Due to these two phases in line 89 we have undefiend due to memory phase while in line 94 we have a value of 25 but remenber hoisting only happens in case of var only and that is not true hoisting happens in case let and const also but in case of var we are allowed access while in case of let and const we are not allowed access due to "temporal dead zone"(tdz) -> (tdz means that when we initialize a variable then all the code above is dead for that variable but accessible for below the initialization of variable)

console.log("Age is ",age); //undefined
var age = 25
var test = function () {
    console.log("testing");
}
console.log("Age is ",age); //25
test() //testing
