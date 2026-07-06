async function buscarReceitas() {
    try {
        const response = await fetch('http://localhost:3000/receitas');
        const dados = await response.json();
        console.log(dados);
    } catch (erro) {
        console.error('Erro ao buscar receitas:', erro);
    }
}

buscarReceitas();
