const fundosElement = document.getElementById("fundos");
let fundos = [];
let table = document.getElementById("data");
const enviaDados = () => {
    table.innerHTML = `
        <tbody>
            <tr>
                <th>Ticker</th>
                <th>Cotação</th>
                <th>P/VP</th>
                <th>Preço Justo</th>
                <th>DY 12M</th>
                <th>Último Dividendo</th>
            </tr>
        </tbody>`;
    fundosTicker = document.querySelectorAll(".fundo");
    fundos = [];
    for (let fundo of fundosTicker) {//verifica se é um fundo "válido"
        if ((fundo.textContent.length == 6) && (fundo.textContent.endsWith("11"))) {//se for envia para o array que será enviado para a api
            fundos.push({ "ticker": `${fundo.textContent.toUpperCase()}`, cotacao: "", pvp: "", precoJusto: "", valueDividendYeldTwelveMonths: "", lastDividend: "" });
        }
    }
    fetchCotacao();
}

async function fetchCotacao() {
    try {
        const response = await fetch('https://api-invest-t3jw6gp5y-arthurs-projects-cbccea18.vercel.app/', {//fetch da minha própria api
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
        console.log(data);
        
        let fundosAtualizados = data.fundosAtualizados;
        for (let i = 0; i < fundosAtualizados.length; i++) {
            //mostra o resultado da api
            table.innerHTML += `
            <tr>
                <td>${fundosAtualizados[i].ticker}</td>
                <td>${fundosAtualizados[i].cotacao}</td>
                <td>${fundosAtualizados[i].pvp}</td>
                <td>${fundosAtualizados[i].precoJusto}</td>
                <td>${fundosAtualizados[i].valueDividendYeldTwelveMonths}</td>
                <td>${fundosAtualizados[i].lastDividend}</td>
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
    }
}
const addItem = (evento) => {//função para adicionar um novo fundo

    const elemento = evento.target;
    if (elemento.name == "newFundo") {
        fundosElement.innerHTML += `<div class="container-fundo"><button name="remove">&#10060;</button><div contenteditable="true" class="fundo"></div></div>`;
    }
}
const presetArthur = () => {//função que exibe os fundos que eu acompanho
    fundosElement.innerHTML = `
    <div class="container-fundo">
        <button name="remove">❌</button>
        <div contenteditable="true" class="fundo">GARE11</div>
    </div>

    <div class="container-fundo">
        <button name="remove">❌</button>
        <div contenteditable="true" class="fundo">GGRC11</div>
    </div>

    <div class="container-fundo">
        <button name="remove">❌</button>
        <div contenteditable="true" class="fundo">TRXF11</div>
    </div>

    <div class="container-fundo">
        <button name="remove">❌</button>
        <div contenteditable="true" class="fundo">TEPP11</div>
    </div>

    <div class="container-fundo">
        <button name="remove">❌</button>
        <div contenteditable="true" class="fundo">MXRF11</div>
    </div>

    <div class="container-fundo">
        <button name="remove">❌</button>
        <div contenteditable="true" class="fundo">KNSC11</div>
    </div>

    <div class="container-fundo">
        <button name="remove">❌</button>
        <div contenteditable="true"
        class="fundo">XPML11</div>
    </div>
            `;
}
document.addEventListener("click", removeItem);
document.addEventListener("click", addItem);