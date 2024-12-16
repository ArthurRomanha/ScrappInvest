.async function fetchCotacao() {
    try {
        const response = await fetch('https://api-invest-pi.vercel.app/');//fetch of my own api 
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
