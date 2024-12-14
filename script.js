async function fetchCotacao() {
    try {
        const response = await fetch('https://api-invest-547sevqvv-arthurs-projects-cbccea18.vercel.app/?vercelToolbarCode=gJq71QlesgtBwhg');
        const data = await response.json();
        console.log(data);
        let fundosAtualizados = data.fundosAtualizados;

        let table = document.getElementById("dados");
        for (let i = 0;i<fundosAtualizados.length;i++){
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