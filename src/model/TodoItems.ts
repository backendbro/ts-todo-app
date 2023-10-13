interface TodoItems {
    id:string, 
    desc:string,
    checked:boolean 
}

export default class TodoItem implements TodoItems {
    constructor (
        private _id:string = "",
        private _desc:string = "",
        private _checked:boolean = false 
    ){}

    set id (id:string) {
        this._id = id 
    }

    get id ():string {
        return this._id 
    }

    set desc (desc: string) {
        this._desc = desc 
    }

    get desc () :string {
        return this._desc
    }

    set checked (checked:boolean) {
        this._checked = checked  
    }

    get checked () : boolean {
        return this._checked 
    }

}