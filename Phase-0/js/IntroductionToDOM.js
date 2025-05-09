Function.prototype.describe = function(name){
    console.log(`Function name is ${this.name}`);
}

function greet(name){
    return `hello ${name}`
}

//greet.describe()


//tiffin concept
function createCounter(){
    let count = 0
    return function(){
        count++
        return count
    }
}
//we are wondering that when we call createCounter() it will return a function but how can it have access of the variable count when count is in the scope of createCounter that's where this comes that whenever a function is called inside a function it can access all the things of it's parent function.So that's why our inner function can access the count variable even when it is outside the createCounter.


//IIFE -> Immediately invoked function expression
// (function(){
//     console.log("Sachin");
// })()
//this function does not require you to call it but rather it calls itself directly.
//this is basically when we have some code that we wnat to run as soon as the web page is loaded like connecting the database.

//before this was all revision
//DOM -> Documnet Object Model
//DOM refers to using js to manipulate(kon kya karega) html and CSS

//for this we have used HTMl file named DOM.html
//to refer to anything inside the browser there is a window object that is global i.e it allow access to anything inside a browser.
//we can use 
// window.alert("hello")
//inside window there is a document object that allows us to manipulate the HTML code that we have written
//Note: window is a part of brwoser and not the part of node js engine

//we will learn everything using tasks
//task-1: on click of a button the entire screen is black

function changeBackgroundBlack(){
    document.body.style.background = 'black'
}

function changeBackgroundWhite(){
    document.body.style.background = 'white'
}

//task-2: Event listeners
function changeBackground(color){
    document.body.style.backgroundColor = color
}
// const darkButton = document.getElementById('theme-mode')

// darkButton.addEventListener('click',()=>{
//     const currentColor = document.body.style.backgroundColor;
//     if(!currentColor || currentColor=='white'){
//         changeBackground('Black')
//         darkButton.innerText = 'Dark Mode'
//     }else{
//         changeBackground('white')
//         darkButton.innerText = 'light mode'
//     }
// })


//task-3 -> todo app

const addBtn = document.getElementById('add-btn')
const todoInput = document.getElementById('todo-input')
const todoItemsConatiner = document.getElementById('todo-items-container')

addBtn.addEventListener('click',()=>{
    const value = todoInput.value
    const li = document.createElement('li')
    li.innerText = value
    const delButton = document.createElement('button')
    delButton.innerText = "X"
    delButton.addEventListener('click',()=>{
        li.remove()
    })
    li.appendChild(delButton)
    todoItemsConatiner.appendChild(li)
    todoInput.value = ''
})