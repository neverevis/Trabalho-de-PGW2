//definir elementos do display de validação
let display1 = document.getElementById('display1');
let display2 = document.getElementById('display2');
let display3 = document.getElementById('display3');
let display4 = document.getElementById('display4');
let ic1 = document.getElementById('ic1');
let ic2 = document.getElementById('ic2');
let ic3 = document.getElementById('ic3');
let ic4 = document.getElementById('ic4');



function validar()
{
    //coletar informações
    let usuario = document.getElementById('usuario').value;
    let senhaA = document.getElementById('senhaA').value;
    let senhaB = document.getElementById('senhaB').value;

    //Trazendo ; Criando cadastros no localStorage
    let Contas;

    if(localStorage.getItem('Contas') === null)
        Contas = [];
    else
        Contas = JSON.parse(localStorage.getItem("Contas"));

    //validações
    let valido1 = true;
    let valido2 = true;
    let valido3 = true;
    let valido4 = true;

    //verifica se há contas com o mesmo nome de usuario no registro
    if(Contas.length != 0)
    {
        for(x of Contas)
        {
            if(x.usuario === usuario)
            {
                valido1 = false;
            }
        }
    }

    //verifica se há caracteres suficientes no nome de usuario
    if(usuario.length < 4)
    {
        valido1 = false;
        valido3 = false;
    }

    //verifica se as senhas conferem
    if(senhaA != senhaB || senhaA === '')
    {
        valido2 = false
    }

    //verifica se a senha possui no minino 6 caracteres
    if(senhaA.length < 6)
    {
        valido4 = false
    }

    //atualiza o display de validação
    if(valido1 === true)
    {
        display1.setAttribute("class", "text-success");
        ic1.setAttribute("class", "bi-check-circle-fill");
    }
    else
    {
        display1.setAttribute("class", "text-danger");
        ic1.setAttribute("class", "bi-x-circle-fill");
    }

    if(valido2 === true)
    {
        display2.setAttribute("class", "text-success");
        ic2.setAttribute("class", "bi-check-circle-fill");
    }
    else
    {
        display2.setAttribute("class", "text-danger");
        ic2.setAttribute("class", "bi-x-circle-fill");
    }

    if(valido3 === true)
    {
        display3.setAttribute("class", "text-success");
        ic3.setAttribute("class", "bi-check-circle-fill");
    }
    else
    {
        display3.setAttribute("class", "text-danger");
        ic3.setAttribute("class", "bi-x-circle-fill");
    }

    if(valido4 === true)
    {
        display4.setAttribute("class", "text-success");
        ic4.setAttribute("class", "bi-check-circle-fill");
    }
    else
    {
        display4.setAttribute("class", "text-danger");
        ic4.setAttribute("class", "bi-x-circle-fill");
    }


    //retornar resultado
    if(valido1 == true && valido2 == true && valido3 == true && valido4 == true)
        return true;

    return false;
}

function cadastrar()
{
    if(validar() === true)
    {
        console.log("sucesso!");

        //coletar informações
        let usuario = document.getElementById('usuario').value;
        let senhaA = document.getElementById('senhaA').value;

        //criar objeto para cadastro
        let Cadastro =
        {
            usuario: usuario,
            senha: senhaA,
            login: false,
            filmes: []
        }

        console.log(Cadastro)

        //trazendo contas do localStorage
        if(localStorage.getItem('Contas') === null)
            Contas = [];
        else
            Contas = JSON.parse(localStorage.getItem("Contas"));

        //salvando dados do cadastro no localStorage
        Contas.push(Cadastro);

        //atualizando os dados do localStorage
        localStorage.setItem("Contas", JSON.stringify(Contas));

        window.location.href = "login.html";
    }
    else
    {
        console.log("falhou :c");
    }
}

document.getElementById("cadastrar").addEventListener('click', cadastrar);
document.getElementById('usuario').addEventListener('input', validar)
document.getElementById('senhaA').addEventListener('input', validar)
document.getElementById('senhaB').addEventListener('input', validar)