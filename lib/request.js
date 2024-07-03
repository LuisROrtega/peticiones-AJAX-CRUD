// Peticiones AJAX

/*
    action { type: 'update', - Action to do
             payload: {
                    title: 'Nuevo titulo' - Info
                } 
            }  
*/

const path = "todos";
const endpoint = "http://jsonplaceholder.typicode.com";

export default (action) => { // object JSON action
    let options = { // opciones para petición AJAX
        method: getMethod(action)
    };

    return fetch(endpoint + getPath(action), options).then(r => r.json());
}

let getMethod = (action) => {
    switch(action.type) {
        case "create":
            return "POST";
        case "update":
            return "PUT";
        case "delete":
            return "DELETE";
        case "list":
            return "GET";
        case "listAll":
            return "GET";
    }
}

let getPath = (action) => {
    switch(action.type) {
        case "create":
            return `/${path}`;
        case "update":
            return `/${path}/${action.payload.id}`;
        case "delete":
            return `/${path}/${action.payload.id}`;
        case "list":
            return `/${path}`;
        case "listAll":
            return `/${path}?_limit=20`;
    }
}