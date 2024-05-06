//criando os objetos dos elementos de texto do form
var nome = document.querySelector("#inputName");
var nomeHelp = document.querySelector("#inputNameHelp");
var ano = document.querySelector("#inputYear");
var anoHelp = document.querySelector("#inputYearHelp");
var email = document.querySelector("#inputEmail");
var emailHelp = document.querySelector("#inputEmailHelp");
var senha = document.querySelector("#inputPassword");
var senhaHelp = document.querySelector("#inputPasswordHelp");
var passStrengthMeter = document.querySelector("#passStrengthMeter");

/*declarando o evento listener para o campos de texto do form. 
Uma vez o foco do campo inputName mude, será chamada a função validarNome*/
nome.addEventListener('focusout', validarNome);
ano.addEventListener('focusout', validarAnoNascimento);
email.addEventListener('focusout', validarEmail);
senha.addEventListener('focusout', () => validarSenha(senha.value, nome.value, ano.value));

/*declaração tradicional de função validarNome(e)
'e' é o objeto do tipo evento que contém, alpem de outras propriedades, o objeto que iniciou o evento,
neste caso o objeto 'nome'
*/
function validarNome(e) {
    const regexNome = /^[A-Za-z ]{7,}$/; // Permitindo espaço e exigindo mais de 6 caracteres 
    console.log(e); //impressão em console do objeto evento e
    console.log(e.target.value); //impressão em console do valor do objeto 'nome' que originou o evento   
    if (!nome.value.trim().match(regexNome)) {
        nomeHelp.textContent = "O nome deve conter apenas letras e ser maior que 6 caracteres.";
        nomeHelp.style.color = "red";
    } else {
        nomeHelp.textContent = "Nome válido.";
        nomeHelp.style.color = "green";
    }
}

// Função para validar o ano de nascimento
function validarAnoNascimento() {
    const anoAtual = 2022;
    const regexAno = /^(19|20)\d{2}$/;
    const anoValor = ano.value.trim();
    if (!anoValor.match(regexAno) || parseInt(anoValor) < 1900 || parseInt(anoValor) > anoAtual) {
        anoHelp.textContent = `Ano de nascimento inválido. Deve estar entre 1900 e ${anoAtual}.`;
        anoHelp.style.color = "red";
    } else {
        anoHelp.textContent = "Ano de nascimento válido.";
        anoHelp.style.color = "green";
    }
}

// Função para validar o email
function validarEmail() {
    const regexEmail = /^[A-Za-z0-9]+@[A-Za-z0-9]+\.(br|com|net|org)$/;
    if (!email.value.trim().match(regexEmail)) {
        emailHelp.textContent = "Formato de email inválido.";
        emailHelp.style.color = "red";
    } else {
        emailHelp.textContent = "Email válido.";
        emailHelp.style.color = "green";
    }
}

// Função para validar a senha
function validarSenha(senha, nomeUsuario, anoNascimento) {
    const regexSenhaBasica = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#%&!+])[A-Za-z\d@#%&!+]{6,20}$/;
    const senhaValida = regexSenhaBasica.test(senha) && !senha.toLowerCase().includes(nomeUsuario.toLowerCase()) && !senha.includes(anoNascimento);
    
    if (!senhaValida) {
        senhaHelp.textContent = "Senha inválida.";
        passStrengthMeter.value = 0;
        return;
    }

    // Detalhes adicionais para nível de senha
    const temCaractereEspecial = (senha.match(/[@#%&!+]/g) || []).length;
    const temNumero = (senha.match(/\d/g) || []).length;
    const temMaiuscula = (senha.match(/[A-Z]/g) || []).length;
    const comprimento = senha.length;

    let nivelSenha;
    let meterValue = 0;
    if (comprimento < 8) {
        nivelSenha = "fraca";
        meterValue = 5 + temCaractereEspecial + temNumero;
    } else if (comprimento < 12) {
        nivelSenha = temMaiuscula >= 1 ? "moderada" : "fraca";
        meterValue = 10 + temCaractereEspecial + temNumero + (temMaiuscula ? 5 : 0);
    } else {
        if (temCaractereEspecial > 1 && temNumero > 1 && temMaiuscula > 1) {
            nivelSenha = "forte";
            meterValue = 25 + temCaractereEspecial + temNumero + temMaiuscula;
        } else {
            nivelSenha = "moderada";
            meterValue = 15 + temCaractereEspecial + temNumero + temMaiuscula;
        }
    }

    senhaHelp.textContent = `Nível de segurança da senha: ${nivelSenha}.`;
    passStrengthMeter.value = meterValue;
}
