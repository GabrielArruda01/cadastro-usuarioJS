// Criando os objetos dos elementos de texto do form
var nome = document.querySelector("#inputName");
var nomeHelp = document.querySelector("#inputNameHelp");
var ano = document.querySelector("#inputYear");
var anoHelp = document.querySelector("#inputYearHelp");
var email = document.querySelector("#inputEmail");
var emailHelp = document.querySelector("#inputEmailHelp");
var senha = document.querySelector("#inputPassword");
var senhaHelp = document.querySelector("#inputPasswordHelp");
var passStrengthMeter = document.querySelector("#passStrengthMeter");

// Event listeners para os campos do formulário
nome.addEventListener('focusout', validarNome);
ano.addEventListener('focusout', validarAnoNascimento);
email.addEventListener('focusout', validarEmail);
senha.addEventListener('focusout', () => validarSenha(senha.value, nome.value, ano.value));

// Função para validar o nome
function validarNome() {
    const regexNome = /^[A-Za-z ]{7,}$/; // Permitindo espaço e exigindo mais de 6 caracteres
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
    const anoAtual = new Date().getFullYear();
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
        senhaHelp.textContent = "Senha inválida. Deve ter entre 6 e 20 caracteres, incluir pelo menos um caractere especial, um número, uma letra e não conter o nome ou ano de nascimento.";
        senhaHelp.style.color = "red";
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
    senhaHelp.style.color = "green";
    passStrengthMeter.value = meterValue;
}
