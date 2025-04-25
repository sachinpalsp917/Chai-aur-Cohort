//variables Declaration -> let & const
//let -> badal sakte ho
//const ->nahi badal sakhte ho

//Datatypes

//Primitive Data types
//string -> store in "", '', ``
let name = "Sachin"
//Numbers -> integers & floating point numbers
let num1 = 12 //integers
let num2 = 12.567 //floating point numbers
//boolean -> true or false ke alva kuch nahi
let greaterThan18 = true
let lessThan18 = false
//null -> khali hai / kuch nahi
let paiseHai = null
//undefined -> baad mei dekhenge
let girlfriendHai = undefined

//Non-primitive Data types
//array -> boxes
let skills = ["HTML","CSS","Javascript"]
//Objects -> collection key: pairs ka
let profile = {
    name:"Sachin",
    age: 21,
    employment: null
}

const ageCalc = function(){
    return "age hai"
}

//to check the datatype use typeof operator
// console.log(typeof ageCalc);

//conditonal

//weather checker
//let weather = "sunny"

// if(weather === "rainy"){
//     console.log("light chali gayi");
// }else if(weather === "cloudy"){
//     console.log("light jaane wali hai");
// }else if(weather === "sunny"){
//     console.log("light nahi jayege");
// }else{
//     console.log("kuch bho ho sakta hai");
// }


//grade calculator
function gradecalc(n){
    if(n>=90)
        return "A"
    else if(n>=80)
        return "B"
    else if(n>=70)
        return "C"
    else if(n>=60)
        return "D"
    else
        return "F"
}

//console.log(gradecalc(71));

//array
let fruits = ["apple","cherry","banana"]
//at the end
fruits.push("papaya")
//at the start
fruits.unshift("mango")
//remove the last element 
fruits.pop()
// console.log(fruits);

//loops
let teas = ["masala","ginger","oolong","orange","rose","lemon"]
for(let i=0;i<teas.length;i++){
    console.log(`${teas[i]} tea`);
}
