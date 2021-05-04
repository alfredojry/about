// Validação de formulário *******************************************************************

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

// Consulta de repositórios ************************************************************************

let inicioIntervalo = 0;
let intervalo = 5;
let user = 'alfredojry';
let urlAPI = `https://api.github.com/users/${user}/repos`;
let btPrev = document.getElementById('bt-nav-left');
let btNext = document.getElementById('bt-nav-right');

window.addEventListener('DOMContentLoaded', mostrarPrimeirosRepos);
window.addEventListener('DOMContentLoaded', function () {
    btNext.addEventListener('click', mostrarSeguintesRepos);
    btPrev.addEventListener('click', mostrarAnterioresRepos);
});

function mostrarPrimeirosRepos() {
    refreshRepos(dataOffline);
    animationArticle();
    let divIntervalo = document.querySelector('.controle-repos > div');
    let posInicio = 0;
    getData().then(data => {
        refreshRepos(data.slice(posInicio, posInicio + intervalo));
        let numRepos  = data.length;
        divIntervalo.textContent = `${posInicio + 1} - ${intervalo > numRepos ? numRepos : intervalo} de ${numRepos}`;
        btPrev.disabled = true;
        if (numRepos > intervalo) btNext.disabled = false;
    })
    .catch(function (erro) {
        refreshRepos(dataError);
    });
}

function mostrarSeguintesRepos() {
    refreshRepos(dataOffline);
    animationArticle();
    let divIntervalo = document.querySelector('.controle-repos > div');
    let posInicio = divIntervalo.textContent ? Number(divIntervalo.textContent.match(/^\d+/g)[0]) - 1 : 0;
    posInicio += intervalo;
    getData().then(data => {
        refreshRepos(data.slice(posInicio, posInicio + intervalo));
        let numRepos  = data.length;
        divIntervalo.textContent = `${posInicio + 1} - ${intervalo + posInicio > numRepos ? numRepos : intervalo + posInicio} de ${numRepos}`;
        btNext.disabled = intervalo + posInicio >= numRepos;
        btPrev.disabled = posInicio == 0; 
    })
    .catch(function (erro) {
        refreshRepos(dataError);
    });
}

function mostrarAnterioresRepos() {
    refreshRepos(dataOffline);
    animationArticle();
    let divIntervalo = document.querySelector('.controle-repos > div');
    let posInicio = divIntervalo.textContent ? Number(divIntervalo.textContent.match(/^\d+/g)[0]) - 1 : 0;
    posInicio -= intervalo;
    getData().then(data => {
        refreshRepos(data.slice(posInicio, posInicio + intervalo));
        let numRepos  = data.length;
        divIntervalo.textContent = `${posInicio + 1} - ${intervalo + posInicio > numRepos ? numRepos : intervalo + posInicio} de ${numRepos}`;
        btNext.disabled = intervalo + posInicio >= numRepos;
        btPrev.disabled = posInicio == 0;
    })
    .catch(function (erro) {
        refreshRepos(dataError);
    });
}

async function getData() {
    let response = await fetch(urlAPI);
    if (!response.ok) {
        throw new Error(response.status);
    }
    let data = await response.json();
    return data;
}

function articleRepo(item) {
    let divTitulo = document.createElement('div');
    let anchorRepo = document.createElement('a');
    anchorRepo.textContent = item.name;
    anchorRepo.href = item.html_url;
    anchorRepo.target = '_blank';
    anchorRepo.rel = 'noopener noreferrer';
    divTitulo.appendChild(anchorRepo);
    divTitulo.classList.add('titulo-repo');
    let divLinguagem = document.createElement('div');
    divLinguagem.textContent = item.language ? item.language : 'texto';
    divLinguagem.classList.add('language-repo');
    let divDescricao = document.createElement('div');
    divDescricao.textContent = item.description ? item.description : `Projeto legal e bacano ${item.language ? 'em ' + item.language : ''}`;
    divDescricao.classList.add('descricao-repo')
    let divGHPage = document.createElement('div');
    divGHPage.classList.add('demo-repo');
    if (item.has_pages) {
        let urlGHPage = `https://alfredojry.github.io/${item.name}`;
        let anchor = document.createElement('a');
        anchor.href = urlGHPage;
        anchor.target = '_blank';
        anchor.rel = 'noopener noreferrer';
        anchor.textContent = 'GH-Page';
        divGHPage.appendChild(anchor);
    }
    let article = document.createElement('article');
    article.append(divTitulo, divLinguagem, divDescricao, divGHPage);
    return article;
}

function refreshRepos(arr) {
    let divArticles = document.querySelector('.articles-repos');
    divArticles.innerHTML = '';
    for (let item of arr) {
        let article = articleRepo(item);
        article.style.backgroundColor = randomColors();
        divArticles.appendChild(article);
    }
}

function randomColors() {
    let colors = ['#e6fcb1', '#faebdc', '#e6fffc', '#ebe6ff', 
    '#fee6ff', '#ffe6ed', '#edffbd', '#deffed', '#dee1ff', '#f4deff'];
    let randomNum = Math.floor(colors.length * Math.random());
    return colors[randomNum];
}

let itemOffline = {
    name: 'Carregando nome do repositório...',
    html_url: '#',
    language: null,
    description: 'Carregando descrição...',
    has_pages: false,
};

let dataOffline = Array.from({ length: intervalo }, () => itemOffline);

let itemError = {
    name: 'Error al cargar informações do repositório...',
    html_url: '#',
    language: null,
    description: 'offline',
    has_pages: false,
};

let dataError = Array.from({ length: intervalo }, () => itemError);

function animationArticle() {
    let articles = document.querySelectorAll('.articles-repos>article');
    let colors = ['white', '#adadad', 'gray', '#d4d4d4', '#f0f0f0'];
    let keyFrames = colors.map(c => ({'backgroundColor': c}));
    console.log(keyFrames)
    for (let art of articles) {
        art.animate( keyFrames, {
            duration: 1500,
            iterations: 'Infinity',
        });
    }
}
