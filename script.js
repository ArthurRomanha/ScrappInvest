let fundos = [
    { "ticker": "gare11", cotacao: "", pvp: "", precoJusto: "", valueDividendYeldTwelveMonths: "", lastDividend: "" },
    { "ticker": "ggrc11", cotacao: "", pvp: "", precoJusto: "", valueDividendYeldTwelveMonths: "", lastDividend: "" },
    { "ticker": "trxf11", cotacao: "", pvp: "", precoJusto: "", valueDividendYeldTwelveMonths: "", lastDividend: "" }
];
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

        let table = document.getElementById("data");//select table to show data
        for (let i = 0;i<fundosAtualizados.length;i++){
            //show data on the table
            table.innerHTML += `
            <tr>
                <td>${fundosAtualizados[i].ticker.toUpperCase()}</td>
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
fetchCotacao();
