let form       = document.querySelector('form');
let inNome     = document.querySelector('input[name=nome]')
let inEmail    = document.querySelector('input[name=email]')
let inAssunto  = document.querySelector('input[name=assunto]')
let inMensagem = document.querySelector('textarea[name=mensagem]')

form.addEventListener('submit', submitForm);

function submitForm(event) {
    event.preventDefault();
    if (formCerta()) {
        form.target = 'self';
        form.submit();
        alert('Dados enviados!!!');
    }
}

function formCerta() {
    return nomeCerto() && emailCerto() && assuntoCerto() && mensagemCerto();
}

function nomeCerto() {
    let nome = inNome.value;
    return nome.length > 4;
}

function exibirErroNome(event) {
    let sugestao = document.querySelector('label[for=nome]>span');
    if (!nomeCerto()) {
        sugestao.textContent = '(mínimo 5 caracteres)';
    } else {
        sugestao.textContent = '';
    }
}

inNome.addEventListener('input', exibirErroNome);

function emailCerto() {
    let regex = /^\w+@\w+\.\w+$/;
    let email = inEmail.value;
    return regex.test(email);
}

function exibirErroEmail(event) {
    let sugestao = document.querySelector('label[for=email]>span');
    if (!emailCerto()) {
        sugestao.textContent = '(formato de email errado)';
    } else {
        sugestao.textContent = '';
    }
}

inEmail.addEventListener('input', exibirErroEmail);

function assuntoCerto() {
    let assunto = inAssunto.value;
    return assunto.length > 2;
}

function exibirErroAssunto(event) {
    let sugestao = document.querySelector('label[for=assunto]>span');
    if (!assuntoCerto()) {
        sugestao.textContent = '(mínimo 3 caracteres)';
    } else {
        sugestao.textContent = '';
    }
}

inAssunto.addEventListener('input', exibirErroAssunto);

function mensagemCerto() {
    let mensagem = inMensagem.value;
    return mensagem.length > 9;
}

function exibirErroMensagem(event) {
    let sugestao = document.querySelector('label[for=mensagem]>span');
    if (!mensagemCerto()) {
        sugestao.textContent = '(mínimo 10 caracteres)';
    } else {
        sugestao.textContent = '';
    }
}

inMensagem.addEventListener('input', exibirErroMensagem);
