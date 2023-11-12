document.addEventListener('DOMContentLoaded', function() {
    const fecha = document.querySelector('#fecha');
    const lista = document.querySelector('#lista');
    const input = document.querySelector('#input');
    const botonEnter = document.querySelector('#boton-enter');
    const check = 'fa-check-circle';
    const uncheck = 'fa-circle';
    const lineThrough = 'line-through';
    let LISTA
    let id

    // Actualizar fecha 
    const FECHA = new Date();
    fecha.innerHTML = FECHA.toLocaleDateString('es-MX', { weekday: 'long', month: 'short', day: 'numeric' });

    // Restaurar datos desde localStorage
    let datos = localStorage.getItem('TODO');
    if (datos) {
        LISTA = JSON.parse(datos);
        id = LISTA.length;
        cargarLista(LISTA);
    } else {
        LISTA = [];
        id = 0;
    }

    // Función para cargar la lista desde localStorage
    function cargarLista(array) {
        array.forEach(function(item) {
            agregarTarea(item.nombre, item.id, item.realizado, item.eliminado);
        });
    }

    // Función para agregar una tarea
    function agregarTarea(tarea, id, realizado, eliminado) {
        if (eliminado) { return; }

        const REALIZADO = realizado ? check : uncheck;
        const LINEA = realizado ? lineThrough : '';

        const elemento = `
            <li>
                <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
                <p class="text ${LINEA}">${tarea}</p>
                <i class="fas fa-trash de" data="eliminado" id="${id}"></i> 
            </li>
        `;

        lista.insertAdjacentHTML("beforeend", elemento);
    }

    // Función para manejar la realización de tareas
    function tareaRealizada(elemento) {
        elemento.classList.toggle(check);
        elemento.classList.toggle(uncheck);
        elemento.parentNode.querySelector('.text').classList.toggle(lineThrough);
        LISTA[elemento.id].realizado = !LISTA[elemento.id].realizado;
    }

    // Función para manejar la eliminación de tareas
    function tareaEliminada(elemento) {
        elemento.parentNode.parentNode.removeChild(elemento.parentNode);
        LISTA[elemento.id].eliminado = true;
    }

    // Evento de escucha para el clic en el botón
    botonEnter.addEventListener('click', function() {
        const tarea = input.value.trim();
        if (tarea) {
            agregarTarea(tarea, id, false, false);
            LISTA.push({
                nombre: tarea,
                id: id,
                realizado: false,
                eliminado: false
            });
            localStorage.setItem('TODO', JSON.stringify(LISTA));
            id++;
            input.value = '';
        }
    });

    // Evento de escucha para la tecla Enter
    document.addEventListener('keyup', function(evento) {
        if (evento.key === 'Enter') {
            const tarea = input.value.trim();
            if (tarea) {
                agregarTarea(tarea, id, false, false);
                LISTA.push({
                    nombre: tarea,
                    id: id,
                    realizado: false,
                    eliminado: false
                });
                localStorage.setItem('TODO', JSON.stringify(LISTA));
                id++;
                input.value = '';
            }
        }
    });

    // Evento de escucha para la lista de tareas
    lista.addEventListener('click', function(evento) {
        const elemento = evento.target;
        const datoElemento = elemento.getAttribute('data');
        if (datoElemento === 'realizado') {
            tareaRealizada(elemento);
        } else if (datoElemento === 'eliminado') {
            tareaEliminada(elemento);
        }
        localStorage.setItem('TODO', JSON.stringify(LISTA));
    });
});
