const inputNome = document.querySelector('#input-nome');
const btnSalvar = document.querySelector('.btn-salvar');
const inputEndereco = document.querySelector('#input-endereco');
const ordens = document.querySelector('.ordens');
const filterStatus = document.querySelector('#filter-status');


function criaLi() {
    const li = document.createElement('li');
    return li;
}

function criaStatus(li) {
    const statusSelect = document.createElement('select');
    statusSelect.setAttribute('class', 'status-select');

    const statuses = ['Aguardando', 'nao aprovado', 'Aprovado', 'Pronto'];
    statuses.forEach(status => {
        const option = document.createElement('option');
        option.value = status.toLowerCase().replace(/ /g, '-'); // 'nao-aprovado'
        option.innerText = status;
        statusSelect.appendChild(option);
    });

    statusSelect.value = 'aguardando'; // Define o valor padrão do select para "Aguardando"

    statusSelect.addEventListener('change', function() {
        li.className = ''; // Remove todas as classes
        li.classList.add(statusSelect.value); // Adiciona a nova classe
    });

    li.classList.add('aguardando'); // Define a classe inicial da li para "aguardando"
    li.appendChild(statusSelect);
}

function criaOrdem(nome, endereco) {
    const li = criaLi();
    li.innerText = `Nome: ${nome}, Endereço: ${endereco}`;
    criaStatus(li);
    ordens.appendChild(li);
}

btnSalvar.addEventListener('click', function(event) {
    event.preventDefault(); // Impede o envio do formulário
    if (!inputNome.value || !inputEndereco.value) return;

    criaOrdem(inputNome.value, inputEndereco.value);
    inputNome.value = ''; // Limpa o campo de entrada
    inputEndereco.value = ''; // Limpa o campo de entrada
    inputNome.focus(); // Coloca o foco de volta no campo de entrada
});
filterStatus.addEventListener('change', function() {
    const status = filterStatus.value;
    const ordensLi = ordens.querySelectorAll('li');

    ordensLi.forEach(li => {
        if (status === 'all') {
            li.style.display = 'flex';
        } else if (li.classList.contains(status)) {
            li.style.display = 'flex';
        } else {
            li.style.display = 'none';
        }
    });
});
