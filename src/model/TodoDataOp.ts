import TodoItem from "./TodoItems";

interface TodoOps {
    todoArr:TodoItem[],
    clearTodos():void,
    addTodo(todoItem:TodoItem):void,
    removeSingleTodo(id:string):void,
    saveTodo():void,
    loadTodo():void         
}

export default class TodoDataOps implements TodoOps {
    static instance:TodoDataOps = new TodoDataOps () 

    private constructor (
        private _todoArr:TodoItem[] = []
    ){}

    get todoArr ():TodoItem[] {
        return this._todoArr
    }

    loadTodo(): void {
        const storedTodo:string | null = localStorage.getItem('todoList')
        if(typeof storedTodo !== "string") return 
        
        type TodoParams = {_id:string, _desc:string, _checked:boolean}[]

        const parsedTodo:TodoParams = JSON.parse(storedTodo)
        parsedTodo.forEach(todo => {
            const todoSingleItem = new TodoItem (todo._id, todo._desc, todo._checked)
            TodoDataOps.instance.addTodo(todoSingleItem)
        })
    }

    saveTodo():void {
        localStorage.setItem('todoList', JSON.stringify(this._todoArr))
    }

    addTodo(todoItem: TodoItem): void {
        this._todoArr.push(todoItem)
        this.saveTodo()
    }
    
    clearTodos(): void {
        this._todoArr = []
        this.saveTodo()
    }

    removeSingleTodo(id:string): void {
        this._todoArr = this._todoArr.filter(todo => todo.id !== id)
        this.saveTodo()
    }

}