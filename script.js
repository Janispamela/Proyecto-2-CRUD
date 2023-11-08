const fecha = document.querySelector('#fecha');
const lista = document.querySelector('#lista');
const input = document.querySelector('#input');
const botonEnter = document.querySelector('#enter');
const check = 'fa-check-circle'
const uncheck = 'fa-circle'
const lineThrough = 'line-through'
let id = 0

let contador = 0;

// Agregar tarea
function agregarTarea(tarea,id,realizado,eliminado) {

    if(eliminado){return}

    const REALIZADO = realizado ?check : uncheck
    const LINE= realizado ?lineThrough : ''

    const elemento = `
        <li id="elemento-${contador}">
            <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
            <p class="text ${LINE}">${tarea}</p>
            <i class="fas fa-trash de" data="eliminado" id="${id}"></i>
        </li>
    `;
    lista.insertAdjacentHTML("beforeend", elemento);
    contador++; 
}

botonEnter.addEventListener('click', () => {
    const tarea = input.value;
    if (tarea) {
        agregarTarea(tarea,id,false,false);
        }
        input.value = ''
        id++
});
document.addEventListener('keyup', function (event) {
    if (event.key=='Enter'){
        const tarea = input.value
    if(tarea){
        agregarTarea(tarea,id,false,false)
    }
    input.value=''
    id++
    }
})

lista.addEventListener('click',function(event){
    const element = event.target 
    const elementData = element.attributes.data.value
    if(elementData==='realizado'){
        tareaRealizado()
    }
    else if (elementData==='eliminado') {
        tareaEliminada()
    }