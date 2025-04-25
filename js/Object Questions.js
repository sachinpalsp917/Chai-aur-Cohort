//create a type of object representing a type of tea with properties for name type and caffine content
const tea = {
    name: "Masala Chai",
    type: "masala",
    CaffineContent: "High"
}

//access and print the name and type properties of the tea object
console.log(tea.name);
console.log(tea.type);

//add a property origin to the original tea
tea.origin = "India"

//change the caffine content to medium
tea.CaffineContent = "Medium"

//remove the type property from the tea object
delete tea.type

//check if the tea object has a property origin
console.log("origin" in tea);

//use a for...in loop to print all properties in tea object
for(let key in tea){
    console.log(`${key}: ${tea[key]}`);
}

//create a nested object reperenting diffferent types of tea and their properties
const myTeas = {
    greenTea: {
        name: "Green tea"
    },
    blackTea:{
        name:"Black tea"
    }
}

//create a copy of the tea object
const copyTea = {
    ...tea
}

//add a custom method that describes to the tea object that returns a description string
tea.descripton = function describes(){
    return "this is a good tea"
}
console.log(tea.descripton());