class JogoDaVelha{
    constructor(){
        this.valorMaquina = ''
        this.valorPlayer = ''
        this.partidas = 0
        this.vitorias = 0
        this.derrotas = 0
        this.fimGame = false
        this.vezMaquina = false
        this.jogada = 1
    }

    //controle de escolha de X ou O
    escolheValor(valorPlayer,valorMaquina) {
        this.valorPlayer = valorPlayer
        this.valorMaquina = valorMaquina
    }

    //Inicia o game verificando se o jogador escolheu o simbolo ou nao
    iniciaGame(){
        let telaInicioGame = document.getElementById('titulo')
        let telaGame = document.getElementById('game')
        if(jogo.valorPlayer != ''){
            telaInicioGame.className = 'alinha some'
            telaGame.className = 'alinha'
        } else {
            alert('ERRO: Escolha entre X ou O')
        }
    }

    //Recomeca a partida apos a vitoria derrota ou empate
    recomecar(){
        let mensagem = document.getElementById('mensagem')
        mensagem.classList = 'some'
        this.jogada = 1
        this.fimGame = false
        this.atualizaPlacar();
        for(let id=1; id < 10; id++){
            let bloco = document.getElementById(String(id))
            bloco.classList = 'botaovelha'
            bloco.value = ' '
        }
    }

    //retorna ao inicio do jogo
    voltar(){
        let telaInicioGame = document.getElementById('titulo')
        let telaGame = document.getElementById('game')
        this.valorPlayer = ''
        telaInicioGame.className = 'alinha'
        telaGame.className = 'alinha some'
        this.recomecar()
        this.partidas = 0
        this.vitorias = 0
        this.derrotas = 0
        this.atualizaPlacar()
    }

    //controle de fluxo do jogo
    eventGame(valor){
        this.selecionado(valor, "player", this.valorPlayer)
        if(this.jogada <= 9 && !this.fimGame && this.vezMaquina){
            this.jogadaMaquina()
        }
        this.verificaEmpate()
    }

    //controle de selecao do botao
    selecionado(valor, quemJoga, valorJogador){
        let selecionado = document.getElementById(valor)
        if(selecionado.value == ' ' && !this.fimGame){
            selecionado.classList = `botaovelha ${quemJoga}`
            selecionado.value = valorJogador
            this.vezMaquina = true
            this.jogada ++
            if(this.verificaVitoria(valorJogador)){
                this.avisoVitoria(quemJoga)
            }
        } if(quemJoga == "maquina"){
            this.vezMaquina = false
        }
    }

    //Inteligencia da maquina
    jogadaMaquina(){    
        while(true){
            let escolha = Math.floor(Math.random() * (10 - 1) + 1)
            let bloco = document.getElementById(String(escolha))
            if(bloco.value == ' '){
                this.selecionado(String(escolha), "maquina", this.valorMaquina)
                break
            } 
        }
    }

    //atualiza o placar do jogo
    atualizaPlacar(){
        let placarPlayer = document.getElementById('placarPlayer')
        let placar = document.getElementById('placar')
        let placarMaquina = document.getElementById('placarMaquina')
    
        placarPlayer.value = `Player: ${this.vitorias}`
        placar.value = `Partidas: ${this.partidas}`
        placarMaquina.value = `Maquina: ${this.derrotas}`
    }

    //verifica se ouve empate
    verificaEmpate(){
        let mensagem = document.getElementById('mensagem')
        if(this.jogada == 10 && !this.fimGame){
            console.log("empate")
            mensagem.classList = 'mensagem player'
            mensagem.innerHTML = '<h1>Empate</h1>'
            this.partidas ++
        }
    }

    //verifica quem ganhou e retorna true
    verificaVitoria(valor){
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

    //controle de aviso de vitoria do jogo
    avisoVitoria(vencedor){
        this.fimGame = true
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
        this.atualizaPlacar()
    }

}
//Instancia o jogo
let jogo = new JogoDaVelha


