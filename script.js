const fundosElement = document.getElementById("fundos");
const indicesElement = document.getElementById("container-indices");
const buttonAddFundo = document.querySelector(".newFundo");
const buttonClear = document.querySelector(".clear");

async function getIndices() {
    const response = await fetch('https://api-invest-pi.vercel.app/');
    const data = await response.json();

    let dados = data.dadosAtt.indicesPadrao;

    for (let i = 0; i < dados.length; i++) {
        if (i == 3 || i == 4) {//ibovespa e ifix
            indicesElement.innerHTML += `<div class="indices">
                <div class="indice-header">${dados[i].indice}</div>
                <div class="indice-body">${dados[i].valor}</div>
            </div>`
        } else if (i == 5) {//dólar
            indicesElement.innerHTML += `<div class="indices">
                <div class="indice-header">${dados[i].indice}</div>
                <div class="indice-body">R$ ${dados[i].valor}</div>
            </div>`
        }
        else {//selic, cdi, ipca
            indicesElement.innerHTML += `<div class="indices">
                <div class="indice-header">${dados[i].indice}</div>
                <div class="indice-body">${dados[i].valor}%</div>
            </div>`
        }
    }
}
getIndices();
let fundos = [];

const enviaDados = () => {

    fundosTicker = document.querySelectorAll(".fundo");
    fundos = [];
    for (let fundo of fundosTicker) {//verifica se é um fundo "válido"
        if ((fundo.textContent.length == 6) && (fundo.textContent.endsWith("11"))) {//se for envia para o array que será enviado para a api
            fundos.push({ "ticker": `${fundo.textContent.toUpperCase()}`, cotacao: "", pvp: "", precoJusto: "", valueDividendYeldTwelveMonths: "", lastDividend: "", liquidez:""});
        }
    }
    fetchCotacao();
}

async function fetchCotacao() {
    try {
        const response = await fetch('https://api-invest-pi.vercel.app/', {//fetch da minha própria api
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Define o tipo de conteúdo como JSON
            },
            body: JSON.stringify({ fundos }) // Converte os dados em JSON e envia no corpo da requisição
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const tbody = document.getElementById("dadosFundos");

        let fundosAtualizados = data.fundosAtualizados.fundosPadrao;
        for (let i = 0; i < fundosAtualizados.length; i++) {
            //mostra o resultado da api
            tbody.innerHTML += `
            <tr>
                <td class="invisible"><button name="removeG">❌</button></td>
                <td><a href="https://investidor10.com.br/fiis/${fundosAtualizados[i].ticker}/">${fundosAtualizados[i].ticker}</a></td>
                <td>${fundosAtualizados[i].cotacao}</td>
                <td>${fundosAtualizados[i].pvp}</td>
                <td>${fundosAtualizados[i].precoJusto}</td>
                <td>R$ ${(fundosAtualizados[i].precoJusto.parseFloat() * 0.9)}</td>
                <td>${fundosAtualizados[i].valueDividendYeldTwelveMonths}</td>
                <td>${fundosAtualizados[i].lastDividend}</td>
                <td>${fundosAtualizados[i].liquidez}</td>
            </tr>
            `
        }
    } catch (error) {
        console.error('Error colecting data', error);
    }
}
const removeItem = (evento) => {//função para remover um fundo

    const elemento = evento.target;

    if (elemento.name == "remove") {
        elemento.parentElement.remove();
    } else if (elemento.name == "removeG") {
        elemento.parentElement.parentElement.remove();
    }
}
const clear = () => {//função para limpar os fundos
    fundosElement.innerHTML = ``;
}
const addItem = (evento) => {//função para adicionar um novo fundo

    const elemento = evento.target;
    if (elemento.name == "newFundo") {
        fundosElement.innerHTML += `<div class="container-fundo"><button name="remove">&#10060;</button><div contenteditable="true" class="fundo">11</div></div>`;
    }
}

let lastSortedColumn = null;
let sortDirection = true; // true para crescente, false para decrescente

function sortTable(columnIndex) {
    const tbody = document.getElementById('dadosFundos');
    const rows = Array.from(tbody.rows);

    // Verifica se a coluna é numérica ou textual
    const isNumericColumn = (columnIndex === 2 || columnIndex === 3 || columnIndex === 4 || columnIndex === 5 ||columnIndex === 7 || columnIndex === 8); 
    // Cotação, PVP, Preço Justo, Preço de Entrada, Último Dividendo, Liquidez

    // Inverte a direção se a mesma coluna for clicada novamente
    if (lastSortedColumn === columnIndex) {
        sortDirection = !sortDirection; // Inverte a direção
    } else {
        sortDirection = true; // Reseta a direção para crescente
    }

    lastSortedColumn = columnIndex; // Atualiza a coluna atual

    rows.sort((a, b) => {
        const cellA = a.cells[columnIndex].textContent.trim();
        const cellB = b.cells[columnIndex].textContent.trim();

        if (isNumericColumn) {
            // Remove cifrões e converte para números
            const numA = parseFloat(cellA.replace(/[R$]/g , '').replace(/,/g, ''));
            const numB = parseFloat(cellB.replace(/[R$]/g , '').replace(/,/g, ''));

            return sortDirection
                ? numA - numB // Ordena numericamente em ordem crescente
                : numB - numA; // Ordena numericamente em ordem decrescente
        } else {
            return sortDirection
                ? cellA.localeCompare(cellB) // Ordena alfabeticamente em ordem crescente
                : cellB.localeCompare(cellA); // Ordena alfabeticamente em ordem decrescente
        }
    });

    // Reorganiza as linhas na tabela
    rows.forEach(row => tbody.appendChild(row));
}

//funções que exibe os fundos que eu acompanho por setor
const presetLogistica = () => {
    fundosElement.innerHTML += `
    <div class="container-fundo">
        <button name="remove">❌</button>
        <div contenteditable="true" class="fundo">KNRI11</div>
    </div>

    <div class="container-fundo">
        <button name="remove">❌</button>
        <div contenteditable="true" class="fundo">BTLG11</div>
    </div>

    <div class="container-fundo">
        <button name="remove">❌</button>
        <div contenteditable="true" class="fundo">HGLG11</div>
    </div>

    <div class="container-fundo">
        <button name="remove">❌</button>
        <div contenteditable="true" class="fundo">XPLG11</div>
    </div>`;
}
const presetPapel = () => {
    fundosElement.innerHTML += `
    <div class="container-fundo">
        <button name="remove">❌</button>
        <div contenteditable="true" class="fundo">AFHI11</div>
    </div>

    <div class="container-fundo">
        <button name="remove">❌</button>
        <div contenteditable="true" class="fundo">HGCR11</div>
    </div>

    <div class="container-fundo">
        <button name="remove">❌</button>
        <div contenteditable="true" class="fundo">KNSC11</div>
    </div>

    <div class="container-fundo">
        <button name="remove">❌</button>
        <div contenteditable="true" class="fundo">SAPI11</div>
    </div>

    <div class="container-fundo">
        <button name="remove">❌</button>
        <div contenteditable="true" class="fundo">BTCI11</div>
    </div>`;
}
const presetRU = () => {
    fundosElement.innerHTML += `
    <div class="container-fundo">
        <button name="remove">❌</button>
        <div contenteditable="true" class="fundo">HGRU11</div>
    </div>

    <div class="container-fundo">
        <button name="remove">❌</button>
        <div contenteditable="true" class="fundo">TRXF11</div>
    </div>

    <div class="container-fundo">
        <button name="remove">❌</button>
        <div contenteditable="true" class="fundo">RBVA11</div>
    </div>`;
}
const presetShopping = () => {
    fundosElement.innerHTML += `
    <div class="container-fundo">
        <button name="remove">❌</button>
        <div contenteditable="true" class="fundo">XPML11</div>
    </div>

    <div class="container-fundo">
        <button name="remove">❌</button>
        <div contenteditable="true" class="fundo">HGBS11</div>
    </div>

    <div class="container-fundo">
        <button name="remove">❌</button>
        <div contenteditable="true" class="fundo">HSML11</div>
    </div>`;
}
document.addEventListener("click", removeItem);
buttonClear.addEventListener("click", clear);
buttonAddFundo.addEventListener("click", addItem);