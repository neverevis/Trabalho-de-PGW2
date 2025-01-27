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

//Altera os itens da navegação dependendo do estado de login
if(ContaLogada === undefined)
{
    document.getElementById('listaNav').innerHTML =
    `<li class="nav-item">
        <a class="nav-link deslogado" href="cadastro.html">Cadastrar</a>
    </li>
    <li class="nav-item">
        <a class="nav-link deslogado" href="login.html">Fazer login</a>
    </li>`
}
else
{
    document.getElementById('listaNav').innerHTML =
    `<li class="nav-item text-white my-auto me-3">
        <p class="m-0">Bem vindo ${ContaLogada.usuario}!</p>
    </li>
    <li class="nav-item">
        <a class="nav-link deslogado" href="cadastro.html">Fazer Logout</a>
    </li>`
}

//inicializa o catalogo de filmes
atualizarCatalogo(Filmes)

//abrir modal de registro
function modalNovoFilme()
{
    document.getElementById("modal-registro").classList.remove("d-none");
}

//fechar modal de registro
function fecharModalReg()
{
    document.getElementById("modal-registro").classList.add("d-none");
}

//adicionar filme registrado
function adicionar()
{
    if(validar() === true)
    {
        let novoFilme =
        {
            titulo: titulo.value,
            imagem: imagem.value
        }

        Filmes.push(novoFilme);
        localStorage.setItem("Filmes", JSON.stringify(Filmes));
        fecharModalReg();
    }

    atualizarCatalogo(Filmes);
}

function atualizarCatalogo(lista)
{
    let catalogo = document.getElementById('catalogo');

    catalogo.innerHTML = '';

    for(filme of lista)
    {
        catalogo.innerHTML += 
        `<div class="col mb-1 p-2">
            <a href="#" class="text-decoration-none">
                <div class="card h-100">
                <img class="card-img-top" src='${filme.imagem}'>
            </a>
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
}

function validar()
{
    let titulo = document.getElementById("titulo");
    let imagem = document.getElementById("imagem");

    if((titulo.value !== '') && (imagem.value !== ''))
    {
        return true;
    }
    return false;
}

function filtrar()
{
    let filtro = pesquisa.value;
    let filtrado = Filmes.filter(filme => filme.titulo.includes(filtro))
    atualizarCatalogo(filtrado);
}

//eventos
btnAdicionar.addEventListener("click",modalNovoFilme);
btnModalAdd.addEventListener("click",adicionar);
pesquisa.addEventListener('input',filtrar)
