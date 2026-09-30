const inputTitulo = document.querySelector('#input-titulo');
const btnAdicionar = document.querySelector('#btn-adicionar');
const mensagem = document.querySelector('#mensagem');
const listaTarefas = document.querySelector('#lista-tarefas');
const btnExcluirConcluidas = document.querySelector('#btn-excluirConcluidas');


let tarefa = [];


function salvarTarefas() {
  const tarefasEmTexto = JSON.stringify(tarefa);
  localStorage.setItem('minhas_tarefas', tarefasEmTexto);
}


function carregarTarefas() {
  const tarefasEmTexto = localStorage.getItem('minhas_tarefas');
  if (tarefasEmTexto === null) {
    tarefa = [];
    return;
  }
  tarefa = JSON.parse(tarefasEmTexto);
}


function adicionarTarefas() {
  const titulo = inputTitulo.value.trim();
  if (titulo === '') {
    mensagem.textContent = 'Digite o titulo da tarefa antes de continuar o cadastro.';
    mensagem.className = 'mensagem erro';
    return;
  }


  const novaTarefa = {
    id: Date.now(),
    titulo: titulo,
    feita: false,
  };


  tarefa.push(novaTarefa);
  salvarTarefas();
  renderizarTarefa();
  inputTitulo.value = '';
  mensagem.textContent = 'Tarefa adicionada com sucesso!';
  mensagem.className = 'mensagem sucesso';
  inputTitulo.focus();
}


function alternarFeito(id) {
  const tarefaEncontrada = tarefa.find(function (t) {
    return t.id === id;
  });


  if (tarefaEncontrada === undefined) {
    mensagem.textContent = 'Não foi possivel encontrar a tarefa.';
    mensagem.className = 'mensagem erro';
    return;
  }


  tarefaEncontrada.feita = !tarefaEncontrada.feita;
  salvarTarefas();
  renderizarTarefa();
  mensagem.textContent = 'Status da tarefa atualizada!';
  mensagem.className = 'mensagem sucesso';
}


function excluirTarefa(id) {
  tarefa = tarefa.filter(function (tarefa) {
    return tarefa.id !== id;
  });
  salvarTarefas();
  renderizarTarefa();
  mensagem.textContent = 'Tarefa excluida com sucesso!';
  mensagem.className = 'mensagem sucesso';
}


function excluirConcluidas() {
  tarefa = tarefa.filter(function (t) {
    return !t.feita;
  });
  salvarTarefas();
  renderizarTarefa();
  mensagem.textContent = 'Tarefas concluídas excluídas!';
  mensagem.className = 'mensagem sucesso';
}




function renderizarTarefa() {
  listaTarefas.innerHTML = '';


  if (tarefa.length === 0) {
    const tarefaVazia = document.createElement('li');
    tarefaVazia.textContent = 'nenhuma tarefa cadastrada no momento. . .';
    tarefaVazia.className = 'tarefa';
    listaTarefas.appendChild(tarefaVazia);
    return;
  }


  tarefa.forEach(function (t) {
    const item = document.createElement('li');
    item.className = 'lista';


    if (t.feita) {
      item.classList.add('feito');
    }


    const titulo = document.createElement('span');
    titulo.textContent = t.titulo;
    titulo.className = 'titulo-tarefa';


    const btnStatus = document.createElement('button');
    btnStatus.className = 'btn-status';
    if (t.feita) {
      btnStatus.textContent = 'Marcar como não realizada.';
    } else {
      btnStatus.textContent = 'Concluir tarefa!';
    }


    const btnExcluir = document.createElement('button');
    btnExcluir.className = 'btn-excluir';
    btnExcluir.textContent = 'Excluir';


    btnStatus.addEventListener('click', function () {
      alternarFeito(t.id);
    });


    btnExcluir.addEventListener('click', function () {
      excluirTarefa(t.id);
    });


    item.appendChild(titulo);
    item.appendChild(btnStatus);
    item.appendChild(btnExcluir);
    listaTarefas.appendChild(item);
  });
}


btnAdicionar.addEventListener('click', adicionarTarefas);
btnExcluirConcluidas.addEventListener('click', excluirConcluidas);
carregarTarefas();
renderizarTarefa();











