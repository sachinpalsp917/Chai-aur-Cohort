//create an array containing different types of teas
const teas = [
  "Green tea",
  "Black tea",
  "oolong tea",
  "White tea",
  "Herbal tea",
];
console.log(teas);

//add "chamomile tea" to the existing list of teas
teas.push("Chamomile tea");

//remove "oolong tea" from the list of teas
const index = teas.indexOf("oolong tea");
if (index > -1) teas.splice(index, 1);

//Filter the list to include the teas that are caffinated
const caffinatedteas = teas.filter((teas) => teas != "Herbal tea");
console.log(caffinatedteas);

//sort the list of teas in alphabetical order
teas.sort();
console.log(teas);

//use a for loop to print each type of tea in the array
teas.forEach((x) => {
  console.log(teas.indexOf(x.toString()) + 1 + " " + x);
});

//use a for loop to count how many teas are caffinated(excluding "Herbal tea")
let caffinatedtea = 0;
for (let i = 0; i < teas.length; i++) {
  if (teas[i] != "Herbal tea") caffinatedtea++;
}
console.log(caffinatedtea);

//use a for loop to create a new array and add all the other teas in it in upper case
let upperteas = [];
teas.forEach((x) => {
  upperteas.push(x.toUpperCase());
});
console.log(upperteas);

//use the for loop to find the tea with the most number of characters
let max_char = teas[0].length
teas.forEach(x =>{
    if(x.length>max_char)
        max_char = x
})
console.log(max_char);

//use a for loop to reverse the order of the array
const reversedTeas = []
for(let i=teas.length-1;i>=0;i--)
    reversedTeas.push(teas[i])
console.log(reversedTeas);

