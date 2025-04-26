//Datatypes

let number = 42; //Number
let text = "Sachin"; //String
let istrue = true; //Boolean
let nothing = null; // type is null but returns Object
let undefinedVar = undefined; //undefined
let symbolVar = Symbol(); // Symbol

// console.log(typeof symbolVar);

let person = {
  name: "sachin",
  age: 21,
  isStudent: false,
};

//type conversion
let number1 = "42";
// let number1 = "42a" //when converted this to a number it give NaN i.e not a number
// let convertedNum = Number(number1) this is a standard way of approaching and used in many comapnies
// let convertedNum = +number1
let convertedNum = parseInt(number1);

// console.log(convertedNum);
// console.log(typeof convertedNum);

let string = 123;
let convertedString = String(string);

// console.log(convertedString);
// console.log(typeof convertedString);

//Arithmetic Operations: +,-,*,/,%,pow
let a = 10;
let b = 3;

let sum = a + b;
let difference = a - b;
let product = a * b;
let quotient = a / b;
let remainder = a % b;
let power = a ** b;

//Comparison Operations: ==, ===, >, <, >=, <=
let x = 5;
let y = 10;

// console.log(x == y);
// console.log(x === y);
// console.log(x > y);
// console.log(x < y);
// console.log(x >= y);
// console.log(x <= y);

//further more there are some libraries that we should study that will make our life somewhat easy.
//in js study -> math and Datetime
//while in nodejs -> crypto(ye crypto wala nahi hai ye dusra hai) and http

//math library

// console.log(Math.max(5,10));
// console.log(Math.min(3,1,4,2,5,8));
let result = Math.floor(Math.random() * 10 + 1);

// console.log(result);

//string methods

let fname = "Sachin";
let lname = "Pal";

// console.log(fname+" "+lname);

let message = "hello world";

// console.log(message.toUpperCase());
// console.log(message.toLowerCase());
// console.log(message.indexOf("w"));
// console.log(message.slice(0,5));

//Arrays

let chaiTypes = ["Masala chai", "Ginger chai", "Green tea", "lemon tea"];
// console.log(chaiTypes[2]);
// console.log(`Total chai types: ${chaiTypes.length}`);
chaiTypes.push("Herbal tea"); // add element at last position
let result1 = chaiTypes.pop(); //removes the last element and returns it
// console.log(result1)
let index = chaiTypes.indexOf("Green tea"); //gives index of substring in the array
if (index != -1) chaiTypes.splice(index, 1); //removes the element from the starting index and then how many elements to be removed and return the removed element.
// console.log(chaiTypes);

// chaiTypes.forEach((chai,index)=>{
//   console.log(`${index+1}:${chai}`);
// });

let moreChaiTypes = ["Oolong tea", "White tea"];

let allChaiTypes = chaiTypes.concat(moreChaiTypes);
// console.log(allChaiTypes);

let newChaiTypes = ["Chamomile tea", ...allChaiTypes];
// console.log(newChaiTypes);

//Objects
let chaiRecipe = {
  name: "Masala chai",
  ingredients: {
    teaLeaves: "Assam tea",
    milk: "Full cream milk",
    sugar: "brown sugar",
    spices: ["daalchini", "ginger"],
  },
  instruction: "Boil water,add tea leaves, milk, sugar and spices",
};
// console.log(chaiRecipe.ingredients.spices[1]);

let updatedChaiRecipe = {
  ...chaiRecipe,
  instruction:
    "Boil water, add tea leaves, milk, sugar and spices with some love",
};
// console.log(updatedChaiRecipe);

//object destructuring
let { name, ingredients } = chaiRecipe;
// console.log(name);
// console.log(ingredients);
//in both this output it will take the variable name such as "ingredients" and assign it the value of the key inside the chairecipe, if it does not find any key named "ingredients" it will simply assign it as undefined. the same goes for array destructuring

let [firstchai, secondChai] = newChaiTypes;
//above one will only use the sequence
// console.log(firstchai); //chamomile tea
// console.log(secondChai); //masala chai

//Conditional statments

//if-else
//problem: make a function that take input and returns output in terms of adding spices to the masala chai or should make the regular chai

function prepareChai(input) {
  if (input === "Masala chai") console.log("Adding spices to the chai");
  else console.log("preparing the regular chai");
}

// prepareChai("Masala chai")
// prepareChai("ginger chai")

//------Task--------
//In online store if a customer's bill amount if more than 1000 rupees give him 10% discount on the total otherwise he have to pay the full amount

function billAmount(amount) {
  if (amount >= 1000) {
    let discount = 0.1 * amount;
    console.log(`Discounted amount: ${discount}`);
    amount -= discount;
    console.log(`Your total bill amount: ${amount}`);
  } else {
    console.log(`Your total bill: ${amount}`);
  }

  //or
  // return amount>1000?amount*0.9:amount
}

// billAmount(100)

// ------Task------
//in a traffic light if there is "red" light then print stop if "yellow" then print slow down and agar "green" ho toh Go print karo

function trafficLight(signal) {
  signal = String(signal);
  if (signal == "red") console.log("STOP ✋");
  else if (signal == "yellow") console.log("slow down 🐢");
  else console.log("Go 🏎️");
}

// trafficLight("red")
// trafficLight("yellow")
// trafficLight("green")

//now do it using switch statment
function trafficLight2(signal) {
  switch (signal) {
    case "red":
      console.log("STOP ✋");
      break;
    case "yellow":
      console.log("slow down 🐢");
      break;
    case "green":
      console.log("Go 🏎️");
      break;
  }
}

// trafficLight2("red")
// trafficLight2("yellow")
// trafficLight2("green")

function truthyValue(value) {
  if (value) return true;
  else return false;
}

// console.log(truthyValue(1));//true
// console.log(truthyValue(0));//false
// console.log(truthyValue("sachin"));//true
// console.log(truthyValue(""));//false
// console.log(truthyValue([]));//true
// console.log(truthyValue([1,2,3]));//true

//iterations

let salesData = [
  { product: "laptop", price: 1200 },
  { product: "smartphone", price: 800 },
  { product: "Headphones", price: 150 },
  { product: "keyboard", price: 80 },
];

let totalSales = 0;
//using forEach loop
// salesData.forEach((i)=>{
//   totalSales+=i.price
// })
// console.log("using forEach loop: ",totalSales);

//using reduce function
totalSales = salesData.reduce((acc, sale) => acc + sale.price, 0);
// console.log("using reduce method: ",totalSales);

let inventory = [
  { name: "Widget A", stock: 30 },
  { name: "Widget B", stock: 120 },
  { name: "Widget C", stock: 45 },
  { name: "Widget D", stock: 70 },
];

//get all item which have stock <50
//using reduce function
// let lowStockItem = inventory.reduce((acc,item)=>{
//   if(item.stock < 50)
//     acc.push(item)
//   return acc
// },[])

//using filter method

let lowStockItem = inventory.filter((value, index) => value.stock < 50);

// console.log(lowStockItem);

let userActivity = [
  { user: "Alice", activityCount: 45 },
  { user: "Bob", activityCount: 72 },
  { user: "Charlie", activityCount: 33 },
  { user: "sachin", activityCount: 108 },
];

//find most active user
let mostActiveUser = userActivity.reduce(
  (previousValue, currentValue) =>
    previousValue.activityCount > currentValue.activityCount ? previousValue : currentValue
);
console.log(mostActiveUser);
