const fs = require('fs');
const path = require('path');

// Função para adicionar um espaço na posição 17 de cada linha e remover os últimos 13 caracteres
function modificarTexto() {
    // Caminho do arquivo de entrada e do arquivo de saída
    const arquivoEntrada = './2024/partidos.txt'; // Substitua pelo caminho correto do arquivo de entrada
    const arquivoSaida = './2024/partidos_modificado.txt'; // Caminho para o arquivo de saída

    // Ler o arquivo de texto
    fs.readFile(arquivoEntrada, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            return;
        }

        // Separar o texto em linhas
        const linhas = data.trim().split('\n');

        // Modificar as linhas para adicionar um espaço na posição 17 e remover os últimos 13 caracteres
        const linhasModificadas = linhas.map(linha => {
            // Adicionar um espaço na posição 17
            const linhaModificada = linha.slice(0, 17) + ' ' + linha.slice(17);
            // Remover os últimos 13 caracteres
            return linhaModificada.slice(0, -13);
        });

        // Gravar as linhas modificadas em um novo arquivo
        fs.writeFile(arquivoSaida, linhasModificadas.join('\n'), 'utf8', (err) => {
            if (err) {
                console.error('Erro ao gravar o arquivo:', err);
            } else {
                console.log('Arquivo modificado salvo como', arquivoSaida);
            }
        });
    });
}

// Chamar a função
modificarTexto();
