const addTaskBtn = document.getElementById('add-task-btn')
const todoBoard = document.getElementById('todo-board')

function attachDragEvents(target){
    target.addEventListener('dragstart',()=>{
        target.classList.add('flying')
    })
    target.addEventListener('dragend',()=>{
        target.classList.remove('flying')
    })
}
addTaskBtn.addEventListener('click',()=>{
    const input = prompt("What is the task?")
    if(!input) return
    const taskCard = document.createElement('p')
    taskCard.classList.add('item')
    taskCard.setAttribute('draggable' , true)
    taskCard.innerText = input
    attachDragEvents(taskCard)
    todoBoard.appendChild(taskCard)
})

const allBoards = document.querySelectorAll('.board')
const allItems  = document.querySelectorAll('.item')

allItems.forEach(attachDragEvents)

allBoards.forEach((board)=>{
    board.addEventListener('dragover',()=>{
        const flyingElement = document.querySelector('.flying')
        console.log("Kuch toh mere upar se gaya",board);
        board.appendChild(flyingElement)
    })
})

//more features to add
// - Edit task
// - Delete task
// - Dynamically add boards
// - Remove boards
// - Drag - sorting
// - tasks - localStorage
// - Board head shows the no of tasks
// - time on every task

//home work -> to make polyfill of bind, apply and call in js