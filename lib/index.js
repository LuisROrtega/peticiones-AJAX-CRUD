// Control del DOM
import { Todo } from '/lib/Todo.js';

window.addEventListener("load", (ev) => {
    let container = document.querySelector('#root ul');

    document.querySelector("#mainForm").addEventListener("submit", (ev) => {
        ev.preventDefault();
        const form = ev.target;
        const textArea = form.querySelector("textarea");

        const button = form.querySelector("[type='submit']");
        button.disabled = true;

        // Instanciar objeto para crear
        let todo = new Todo({ title: textArea.value });
        todo.save().then(() => {
            // Limpiar el textarea
            textArea.value = "";
            button.disabled = false; // Activar botón

            // Construir el nodo DOM para el nuevo todo
            let newNode = buildDOMElement(todo);
            // Añadir el nodo al principio del contenedor
            container.prepend(newNode);
        }).catch((error) => {
            console.error('Error saving the todo:', error);
            button.disabled = false; // Activar botón en caso de error
        });

        return false; // No envía formulario
    });

    // Todo.all - Retorna los todos del servicio web
    Todo.all().then(todos => {
        // Iteramos los todos
        todos.forEach(todo => {
            // Construir el nodo DOM para cada todo
            let node = buildDOMElement(todo);

            // Añadir el nodo al contenedor
            container.prepend(node);
        });
    }).catch((error) => {
        console.error('Error fetching todos:', error);
    });

    let buildDOMElement = (todo) => {
        let li = document.createElement('li');
        li.innerHTML = `
            <h1>${todo.title}</h1>
            <button class="close">Delete</button>
        `;

        li.querySelector(".close").addEventListener("click", (ev) => {
            todo.delete().then(() => {
                li.remove(); // Remover del DOM
            }).catch((error) => {
                console.error('Error deleting the todo:', error);
            });
        });

        editInPlace(li.querySelector('h1'), todo); // Enviando nodo

        return li;
    };

    let editInPlace = (node, todo) => {
        node.addEventListener("click", (e) => {
            // Reemplazar nodo por un campo de texto
            let input = document.createElement('textarea');
            input.value = node.innerHTML;
            input.autofocus = true;

            node.replaceWith(input);

            input.addEventListener("change", (e) => {
                input.replaceWith(node);
                todo.title = input.value;

                node.innerHTML = todo.title;
                todo.save().then(r => console.log(r)).catch((error) => {
                    console.error('Error saving the todo:', error);
                });
            });
        });

        // Finalizar edición: Reemplazar campo de texto por un nodo de vuelta
    };
});
