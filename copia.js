const fs = require('fs');
const readline = require('readline');

async function copiarLinhasAPartirDe(arquivoEntrada, arquivoSaida, linhaInicial) {
  const arquivoLeitura = fs.createReadStream(arquivoEntrada);
  const arquivoEscrita = fs.createWriteStream(arquivoSaida);
  const leitor = readline.createInterface({
    input: arquivoLeitura,
    crlfDelay: Infinity
  });

  let contadorLinha = 0;
  
  for await (const linha of leitor) {
    contadorLinha++;
    if (contadorLinha >= linhaInicial) {
      arquivoEscrita.write(linha + '\n');
    }
  }

  arquivoLeitura.close();
  arquivoEscrita.close();
  console.log(`Linhas a partir da ${linhaInicial} copiadas para o arquivo ${arquivoSaida}`);
}

// Exemplo de uso:
const arquivoEntrada = './resultado/candidatos.sql';  // Caminho do arquivo de entrada
const arquivoSaida = 'saida.txt';      // Caminho do arquivo de saída
const linhaInicial = 280000;           // Linha inicial para copiar

copiarLinhasAPartirDe(arquivoEntrada, arquivoSaida, linhaInicial);
