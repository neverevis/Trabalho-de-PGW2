let mensagem = document.getElementById('mensagem');

function msg(texto)
{
    mensagem.setAttribute("class","bi-patch-exclamation-fill")
    mensagem.textContent = ' ' + texto;
}

function login()
{

    //coletar informações
    let usuario = document.getElementById('usuario').value;

    let senha = document.getElementById('senha').value;

    //trazer a lista de contas do storage
    let Contas = JSON.parse(localStorage.getItem("Contas"))

    //testa sucesso do login
    if(Contas != null)
    {
        if(usuario != '')
        {
            for(x of Contas)
            {
                if(x.usuario === usuario)
                {
                    if(x.senha === senha)
                    {
                        x.login = true;
                        localStorage.setItem("Contas", JSON.stringify(Contas));
                        console.log("Sucesso no login!")
                        return;
                    }
                    else if(senha != '')
                    {
                        msg('Senha incorreta.');
                        return;
                    }
                    else
                    {
                        msg('Digite a senha.');
                        return;
                    }
                }
                else
                {
                    msg('Nome de usuário inválido.');
                }
            }
        }
        else
        {
            msg('Preencha o campo de usuário');
        }
    }
    else
    {
        msg('Não há usuários registrados.');
    }
}

document.getElementById("entrar").addEventListener('click', login);