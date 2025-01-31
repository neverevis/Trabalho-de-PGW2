//Trazendo ; Criando filmes do localStorage
let Filmes;
let Contas;

if(localStorage.getItem('Filmes') === null)
    Filmes = [];
else
    Filmes = JSON.parse(localStorage.getItem("Filmes"));

//trazer a lista de contas do localStorage
if(JSON.parse(localStorage.getItem("Contas")) !== null)
    Contas = JSON.parse(localStorage.getItem("Contas"));
else
    Contas = [];

//definir elementos
let btnAdicionar = document.getElementById("btnAdicionar");
let btnFecharReg = document.getElementById("btnFecharReg");
let btnModalAdd = document.getElementById("btnModalAdd");
let pesquisa = document.getElementById('pesquisa');

let ContaLogada;

//verificar se há contas logadas (salva informações da conta logada em Conta)
for(conta of Contas)
{
    if(conta.login == true)
    {
        ContaLogada = conta;
        break;
    }
}

//função que altera os itens da navegação dependendo do estado de login
function atualizarNav()
{
    if(ContaLogada === undefined)
    {
        document.getElementById('listaNav').innerHTML =
        `<li class="nav-item">
            <a class="nav-link deslogado" href="cadastro.html">Cadastrar</a>
        </li>
        <li class="nav-item">
            <a class="nav-link deslogado" href="login.html">Fazer login</a>
        </li>`

        btnAdicionar.classList.add('d-none')
    }
    else
    {
        document.getElementById('listaNav').innerHTML =
        `<li class="nav-item text-white my-auto me-3">
            <button id="btnPerfil" class="btn btn-md btn-dark"><i class="bi-person-circle me-2"></i><a>${ContaLogada.usuario}</a></button>
            <div id="perfilDropdown" class="perfilDropdown hide position-fixed bg-gray text-center">
                <ul class="list-unstyled text-start">
                    <li><a onclick="logout()" class="text-decoration-none text-white" href="#"><i class='bi-box-arrow-left me-2'></i>Fazer Logout</a></li>
                </ul>
            </div>
        </li>`
    }
}

//atualiza a nav
atualizarNav();

//cria um ponteiro ao botão de perfil
let perfil = document.getElementById('btnPerfil');

//inicializa o catalogo de filmes
atualizarCatalogo(Filmes)

//abrir modal de registro
function modalNovoFilme()
{
    console.log("ativou")
    document.getElementById("modal-registro").classList.remove("d-none");
}

//abrir modal do filme
function modalFilme(i)
{
    document.getElementById('modal-filme').innerHTML =
    `<div class="container position-relative bg-dark rounded-3 max-tamanho-modal text-white">
            
        <div class='modal-body p-0 pb-5 overflow-auto max-tamanho-modal'>
            <div class='card dark m-5'>
                <img class="bg-dark rounded-3" src="${filtrar()[i].imagem}">
            </div>

            <h5 class="text-center mb-5">${filtrar()[i].titulo}</h5>

            <div class='row mx-1'>
                <div class='col-7 bg-escuro p-3 rounded-start'>
                    <p class='textopequeno text-center'>Sinopse:</p>
                    <p class='textopequeno justificado'>${filtrar()[i].sinopse}</p>
                </div>

                <div class='col-5 bg-escuro-plus rounded-end p-3'>
                    <p class='textopequeno text-center'>Informações:</p>
                    <div class='d-flex d-inline'>
                        <p class='textopequeno mb-1'>Categoria:</p>
                        <p class='textopequeno ms-2 mb-2 text-secondary'>${filtrar()[i].categoria}</p>
                    </div>
                    <div class='d-flex d-inline'>
                        <p class='textopequeno mb-1'>Duração:</p>
                        <p class='textopequeno ms-3 mb-2 text-secondary'>${filtrar()[i].duracao}</p>
                    </div>
                </div>
            </div>

            <div class='row mt-5'>
                <h5 class='text-center'>Comentários</h5>
                <div id='comentarios' class='container p-5'>
                    
                </div>
                <div class='col-9 offset-1'>
                    <input type='text' id='caixaComentario' class='form-control' placeholder='Digitar comentário...'></input>
                </div>
                <div class='col-1'>
                    <button id='btnComentario' onclick='comentar(${i})' class='btn btn-primary'>Enviar</button>
                </div>
            </div>
        </div>
        <button onclick="fecharModalFilme()" id="btnFecharFilme" class="btn-close btn-close-white position-absolute top-0 end-0 p-3"></button>
            
    </div>`

    //oculta caixa de comentario caso usuario não esteja logado
    if(ContaLogada == null)
    {
        document.getElementById('caixaComentario').classList.add('d-none');
        document.getElementById('btnComentario').classList.add('d-none')
    }

    //carregar comentários
    if(filtrar()[i].comentarios == '')
        document.getElementById('comentarios').innerHTML = `<p class='textopequeno text-secondary text-center'>Nenhum comentário ainda</p>`;
    else
    {
        for(comentario of filtrar()[i].comentarios)
        {
            document.getElementById('comentarios').innerHTML += `${comentario}`;
        }
    }

    document.getElementById('modal-filme').classList.remove('d-none')
}

//fechar modal de registro
function fecharModalReg()
{
    document.getElementById('mensagem').classList.add('d-none')
    document.getElementById("modal-registro").classList.add("d-none");
}

//fechar modal do filme
function fecharModalFilme()
{
    document.getElementById('modal-filme').classList.add("d-none")
}

//adicionar filme registrado
function adicionar()
{
    if(validar() === true)
    {
        let novoFilme =
        {
            titulo: titulo.value,
            sinopse: sinopse.value,
            categoria: categoria.value,
            imagem: imagem.value,
            duracao: duracao.value,
            id: null,
            comentarios: []
        }

        Filmes.push(novoFilme);
        Filmes[Filmes.length-1].id = Filmes.length-1;
        localStorage.setItem("Filmes", JSON.stringify(Filmes));
        fecharModalReg();
    }

    atualizarCatalogo(Filmes);
}

function atualizarCatalogo(lista)
{
    let catalogo = document.getElementById('catalogo');

    catalogo.innerHTML = '';

    for(let i = 0; i < lista.length; i++)
    {
        catalogo.innerHTML += 
        `<div class="mb-1 p-2 zoomhover position-relative">
            <a onclick='modalFilme(${i})' href="#" class="text-decoration-none">
                <div class="card bg-dark ">
                    <img class="card-img" src='${lista[i].imagem}'>
                </div>
            </a>
            <button onclick="confirmar(${lista[i].id})" class='d-none btnRemover btn btn-danger btn-sm position-absolute top-0 end-0 mt-3 me-3'><i class='bi-trash-fill'></i></button>
        </div>`
    }

    //inicializa o catalogo de filmes
    if(lista == '')
    {
        document.getElementById('catalogo').innerHTML =
        `<div class='h-100 m-auto'>
            <p class='text-secondary'>Não há filmes a serem exibidos aqui :c</p>
        </div>`;
    }

    if(ContaLogada != null)
    {
        document.querySelectorAll('.btnRemover').forEach(elemento => {elemento.classList.remove('d-none')})
    }
}

function confirmar(id)
{
    console.log('asdasdasdas')
    document.getElementById('btnConfirmar').innerHTML = 
                `<div class="col-3">
                    <button onclick='remover(${id})' class="btn btn-success">Sim</button>
                </div>
                <div class="col-3">
                    <button onclick='fecharConfirmar()' class="btn btn-danger">Não</button>
                </div>`;

    document.getElementById('modal-excluir').classList.remove('d-none');
}

function fecharConfirmar()
{
    document.getElementById('modal-excluir').classList.add('d-none');
}

function remover(id)
{
    for(let i = 0; i < Filmes.length; i++)
    {
        if(Filmes[i].id == id)
            Filmes.splice(i,1);
    }

    atualizarCatalogo(filtrar());
    localStorage.setItem("Filmes", JSON.stringify(Filmes));

    document.getElementById('modal-excluir').classList.add('d-none');
}

function validar()
{
    let titulo = document.getElementById("titulo");
    let sinopse = document.getElementById("sinopse");
    let categoria = document.getElementById("categoria");
    let imagem = document.getElementById("imagem");
    let duracao = document.getElementById("duracao");

    if((titulo.value !== '') && (imagem.value !== '') && (sinopse.value !== '') && (categoria.value !== '') && (duracao.value !== ''))
    {
        return true;
    }

    document.getElementById('mensagem').classList.remove('d-none')
    return false;
}

//analisa o input de pesquisa e atualiza o catalogo conforme o filtro, retorna o novo array filtrado
function filtrar()
{
    let filtro = pesquisa.value.toLowerCase();
    let filtrado = Filmes.filter(filme => filme.titulo.toLowerCase().includes(filtro))
    atualizarCatalogo(filtrado);

    return filtrado;
}

function dropdownPerfil()
{
    document.getElementById('perfilDropdown').classList.toggle('hide');
}

//função que desloga o usuário logado(sempre existira apenas 1 usuário logado)
function logout()
{
    for(conta of Contas)
    {
        if(conta.login == true)
            conta.login = false;
    }

    //atualizando os dados do localStorage
    localStorage.setItem("Contas", JSON.stringify(Contas));

    ContaLogada = undefined;

    atualizarCatalogo(filtrar(Filmes));
    atualizarNav();
}

function comentar(i)
{
    if(document.getElementById('caixaComentario').value != '')
    {
        comentario = "<div class='container rounded-3 bg-escuro py-2 m-2'><i class='bi-person-circle d-flex align-items-center'><h5 class='ms-2'>" + ContaLogada.usuario + ": </h5></i>" + `<p class='textopequeno'>` + document.getElementById('caixaComentario').value + "</p></div>"
        filtrar()[i].comentarios.push(comentario);
    }

    localStorage.setItem("Filmes", JSON.stringify(Filmes));
    modalFilme(i);
}

//eventos
btnAdicionar.addEventListener("click",modalNovoFilme);
btnModalAdd.addEventListener("click",adicionar);
pesquisa.addEventListener('input',filtrar)
btnPerfil.addEventListener('click',dropdownPerfil);