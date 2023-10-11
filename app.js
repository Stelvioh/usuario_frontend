

const url_base = "http://127.0.0.1:5000";

async function buscarTodosOsUsuarios() {
    const resposta = await fetch(`${url_base}/`);
    const usuarios = await resposta.json();
    const corpoTabela = document.getElementById('tabelaUsuarios').getElementsByTagName('tbody')[0];

    // Limpar linhas existentes
    corpoTabela.innerHTML = '';

    usuarios.forEach(usuario => {
        const novaLinha = corpoTabela.insertRow();
        novaLinha.insertCell(0).innerText = usuario.user_id;
        novaLinha.insertCell(1).innerText = usuario.name;
        novaLinha.insertCell(2).innerText = usuario.email;
    });
}

async function adicionarUsuario(evento) {
    evento.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;

    const resposta = await fetch(`${url_base}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: nome, email: email })
    });

    if (resposta.status === 201) {
        // Limpar o formulário e buscar todos os usuários novamente para atualizar a tabela
        document.getElementById('formularioAdicionarUsuario').reset();
        buscarTodosOsUsuarios();
    } else {
        console.error('Falha ao adicionar usuário. Servidor respondeu com', resposta.status);
    }
}

document.getElementById('formularioAdicionarUsuario').addEventListener('submit', adicionarUsuario);
buscarTodosOsUsuarios();
