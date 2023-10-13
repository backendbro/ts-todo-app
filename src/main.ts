import './style.css'
import TodoItem from './model/TodoItems'
import TodoDataOps from './model/TodoDataOp'
import TodoTemplateHtml from './interface/TodoTemplate'


const initApp = ():void=> {
    const todo = TodoDataOps.instance
    const template = TodoTemplateHtml.instance

    const submitForm = document.getElementById("itemEntryForm") as HTMLFormElement
    const clearBtn = document.getElementById("clearItemsButton") as HTMLButtonElement 
    
    submitForm.addEventListener('submit', (event:SubmitEvent):void => {
        event.preventDefault() 

        const input = document.getElementById("newItem") as HTMLInputElement 
        const newItemEntry = input.value.trim()
        if(!newItemEntry.length) return 

        const newItemId = todo.todoArr.length ? parseInt(todo.todoArr[todo.todoArr.length - 1].id + 1) : 1 
        
        const newTodoEntry = new TodoItem(newItemId.toString(), newItemEntry)
    
        todo.addTodo(newTodoEntry)
        template.render(todo)

        input.value = " "
    })


    clearBtn.addEventListener('click', ():void => {
        todo.clearTodos()
        template.clear()
    })


    todo.loadTodo()
    template.render(todo)


}

document.addEventListener('DOMContentLoaded', initApp)
