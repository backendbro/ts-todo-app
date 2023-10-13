import TodoDataOps from "../model/TodoDataOp";

interface TodoTemplate {
    ul:HTMLUListElement,
    render(todoData:TodoDataOps):void,
    clear():void 
}

export default class TodoTemplateHtml implements TodoTemplate {
    static instance:TodoTemplateHtml = new TodoTemplateHtml ()


    ul:HTMLUListElement    
    private constructor(){
        this.ul = document.getElementById("listItems") as HTMLUListElement 
    }

    clear(): void {
        this.ul.innerHTML = " "
    }

    render(todoData: TodoDataOps): void {
        this.clear()
        todoData.todoArr.forEach(todo => {
            const li = document.createElement("li")
            li.className = "item"
    
            const checkBox = document.createElement("input")
            checkBox.type = "checkbox"
            checkBox.id = todo.id 
            checkBox.tabIndex = 0 
            checkBox.checked = todo.checked 

            li.append(checkBox)

            checkBox.addEventListener('click', ()=>{
                todo.checked = !todo.checked
                todoData.saveTodo()
            })

            const label = document.createElement("label")
            label.htmlFor = todo.id 
            label.textContent = todo.desc 

            li.append(label)

            const button = document.createElement("button")
            button.className = "button"
            button.textContent = "X"

            li.append(button)

            button.addEventListener('click', () => {
                todoData.removeSingleTodo(todo.id)
                this.render(todoData)
            })

            this.ul.append(li)
        });
    }

}