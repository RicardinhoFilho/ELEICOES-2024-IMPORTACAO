const fs = require('fs');
const path = require('path');

// Função para ler o arquivo e gerar os comandos SQL
function gerarComandosSQL() {
    // Criar a pasta 'resultado' se não existir
    const pastaResultado = './resultado';
    if (!fs.existsSync(pastaResultado)) {
        fs.mkdirSync(pastaResultado);
    }

    // Ler o arquivo de texto
    fs.readFile('./2024/candidatos.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            return;
        }

        // Separar o texto em linhas
        const linhas = data.trim().split('\n');
        
        // Array para armazenar os comandos SQL
        let comandosSQL = [];
        const comandosPorTransacao = 5; // Número de comandos por transação

        // Função para gravar comandos em arquivo
        const gravarArquivo = (comandos) => {
            return new Promise((resolve, reject) => {
                const resultadoFinal = comandos.join('\n'); // Juntar comandos sem transação
                const arquivoPath = path.join(pastaResultado, 'comandos.sql'); // Nome do arquivo único
                fs.appendFile(arquivoPath, resultadoFinal + '\n', 'utf8', (err) => {
                    if (err) {
                        reject(`Erro ao gravar o arquivo ${arquivoPath}: ${err}`);
                    } else {
                        resolve();
                    }
                });
            });
        };

        // Processar cada linha
        const processarLinhas = async () => {
            for (const linha of linhas) {
                // Separar por espaço
                const colunas = linha.split(/\s+/); // Usar expressão regular para separar por um ou mais espaços

                // Extrair CGCMF e nome
                const cgmf = colunas[0].replace("202", ""); // Primeiro elemento
                const nome = colunas.slice(2).join(' ').trim().replaceAll("'", ""); // Juntar os elementos do terceiro em diante

                // Gerar comando SQL
                const comando = `INSERT INTO TSE_CNPJ(CGCMF, CANDIDATO, RAZAO_SOCIAL) VALUES('${cgmf}', 'S', '${nome}');`;
                comandosSQL.push(comando);

                // Quando atingir a quantidade de comandos por transação, gravar em um arquivo
                if (comandosSQL.length >= comandosPorTransacao) {
                    await gravarArquivo(comandosSQL);
                    comandosSQL = []; // Limpar o array de comandos
                }
            }

            // Gravar os comandos restantes, se houver
            if (comandosSQL.length > 0) {
                await gravarArquivo(comandosSQL);
            }
        };

        // Iniciar o processamento das linhas
        processarLinhas().catch(console.error);
    });
}

// Chamar a função
gerarComandosSQL();
