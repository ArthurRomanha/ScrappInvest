const fundosElement = document.getElementById("fundos");
let fundos = [];
let table = document.getElementById("data");//select table to show data
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
    for (let fundo of fundosTicker) {
        if ((fundo.textContent.length == 6) && (fundo.textContent.endsWith("11"))) {
            fundos.push({ "ticker": `${fundo.textContent.toUpperCase()}`, cotacao: "", pvp: "", precoJusto: "", valueDividendYeldTwelveMonths: "", lastDividend: "" });
        }
    }
    fetchCotacao();
}

async function fetchCotacao() {
    try {
        const response = await fetch('https://api-invest-pi.vercel.app/', {//fetch of my own api
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
            //show data on the table
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
const removeItem = (evento) => {

    const elemento = evento.target;

    if (elemento.name == "remove") {
        console.log(elemento);

        elemento.parentElement.remove();
    }
}
const addItem = (evento) => {

    const elemento = evento.target;
    if (elemento.name == "newFundo") {
        fundosElement.innerHTML += `<div class="container-fundo"><button name="remove">&#10060;</button><div contenteditable="true" class="fundo"></div></div>`;
    }
}
document.addEventListener("click", removeItem);
document.addEventListener("click", addItem);