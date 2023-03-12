class JogoDaVelha{
    constructor(){
        this.valorMaquina = ''
        this.valorPlayer = ''
        this.partidas = 0
        this.vitorias = 0
        this.derrotas = 0
        this.vezMaquina = false
        this.fimGame = false
        this.jogada = 1
    }
    escolheValor(valorPlayer,valorMaquina) {
        this.valorPlayer = valorPlayer
        this.valorMaquina = valorMaquina
    }
}

var jogo = new JogoDaVelha

//Inicia o game verificando se o jogador escolheu o simbolo ou nao
function iniciaGame(){
    let telaInicioGame = document.getElementById('titulo')
    let telaGame = document.getElementById('game')
    if(jogo.valorPlayer != ''){
        telaInicioGame.className = 'alinha some'
        telaGame.className = 'alinha'
    } else {
        alert('ERRO: Escolha entre X ou O')
    }
}

//Seleciona o valor que o jogador deseja jogar
function decide(valor){
    if(valor == 0){
        jogo.escolheValor('x','o')
    } else {
        jogo.escolheValor('o','x')
    }
}

//Modifica o valor da tabela de acordo com a escolha do jogador ou da maquina
function selecionado(valor){
    let selecionado = document.getElementById(valor)
    verificaEmpate()
    if(!jogo.vezMaquina){
        if(selecionado.value == ' '){
            selecionado.classList = 'botaovelha player'
            selecionado.value = jogo.valorPlayer
            jogo.vezMaquina = true
            jogo.jogada ++
        }
        if(verificaVitoria(jogo.valorPlayer)){
            avisoVitoria('player')
    }
    } else {
        selecionado.classList = 'botaovelha maquina'
        selecionado.value = jogo.valorMaquina
        jogo.vezMaquina = false
        jogo.jogada ++
        if(verificaVitoria(jogo.valorMaquina)){
            avisoVitoria('Maquina')
        } 
    }   
    if(!jogo.fimGame){
        vezMaquina()
    }
}

//Recebe o valor escolhido pelo jogador e verifica se ganhou 
function verificaVitoria(valor){
let bloco01 = document.getElementById('1').value
let bloco02 = document.getElementById('2').value
let bloco03 = document.getElementById('3').value
let bloco04 = document.getElementById('4').value
let bloco05 = document.getElementById('5').value
let bloco06 = document.getElementById('6').value
let bloco07 = document.getElementById('7').value
let bloco08 = document.getElementById('8').value
let bloco09 = document.getElementById('9').value


    if(bloco01 == valor && bloco02 == valor && bloco03 == valor){
        return true
    } 
    else if(bloco01 == valor && bloco04 == valor && bloco07 == valor){
        return true
    }
    else if(bloco07 == valor && bloco08 == valor && bloco09 == valor){
        return true
    }
    else if(bloco03 == valor && bloco06 == valor && bloco09 == valor){
        return true
    }
    else if(bloco01 == valor && bloco05 == valor && bloco09 == valor){
        return true
    }
    else if(bloco07 == valor && bloco05 == valor && bloco03 == valor){
        return true
    }
    else if(bloco04 == valor && bloco05 == valor && bloco06 == valor){
        return true
    }
    else if(bloco02 == valor && bloco05 == valor && bloco08 == valor){
        return true
    }
}

//verifica empate
function verificaEmpate(){
    let mensagem = document.getElementById('mensagem')
    if(jogo.jogada == 9){
        if(!verificaVitoria(jogo.valorMaquina) &&
           !verificaVitoria(jogo.valorPlayer) ){
            mensagem.classList = 'mensagem player'
            mensagem.innerHTML = '<h1>Empate</h1>'
        }
        jogo.partidas ++
    }
}

//Recomeca o game
function recomecar(){
    let mensagem = document.getElementById('mensagem')
    mensagem.classList = 'some'
    jogo.jogada = 1
    jogo.fimGame = false
    jogo.vezMaquina = false
    atualizaPlacar();
    for(let id=1; id < 10; id++){
        let bloco = document.getElementById(String(id))
        bloco.classList = 'botaovelha'
        bloco.value = ' '
    }
}

//atualiza placar
function atualizaPlacar(){
    let placarPlayer = document.getElementById('placarPlayer')
    let placar = document.getElementById('placar')
    let placarMaquina = document.getElementById('placarMaquina')

    placarPlayer.value = `Player: ${jogo.vitorias}`
    placar.value = `Partidas: ${jogo.partidas}`
    placarMaquina.value = `Maquina: ${jogo.derrotas}`
}

//volta ao menu
function voltar(){
    let telaInicioGame = document.getElementById('titulo')
    let telaGame = document.getElementById('game')
    jogo.valorPlayer = ''
    telaInicioGame.className = 'alinha'
    telaGame.className = 'alinha some'
    recomecar()
    jogo.partidas = 0
    jogo.vitorias = 0
    jogo.derrotas = 0
    atualizaPlacar()
}

//Programacao da maquina
function vezMaquina(){       
    if(jogo.vezMaquina){
        while(true){
            let escolha = Math.floor(Math.random() * (10 - 1) + 1)
            let bloco = document.getElementById(String(escolha))
            if(bloco.value == ' '){
                selecionado(String(escolha))
                break
            }
        }
    }
}

//Mostra se perdeu ou ganhou
function avisoVitoria(vencedor){
    jogo.fimGame = true
    let mensagem = document.getElementById('mensagem')
    if(vencedor == 'player'){
        jogo.vitorias ++
        mensagem.classList = 'mensagem player'
        mensagem.innerHTML = '<h1>Vitoria</h1>'
    } else {
        jogo.derrotas ++
        mensagem.classList = 'mensagem maquina'
        mensagem.innerHTML = '<h1>Derrota</h1>'
    }
    jogo.partidas ++
    atualizaPlacar()
}

