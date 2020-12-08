const suaNave = document.querySelector('.player-shooter')
const areaJogo = document.querySelector('#main-play-area')
const aliens = ['../img/monster-1.png', '../img/monster-2.png', '../img/monster-2.png']
const instrucoes = document.querySelector('.instrucoes')
const start = document.querySelector('.start')
let intervaloAlien

//movimento e tiros
function vooNave(evento) {
  if (evento.key === 'ArrowUp') {
    evento.preventDefault()
    subir()
  } else if (evento.key === 'ArrowDown') {
    evento.preventDefault()
    descer()
  } else if (evento.key === " ") {
    evento.preventDefault()
    atirar()
  }
}

//função para subir

function subir() {
  let topPosition = getComputedStyle(suaNave).getPropertyValue('top')
  if (topPosition === '0px') {
    return
  } else {
    let posicao = parseInt(topPosition)
    posicao -= 25
    suaNave.style.top = `${posicao}px`
  }
}

//função para descer

function descer() {
  let topPosition = getComputedStyle(suaNave).getPropertyValue('top')
  if (topPosition === '550px') {
    return
  } else {
    let posicao = parseInt(topPosition)
    posicao += 25
    suaNave.style.top = `${posicao}px`
  }
}

//tiros
function atirar() {
  let laser = criarLaser()
  areaJogo.appendChild(laser)
  movimentoLaser(laser)
}

function criarLaser() {
  let posicaoX = parseInt(window.getComputedStyle(suaNave).getPropertyValue('left'))
  let posicaoY = parseInt(window.getComputedStyle(suaNave).getPropertyValue('top'))
  let novoLaser = document.createElement('img')
  novoLaser.src = '../img/shoot.png'
  novoLaser.classList.add('laser')
  novoLaser.style.left = `${posicaoX}px`
  novoLaser.style.top = `${posicaoY - 10}px`
  return novoLaser
}

function movimentoLaser(laser) {
  let intervaloLaser = setInterval(() => {
    //pegar posição do laser
    let posicaoX = parseInt(laser.style.left)
    let aliens = document.querySelectorAll('.alien')

    aliens.forEach((alien) => { //comparando se cada alien foi atingido, se sim, troca a imagem
      if (checarColisaoLaser(laser, alien)) {
        alien.src = '../img/explosion.png'
        alien.classList.remove('alien')
        alien.classList.add('alien-morto')
      }
    })
    //ver onde está a posição do tiro
    if (posicaoX === 340) {
      laser.remove()
    } else {
      laser.style.left = `${posicaoX + 8}px`
    }
  }, 10)
}

//Inimigos
//função para sortear qual tipo de inimigo vai aparecer

function criarAliens() {
  let novoAlien = document.createElement('img')
  let alienSprite = aliens[Math.floor(Math.random() * aliens.length)]
  novoAlien.src = alienSprite
  novoAlien.classList.add('alien')
  novoAlien.classList.add('transicao-alien')
  novoAlien.style.left = '370px'
  novoAlien.style.top = `${Math.floor(Math.random() * 330) + 30}px`
  areaJogo.appendChild(novoAlien)
  moverAlien(novoAlien)
}

//movimentar inimigos
function moverAlien(alien) {
  let moverAlienInterval = setInterval(() => {
    let posicaoX = parseInt(window.getComputedStyle(alien).getPropertyValue('left'))
    if (posicaoX <= 50) {
      //verificar se o inimigo foi atingido
      if (Array.from(alien.classList).includes('alien-morto')) {
        alien.remove()
      } else {
        //gameover
        gameOver()
      }
    } else {
      //movimento
      alien.style.left = `${posicaoX - 4}px`
    }

  }, 30)
}

//colisão
function checarColisaoLaser(laser, alien) {
  //pegando as posições do laser e dos inimigos
  let lasertop = parseInt(laser.style.top)
  let laserleft = parseInt(laser.style.left)
  let laserBottom = lasertop - 20

  let alientop = parseInt(alien.style.top)
  let alienleft = parseInt(alien.style.left)
  let alienBottom = alientop - 30

  if (laserleft != 340 && laserleft + 40 >= alienleft) {
    if (lasertop <= alientop && lasertop >= alienBottom) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

//começar o jogo

start.addEventListener('click', (evento) => {
  comecarJogo()
})

function comecarJogo() {
  start.style.display = 'none'
  instrucoes.style.display = 'none'
  window.addEventListener('keydown', vooNave)
  intervaloAlien = setInterval(() => {
    criarAliens()
  }, 2000)
}

//função gameover

function gameOver() {
  window.removeEventListener('keydown', vooNave)
  clearInterval(intervaloAlien)
  let aliens = document.querySelectorAll('.alien')
  aliens.forEach((alien) => alien.remove())
  let laser = document.querySelectorAll('.laser')
  laser.forEach((laser) => laser.remove())
  setTimeout(() => {
    alert('Game Over')
    suaNave.style.top = '250px'
    start.style.display = 'block'
    instrucoes.style.display = 'block'
  })
}