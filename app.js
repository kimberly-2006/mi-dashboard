const botonTema = document.getElementById('theme-btn');

botonTema.addEventListener('click', function () {
  document.body.classList.toggle('dark-mode');
});

const formulario = document.getElementById('task-form');
const campoTexto = document.getElementById('task-input');
const lista = document.getElementById('task-list');

formulario.addEventListener('submit', function (evento) {
  evento.preventDefault();

  const texto = campoTexto.value.trim();
  if (texto !== '') {
    const li = document.createElement('li');
    li.textContent = texto;
    lista.appendChild(li);
    actualizarBarra();   
    campoTexto.value = '';
  }
});

const barra = document.getElementById('progress-fill');
const textoBarra = document.getElementById('progress-text');

// Al hacer clic en una tarea, la tacha (o le quita el tachado)
lista.addEventListener('click', function (evento) {
  if (evento.target.tagName === 'LI') {
    evento.target.classList.toggle('completada');
    actualizarBarra();
  }
});

// Calcula el porcentaje y llena la barra
function actualizarBarra() {
  const total = lista.children.length;
  const hechas = lista.getElementsByClassName('completada').length;
  let porcentaje = 0;

  if (total > 0) {
    porcentaje = Math.round(hechas / total * 100);
  }

  barra.style.width = porcentaje + '%';
  textoBarra.textContent = porcentaje + '% completado';
  guardar();
}

function guardar() {
  localStorage.setItem('tareas', lista.innerHTML);
}

function cargar() {
  const guardado = localStorage.getItem('tareas');
  if (guardado !== null) {
    lista.innerHTML = guardado;
  }
  actualizarBarra();
}

cargar();

const reloj = document.getElementById('clock');

function ponerHora() {
  const ahora = new Date();
  reloj.textContent = ahora.toLocaleTimeString();
}

ponerHora();
setInterval(ponerHora, 1000);