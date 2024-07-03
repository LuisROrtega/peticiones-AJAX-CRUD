// Consultar vía objetos y métodos
import performer from '/lib/request.js';

export class Todo {
    static async all() { // retornar promesa
        let todos = await performer({
            type: "listAll",
        });
        return todos.map( todoJSON => new Todo(todoJSON) ) // instanciando objeto de la clase Todo
    }

    constructor(args) { // recibe los datos del todo
        this.userId = args.userId; // propiedades del objeto
        this.title = args.title;
        this.completed = args.completed;
        this.id = args.id;
    }
    
    save = async () => {
        if(this.id) return this.update();

        this.create();
    }

    create = async () => {
        let response = await performer({
            type: "create",
            payload: {
                title: this.title
            }
        }).then(data => this.id = data.id)
        return response;
    }

    update = async () => {
        let response = await performer({
            type: "update",
            payload: {
                id: this.id,
                title: this.title
            }
        })
        return response;
    }

    delete = async () => {
        let response = await performer({
            type: "delete",
            payload: {
                id: this.id
            }
        })
        return response;
    }
}