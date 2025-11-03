// Carregar despesas salvas (localStorage)
let despesas = JSON.parse(localStorage.getItem('despesas')) || [];
let editandoIndex = -1; // Para modo edição

const form = document.getElementById('despesaForm');
const tabelaCorpo = document.getElementById('corpoTabela');
const totalReembolso = document.getElementById('totalReembolso');
const btnReembolso = document.getElementById('solicitarReembolso');
const btnCancelar = document.getElementById('cancelarEdicao');
const avisoLimite = document.getElementById('avisoLimite');
const filtroCategoria = document.getElementById('filtroCategoria');

// Função para formatar valor como moeda BR
function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
}

// Função para renderizar tabela (com filtro)
function renderizarTabela(filtro = '') {
    tabelaCorpo.innerHTML = '';
    let totalAprovado = 0;
    let despesasFiltradas = despesas.filter(d => !filtro || d.categoria === filtro);

    despesasFiltradas.forEach((despesa, index) => {
        const indexGlobal = despesas.indexOf(despesa); // Para ações
        const row = tabelaCorpo.insertRow();
        const iconeAprovado = despesa.aprovado ? '✅' : '❌';
        row.innerHTML = `
            <td>${despesa.data}</td>
            <td>${despesa.local}</td>
            <td>${despesa.categoria}</td>
            <td>${despesa.descricao}</td>
            <td>${formatarMoeda(despesa.valor)}</td>
            <td class="${despesa.aprovado ? 'aprovado' : 'nao-aprovado'}">${iconeAprovado}</td>
            <td>
                <button class="btn-editar" onclick="editarDespesa(${indexGlobal})">Editar</button>
                <button class="btn-excluir" onclick="excluirDespesa(${indexGlobal})">Excluir</button>
            </td>
        `;
        if (despesa.aprovado) totalAprovado += parseFloat(despesa.valor);
    });

    totalReembolso.textContent = `Total para Reembolso: ${formatarMoeda(totalAprovado)}`;
    btnReembolso.disabled = totalAprovado === 0;

    // Aviso de limite (ex: política da empresa)
        if (totalAprovado > 5000) {
        avisoLimite.textContent = 'Atenção: Total excede R$ 5.000 – aprovação gerencial necessária.';
        avisoLimite.style.display = 'block';
    } else {
        avisoLimite.style.display = 'none';
    }
}

// Função para salvar no localStorage
function salvarDespesas() {
    localStorage.setItem('despesas', JSON.stringify(despesas));
}

// Função para limpar o formulário
function limparFormulario() {
    form.reset();
    editandoIndex = -1;
    btnCancelar.style.display = 'none';
    form.querySelector('.btn-submit').textContent = 'Adicionar Despesa';
}

// Função para adicionar ou atualizar despesa
form.addEventListener('submit', function (e) {
    e.preventDefault();
    const data = document.getElementById('data').value;
    const local = document.getElementById('local').value;
    const categoria = document.getElementById('categoria').value;
    const descricao = document.getElementById('descricao').value;
    const valor = parseFloat(document.getElementById('valor').value);
    const aprovado = document.getElementById('aprovar').checked;

    const novaDespesa = { data, local, categoria, descricao, valor, aprovado };

    if (editandoIndex === -1) {
        despesas.push(novaDespesa);
    } else {
        despesas[editandoIndex] = novaDespesa;
    }

    salvarDespesas();
    renderizarTabela(filtroCategoria.value);
    limparFormulario();
});

// Função para editar despesa
function editarDespesa(index) {
    const despesa = despesas[index];
    document.getElementById('data').value = despesa.data;
    document.getElementById('local').value = despesa.local;
    document.getElementById('categoria').value = despesa.categoria;
    document.getElementById('descricao').value = despesa.descricao;
    document.getElementById('valor').value = despesa.valor;
    document.getElementById('aprovar').checked = despesa.aprovado;
    editandoIndex = index;
    btnCancelar.style.display = 'block';
    form.querySelector('.btn-submit').textContent = 'Atualizar Despesa';
}

// Função para cancelar edição
btnCancelar.addEventListener('click', limparFormulario);

// Função para excluir despesa
function excluirDespesa(index) {
    if (confirm('Deseja realmente excluir esta despesa?')) {
        despesas.splice(index, 1);
        salvarDespesas();
        renderizarTabela(filtroCategoria.value);
    }
}

// Função para filtrar despesas
function filtrarDespesas() {
    renderizarTabela(filtroCategoria.value);
}

// Botão de solicitar reembolso
btnReembolso.addEventListener('click', function () {
    alert('Solicitação de reembolso enviada com sucesso!');
});

// Renderizar ao carregar
renderizarTabela();
