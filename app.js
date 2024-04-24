// EU TINHA FEITO ASSIM ANTES DE APRENDER A TRANSFORMAR EM UMA FUNÇÃO!
//let titulo = document.querySelector('h1');
// titulo.innerHTML = 'Jogo do número secreto';

// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha um número entre 1 e 10';

let listaDeNumerosSorteados = [];   //Lista criada pra ir adicionando os ítens que foram gerados, pra conseguir fazer uma limitação de que eles não se repitam antes de esgotarem as opções
let numeroLimite = 10;   //Criei essa variável agr pra não precisar mudar em mais de um lugar quando eu quiser mudar a limitação de números que tenho disponíveis pra chute! E como ela vai ser utilizada na função da próxima linha de código, ela precisou vir antes dele!
let numeroSecreto = gerarNumeroAleatorio();
console.log(numeroSecreto);   //Aqui tá sendo só uma fila pra poder ver qual o número da vez
let tentativas = 1;   //Variável pra controlar a quantidade de tentativas pra mostrar na tela

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});   //Isso é um código de JS que foi utilizado lá na linha 7 do HTML. Um import que acontece dentro do JS que permite a opção de fala dos textos inseridos no meu código.
            // Esse vai ser o comando que utilizo, junto da função SPEAK e, como parâmetros, o texto que vou utilizar, a voz específica de acordo com o que tem disponível lá no site "responsivevoice.org" (EXATAMENTE com a mesma escrita, incluindo os maiúsculos)
            // e, entre as {}, o RATE: vai definir qual a velocidade que aquele áudio vai sair pro usuário! *-*
}

function mensagemInicial() {   //Botei essas outras funções dentro de uma nova justamente pq vou ter que usar de novo
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroLimite}`);
}
mensagemInicial();   //Eu tenho que chamar a função! Se eu só declarar ela, ela não vai ser executada!

function verificarChute() {   //Essa função veio lá do arquivo HTML tbm, mexi nos dois lugares
    let chute = document.querySelector('input').value;   //Vou pegar SÓ o valor do que aconteceu onde tem essa tag "input" lá no HTML
    
    if (chute == numeroSecreto) {
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}.`;
        exibirTextoNaTela('h1', 'Acertou!');
        exibirTextoNaTela('p', mensagemTentativas);

        document.getElementById('reiniciar').removeAttribute('disabled');   //Usei esse comando assim pq de botão lá no HTML eu tenho dois, e como o que eu quero deles tem "id" pra se referir, vou usar assim.
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor.');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior.');
        }
        tentativas++;
        limparCampo();
    }
    console.log(chute == numeroSecreto);   //Tinha usado isso aqui só pra conferir, antes de fazer o IF
}

function gerarNumeroAleatorio () {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);   //Eu tinha usado o RETURN antes, pq quero que a função me devolva algo, mas como transformei em uma variável, não preciso colocar o RETURN aqui mais!
    let qtdDeElementosDaLista = listaDeNumerosSorteados.length;

    if (qtdDeElementosDaLista == numeroLimite) {   //Esse IF me permite que eu tenha o controle se já usei todas as possibilidades de números disponíveis, pq se for o caso, eu zero pra começar de novo. Se eu nao faço isso, ele vai dar erro e não gerar mais nada após eu usar todos uma vez só.
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {   //Confiro se o número gerado já está na lista, se estiver, gero outro número
        return gerarNumeroAleatorio();
    } else {   //Se não tiver ainda, eu vou considerar aquele número como válido, adicionar ele na lista e então RETURN ele na minha função
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);   //Só pra conferir se deu certinho mesmo de adicionar. Ter o registro dos números que já foram...
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');   //Seleciono qual local eu tô querendo mexer, mas não importa o valor aqui (!= de na função "verificarChute")
    chute.value = '';   //Aqui sim vai importar o valor pq quero que ele passe a ficar vazio após minha tentativa incorreta (pra que eu possa tentar de novo de formamais simples e direta)
}

function reiniciarJogo() {   //Essa função de reiniciar jogo tá sendo possível ser chamada lá dentro da "verificarChute", no momento em que desabilita o "disabled" que tava no botão de 'Novo Jogo'! Daí qdo o usuário aperta, ela automaticamente é chamada.
    numeroSecreto = gerarNumeroAleatorio();
    console.log(numeroSecreto);   //Eu filando de novo pra conferir se tá funcionando lindo
    limparCampo();
    tentativas = 1;
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}